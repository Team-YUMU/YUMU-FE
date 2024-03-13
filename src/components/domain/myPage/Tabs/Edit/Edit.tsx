import AuthInput from '@/components/ui/AuthInput';
import { Button } from '@/components/ui/button';
import { schema } from '@/types/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  file: string;
}
export default function Edit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const INPUT_SETTING = {
    label: {
      email: '이메일',
      nickname: '닉네임',
      password: '비밀번호',
      passwordCheck: '비밀번호 확인',
      file: '이미지',
    },
    placeholder: {
      email: '이메일을 입력해 주세요.',
      nickname: '닉네임을 입력해 주세요.',
      password: '비밀번호를 입력해 주세요.',
      passwordCheck: '비밀번호를 확인해 주세요.',
    },
  };

  const onSubmit = () => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex  w-[91rem] flex-row items-center justify-center gap-5'>
      <div className='flex flex-col gap-5'>
        <div className='flex w-full flex-col'>
          <AuthInput
            type='email'
            required={!!errors.email}
            label={INPUT_SETTING.label.email}
            placeholder={INPUT_SETTING.placeholder.email}
            errorMessage={errors?.email?.message}
            {...register('email')}
          />
          <AuthInput
            type='file'
            required={!!errors.file}
            label={INPUT_SETTING.label.file}
            errorMessage={errors?.file?.message}
            {...register('file')}
          />
          <AuthInput
            type='text'
            required={!!errors.nickname}
            label={INPUT_SETTING.label.nickname}
            placeholder={INPUT_SETTING.placeholder.nickname}
            errorMessage={errors?.nickname?.message}
            {...register('nickname')}
          />
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
            required={!!errors.passwordCheck}
            label={INPUT_SETTING.label.passwordCheck}
            placeholder={INPUT_SETTING.placeholder.passwordCheck}
            errorMessage={errors?.passwordCheck?.message}
            {...register('passwordCheck')}
          />
        </div>
        <Button type='submit' variant={'default'} size={'default'} className='flex w-[5rem]'>
          수정하기
        </Button>
      </div>
    </form>
  );
}
