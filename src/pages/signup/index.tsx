import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const schema = z
  .object({
    email: z
      .string()
      .email({ message: '유효한 이메일 주소를 입력하세요.' })
      .min(1, { message: '이메일을 입력해주세요.' }),
    password: z
      .string()
      .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
      .regex(/[A-Za-z]/, { message: '비밀번호는 영문 대소문자를 포함해야 합니다.' }),
    passwordCheck: z.string(),
  })
  .refine(
    (value) => {
      return value.password === value.passwordCheck;
    },
    { message: '비밀번호가 일치하지 않습니다.', path: ['passwordCheck'] },
  );

export default function SignUpPage() {
  const router = useRouter();

  type FormData = {
    email: string;
    password: string;
    passwordCheck: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post('/', data, { withCredentials: true }); // api명세나오면 알수있음
      router.push('/');
    } catch (error) {
      console.log('An error occurred:', error);
    }
    console.log(data);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>email</label>
          <input {...register('email')} placeholder='email' />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>password</label>
          <input type='password' {...register('password')} placeholder='password' />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label>password check</label>
          <input type='password' {...register('passwordCheck')} placeholder='password confirm' />
          {errors.passwordCheck && <p>{errors.passwordCheck.message}</p>}
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
}
