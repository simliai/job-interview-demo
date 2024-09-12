interface Props {
  className?: string;
  className2?: string;
  isBlack?: boolean;
  color?: string;
  onClick?: () => void;
}
const IconArrowLeft = ({
  className,
  className2,
  color = 'white',
  isBlack = false,
  onClick = () => {},
}: Props) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
    >
      <path
        className={className2}
        d='M6.66666 16H25.3333M6.66666 16L13.3333 9.33334M6.66666 16L13.3333 22.6667'
        stroke={isBlack ? 'black' : color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default IconArrowLeft;
