import cn from '@/utils/CSS/TailwindMergeAndClsx';
import ToastAPI from '@/utils/Toast/ToastAPI';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import docsvg from '../../../assets/Document.svg';

interface Props {
  className?: string;
  onGoToNextStep: (uploadedFile: any) => void;
  onSkip: () => void;
}

const StepTwo = ({ className, onGoToNextStep, onSkip }: Props) => {
  const [uploadedFile, setUploadedFile] = useState<any>(null); // Store the file object

  const handleGoToNextStep = () => {
    if (!uploadedFile) {
      ToastAPI.showSimple('Please upload a file');
      return;
    }

    localStorage.setItem('ShepherdUploadedFile', JSON.stringify(uploadedFile));
    onGoToNextStep(uploadedFile);
  };

  useEffect(() => {
    const localStorageUploadedFile = localStorage.getItem(
      'ShepherdUploadedFile'
    );
    if (localStorageUploadedFile) {
      // Parse the stored file content
      const parsedFile = JSON.parse(localStorageUploadedFile);
      // Verify if the parsed content is valid
      if (
        parsedFile &&
        typeof parsedFile === 'object' &&
        parsedFile instanceof File
      ) {
        setUploadedFile(parsedFile);
      } else {
        console.error(
          'Invalid file content retrieved from localStorage:',
          parsedFile
        );
      }
    } else {
      console.log('No file content found in localStorage');
    }
  }, []);

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      console.log('File uploaded:', file);

      // Parse the pdf into text using react-pdf
      var text


    }
  };

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-between gap-[24px] sm:w-[361px]',
        className
      )}
    >
      <div className='flex w-full flex-col gap-[8px]'>
        <div>
          <p>
            <b className='font-ABCRepro'>Upload your CV</b>
          </p>
          <div className='flex h-[280px] w-full mt-[15px] bg-[#1B1B1B] flex-col items-center justify-center gap-[16px] rounded-xl p-[40px]'>
            <Image src={docsvg} alt='Document' className='h-[24px] w-[24px]' />
            <p className=' text-center font-ABCRepro text-[16px] text-[#A9A9A9]'>
              CV needs to be of type PDF (.pdf)
            </p>
            <label className=' cursor-pointer font-ABCRepro underline hover:no-underline'>
              <input
                className='hidden'
                type='file'
                onChange={handleFileChange} // Handle file change event
              />
              Click here to upload CV
            </label>
            {uploadedFile && <div>{uploadedFile.name}</div>}
          </div>
        </div>
      </div>

      <button
        className='Button _Fill _ButtonSize1 w-full'
        onClick={handleGoToNextStep}
      >
        Next Step
      </button>

      <div
        className='cursor-pointer font-ABCRepro text-[#A9A9A9] underline hover:text-white hover:no-underline'
        onClick={onSkip}
      >
        Skip this step
      </div>
    </div>
  );
};

export default StepTwo;
