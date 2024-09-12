import cn from '@/utils/CSS/TailwindMergeAndClsx';
import ToastAPI from '@/utils/Toast/ToastAPI';
import { useEffect, useState } from 'react';
import InputAtomV2 from '../InputAtomV2';
import { TextData, initialTextData } from '../JobInterviewTypes';

interface Props {
  className?: string;
  onGoToNextStep: (companyName: string, jobTitleName: string) => void;
}

const StepThree = ({ className, onGoToNextStep }: Props) => {
  const [companyData, setCompanyData] = useState<TextData>(initialTextData);
  const [jobTitleData, setJobTitleData] = useState<TextData>(initialTextData);

  const handleGoToNextStep = () => {
    if (!companyData.isValid) {
      ToastAPI.showSimple('Please enter a company name');
      return;
    }
    if (!jobTitleData.isValid) {
      ToastAPI.showSimple('Please enter a job title name');
      return;
    }
    localStorage.setItem('ShepherdCompany', companyData.text);
    localStorage.setItem('ShepherdJobTitle', jobTitleData.text);
    onGoToNextStep(companyData.text, jobTitleData.text);
  };

  useEffect(() => {
    const localStorageCompany = localStorage.getItem('ShepherdCompany');
    if (localStorageCompany?.length) {
      setCompanyData({ text: localStorageCompany, isValid: true });
    }

    const localStorageJobTitle = localStorage.getItem('ShepherdJobTitle');
    if (localStorageJobTitle?.length) {
      setJobTitleData({ text: localStorageJobTitle, isValid: true });
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
            <b className='font-ABCRepro'>Company name</b>
            <span className='ml-[4px] font-ABCRepro text-[#A9A9A9]'>
              Required
            </span>
          </span>
          <InputAtomV2
            placeholder='Write company name'
            validateFunction='name'
            value={companyData}
            className='mt-[4px]'
            onChange={setCompanyData}
            onEnter={handleGoToNextStep}
          ></InputAtomV2>
        </div>

        <div>
          <span>
            <b className='font-ABCRepro'>Job Title</b>
            <span className='ml-[4px] font-ABCRepro text-[#A9A9A9]'>
              Required
            </span>
          </span>
          <InputAtomV2
            placeholder='Write job title'
            validateFunction='name'
            value={jobTitleData}
            className='mt-[4px]'
            onChange={setJobTitleData}
            onEnter={handleGoToNextStep}
          ></InputAtomV2>
        </div>

        <p className='text-[12px] text-[#A9A9A9]'>
          Enter the company name and the job title you&apos;re practicing for
          (e.g., CEO, Designer, Software Developer, Marketing Specialist)
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

export default StepThree;
