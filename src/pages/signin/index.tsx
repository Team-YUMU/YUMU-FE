import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaSignin } from '@/types/validator/signForm';
import AuthInput from '@/components/ui/AuthInput';
import { postAuthLogin } from '@/services/api';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import axios from 'axios';

export default function SignInPage() {
  const router = useRouter();

  type FormData = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schemaSignin) });

  const onSubmit = async (loginData: FormData) => {
    try {
      const response = await postAuthLogin(loginData);
      console.log(response);
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log('가입되지 않은 사용자 입니다.');
        console.log('axios 에러..!');
      } else {
        console.log('로그인 에러', error);
      }
    }
    console.log('button clicked');
  };
  //http://43.200.219.117:8080/api/v1/auth/kakao/callback
  //http://localhost:8080/api/v1/auth/kakao/callback
  const redirect_uri = 'http://43.200.219.117:8080/api/v1/auth/kakao/callback';
  const client_secret = 'BBkkwkXtSiGlrzwpI9Dessi62zOUl3XL';
  const client_id = '35db98ff4af114997aed8f7d44938cfd';
  const response_type = 'code';
  const KakaoLoginBaseURL = 'https://kauth.kakao.com/oauth/authorize';

  const authParam = new URLSearchParams({
    client_id,
    redirect_uri,
    response_type,
    client_secret,
  });

  const handleKakaoLogin = async () => {
    try {
      const res = await axios.get(`${KakaoLoginBaseURL}?${authParam.toString()}`);
      const accessToken = res.headers['authorization'];
      const refreshToken = res.headers['refresh'];
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      return res.data;
    } catch (error) {
      console.log('error', error);
    }
    console.log('카카오버튼 클릭');
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <div className='flex w-[43.8rem] flex-col items-center gap-[1.3rem] p-10'>
        <div className=' mb-[2.6rem] flex flex-col items-center'>
          <h1 className='font-[TheJamsil]-400 text-[4.6rem] text-[#222] '>로그인</h1>
          <h2 className='font-notoKR  text-[1.6rem] text-gray-9'>YUMU에 방문해주셔서 감사합니다.</h2>
        </div>

        <form
          noValidate
          className={`flex w-full flex-col items-center justify-center ${errors.email ? 'gap-[4.5rem]' : 'gap-[0.6rem]'}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <AuthInput
            type='email'
            required={!!errors.email}
            placeholder='이메일을 입력해 주세요'
            errorMessage={errors?.email?.message}
            className=' h-[6.4rem] w-[43.8rem]'
            {...register('email')}
          />

          <AuthInput
            type='password'
            required={!!errors.password}
            errorMessage={errors?.password?.message}
            className='h-[6.4rem] w-[43.8rem]'
            {...register('password')}
            placeholder='비밀번호를 입력해주세요'
          />

          <Button variant='default' className='mt-[2rem] bg-red-F text-[2rem]' type='submit' size='auth'>
            로그인
          </Button>
        </form>

        <div className=' flex flex-col gap-[1.2rem]'>
          <div className='relative'>
            <Image
              src='/svgs/kakao-icon.svg'
              height={25}
              width={28}
              alt='kakao'
              className='absolute left-[2.8rem] mt-8'
            />
            <Button variant='sns' size='auth' className='bg-yellow text-[2rem] text-black-0' onClick={handleKakaoLogin}>
              카카오로 로그인
            </Button>
          </div>
          <Button
            onClick={() => {
              router.push('/signup');
            }}
            variant='outline'
            size='auth'
            className='border border-red-F bg-white text-[2rem] text-red-F'
          >
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
}
