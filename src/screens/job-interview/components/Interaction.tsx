'use client';

// Import styles and dependencies
import { track } from '@vercel/analytics';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import './demo.css';
// Import images
import greenCheck_img from '../../../assets/green_check.svg';
import microphone_img from '../../../assets/microphone.svg';
import play_caret from '../../../assets/play_caret.svg';
import simliGray from '../../../assets/simli-gray.svg';
import InteractionFeedback from './InteractionFeedback';
// Import local modules
import {
  SARegisterRetellCall,
  SASlackSendMessageToLogging,
  SAStartAudioToVideoSession
} from '@/app/actions';
import SimliFaceStream from '@/components/SimliFaceStream/SimliFaceStream';
import { FontABCReproRegular } from '@/Fonts/Fonts';
import IconArrowRight from '@/media/IconArrowRight';
import cn from '@/utils/CSS/TailwindMergeAndClsx';
import APIError from './APIError/APIError';
import { Character, characterJenna } from './Characters/Characters';
import InteractionBubbles from './InteractionBubbles/InteractionBubbles';
import JennaStuck from './JennaStuck/JennaStuck';
import VideoControls from './VideoControls/VideoControls';
// import { RetellWebClient } from 'retell-client-js-sdk';
import { RetellWebClient } from 'simli-retell-client-js-sdk';
import InteractionLoadingBar from './InteractionLoadingBar';

const webClient = new RetellWebClient();

// Define state constants
const STATE_IDLE = 'STATE_IDLE';
const STATE_CREATING = 'STATE_CREATING';
const STATE_JOINING = 'STATE_JOINING';
const STATE_JOINED = 'STATE_JOINED';
const STATE_LEAVING = 'STATE_LEAVING';
const STATE_ERROR = 'STATE_ERROR';


type Word = {
  word: string;
  start: number;
  end: number;
};

type TranscriptEntry = {
  role: string;
  content: string;
  words: Word[];
  metadata: {
    response_id: number;
  };
};

export type UpdateEvent = {
  event_type: "update";
  transcript: TranscriptEntry[];
  turntaking: "user_turn" | "agent_turn";
};


const Interaction = () => {
  const updateEvent = useRef<UpdateEvent | null>();
  // General application state
  const [appState, setAppState] = useState(STATE_IDLE);
  const [apiError, setApiError] = useState(false);

  // Simli API
  const minimumChunkSize = 8;
  const [sessionToken, setSimliSessionToken] = useState<string>('');
  const simliFaceStreamRef = useRef(null);
  const lastAudioTimeRef = useRef(Date.now());

  // UI-related states
  const [showFeedback, setShowFeedback] = useState(false);
  const [showStuck, setShowStuck] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showFirstName, setShowFirstName] = useState(false);
  const [interactionBubbleState, setInteractionBubbleState] =
    useState('speaking');

  // User name and validation states
  const [firstName, setFirstName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [applicantCV, setApplicantCv] = useState<string>('');
  const [jobPosition, setJobPosition] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [isNameActive, setIsNameActive] = useState(false);
  const [isNameInvalid, setIsNameInvalid] = useState(false);

  const [isJuno, setIsJuno] = useState(true);

  // Character selection
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(
    characterJenna
  );


  // Microphone permission states
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);

  // Microphone-related states
  const [micStream, setMicStream] = useState<any>(null);
  const [micDevices, setMicDevices] = useState<any>([]);

  // Setting window width
  useEffect(() => {
    console.log("Company name before setters:", companyName);
    const nameFromLocalStorage = localStorage.getItem('ShepherdName');
    const companyNameFromLocalStorage = localStorage.getItem('ShepherdCompany');
    const jobPositionFromLocalStorage = localStorage.getItem('ShepherdJobTitle');
    const fileFromLocalStorage = localStorage.getItem('ShepherdUploadedFile');
    const cvFromLocalStorage = localStorage.getItem('ShepherdApplicantCV');

    if (nameFromLocalStorage) {
      setFirstName(nameFromLocalStorage);
    }
    if (companyNameFromLocalStorage) {
      setCompanyName(companyNameFromLocalStorage);
    }

    if (jobPositionFromLocalStorage) {
      setJobPosition(jobPositionFromLocalStorage);
    }

    if (fileFromLocalStorage) {
      setUploadedFile(fileFromLocalStorage);
    }

    if (cvFromLocalStorage) {
      setApplicantCv(cvFromLocalStorage);
    }

  }, []);

  // useEffect(() => {
  //   checkIfAvailableDemoSlots();
  // }, []);


  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    console.log('Selected character:', character.name);
    track('Demo Character', { character: character.name });
    setShowFirstName(true);
  };

  const handleNameChange = (e: any) => {
    const inputName = e.target.value;
    setFirstName(inputName);
  };

  const handleSubmitName = (e: any) => {
    if (firstName === '') {
      setIsNameInvalid(true);
    } else {
      setIsNameInvalid(false);
      askForMicPermission();
      setFirstName(firstName);
      localStorage.setItem('ShepherdName', firstName); // Such that the next time you go through the demo we fetch the name you used the last time
    }
  };

  // Show the call UI if we're either joining, already joined, or are showing an error.
  const showCall = [STATE_JOINING, STATE_JOINED, STATE_ERROR].includes(
    appState
  );

  const handleJunoSwitch = () => {
    if (isJuno) {
      setIsJuno(false);
    } else {
      setIsJuno(true);
    }
  };


  // Starting the call is a two-step process: first, we create the call room, then we join it.
  const startCall = async () => {
    if (showLoader) return;

    setShowLoader(true);

    /* Register Retell call */
    await SARegisterRetellCall(selectedCharacter.agentId, firstName, companyName, jobPosition, applicantCV).then(
      (response) => {
        webClient
          .startConversation({
            callId: response.call_id,
            sampleRate: response.sample_rate,
            enableUpdate: true,
          })
          .catch(console.error);

        GetSimliAPISessionToken();
      }
    );
  };

  const GetSimliAPISessionToken = async () => {
    await SAStartAudioToVideoSession(selectedCharacter.faceId, true, true).then(
      (response) => {
        setSimliSessionToken(response.session_token);
        const message = `🟢 User *${firstName}* started call with ${selectedCharacter.name}`;
        SASlackSendMessageToLogging(message);
        setShowLoader(false);
        setAppState(STATE_JOINING);
      }
    );
  };

  // Initialize Retell SDK
  useEffect(() => {
    // Setup event listeners
    webClient.on('conversationStarted', () => {
      console.log('conversationStarted');
    });

    webClient.on('audio', (audio: Uint8Array) => {
      lastAudioTimeRef.current = Date.now();
      if (simliFaceStreamRef.current) {
        simliFaceStreamRef.current?.sendAudioData(audio);
      }
    });

    webClient.on('conversationEnded', ({ code, reason }) => {
      console.log('Closed with code:', code, ', reason:', reason);
      startLeavingCall();
    });

    webClient.on('error', (error) => {
      console.error('An error occurred:', error);
    });

    webClient.on('update', (update) => {
      // Print live transcript as needed
      updateEvent.current = update // Step 1: Set state
      if (update.turntaking === 'user_turn') {
        setInteractionBubbleState('listening');
        simliFaceStreamRef.current?.interrupt();
      } else if (update.turntaking === 'agent_turn') {
        setInteractionBubbleState('speaking');
      }
    });
  }, []);

  // Starts leaving the current call.
  const startLeavingCall = () => {
    setShowFeedback(true);
    setAppState(STATE_LEAVING);
    webClient.stopConversation();
  };

  // Refresh page
  const restartInteraction = () => {
    // Reset states
    startLeavingCall();
    setShowFeedback(false);
    setShowStuck(false);
    setShowLoader(false);

    startCall();
  };

  const reloadPage = () => {
    window.location.reload();
  };

  // Ask for microphone permission
  const askForMicPermission = async () => {
    try {
      // Close existing stream if any
      if (micStream) {
        micStream.getTracks().forEach((track: any) => track.stop());
      }

      // Create a new stream
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      // Close the new stream immediately
      newStream.getTracks().forEach((track) => track.stop());

      console.log('Microphone permission granted');

      // Do something with the microphone stream if needed
      setMicPermissionGranted(true);
      localStorage.setItem('MicPermissionStatus', 'granted');
      setMicStream(newStream); // Assuming micStream is a state variable to keep track of the stream

      const devices = await navigator.mediaDevices.enumerateDevices();
      const micDevices = devices.filter(
        (device) => device.kind === 'audioinput'
      );
      setMicDevices(micDevices);
      const outputDevices = devices.filter(
        (device) => device.kind === 'audiooutput'
      );

    } catch (error) {
      console.error('Error accessing microphone:', error);
      // Handle the error, e.g., display a message to the user
      setMicPermissionFailure(true);
    }
  };


  return (
    <div className='grid h-svh overflow-hidden bg-black text-white '>
      {apiError ? (
        <APIError />
      ) : showFeedback ? (
        <InteractionFeedback
          onNextStep={() => setShowFeedback(true)}
          firstName={firstName}
          uploadedResume={applicantCV}
          companyName={companyName}
          jobTitle={jobPosition}
          jobDescription=''
          updateEvent={updateEvent}  // Use fallback to an empty string if updateRef.current is null
        //jobDescription={jobDescription}
        />
      ) : showStuck ? (
        <JennaStuck onReload={restartInteraction} />
      ) : showCall ? (
        <div className='flex h-svh flex-col items-center justify-center gap-[40px]'>
          <InteractionBubbles state={interactionBubbleState} />
          <div className='relative h-[400px]'>
            <div className='absolute left-1/2 top-1/2 h-[512px] w-[512px] -translate-x-1/2 -translate-y-1/2 scale-[78%] lg:rounded-3xl md:rounded-3xl transform overflow-hidden'>
              <SimliFaceStream
                ref={simliFaceStreamRef}
                start={true}
                minimumChunkSize={minimumChunkSize}
                sessionToken={sessionToken}
              />
            </div>
          </div>
          <VideoControls leaveCall={startLeavingCall} pauseCall={undefined} />
        </div>
      ) : showLoader ? (
        <InteractionLoadingBar
          maxLoadingPercentage={100}
          loadingTime={3}
          onCancel={() => setShowLoader(false)}
        >
          Interaction loading... Usually, it takes some seconds.{' '}
        </InteractionLoadingBar>
      ) : (
        <div className='initial-container'>
          <div className='flex w-full items-center justify-between'>
            <input
              type='checkbox'
              className='peer sr-only'
              onChange={handleJunoSwitch}
            />
            {!isJuno && (
              <div className='flex w-[104px] items-center justify-center rounded-xl bg-[#FF0] p-[7px]'>
                <b className='font-ABCRepro text-[12px] text-black'>
                  Coming soon
                </b>
              </div>
            )}
            <FontABCReproRegular className='flex gap-1.5 text-[16px] text-shadesOfGrayMedium md:hidden'>
              Powered by
              <Image src={simliGray} alt='' />
            </FontABCReproRegular>
            <Link href='/' className='Link'>
              <div className='white_link'>Exit demo</div>
            </Link>
          </div>
          {micPermissionGranted ? (
            <div className='flex w-full max-w-[361px] flex-col items-center justify-center gap-[24px]'>
              <div className='micPermissionGranted'>
                <Image
                  src={microphone_img}
                  alt=''
                  className='CustomImageSizes'
                />
                <Image
                  src={greenCheck_img}
                  alt=''
                  className='CustomImageSizes'
                />
              </div>
              <p className='text-center font-ABCRepro text-[16px] leading-[26px]'>
                We need to be able to hear you. This
                requires the use of your microphone. 👇
              </p>

              {/* Mic input */}
              <div className='group flex w-full'>
                <select
                  className='mt-2 w-[95%] rounded-xl rounded-r-none bg-[#1B1B1B] px-[16px] py-[14px] font-ABCRepro outline-none group-hover:bg-[#111]'
                  onChange={(e) => setSelectedMicDevice(e.target.value)}
                >
                  {micDevices.map((device: any) => (
                    <option
                      key={device.deviceId}
                      value={device.deviceId}
                      className='text-white'
                    >
                      {device.label}
                    </option>
                  ))}
                </select>
                <div className='mt-2 w-[5%] rounded-xl rounded-l-none bg-[#1B1B1B] px-[16px] py-[14px] font-ABCRepro outline-none group-hover:bg-[#111]'></div>
              </div>

              {/* Sound output */}
              {/* <select className='inputDropdown' onChange={(e) => setSelectedOutputDevice(e.target.value)}>
                {outputDevices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `Output ${outputDevices.indexOf(device) + 1}`}
                  </option>
                ))}
              </select> */}

              <button
                className='Button _Fill _ButtonSize1 micPermissionGrantedButton w-full'
                onClick={startCall}
              >
                Start
                <Image src={play_caret} alt=''></Image>
              </button>
            </div>
          ) : showFirstName ? (
            <div className='flex flex-col items-center justify-between gap-[24px] sm:w-[327px]'>
              Make sure you are in a quiet environment and have a working microphone.
              <button
                className='Button _Fill _ButtonSize1 group w-full'
                onClick={handleSubmitName}
              >
                I'm Ready
                <IconArrowRight className2='group-hover:stroke-black' />
              </button>
            </div>
          ) : (
            <div className='flex w-full max-w-[936px] flex-col gap-[8px]'>
              <div className='z-10 flex items-center md:hidden'>
                <label className='relative w-full cursor-pointer'>
                  <input
                    type='checkbox'
                    className='peer sr-only'
                    onChange={handleJunoSwitch}
                  />
                  <div className='peer relative flex h-[32px] w-full overflow-hidden rounded-full bg-[#343434]'>
                    <div className='flex w-full items-center justify-around text-[14px] font-bold'>
                      <div
                        className={cn(
                          'absolute h-full w-[50%] rounded-full bg-white transition-transform duration-300',
                          isJuno ? 'left-0' : 'left-[50%]'
                        )}
                      ></div>
                      <p
                        className={cn(
                          'z-10 select-none',
                          isJuno ? 'text-black' : 'text-white'
                        )}
                      >
                        Juno 1.5
                      </p>
                      <p
                        className={cn(
                          'z-10 select-none',
                          isJuno ? 'text-white' : 'text-black'
                        )}
                      >
                        Trinity 1.0
                      </p>
                    </div>
                  </div>
                </label>
              </div>
              {/* By removing most of this, the entire Retell flow gets removed */}
              {isJuno ? (
                <>

                  {/* Character Selection */}
                  {handleCharacterSelect(characterJenna)}
                </>
              ) : (
                <>                </>
              )}
            </div>
          )}

          {/* Fine */}
          <div className='bottom z-10'>
            <FontABCReproRegular className='hidden gap-1.5 text-[16px] text-shadesOfGrayMedium md:flex'>
              Powered by
              <Image src={simliGray} alt='' />
            </FontABCReproRegular>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default Interaction;

