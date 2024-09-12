'use client';
import cn from '@/utils/CSS/TailwindMergeAndClsx';
import { useEffect, useState } from 'react';
import { TextData } from './JobInterviewTypes';


interface V1Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onChangeSmart?: (newValue: string) => void;
  // props: React.InputHTMLAttributes<HTMLButtonElement>
}

const InputBoxAtom = ({ className, onChangeSmart, ...props }: V1Props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSmart && onChangeSmart(e.target.value);
  };
  return (
    <input
      className={cn(
        'w-full rounded-xl bg-white px-[16px] py-[14px] font-ABCRepro fill-white text-black outline-none',
        className
      )}
      onChange={onChange}
      {...props}
    // type={type}
    // placeholder={placeholder}
    // value={email}
    // onFocus={() => setIsActive(true)}
    // onBlur={() => setIsActive(false)}
    ></input>
  );
};

interface Props {
  placeholder?: string;
  className?: string;
  value?: TextData;
  validateFunction?: 'email' | 'name' | 'none';
  type?: string;
  variant?: 'blackBackground' | 'whiteBackground';
  onChange?: (newValue: TextData) => void;
  onEnter?: () => void;
}

export default function InputAtomV2({
  placeholder = '',
  className,
  value,
  type = '',
  variant = 'blackBackground',
  validateFunction = 'none',
  onChange,
  onEnter = () => { },
}: Props) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  // HasInteractedWithComponent is used in the case the user interacts with the input, inputs something invalid, and then leaves the input. We then want to indicate that the input is invalid.
  const [hasInteractedWithComponent, setHasInteractedWithComponent] =
    useState<boolean>(false);

  const handleSetIsActive = (newIsActive: boolean) => {
    setIsActive(newIsActive);
    setHasInteractedWithComponent(true);
    setIsValid(validateText(text)); // If you already have some text in the input and then you click on it, it should validate the text. Happens when we load text from local storage.
  };

  const validateText = (inputText: string) => {
    if (validateFunction === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(inputText);
    }
    if (validateFunction === 'name') {
      return inputText.length > 1;
    }
    return inputText.length > 0;
  };

  useEffect(() => {
    if (value === undefined) return;
    setText(value.text);
  }, [value]);

  const handleTextChange = (newText: string) => {
    console.log('Got new text', newText);
    const inputText = newText;
    setText(inputText);

    let newIsValid = validateText(inputText);
    setIsValid(newIsValid);
    onChange && onChange({ text: inputText, isValid: newIsValid });
  };

  return (
    <InputBoxAtom
      className={cn(
        'bg-[#1B1B1B] fill-white',
        isActive && 'border-white',
        !isActive &&
        !isValid &&
        hasInteractedWithComponent &&
        'border-invalidRed',
        variant === 'blackBackground' ? 'text-white' : 'text-black',
        className
      )}
      type={type}
      placeholder={placeholder}
      value={text}
      autoComplete='off'
      onFocus={() => handleSetIsActive(true)}
      onBlur={() => handleSetIsActive(false)}
      onChangeSmart={handleTextChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onEnter();
        }
      }}
    ></InputBoxAtom>
  );
}
