import AuthInput from '@/components/ui/AuthInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { myPagePwEditSchema } from '@/types/validator/myPageForm';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  nickname: string;
}

export default function NickNameEditForm() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(myPagePwEditSchema) });
  const [memberInfo, setMemberInfo] = useState({
    nickname: 'user2',
  });

  const INPUT_SETTING = {
    placeholder: {
      nickname: `${memberInfo.nickname}`,
    },
  };

  const handleNicknameEdit = () => {
    setValue('nickname', memberInfo.nickname);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='relative flex flex-col gap-[1rem]'>
        <div className='h-[2.3rem] w-[28rem] flex-shrink-0'>
          <label className='text-12-500 leading-[2rem] text-gray-9'>닉네임</label>
        </div>
        <Separator orientation='vertical' className='h-[0.1rem] w-full bg-[#686868] p-0' />
        <Input
          variant={'myPageEditNameInput'}
          type='text'
          required={!!errors.nickname}
          placeholder={INPUT_SETTING.placeholder.nickname}
          className=' border-white bg-white'
          {...register('nickname')}
        />
        {errors?.nickname?.message}
        <div className='flex justify-end'>
          <Button type='button' className='absolute bottom-[2rem]  rounded-[0.4rem]' onClick={handleNicknameEdit}>
            변경하기
          </Button>
        </div>
      </div>
    </form>
  );
}
