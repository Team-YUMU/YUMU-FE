import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/my-page-textarea';
import { Separator } from '@/components/ui/separator';
interface FormData {
  introduce: string;
}

export default function IntroEditForm() {
  const { register, handleSubmit, setValue } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      introduce: '',
    },
  });
  const [memberInfo, setMemberInfo] = useState({
    introduce: '안녕하세요. 저는 유저2입니다.',
  });

  const INPUT_SETTING = {
    placeholder: {
      introduce: `${memberInfo.introduce}`,
    },
  };

  const handleIntroduceEdit = () => {
    setValue('introduce', memberInfo.introduce);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='relative flex flex-col gap-[1rem]'>
        <div className='h-[2.3rem] w-[28rem] flex-shrink-0'>
          <label className='text-12-500 leading-[2rem] text-gray-9'>작가설명</label>
        </div>
        <Separator orientation='vertical' className='h-[0.1rem] w-full bg-[#686868] p-0' />
        <>
          <Textarea {...register('introduce')} placeholder={INPUT_SETTING.placeholder.introduce} />
          <div className='flex justify-end'>
            <Button
              type='button'
              onClick={handleIntroduceEdit}
              className=' bottom-[1.4rem] right-[1.9rem] rounded-[0.4rem]'
            >
              <span>저장하기</span>
            </Button>
          </div>
        </>
      </div>
    </form>
  );
}
