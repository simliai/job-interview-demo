import cn from '@/utils/CSS/TailwindMergeAndClsx';
import ToastAPI from '@/utils/Toast/ToastAPI';
import { useEffect, useState } from 'react';
import InputAtomV2 from '../InputAtomV2';
import { TextData, initialTextData } from '../JobInterviewTypes';

interface Props {
  className?: string;
  onGoToNextStep: (firstName: string) => void;
}

const StepOne = ({ className, onGoToNextStep }: Props) => {
  const [firstNameData, setFirstNameData] = useState<TextData>(initialTextData);

  const handleGoToNextStep = () => {
    if (!firstNameData.isValid) {
      ToastAPI.showSimple('Please enter a valid name');
      return;
    }
    localStorage.setItem('ShepherdName', firstNameData.text);
    onGoToNextStep(firstNameData.text);
  };

  useEffect(() => {
    const localStorageFirstName = localStorage.getItem('ShepherdName');
    if (localStorageFirstName?.length) {
      setFirstNameData({ text: localStorageFirstName, isValid: true });
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
            <b className='font-ABCRepro'>What’s your first name?</b>
            <span
              className={cn(
                'ml-[4px] font-ABCRepro outline-none'
                // !firstNameData.isValid ? 'text-invalidRed' : 'text-[#A9A9A9]'
              )}
            >
              Required
            </span>
          </span>
          <InputAtomV2
            placeholder='Your first name'
            validateFunction='name'
            value={firstNameData}
            className='mt-[4px] outline-none'
            onChange={setFirstNameData}
            onEnter={handleGoToNextStep}
          ></InputAtomV2>
        </div>
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

export default StepOne;
