import Link from 'next/link';

function APIError() {
  return (
    <div className='flex h-dvh flex-col items-center justify-between bg-[#FF5F00] p-[24px] sm:justify-center sm:gap-[32px]'>
      <div className='text-center text-black'>
        <p className='mb-[8px] font-ABCRepro font-bold'>Demo overload</p>
        <p className='font-ABCRepro'>
          There are a lot of people talking to <br />
          Jenna right now, try again a bit later...
        </p>
      </div>
      <Link href='/'>
        <button className='Button _Black _ButtonSize1'>Exit demo</button>
      </Link>
    </div>
  );
}

export default APIError;
