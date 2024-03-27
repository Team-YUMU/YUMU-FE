import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import AuthInput from '@/components/ui/AuthInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { myPagePwEditSchema } from '@/types/validator/myPageForm';
import Image from 'next/image';

interface FormData {
  email: string;
  nickname: string;
  password: string;
  newPassword: string;
  newPasswordCheck: string;
  provider: null | string;
}
export default function NewPasswordModalForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(myPagePwEditSchema) });
  const [memberInfo, setMemberInfo] = useState<FormData>({
    password: '',
    newPassword: '',
    newPasswordCheck: '',
    email: 'example2@example.com',
    nickname: 'user2',
    provider: null,
  });
  const INPUT_SETTING = {
    label: {
      password: '현재 비밀번호',
      newPassword: '새 비밀번호',
      newPasswordCheck: '새 비밀번호 확인',
    },
    placeholder: {
      password: '비밀번호',
      newPassword: '새 비밀번호',
      newPasswordCheck: '새 비밀번호 확인',
    },
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AlertDialog>
        <AlertDialogTrigger className='flex flex-row-reverse' asChild>
          <Button type='button' size='myPage' variant='myPage'>
            <span className='text-center text-16-500  text-gray-9'>비밀번호 변경하기</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className=' h-[55.6rem] max-w-[46rem] flex-shrink-0 items-center justify-center'>
          <AlertDialogHeader className='h-[3.9rem] w-[24.9rem] flex-shrink-0 space-y-0 text-start '>
            <span className='  pt-[2.5rem] text-24-700 text-gray-9'>비밀번호 변경하기</span>
          </AlertDialogHeader>
          <AlertDialogDescription className=' mt-[6.9rem] inline-flex w-[38.8rem] flex-shrink-0 flex-col gap-[2rem]'>
            <AuthInput
              type='password'
              required={!!errors.password}
              placeholder={INPUT_SETTING.placeholder.password}
              errorMessage={errors?.password?.message}
              {...register('password')}
            />
            <AuthInput
              type='password'
              required={!!errors.newPassword}
              placeholder={INPUT_SETTING.placeholder.newPassword}
              errorMessage={errors?.newPassword?.message}
              {...register('newPassword')}
            />
            <div className='flex flex-row items-center text-center text-14-400'>
              {errors?.newPassword?.message ? (
                errors?.newPassword?.message
              ) : (
                <>
                  <label className='text-red-E'>* </label>
                  <label className='text-gray-9'>6~16자, 영문 대·소문자, 숫자, 특수문자 중 2개 이상 사용하세요.</label>
                </>
              )}
            </div>
            <AuthInput
              type='password'
              required={!!errors.newPasswordCheck}
              placeholder={INPUT_SETTING.placeholder.newPasswordCheck}
              errorMessage={errors?.newPasswordCheck?.message}
              {...register('newPasswordCheck')}
            />
            <AlertDialogFooter className='flex flex-row items-center justify-center gap-2'>
              <AlertDialogCancel className='left-[40rem]'>
                <Image
                  src={'svgs/my-page-modal-close-icon.svg'}
                  width={30}
                  height={30}
                  className='absolute h-[3rem] w-[3rem] flex-shrink-0'
                  alt='모달 닫기 버튼 아이콘'
                />
              </AlertDialogCancel>
              <Button className=' h-[6.4rem] w-full' type='button'>
                확인
              </Button>
            </AlertDialogFooter>
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}
