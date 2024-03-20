import AuthInput from '@/components/ui/AuthInput';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { myPagePwEditSchema } from '@/types/validator/myPageForm';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface FormData {
  id: number;
  file: string;
  email: string;
  nickname: string;
  password: string;
  newPassword: string;
  newPasswordCheck: string;
  profileImageUrl: string;
  introduce: string;
}

interface EditProps {
  setChangeUi: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Edit({ setChangeUi }: EditProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(myPagePwEditSchema) });
  const [isEditing, setIsEditing] = useState(false);
  const [isIntroduceEditing, setIsIntroduceEditing] = useState(false);
  const [memberInfo, setMemberInfo] = useState({
    password: '',
    newPassword: '',
    newPasswordCheck: '',
    file: '',
    id: 2,
    email: 'example2@example.com',
    nickname: 'user2',
    profileImageUrl: '',
    introduce: '안녕하세요. 저는 유저2입니다.',
    snsLink: 'https://www.example.com/user2',
    address: null,
  });

  const INPUT_SETTING = {
    label: {
      email: '이메일',
      nickname: '닉네임 변경',
      password: '현재 비밀번호',
      newPassword: '새 비밀번호',
      newPasswordCheck: '새 비밀번호 확인',
      file: '프로필 이미지',
    },
    placeholder: {
      email: '이메일을 입력해 주세요.',
      nickname: '닉네임을 입력해 주세요.',
      password: '비밀번호를 입력해 주세요.',
      newPassword: '새 비밀번호를 입력해 주세요.',
      newPasswordCheck: '새 비밀번호를 확인해 주세요.',
    },
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setMemberInfo((prevMemberInfo) => ({
        ...prevMemberInfo,
        profileImageUrl: imageUrl,
      }));
    }
  };

  const handleImgDeleteClick = () => {
    setMemberInfo((prevMemberInfo) => ({
      ...prevMemberInfo,
      profileImageUrl: '',
    }));
    console.log(memberInfo);
    const fileInput = watch('profileImageUrl');
    if (fileInput) {
      setValue('profileImageUrl', 'undefined');
    }
  };
  const handleIntroduceEdit = () => {
    setIsIntroduceEditing(true);
    setValue('introduce', memberInfo.introduce);
  };
  const handleNicknameEdit = () => {
    setIsEditing(true);
    setValue('nickname', memberInfo.nickname);
  };

  const handleEditCancelButtonClick = () => {
    setIsEditing(false);
  };

  const handleIntroduceCancelClick = () => {
    setIsIntroduceEditing(false);
  };

  const handleCancelButtonClick = () => {
    setChangeUi(false);
  };

  const handleEditPwdClick = () => {};

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex  w-full flex-row items-center justify-center gap-8'>
      <div className='flex flex-col gap-5'>
        <span className='text-15-400'>프로필 정보 수정</span>
        <div className='flex flex-row gap-[8rem]'>
          {memberInfo.profileImageUrl ? (
            <div className='border-1 h-[9rem] w-[9rem] rounded-[50rem] bg-gray-F'>
              <Image
                src={memberInfo.profileImageUrl}
                width={144}
                height={144}
                alt='회원 이미지'
                className=' h-full w-full rounded-[50rem] border-[0.1rem] border-red-F bg-gray-D'
              />
            </div>
          ) : (
            <Image
              src={'/svgs/email-icon.svg'}
              width={144}
              height={144}
              alt='회원 이미지'
              className='h-[9rem] w-[9rem] rounded-[50rem] border-[0.1rem] border-red-F bg-gray-D'
            />
          )}
          <div className='flex flex-row items-center justify-center gap-2'>
            <label
              htmlFor='picture'
              className='flex h-10 items-center rounded-md bg-red-F  px-4 py-2 text-white hover:bg-red-F/90'
            >
              이미지 변경
            </label>
            <Input
              {...register('profileImageUrl')}
              id='picture'
              type='file'
              className='hidden'
              accept='image/*'
              onChange={handleFileChange}
            />
            <Button type='button' variant={'outline'} onClick={handleImgDeleteClick}>
              삭제
            </Button>
          </div>
        </div>

        {isEditing ? (
          <div className='relative'>
            <label className='text-15-400'>닉네임 변경</label>
            <AuthInput
              type='text'
              required={!!errors.nickname}
              placeholder={INPUT_SETTING.placeholder.nickname}
              errorMessage={errors?.nickname?.message}
              {...register('nickname')}
            />
            <Button
              type='button'
              variant={'outline'}
              size={'default'}
              onClick={handleEditCancelButtonClick}
              className='absolute bottom-[1.4rem] right-[1.9rem]'
            >
              취소
            </Button>
          </div>
        ) : (
          <div className='relative'>
            <label className='text-15-400'>닉네임 변경</label>
            <AuthInput
              type='text'
              required={!!errors.nickname}
              placeholder={INPUT_SETTING.placeholder.nickname}
              errorMessage={errors?.nickname?.message}
              disabled
              {...register('nickname')}
            />
            <Button
              type='button'
              variant={'default'}
              size={'default'}
              onClick={handleNicknameEdit}
              className='absolute bottom-[1.4rem] right-[1.9rem]'
            >
              수정
            </Button>
          </div>
        )}

        <div className='relative flex flex-col gap-[1rem]'>
          <p className='text-15-400'>작가 설명</p>
          {isIntroduceEditing ? (
            <>
              <Textarea {...register('introduce')} className='h-[8rem] w-[30.5rem]' />
              <Button
                type='button'
                variant={'outline'}
                size={'default'}
                onClick={handleIntroduceCancelClick}
                className='absolute bottom-[1.8rem] right-[1.8rem]'
              >
                취소
              </Button>
            </>
          ) : (
            <>
              <p className='h-[8rem] w-[30.5rem]'>{memberInfo.introduce}</p>
              <Button
                type='button'
                variant={'default'}
                size={'default'}
                onClick={handleIntroduceEdit}
                className='absolute bottom-[1.2rem] right-[1.8rem]'
              >
                수정
              </Button>
            </>
          )}
        </div>
        <div className='text-15-400'>
          <p>로그인 정보</p>
          <p>{memberInfo.email}</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger className='flex flex-row-reverse' asChild>
            <div>
              <Button type='button' size={'icon'} className='w-[8rem]'>
                비밀번호 변경하기
              </Button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className=''>
            <AlertDialogHeader>
              <AlertDialogDescription>
                <AuthInput
                  type='password'
                  required={!!errors.password}
                  label={INPUT_SETTING.label.password}
                  placeholder={INPUT_SETTING.placeholder.password}
                  errorMessage={errors?.password?.message}
                  {...register('password')}
                />
                <AuthInput
                  type='password'
                  required={!!errors.newPassword}
                  label={INPUT_SETTING.label.newPassword}
                  placeholder={INPUT_SETTING.placeholder.newPassword}
                  errorMessage={errors?.newPassword?.message}
                  {...register('newPassword')}
                />
                <AuthInput
                  type='password'
                  required={!!errors.newPasswordCheck}
                  label={INPUT_SETTING.label.newPasswordCheck}
                  placeholder={INPUT_SETTING.placeholder.newPasswordCheck}
                  errorMessage={errors?.newPasswordCheck?.message}
                  {...register('newPasswordCheck')}
                />
                <AlertDialogFooter className='flex flex-row items-center justify-center gap-2'>
                  <AlertDialogCancel className='h-[4rem] w-full'>취소</AlertDialogCancel>
                  <Button className='h-[4rem] w-full' type='submit' onClick={handleEditPwdClick}>
                    확인
                  </Button>
                </AlertDialogFooter>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
        <div className='flex w-full flex-row gap-2'>
          <Button
            onClick={handleCancelButtonClick}
            type='button'
            variant={'outline'}
            className='flex h-[3.2rem] w-full'
          >
            취소
          </Button>
          <Button type='submit' variant={'default'} className='flex h-[3.2rem] w-full'>
            수정
          </Button>
        </div>
      </div>
    </form>
  );
}
