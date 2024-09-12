import close_icon from '../assets/Close-Icon.svg';
// import { useNavigate } from 'react-router-dom';
import Image from 'next/image';

const CloseButton = () => {
  // const navigate = useNavigate();
  // Get the last visited path

  const goBack = () => {
    // navigate(-1);
  };

  // TODO: Next.js. use Proper Image component
  return (
    <button className='Button _Hollow _ButtonSize3' onClick={goBack}>
      Close<Image src={close_icon} alt='' />
    </button>
  );
};

export default CloseButton;
