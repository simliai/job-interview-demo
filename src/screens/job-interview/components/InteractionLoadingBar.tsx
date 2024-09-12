import sparkle from '@/assets/sparkle.svg';
import Image from 'next/image';
import LoadingBar from './LoadingBar/LoadingBar';

function InteractionLoadingBar({
  onCancel = () => {},
  maxLoadingPercentage = 100,
  loadingTime = 5,
}) {
  return (
    <div className='absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-[24px] text-center'>
      <Image
        src={sparkle}
        alt='loader'
        className='loader animate-spin [animation-duration:3s]'
      />
      {
        <LoadingBar
          maxLoadingPercentage={maxLoadingPercentage}
          loadingTime={loadingTime}
        />
      }
      <p className='w-[300px] font-ABCRepro text-[16px] font-black leading-8'>
      </p>
      <div className='gray_link' onClick={onCancel}>
        Cancel
      </div>
    </div>
  );
}


export default InteractionLoadingBar;
