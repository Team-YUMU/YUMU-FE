import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaSignin } from '@/types/validator/signForm';
import AuthInput from '@/components/ui/AuthInput';
import { postAuthLogin } from '@/services/api';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import axios from 'axios';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  type FormData = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schemaSignin) });

  const onSubmit = async (loginData: FormData) => {
    try {
      const responseApi = await postAuthLogin(loginData);
      if (responseApi.response?.status === 200) {
        router.push('/');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setIsModalOpen(true);
      }
    }
  };

  const KakaoLoginBaseURL = 'https://kauth.kakao.com/oauth/authorize';

  const KakaoData = {
    CLIENT_ID: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string,
    REDIRECT_URI: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI as string,
    CLIENT_SECRET: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET as string,
  };

  const authParam = new URLSearchParams({
    client_id: KakaoData.CLIENT_ID,
    redirect_uri: KakaoData.REDIRECT_URI,
    response_type: 'code',
    client_secret: KakaoData.CLIENT_SECRET,
  });

  const handleKakaoLogin = () => {
    router.push(`${KakaoLoginBaseURL}?${authParam.toString()}`);
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <AlertDialog>
        <div className='flex w-[43.8rem] flex-col items-center gap-[1.3rem]'>
          <div className=' mb-[2.6rem] flex flex-col items-center'>
            <h1 className='font-TheJamsil text-[4.6rem] text-[#222] '>로그인</h1>
            <h2 className='font-notoKR  text-[1.6rem] text-gray-9'>YUMU에 방문해주셔서 감사합니다.</h2>
          </div>

          <form
            noValidate
            className={`flex w-full flex-col items-center justify-center ${errors.email ? 'gap-[3.5rem]' : 'gap-[1rem]'}`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <AuthInput
              type='email'
              required={!!errors.email}
              placeholder='이메일을 입력해 주세요'
              errorMessage={errors?.email?.message}
              className=' h-[6.4rem] w-[43.8rem]'
              {...register('email')}
            />

            <AuthInput
              type='password'
              required={!!errors.password}
              errorMessage={errors?.password?.message}
              className='h-[6.4rem] w-[43.8rem]'
              {...register('password')}
              placeholder='비밀번호를 입력해주세요'
            />

            <AlertDialogTrigger asChild>
              <Button variant='default' className='mb-5 mt-[2rem] bg-red-F text-[2rem]' type='submit' size='auth'>
                로그인
              </Button>
            </AlertDialogTrigger>
          </form>

          {isModalOpen && (
            <div className='flex flex-col items-center justify-center gap-8'>
              <AlertDialogContent className='flex h-[17.9rem] flex-col items-center justify-around p-0'>
                <div className='mt-[5rem] '>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='text-[1.6rem]'>가입되지 않은 사용자 입니다.</AlertDialogTitle>
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
      <div className=' flex flex-col gap-[1.2rem]'>
        <div className='relative'>
          <Image
            src='/svgs/kakao-icon.svg'
            height={25}
            width={28}
            alt='kakao'
            className='absolute left-[2.8rem] mt-8'
          />
          <Button onClick={handleKakaoLogin} variant='sns' size='auth' className=' bg-yellow text-[2rem] text-black-0'>
            카카오로 로그인
          </Button>
        </div>
        <Button
          onClick={() => {
            router.push('/signup');
          }}
          variant='outline'
          size='auth'
          className='border border-red-F bg-white text-[2rem] text-red-F'
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
