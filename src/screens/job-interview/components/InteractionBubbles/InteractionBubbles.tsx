'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import './InteractionBubbles.css';

import listening0 from './listening 0.svg';
import listening1 from './listening 1.svg';
import listening2 from './listening 2.svg';
import listening3 from './listening 3.svg';
const listeningImages = [
  listening0,
  listening1,
  listening2,
  listening3,
  listening2,
  listening1,
];

import thinking from './thinking.svg';

import SoundWave from './SoundWave/SoundWave';

const StateMapping = {
  'ApplicationState: 0': 'listening',
  'ApplicationState: 1': 'thinking',
  'ApplicationState: 2': 'speaking',
} as const;


export default function InteractionBubbles({ state }: any) {

  useEffect(() => {
    if (state === 'listening') {
      const intervalId = setInterval(() => {
      }, 300);

      return () => clearInterval(intervalId);
    }
  }, [state]);

  return (
    <div>
      {state !== 'idle' && (
        <div>
          {state === 'listening' && (
            <div className='flex h-[90px] flex-col items-center justify-end gap-[24px] text-[14px]'>
              <div className='h-[40px] w-[40px] animate-pulse rounded-full bg-white' />
              <p>Listening</p>
            </div>
          )}
          {state === 'thinking' && (
            <div className='BubbleContainer'>
              <Image src={thinking} alt='thinking' className='animate-rotate' />
              <p>Thinking</p>
            </div>
          )}
          {state === 'speaking' && (
            <div className='flex h-[90px] flex-col items-center justify-end gap-[24px] text-[14px]'>
              <SoundWave />
              <p>speaking</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
