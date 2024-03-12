import { z } from 'zod';

export const schema = z
  .object({
    email: z
      .string()
      .email({ message: '유효한 이메일 주소를 입력하세요.' })
      .min(1, { message: '이메일을 입력해주세요.' }),
    password: z
      .string()
      .min(6, { message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.' })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/, { message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.' }),
    passwordCheck: z.string(),
    nickname: z
      .string()
      .min(2, { message: '닉네임은 최소 2자 이상 최대 10자 까지 가능합니다.' })
      .max(10, { message: '닉네임은 최소 2자 이상 최대 10자 까지 가능합니다.' })
      .regex(/^\S[a-zA-Z0-9 ]*$/, { message: '공백이 존재합니다.' }),
  })
  .refine(
    (value) => {
      return value.password === value.passwordCheck;
    },
    { message: '비밀번호가 일치하지 않습니다.', path: ['passwordCheck'] },
  );
