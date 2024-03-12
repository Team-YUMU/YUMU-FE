import { HTMLProps, forwardRef, useState } from 'react';
import Image from 'next/image';
import ErrorMessage from './ErrorMessage';

interface InputProps extends HTMLProps<HTMLInputElement> {
  required: boolean;
  errorMessage?: string | undefined;
  type: 'password' | 'text' | 'email' | 'file';
}

const AuthInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, type, className, ...props }, ref) => {
    const [inputType, setInputType] = useState<'password' | 'text' | 'email' | 'file'>(type);

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
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
    if (errorMessage?.length) borderColor = 'focus:outline-red';

    return (
      <div className={className}>
        <p className='mt-2 flex items-center text-16-400'>{label}</p>
        <div className='relative'>
          <input
            className={`${borderColor} container h-[5rem] rounded-[0.8rem] border-[0.1rem] border-gray-D bg-white px-[1.6rem] py-[1.5rem] text-16-400 placeholder:text-gray-D`}
            type={inputType}
            ref={ref}
            {...props}
          />
          {hasToBeToggled && (
            <button type='button' onClick={handleClickToggle}>
              <Image
                className='absolute bottom-[1.3rem] right-[1.6rem]'
                width={22}
                height={22}
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
