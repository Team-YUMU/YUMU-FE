import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { putMemberNickNameData } from '@/services/api';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

interface FormData {
  nickname: string;
}

export default function NickNameEditForm({ nickname }: FormData) {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const INPUT_SETTING = {
    placeholder: {
      nickname: `${nickname}`,
    },
  };

  const queryClient = useQueryClient();

  const onChangeNickName = async () => {
    const nicknameParams = getValues('nickname');
    try {
      await putMemberNickNameData(nicknameParams);
      alert('성공적으로 수정되었습니다.');
      setValue('nickname', '');
      queryClient.invalidateQueries({ queryKey: ['memberData'] });
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.errorMessage);
      }
    }
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
          <Button type='button' className='absolute bottom-[2rem]  rounded-[0.4rem]' onClick={onChangeNickName}>
            변경하기
          </Button>
        </div>
      </div>
    </form>
  );
}
