import { useEffect, useState } from 'react';

function LoadingBar({ maxLoadingPercentage = 100, loadingTime = 5 }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervals = maxLoadingPercentage / loadingTime;

    const interval = setInterval(() => {
      if (progress >= maxLoadingPercentage) {
        clearInterval(interval);
        return;
      }
      setProgress((prevProgress) => prevProgress + intervals);
    }, loadingTime * 1000); // Loading time in seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='h-[9px] w-[205px] overflow-hidden rounded bg-[#6E6E6E]'>
      <div
        className='h-full bg-white transition-all duration-500 ease-out'
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
  );
}

export default LoadingBar;
