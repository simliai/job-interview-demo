import './VideoControls.css';

import Image from 'next/image';

import close from '@/assets/Close-Icon.svg';

export default function VideoControls({ leaveCall }: { leaveCall: () => void }) {
  return (
    <div className='w-[120px]'>
      <button className='Button _ButtonSize1 leave_button' onClick={leaveCall}>
        Exit
        <Image src={close} alt='' />
      </button>
    </div>
  );
}
