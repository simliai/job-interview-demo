import React, { useState, useEffect } from 'react';
import './SoundWave.css'; // Import your CSS file for styling

const SoundWave: React.FC = () => {
  const [barHeights, setBarHeights] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBarHeights((prevHeights) => [
        getRandomHeight(),
        getRandomHeight(),
        getRandomHeight(),
        getRandomHeight(),
      ]);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const getRandomHeight = (): number => Math.floor(Math.random() * 100);

  return (
    <div className='flex h-[48px] items-center gap-[4.5px]'>
      {barHeights.map((height, index) => (
        <div
          key={index}
          className='min-h-[12px] w-[12px] rounded-full bg-white transition-all duration-1000 ease-ease'
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
};

export default SoundWave;
