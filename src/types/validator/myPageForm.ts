import { z } from 'zod';

function mypagePassWordSchema() {
  return z
    .string()
    .min(6, { message: '최소 6자 이상 입력해 주세요.' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!-*]).{6,16}$/, {
      message: '비밀번호는 영문 대/소 문자,숫자,특수기호를 조합해서 사용하세요.',
    });
}

export type TMypagePwEditSchema = z.infer<typeof myPagePwEditSchema>;

export const myPagePwEditSchema = z
  .object({
    password: mypagePassWordSchema(),
    newPassword: mypagePassWordSchema(),
    newCheckPassword: mypagePassWordSchema(),
  })
  .refine((data) => data.password === data.password, {
    path: ['password'],
    message: '현재 비밀번호와 일치하지 않습니다.',
  })
  .refine((data) => data.newPassword === data.newCheckPassword, {
    path: ['newCheckPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  })
  .refine((data) => data.password !== data.newPassword, {
    path: ['newPassword'],
    message: '현재 비밀번호와 새 비밀번호가 일치합니다.',
  });
