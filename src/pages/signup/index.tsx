import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getNicknameCheck, postMember, getEmailCheck } from '@/services/api';
import { useState } from 'react';
// import axios from 'axios';
import Link from 'next/link';
import { schemaSignup } from '@/types/validator/signForm';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/router';
import { z } from 'zod';
import AuthInput from '@/components/ui/AuthInput';
import { Button } from '@/components/ui/button';
import { AxiosError } from 'axios';

export default function SignUpPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  type FormData = {
    nickname: string;
    email: string;
    password: string;
    checkPassword: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schemaSignup) });

  const onSubmit = async (data: FormData) => {
    try {
      const emailCheck = await getEmailCheck(data.email);
      console.log(emailCheck);
      setIsModalOpen(true);
      await postMember(data);
    } catch (error) {
      console.log('onSubmit error', error);
      if (error instanceof AxiosError) {
        // const nicknameErrorMessage: string = error.response?.data.errorMessage;
        const emailErrorMessage: string = error.response?.data.errorMessage;
        setErrorMessage(emailErrorMessage);
        // setErrorMessage(nicknameErrorMessage);
      }
    }
  };
  const [errorMessage, setErrorMessage] = useState('');
  //  const [errorMessage, setNicknameErrorMessage] = useState('');

  const handleCheckNickname = async (data: FormData) => {
    console.log('clicked');
    try {
      const nicknameCheck = await getNicknameCheck(data.nickname);
      console.log(nicknameCheck);
    } catch (error) {
      if (error instanceof AxiosError) {
        const nicknameErrorMessage: string = error.response?.data.errorMessage;
        setEmailErrorMessage(nicknameErrorMessage);
      }
    }
  };
  const handleCheckEmail = async (data: FormData) => {
    try {
      const emailCheck = await getEmailCheck(data.email);
      console.log(emailCheck);
    } catch (error) {
      if (error instanceof AxiosError) {
        const emailErrorMessage: string = error.response?.data.errorMessage;
        setErrorMessage(emailErrorMessage);
      }
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <AlertDialog>
        <div className='flex w-[43.8rem] flex-col items-center gap-[1.3rem] p-10'>
          <div className=' mb-[2.6rem] flex flex-col items-center'>
            <h1 className='font-TheJamsil text-[4.6rem] text-[#222]'>회원가입</h1>
            <h2 className='font-notoKR text-[1.6rem] text-gray-9'>회원가입에 필요한 정보를 입력해주세요.</h2>
          </div>

          <form
            noValidate
            className={` relative flex w-full flex-col items-center justify-center ${errors ? 'gap-[3.5rem]' : 'gap-[1rem]'}`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='relative flex items-center justify-end'>
              <AuthInput
                type='text'
                placeholder='닉네임을 입력해주세요'
                required={true}
                errorMessage={errorMessage ? errorMessage : errors?.nickname?.message}
                className=' h-[6.4rem] w-[43.8rem]'
                {...register('nickname')}
              />

              <Button onClick={handleCheckNickname} className='absolute bottom-6 right-6'>
                중복확인
              </Button>
            </div>
            <div className='relative flex items-center justify-end'>
              <AuthInput
                type='email'
                required={!!errors.email}
                placeholder='이메일을 입력해 주세요'
                errorMessage={errorMessage ? errorMessage : errors?.email?.message}
                className={`h-[6.4rem] w-[43.8rem] `}
                {...register('email')}
              />
              <Button onClick={() => handleCheckEmail()} className='absolute bottom-6 right-6'>
                중복확인
              </Button>
            </div>
            <AuthInput
              type='password'
              required={!!errors.password}
              errorMessage={errors?.password?.message}
              className=' h-[6.4rem] w-[43.8rem]'
              {...register('password')}
              placeholder='비밀번호를 입력해주세요'
            />

            <AuthInput
              type='password'
              required={!!errors.checkPassword}
              errorMessage={errors?.checkPassword?.message}
              {...register('checkPassword')}
              placeholder='비밀번호를 한번 더 적어주세요'
              className=' h-[6.4rem] w-[43.8rem]'
            />
            <AlertDialogTrigger asChild>
              <Button variant='default' className=' mt-7 bg-red-F text-[2rem]' type='submit' size='auth'>
                회원가입
              </Button>
            </AlertDialogTrigger>
          </form>

          {isModalOpen && (
            <div className='flex flex-col items-center justify-center gap-8'>
              <AlertDialogContent className='flex h-[17.9rem] flex-col items-center justify-around p-0'>
                <div className='mt-[5rem] '>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='text-[1.6rem]'>회원가입이 완료되었습니다</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogAction
                    onClick={() => {
                      router.push('/signin');
                    }}
                    className='rounded-[0.8rem mt-[4.1rem] h-[5rem] w-[32rem] border-t-2 bg-white text-[2rem] text-red-F hover:bg-white'
                  >
                    닫기
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </div>
          )}
        </div>
      </AlertDialog>
      <div className='flex gap-4 text-[1.4rem]'>
        <h1 className='font-noto-sans-kr  text-gray-9'>이미 유무 회원이신가요?</h1>
        <Link className=' font-apple-sd-gothic-neo-m00 text-red-F underline' href='/signin'>
          로그인하기
        </Link>
      </div>
    </div>
  );
}
