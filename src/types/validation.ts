import { z } from 'zod';

export const schema = z
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
