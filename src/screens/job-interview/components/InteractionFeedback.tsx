import { SAgetInteractionFeedback } from '@/app/actions';
import { useEffect, useState } from 'react';
import { UpdateEvent } from './Interaction';
import InteractionLoadingBar from './InteractionLoadingBar';


interface Props {
  className?: string;
  firstName: string;
  uploadedResume?: any;
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  updateEvent: UpdateEvent | null;
}


const InteractionFeedback = ({
  className,
  firstName,
  uploadedResume,
  companyName,
  jobTitle,
  jobDescription,
  updateEvent
}: Props) => {
  console.log('Transcript:', updateEvent);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const [feedbackData, setFeedbackData] = useState<any>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleTryAgain = () => {
    window.location.href = '/'; /* TODO: Is it bad practice to do this? Just sending user back to '/' */
  };

  const getFeedback = async () => {
    if (updateEvent === null) {
      return;
    }

    setIsFeedbackLoading(true);
    // Fetch feedback
    console.log("Company name in InteractionFeedback.tsx before calling SAgetInteractionfedback:", companyName);
    console.log("uploadedResume in InteractionFeedback.tsx before calling SAgetInteractionfedback:", uploadedResume);

    await SAgetInteractionFeedback(updateEvent.current, uploadedResume).then((response) => {
      if (response !== undefined) {
        setFeedbackData(response);
      } else {
      }
      console.log('Feedback data:', response);
    }).catch((error) => { console.log('Error:', error); })
      .finally(() => {
        setIsFeedbackLoading(false);
      });
  };

  useEffect(() => {
    getFeedback();
  }, [updateEvent]);

  return (
    <>
      {isFeedbackLoading ? (
        <div className='flex h-full w-full items-center justify-center '>
          <InteractionLoadingBar
            maxLoadingPercentage={100}
            loadingTime={1}
            onCancel={() => setIsFeedbackLoading(false)}
          >
            Feedback loading... Usually, it takes some seconds.{' '}
          </InteractionLoadingBar>
        </div>
      ) : (
        <div className='h-vh flex min-h-full w-full flex-col justify-between gap-[32px] bg-[#E5E5E5] p-[24px] md:p-[60px]'>
          {/* Header */}
          <div className='flex w-full flex-col items-center justify-between gap-y-[8px]  text-center sm:flex-row sm:items-start sm:text-left '>
            <b className='max-w-[270px] font-ABCRepro text-[#111]'>
              Voila! Your mock job interview feedback is primed for perusal!
            </b>
            <p className='max-w-[345px] font-ABCRepro text-[#111]'>
              After your mock interview for the {jobTitle} position at{' '}
              {companyName},  heres your feedback:
            </p>
          </div>

          {/* Interaction Feedback */}


          {/* Feedback 1 */}
          <div className='flex flex-col items-center justify-center gap-[16px] sm:flex-row sm:items-start'>
            <div className='flex max-w-[418px] flex-col gap-[16px] rounded-2xl bg-white p-[24px] drop-shadow-md'>
              <div className='flex flex-col items-center justify-center gap-[8px]'>
                <p className='text-[#111] !text-[12px]'>General Feedback</p>
                <b className='text-center font-ABCRepro text-[#111]'>
                  Here's your summary:
                </b>
              </div>
              <p className='font-ABCRepro text-[#111]'>
                {feedbackData?.general}
              </p>
            </div>

            {/* Feedback 2 */}
            <div className='flex max-w-[418px] flex-col gap-[16px] rounded-2xl bg-white p-[24px] drop-shadow-md'>
              <div className='flex flex-col items-center justify-center gap-[8px]'>
                <p className='text-[#111] !text-[12px]'>Specific Feedback</p>
                <b className='text-center font-ABCRepro text-[#111]'>
                  {feedbackData?.title1}
                </b>
              </div>
              <p className='font-ABCRepro text-[#111]'>
                {feedbackData?.question1}
              </p>
            </div>

            {/* Feedback 2 */}
            <div className='flex max-w-[418px] flex-col gap-[16px] rounded-2xl bg-white p-[24px] drop-shadow-md'>
              <div className='flex flex-col items-center justify-center gap-[8px]'>
                <p className='text-[#111] !text-[12px]'>Specific Feedback</p>
                <b className='text-center font-ABCRepro text-[#111]'>
                  {feedbackData?.title2}
                </b>
              </div>
              <p className='font-ABCRepro text-[#111]'>
                {feedbackData?.question2}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className='flex flex-col justify-between gap-[38px] sm:flex-row sm:items-end'>
            <p className='w-[345px] text-[12px] text-[#6E6E6E]'>
              Whoops! Feedback cant be saved or sent just yet. A nifty tip: Snap
              a quick screenshot for now – its our virtual version of a save
              button! 😊
            </p>
            <button className='Button _Fill _ButtonSize1' onClick={handleTryAgain}>
              Try Again
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InteractionFeedback;
