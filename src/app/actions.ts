'use server';
import { UpdateEvent } from '@/screens/job-interview/components/Interaction';
import SlackBoltAPI from '@/utils/SlackBolt/SlackBoltAPI';
import Retell from 'retell-sdk';

type Feedback = {
  title0?: string,
  general?: string,
  title1?: string,
  question1?: string,
  title2?: string,
  question2?: string,
  title3?: string,
  question3?: string,
};

function parseFeedback(str: string): Feedback {
  console.log('parseFeedback.str:', str);
  const numSections = (str.split('[').length);

  const sections = str.split('[', numSections)

  const feedback: Feedback = {
    title0: sections[1]?.split(']')[0],
    general: sections[1]?.split(']')[1],
    title1: sections[2]?.split(']')[0],
    question1: sections[2]?.split(']')[1],
    title2: sections[3]?.split(']')[0],
    question2: sections[3]?.split(']')[1],
    title3: sections[4]?.split(']')[0],
    question3: sections[4]?.split(']')[1],
  }

  return feedback;
}

function parseTranscript(update: any) {
  let parsedTranscript;

  try {
    // Check if the update contains a transcript
    if (update && update.transcript && Array.isArray(update.transcript)) {
      // Map through the transcript array and create a readable string
      parsedTranscript = update.transcript.map((entry: any) => {
        return `${entry.role}: ${entry.content}`;
      }).join('\n');
    } else {
      throw new Error('No valid transcript found');
    }
  } catch (error) {
    console.error('Error parsing transcript:', error.message);
    parsedTranscript = "Error: error parsing transcript";
  }
  return parsedTranscript;
}

export const SAgetInteractionFeedback = async (update: UpdateEvent) => {
  let feedbackData;
  let transcript = parseTranscript(update);

  // Fetch the feedback data through OpenAI API url 
  const prompt = `You are an AI ('agent') that is to give feedback to a human ('user') that is interviewing for a position. The feedback text is to be displayed on a website. Based only on this transcript: [${transcript}] , give a concise but constructive feedback based ONLY on the responses marked with 'user' without special characters and numbers. If there is no user prompt (only agent data), surface that to the user under [General Feedback]. Start with a a general feedback formatted as [General feedback: <very short title of feedback>] <actual general feedback>. At the end of your answer, provide question-specific marked by [Question 1: <short title/summary of question>], [Question 2: <short title/summary of question>]... etc. depending on how many questions were asked. Do not hallucinate questions if there were none. }\n}`;
  var parsedFeedback
  const openai_url = 'https://api.openai.com/v1/chat/completions'

  const body = {
    "model": "gpt-4o-mini",
    "messages": [{ "role": "user", "content": prompt }],
    "temperature": 0.7
  }

  const response = await fetch(openai_url, {
    method: 'POST',          // Set the HTTP method to POST
    headers: {
      'Content-Type': 'application/json',  // Specify the content type if the body is JSON
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'OpenAI-Organization': `${process.env.OPENAI_ORGANIZATION_ID}`
    },
    body: JSON.stringify(body)  // Convert the body object to JSON string
  });

  const data = await response.json();  // Assuming the response is in JSON format

  if (!data.choices) {
    return "No feedback data found";
  }
  
  console.log(data.choices[0].message);

  const gptResponse = data.choices[0].message;
  console.log('GPT data:', data);
  feedbackData = gptResponse;
  parsedFeedback = parseFeedback(gptResponse.content);
  // If the response is not OK, throw an error
  if (!response.ok) {
    throw new Error('Failed to fetch feedback');
  }
  return parsedFeedback;
};

export const SASlackGetAllChannels = async () => {
  return await SlackBoltAPI.listPublicConversations();
};

// export const SASlackSendMessage = async (channelId: string, text: string) => {
//   return await SlackBoltAPI.sendMessage(channelId, text);
// };

export const SASlackSendMessageToLogging = async (text: string) => {
  if (process.env.NODE_ENV === 'development') {

    return;
  }

  const channelId = 'C06L48TSEH0';
  return await SlackBoltAPI.sendMessage(channelId, text);
};


export const SARegisterRetellCall = async (agentId: string, userName: string, companyName: string, jobPosition: string, cv: string) => {

  // Get the Retell API key from the environment variables if it exists
  const retellKey = process.env.NEXT_PUBLIC_RETELL_API_KEY !== undefined ? process.env.NEXT_PUBLIC_RETELL_API_KEY : '';

  const retell = new Retell({
    apiKey: retellKey,
  });

  const registerCallResponse = await retell.call.register({
    agent_id: agentId,
    audio_encoding: 's16le',
    audio_websocket_protocol: 'web',
    sample_rate: 16000,
    end_call_after_silence_ms: 20000,
    retell_llm_dynamic_variables: {
      "user_name": userName,
      "job_position": jobPosition,
      "company_name": companyName,  
      "cv": cv
    },
  });


  return registerCallResponse;
}

export const SAStartAudioToVideoSession = async (faceId: string, isJPG: Boolean, syncAudio: Boolean) => {
  const metadata = {
    faceId: faceId,
    isJPG: isJPG,
    handleSilence: false,
    apiKey: process.env.NEXT_PUBLIC_SIMLI_API_KEY,
    syncAudio: syncAudio,
  };

  const response = await fetch(
    'https://api.simli.ai/startAudioToVideoSession',
    {
      method: 'POST',
      body: JSON.stringify(metadata),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.json();
};
