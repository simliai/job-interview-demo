import Image from 'next/image';
import Link from 'next/link';
import notSmiley from '../../../../assets/NotSmiley.svg';
import refresh from '../../../../assets/refresh.svg';
import jenna_16_9 from '../../../../media/Jenna_16_9.jpg';
import './JennaStuck.css';

function JennaStuck({ onReload }: any) {
  return (
    <div>
      <Image
        src={jenna_16_9}
        alt='Jenna'
        className='pointer-events-none absolute h-full w-full object-cover blur-lg'
      />
      <div className='absolute h-full w-full bg-black opacity-70'></div>
      <div className='absolute flex h-svh w-full flex-col items-center justify-between gap-[24px] p-[24px] sm:justify-center'>
        <Image src={notSmiley} alt='not smiley' />
        <div className='text-center'>
          <p className='mb-[8px] font-ABCRepro font-bold'>Oopsie, our bad!</p>
          <p className='font-ABCRepro'>
            That wasn’t supposed to happen.
            <br />
            Reload the interaction and try again.
          </p>
        </div>
        <div className='flex flex-col gap-[24px]'>
          <button
            className='Button _Fill _ButtonSize1 _RetryButton'
            onClick={onReload}
          >
            Reload
            <Image src={refresh} alt='refresh' />
          </button>
          <Link href='/' className='Link'>
            <div className='gray_link'>Exit demo</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JennaStuck;
