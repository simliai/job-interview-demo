import cn from '@/utils/CSS/TailwindMergeAndClsx';
import ToastAPI from '@/utils/Toast/ToastAPI';
import { useEffect, useState } from 'react';
import { TextData, initialTextData } from '../JobInterviewTypes';

interface Props {
  className?: string;
  onGoToNextStep: (jobDescription: string) => void;
}

const StepFour = ({ className, onGoToNextStep }: Props) => {
  const [jobDescriptionData, setJobDescriptionData] =
    useState<TextData>(initialTextData);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [hasInteractedWithComponent, setHasInteractedWithComponent] =
    useState<boolean>(false);

  const handleGoToNextStep = () => {
    if (!jobDescriptionData.isValid) {
      ToastAPI.showSimple('Please enter a jobDescription name');
      return;
    }

    localStorage.setItem('ShepherdJobDescription', jobDescriptionData.text);
    onGoToNextStep(jobDescriptionData.text);
  };

  const handleSetIsActive = (newIsActive: boolean) => {
    setIsActive(newIsActive);
    setHasInteractedWithComponent(true);
  };

  useEffect(() => {
    const localStorageJobDescription = localStorage.getItem(
      'ShepherdJobDescription'
    );
    if (localStorageJobDescription?.length) {
      setJobDescriptionData({
        text: localStorageJobDescription,
        isValid: true,
      });
    }

    const localStorageJobTitle = localStorage.getItem('ShepherdJobDescription');
    if (localStorageJobTitle?.length) {
      setJobDescriptionData({ text: localStorageJobTitle, isValid: true });
    }
  }, []);

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-between gap-[24px] sm:w-[361px]',
        className
      )}
    >
      <div className='flex flex-col gap-[8px]'>
        <div>
          <span>
            <b className='font-ABCRepro'>Job ad description</b>
            <span className='ml-[4px] font-ABCRepro text-[#A9A9A9]'>
              Required
            </span>
          </span>

          <textarea
            className={cn(
              'h-[431px] w-full rounded-xl border-[1.5px] border-solid border-[#6E6E6E] bg-transparent p-[16px]',
              isActive && 'border-white',
              !isActive &&
                !jobDescriptionData.isValid &&
                hasInteractedWithComponent &&
                'border-invalidRed'
            )}
            placeholder='Paste the job ad description here'
            value={jobDescriptionData.text}
            onFocus={() => handleSetIsActive(true)}
            onBlur={() => handleSetIsActive(false)}
            onChange={(e) =>
              setJobDescriptionData({
                text: e.target.value,
                isValid: e.target.value.length > 0,
              })
            }
          ></textarea>
        </div>

        <p className='text-[12px] text-[#A9A9A9]'>
          Copy and paste the job ad description you&apos;d like to rehearse for.
        </p>
      </div>

      <button
        className='Button _Fill _ButtonSize1 w-full'
        onClick={handleGoToNextStep}
      >
        Next Step
      </button>
    </div>
  );
};

export default StepFour;
