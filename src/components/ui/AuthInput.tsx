import { HTMLProps, forwardRef, useState } from 'react';
import Image from 'next/image';
import ErrorMessage from './ErrorMessage';
import EmailIcon from '../svgs/EmailIcon';
import PwdIcon from '../svgs/PwdIcon';

interface InputProps extends HTMLProps<HTMLInputElement> {
  required: boolean;
  errorMessage?: string | undefined;
  type: 'password' | 'text' | 'email' | 'file';
  name: 'password' | 'text' | 'email' | 'file' | 'nickname' | 'checkPassword' | 'newPassword' | 'newCheckPassword';
}

const AuthInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, type, className, name, ...props }, ref) => {
    const [inputType, setInputType] = useState<'password' | 'text' | 'email' | 'file'>(type);
    const [inputName] = useState<
      'password' | 'text' | 'email' | 'file' | 'nickname' | 'checkPassword' | 'newPassword' | 'newCheckPassword'
    >(name);
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

    let borderColor = 'focus:outline-orange-F  focus:bg-white outline-gray-E  bg-gray-F focus-visible:ring-offset-2';
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
            className={`${borderColor} h-[6.4rem] w-full rounded-[0.8rem] border-[0.1rem] px-[4rem]   py-[1.5rem] text-14-400 placeholder:text-gray-B`}
            type={inputType}
            name={inputName}
            onFocus={handleFocus}
            ref={ref}
            {...props}
            onBlur={(event) => {
              handleBlur();
              props?.onBlur?.(event);
            }}
          />
          {inputName === 'email' || inputName === 'nickname' ? (
            <EmailIcon
              width={15}
              height={15}
              color={iconColor}
              className={`absolute bottom-[2.5rem] left-[1.7rem] h-[1.5rem]`}
            />
          ) : null}
          {inputName === 'password' ||
          inputName === 'checkPassword' ||
          inputName === 'newPassword' ||
          inputName === 'newCheckPassword' ? (
            <PwdIcon
              width={15}
              height={15}
              color={iconColor}
              className={`] absolute bottom-[2.5rem] left-[1.7rem] h-[1.5rem] w-[1.5rem]`}
            />
          ) : null}
          {hasToBeToggled && (
            <button type='button' onClick={handleClickToggle}>
              <Image
                className='absolute bottom-[2.7rem] right-[2rem] h-[1.3rem] w-[1.3rem]'
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
