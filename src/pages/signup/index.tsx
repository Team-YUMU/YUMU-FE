import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { postUsers } from '@/services/api';
// import axios from 'axios';
import Link from 'next/link';
import { schema } from '@/types/validator/signForm';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

import AuthInput from '@/components/ui/AuthInput';
import { Button } from '@/components/ui/button';

export default function SignUpPage() {
  // const router = useRouter();
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
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await postUsers(data);
      setIsModalOpen(true);
    } catch (error) {
      console.log('에러발생발생 오바오바', error);
    }
    console.log('submit');
  };

  return (
    <AlertDialog>
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <div className='flex w-[43.8rem]  flex-col items-center gap-6 p-10'>
          <div className='flex flex-col items-center'>
            <h1 className='font-jamsil text-[4.6rem]'>회원가입</h1>
            <h2 className='font-notosans text-[1.6rem] text-gray-9'>회원가입에 필요한 정보를 입력해주세요.</h2>``
          </div>
          <form
            className={`flex w-full flex-col items-center justify-center ${errors.email ? 'gap-[3rem]' : 'gap-[3.5rem]'}`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <AuthInput
              type='text'
              placeholder='닉네임을 입력해주세요'
              className='h-[3.9rem] w-[43.8rem] placeholder:font-[2rem]'
              required={true}
              errorMessage={errors?.nickname?.message}
              {...register('nickname')}
            />
            {errors.nickname && <p></p>}

            <AuthInput
              type='email'
              required={!!errors.email}
              placeholder='이메일을 입력해 주세요'
              errorMessage={errors?.email?.message}
              className='h-[3.9rem] w-[43.8rem]'
              {...register('email')}
            />
            {errors.email && <p></p>}

            <AuthInput
              type='password'
              required={!!errors.password}
              errorMessage={errors?.password?.message}
              className='h-[3.9rem] w-[43.8rem]'
              {...register('password')}
              placeholder='비밀번호를 입력해주세요'
            />
            {errors.password && <p></p>}

            <AuthInput
              type='password'
              required={!!errors.checkPassword}
              errorMessage={errors?.checkPassword?.message}
              className='h-[3.9rem] w-[43.8rem]'
              {...register('checkPassword')}
              placeholder='비밀번호를 한번 더 적어주세요'
            />
            <AlertDialogTrigger>
              <Button variant='default' className=' mt-[4rem] bg-red-F text-[2rem]' type='submit' size='auth'>
                회원가입
              </Button>
            </AlertDialogTrigger>
          </form>
          <div className='flex gap-4 text-[1.4rem]'>
            <h1 className='font-noto-sans-kr  text-gray-9'>이미 유무 회원이신가요?</h1>
            <Link className=' font-apple-sd-gothic-neo-m00 text-red-F underline' href='/signin'>
              로그인하기
            </Link>
          </div>
        </div>

        {isModalOpen && (
          <AlertDialogContent className='flex h-[17.9rem] flex-col items-center justify-around p-0'>
            <div className='mt-[5rem]  '>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-[1.6rem]'>회원가입이 완료되었습니다</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogAction className='rounded-[0.8rem mt-[4.1rem] h-[5rem] w-[32rem] border-t-2 bg-white text-[2rem] text-red-F hover:bg-white'>
                닫기
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        )}
      </div>
    </AlertDialog>
  );
}
