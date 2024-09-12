import IconArrowRight from '@/media/IconArrowRight';
import Image from 'next/image';
import Link from 'next/link';
import simliGray from '../../../assets/simli-gray.svg';

function StepHome({ onDiveInClick }: any) {
  return (
    <div className='flex h-svh w-full flex-col justify-between p-[24px] md:p-[60px]'>
      {/* Jenna BG video */}
      <div className='fixed left-0 top-0 -z-10 flex h-full w-full items-center justify-center'>
        <video
          autoPlay
          loop
          muted
          playsInline
          className='absolute inset-0 h-full w-full object-cover'
        >
          <source src='/jenna.mp4' type='video/mp4' />
        </video>
        <div className='absolute inset-0 bg-black bg-opacity-80'></div>
      </div>

      {/* Header */}
      <div className='flex flex-col gap-[24px]'>
        <div className='flex items-start justify-between'>
          {/* Title on mobile */}
          <p className='text hidden font-ABCRepro text-[40px] leading-[48px] md:block md:text-[64px] md:leading-[74px]'>
            Simli Mock
            <br />
            Interview
          </p>
          {/* Powered by simli on mobile */}
          <div className='md:hidden'>
            <div className='PoweredBySimli'>
              Powered by
              <Image src={simliGray} alt='' />
            </div>
          </div>
          {/* Exit demo */}
          <Link href='/' className='Link'>
            <div className='font-ABCRepro hover:underline'>Exit demo</div>
          </Link>
        </div>
        {/* Title on desktop */}
        <p className='text font-ABCRepro text-[40px] leading-[48px] md:hidden md:text-[64px] md:leading-[74px]'>
          Mock Job
          <br />
          Interview
        </p>
      </div>

      {/* Footer */}
      <div className='flex flex-col justify-between gap-y-[24px] md:flex-row md:items-end'>
        {/* Description */}
        <p className=' max-w-[530px] font-ABCRepro'>
          <b>Here&apos;s the rundown:</b> Share some info about yourself and the
          job you&apos;re practicing for, then dive into a mock interview with
          one of our AI avatars. Afterwards, receive feedback to boost your
          performance.
        </p>
        {/* Powered by simli on desktop */}
        <div className='hidden lg:block'>
          <div className='PoweredBySimli'>
            Powered by
            <Image src={simliGray} alt='' />
          </div>
        </div>
        {/* Dive in button */}
        <button
          className='Button _Fill _ButtonSize1 group'
          onClick={onDiveInClick}
        >
          Dive in
          <IconArrowRight className2='group-hover:stroke-black' />
        </button>
      </div>
    </div>
  );
}

export default StepHome;
