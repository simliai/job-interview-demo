'use client';
import IconArrowLeft from '@/media/IconArrowLeft';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import simliGray from '../../assets/simli-gray.svg';
import Interaction from './components/Interaction';
import StepFour from './components/StepFour';
import StepHome from './components/StepHome';
import StepOne from './components/StepOne';
import StepThree from './components/StepThree';
import StepTwo from './components/StepTwo';

const ScreenJobInterview = () => {
  // TODO: Make a string enum for the steps
  const [step, setStep] = useState<number>(0);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const [firstName, setFirstName] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [applicantCV, setApplicantCV] = useState<any>(null);
  const [companyName, setCompanyName] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');

  const handleClickDiveIn = () => {
    nextStep();
  };

  const handleClickNextInStepOne = (firstName: string) => {
    setFirstName(firstName);
    nextStep();
  };

  const handleClickNextInStepTwo = (uploadedFile: any) => {
    setUploadedFile(uploadedFile);
    console.log("uploadedFile", uploadedFile);
    const formData = new FormData();
    formData.append('file', uploadedFile);

    // Send the form data to your API
    const pdf = fetch('api/pdf', {
      method: 'POST',
      body: formData,
    }).then(response => response.json()) // Parse the JSON from the response
      .then(pdf => {
        // Store the parsed response in localStorage and update state
        localStorage.setItem('ShepherdApplicantCV', JSON.stringify(pdf));
        console.log("pdf returned from function!", pdf);
        setApplicantCV(pdf);
      })
      .catch(error => {
        console.error("Error fetching PDF:", error);
      });;

    nextStep();
  };

  const handleClickNextInStepThree = (companyName: string, jobName: string) => {
    setCompanyName(companyName);
    setJobTitle(jobName);
    nextStep();
  };

  const handleClickNextInStepFour = (jobDescription: string) => {
    setJobDescription(jobDescription);
    nextStep();
  };

  return (
    <>
      <Toaster></Toaster>
      {step === 0 ? ( // Home
        <StepHome onDiveInClick={handleClickDiveIn} />
      ) : step < 6 ? (
        <div className='flex h-svh flex-col items-center justify-between bg-black p-[24px] md:p-[60px]'>
          {/* Header */}
          <div className='flex w-full justify-between'>
            {/* Previous step */}
            <p
              className='cursor-pointer font-ABCRepro text-[#A9A9A9] hover:underline'
              onClick={prevStep}
            >
              <IconArrowLeft
                className='mb-[2px] mr-[2px] inline h-[20px] w-[21px]'
                className2='stroke-[#A9A9A9]'
              />
              Previous step
            </p>

            {/* Step counter */}
            <p>{step}/5</p>

            {/* Exit demo */}
            <Link href='/' className='Link'>
              <div className='font-ABCRepro hover:underline'>Exit demo</div>
            </Link>
          </div>

          {step === 1 ? ( // First Name
            <StepOne
              onGoToNextStep={handleClickNextInStepOne}
              className=' animate-fadeIn'
            />
          ) : step === 2 ? ( // CV Upload
            <StepTwo
              onGoToNextStep={handleClickNextInStepTwo}
              onSkip={nextStep}
              className=' animate-fadeIn'
            />
          ) : step === 3 ? ( // Company name + Job title
            <StepThree
              onGoToNextStep={handleClickNextInStepThree}
              className=' animate-fadeIn'
            />
          ) : step === 4 ? ( // Job description
            <StepFour
              onGoToNextStep={handleClickNextInStepFour}
              className=' animate-fadeIn'
            />
          ) : (
            <>
              {nextStep()}
            </>
          )}

          {/* PoweredBySimli */}
          <div className='hidden w-full sm:block'>
            <div className='PoweredBySimli'>
              Powered by
              <Image src={simliGray} alt='' />
            </div>
          </div>
        </div>
      ) : (
        <Interaction
          firstName={firstName}
          uploadedResume={applicantCV}
          companyName={companyName}
          jobTitle={jobTitle}
          jobDescription={jobDescription}
        />
      )}
    </>
  );
};

export default ScreenJobInterview;
