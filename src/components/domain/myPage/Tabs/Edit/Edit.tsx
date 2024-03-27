import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import React from 'react';
import { Input } from '@/components/ui/input';
import NickNameEditForm from './NickNameEditForm';
import IntroEditForm from './IntroEditForm';
import NewPasswordModalForm from './NewPasswordModalForm';
import UserDeleteModal from './UserDeleteModal';

interface FormData {
  profileImage: string;
}

export default function Edit() {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const [memberInfo, setMemberInfo] = useState({
    profileImage: 'svgs/profile-image.svg',
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setMemberInfo((prevMemberInfo) => ({
        ...prevMemberInfo,
        profileImage: imageUrl,
      }));
    }
  };

  const handleImgDeleteClick = () => {
    setMemberInfo((prevMemberInfo) => ({
      ...prevMemberInfo,
      profileImage: '',
    }));
    console.log(memberInfo);
    const fileInput = watch('profileImage');
    if (fileInput) {
      setValue('profileImage', 'undefined');
    }
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <div className='flex flex-col gap-5'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col items-center justify-center gap-[2.1rem]'>
          {memberInfo.profileImage ? (
            <div className='border-1 h-[20rem] w-[20rem] rounded-[20rem]'>
              <Image
                src={memberInfo.profileImage}
                width={20}
                height={20}
                alt='회원 이미지'
                className=' h-full w-full rounded-[50rem] border-[0.1rem] '
              />
            </div>
          ) : (
            <div className='border-1 h-[20rem] w-[20rem] rounded-[20rem]'>
              <Image
                src={'/svgs/email-icon.svg'}
                width={20}
                height={20}
                alt='회원 이미지'
                className=' h-full w-full rounded-[50rem] border-[0.1rem] '
              />
            </div>
          )}
          <div className='flex flex-row items-center justify-center gap-2'>
            <label
              htmlFor='picture'
              className='flex h-10 items-center  border-b-2 px-4 py-2 text-center text-14-400 leading-[2rem] text-gray-9'
            >
              변경하기
            </label>
            <Input
              {...register('profileImage')}
              id='picture'
              type='file'
              className='hidden'
              accept='image/*'
              onChange={handleFileChange}
            />
            <Button
              type='button'
              variant={'myPageEditImageDelete'}
              size={'myPageEditImageDelete'}
              onClick={handleImgDeleteClick}
            >
              <p className='text-center text-14-400 leading-[2rem] text-gray-9'>삭제</p>
            </Button>
          </div>
        </div>
      </form>
      <div className='inline-flex flex-col gap-[2rem]'>
        <NickNameEditForm />
        <IntroEditForm />
        <div className='flex flex-col items-center gap-[1.2rem]'>
          <NewPasswordModalForm />
          <Button type='button' size='myPage' variant='myPage'>
            <span className='text-center text-16-500  text-gray-9'>로그아웃</span>
          </Button>
          <UserDeleteModal />
        </div>
      </div>
    </div>
  );
}
