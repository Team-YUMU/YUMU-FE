import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import AuthInput from '@/components/ui/AuthInput';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { putMemberPasswordData } from '@/services/api';
import { myPagePwEditSchema } from '@/types/validator/myPageForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';

interface FormData {
  password: string;
  newPassword: string;
  newCheckPassword: string;
}
export default function NewPasswordModalForm() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(myPagePwEditSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      newPassword: '',
      newCheckPassword: '',
    },
  });

  const INPUT_SETTING = {
    label: {
      password: '현재 비밀번호',
      newPassword: '새 비밀번호',
      newCheckPassword: '새 비밀번호 확인',
    },
    placeholder: {
      password: '비밀번호',
      newPassword: '새 비밀번호',
      newCheckPassword: '새 비밀번호 확인',
    },
  };

  const handlePwdChangeClick = async () => {
    const passwordEditData = {
      password: getValues('password'),
      newPassword: getValues('newPassword'),
      newCheckPassword: getValues('newCheckPassword'),
    };
    try {
      await putMemberPasswordData(passwordEditData);
      alert('성공적으로 수정되었습니다.');
      setValue('password', '');
      setValue('newPassword', '');
      setValue('newCheckPassword', '');
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage: string = error.response?.data.errorMessage;
        console.log(errorMessage);
        // 비밀번호가 일치하지 않을 때 에러 메시지를 설정
        if (errorMessage) {
          alert(errorMessage);
        }
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };
  return (
    <AlertDialog>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AlertDialogTrigger className='flex flex-row-reverse' asChild>
          <Button type='submit' size='myPage' variant='myPage'>
            <span className='text-center text-16-500  text-gray-9'>비밀번호 변경하기</span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className=' h-[55.6rem] max-w-[46rem] flex-shrink-0 items-center justify-center'>
          <AlertDialogHeader className='h-[3.9rem] w-[24.9rem] flex-shrink-0 space-y-0 text-start '>
            <span className='pt-[2.5rem] text-24-700 text-gray-9'>비밀번호 변경하기</span>
          </AlertDialogHeader>
          <AlertDialogDescription className='mt-[6.9rem] inline-flex w-[38.8rem] flex-shrink-0 flex-col gap-[2rem]'>
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
              errorMessage={errors.newPassword?.message}
              {...register('newPassword')}
            />
            <AuthInput
              type='password'
              required={!!errors.newCheckPassword}
              placeholder={INPUT_SETTING.placeholder.newCheckPassword}
              errorMessage={errors.newCheckPassword?.message}
              {...register('newCheckPassword')}
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
              <Button className=' h-[6.4rem] w-full' type='button' onClick={handlePwdChangeClick}>
                확인
              </Button>
            </AlertDialogFooter>
          </AlertDialogDescription>
        </AlertDialogContent>
      </form>
    </AlertDialog>
  );
}
