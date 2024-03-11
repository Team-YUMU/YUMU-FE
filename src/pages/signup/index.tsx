import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { schema } from '@/types/validation';

export function SignUpPage() {
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
