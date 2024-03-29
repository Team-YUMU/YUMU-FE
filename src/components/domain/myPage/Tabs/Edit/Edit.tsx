import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import React from 'react';
import { Input } from '@/components/ui/input';
import NickNameEditForm from './NickNameEditForm';
import IntroEditForm from './IntroEditForm';
import NewPasswordModalForm from './NewPasswordModalForm';
import UserDeleteModal from './UserDeleteModal';
import { Separator } from '@/components/ui/separator';
import { deleteMemberProfileImage, getMemberInfo, putMemberProfileImageData } from '@/services/api';

interface FormData {
  email: string;
  nickname: string;
  introduce: string;
  profileImage: string;
  loginStatus: string;
}

export default function Edit() {
  const { register, handleSubmit } = useForm<FormData>();
  const [memberInfo, setMemberInfo] = useState<FormData>({
    email: '',
    nickname: '',
    introduce: '',
    profileImage: '',
    loginStatus: '',
  });
  const onChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append('profileImage', uploadFile);

      try {
        await putMemberProfileImageData(formData);
        memberInfoData();
      } catch (error) {
        console.error('이미지 업로드 오류:', error);
      }
    }
  };

  useEffect(() => {
    memberInfoData();
  }, []);
  const memberInfoData = async () => {
    const { ...res } = await getMemberInfo();
    setMemberInfo(res);
    console.log(res);
  };

  useEffect(() => {
    memberInfoData();
  }, []);

  const handleImgDeleteClick = async () => {
    await deleteMemberProfileImage();
    memberInfoData();
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <div className='flex flex-col gap-[4rem]'>
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
                src={memberInfo.profileImage}
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
              required
              multiple
              onChange={onChangeImg}
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
        <NickNameEditForm nickname={memberInfo.nickname} />
        <IntroEditForm introduce={memberInfo.introduce} />
        <div className='flex flex-col items-center gap-[1.2rem]'>
          <div className='h-[2.3rem] w-[28rem] flex-shrink-0'>
            <label className='text-12-500 leading-[2rem] text-gray-9'>아이디 정보</label>
          </div>
          <Separator orientation='vertical' className='h-[0.1rem] w-full bg-[#686868] p-0' />
          <p className='h-[6rem] w-[28rem] flex-shrink-0 text-16-500 leading-[2rem] text-gray-9'>
            {memberInfo.loginStatus === 'DEFAULT' ? memberInfo.email : '카카오로 로그인 되었습니다.'}
          </p>
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
