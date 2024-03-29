import { z } from 'zod';

/*
try - catch 에러처리에 getEmailCheck 의 리스폰스.데이터.메시지 값을 조드 에 추가하면 되지 않을까.
*/

export const schemaSignin = z.object({
  email: z
    .string()
    .email({ message: '이메일 형식에 맞지 않는 메일 주소입니다.' })
    .min(2, { message: '이메일을 입력해 주세요.' }),

  password: z
    .string()
    .min(6, { message: '최소 6자 이상 입력해 주세요.' })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9]).{6,25}$/, {
      message: '비밀번호는 영문 대/소 문자,숫자,특수기호를 조합해서 사용하세요.',
    }),
});

export const schemaSignup = schemaSignin
  .extend({
    checkPassword: z.string(),
    nickname: z
      .string()
      .min(2, { message: '최소 2자 이상 입력해 주세요.' })
      .max(10, { message: '최대 10자 이하로 입력해 주세요.' })
      .regex(/^[aeiou가-힣][a-zA-Z0-9가-힣_-]{1,10}$/, { message: '공백,특수문자 입력이 불가능합니다.' }),
  })
  .refine(
    (value) => {
      return value.password === value.checkPassword;
    },
    { message: '비밀번호가 일치하지 않습니다.', path: ['checkPassword'] },
  );
