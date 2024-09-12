import React from 'react';

interface Props {
  className?: string;
  className2?: string;
}

const IconArrowRight = ({ className, className2 }: Props) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='21'
      viewBox='0 0 20 21'
      fill='none'
    >
      <path
        className={className2}
        d='M4.16663 10.5H15.8333M15.8333 10.5L11.6666 6.33337M15.8333 10.5L11.6666 14.6667'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default IconArrowRight;
