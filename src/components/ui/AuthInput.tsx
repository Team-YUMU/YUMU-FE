import { HTMLProps, forwardRef, useState } from 'react';
import Image from 'next/image';
import ErrorMessage from './ErrorMessage';
import Email from '../svgs/Email';
import Pwd from '../svgs/Pwd';

interface InputProps extends HTMLProps<HTMLInputElement> {
  required: boolean;
  errorMessage?: string | undefined;
  type: 'password' | 'text' | 'email' | 'file';
  name: 'password' | 'text' | 'email' | 'file' | 'nickname' | 'passwordCheck';
}

const AuthInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, type, className, name, ...props }, ref) => {
    const [inputType, setInputType] = useState<'password' | 'text' | 'email' | 'file'>(type);
    const [inputName] = useState<'password' | 'text' | 'email' | 'file' | 'nickname' | 'passwordCheck'>(name);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleClickToggle = () => {
      if (inputType === 'text') setInputType('password');
      if (inputType === 'password') setInputType('text');
    };

    const IMG_PATH = {
      password: 'svgs/eye_off.svg',
      text: 'svgs/eye_on.svg',
      email: '',
      file: '',
    };

    let hasToBeToggled = false;
    if (type === 'password') hasToBeToggled = true;

    let borderColor =
      'focus:outline-orange-F border border-input focus:bg-white border-gray-E  bg-gray-F focus-visible:ring-offset-2';
    if (errorMessage?.length) borderColor = 'focus:outline-red-F border-red-F bg-white';

    const iconColor =
      isFocused || errorMessage?.length
        ? borderColor.includes('focus:outline-orange-F')
          ? '#F9BB00'
          : borderColor.includes('focus:outline-red-F')
            ? '#FF7752'
            : '#BDBDBD'
        : '#BDBDBD';
    return (
      <div className={className}>
        <p className='mt-2 flex items-center text-16-400'>{label}</p>
        <div className='relative'>
          <input
            className={`${borderColor} container h-[5rem] rounded-[0.8rem] border-[0.1rem] px-[4rem]   py-[1.5rem] text-16-400 placeholder:text-gray-B`}
            type={inputType}
            name={inputName}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={ref}
            {...props}
          />
          {inputName === 'email' || inputName === 'nickname' ? (
            <Email width={15} height={15} color={iconColor} className={`absolute bottom-[1.8rem] left-[1.7rem]`} />
          ) : null}
          {inputName === 'password' || inputName === 'passwordCheck' ? (
            <Pwd width={15} height={15} color={iconColor} className={`absolute bottom-[1.8rem] left-[1.7rem]`} />
          ) : null}
          {hasToBeToggled && (
            <button type='button' onClick={handleClickToggle}>
              <Image
                className='absolute bottom-[1.8rem] right-[1.7rem]'
                width={15}
                height={15}
                src={IMG_PATH[inputType]}
                alt='비밀번호 토글 버튼 아이콘'
              />
            </button>
          )}
        </div>
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    );
  },
);

AuthInput.displayName = 'AuthInput';

export default AuthInput;
