import { z } from 'zod';

export const schema = z
  .object({
    email: z
      .string()
      .email({ message: '이메일 형식에 맞지 않는 메일 주소입니다.' })
      .min(2, { message: '이메일을 입력해 주세요.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.' })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/, { message: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.' }),
    passwordCheck: z.string(),
    nickname: z
      .string()
      .min(2, { message: '최소 2자 이상 입력해 주세요.' })
      .max(10, { message: '최대 10자 이하로 입력해 주세요.' })
      .regex(/^[aeiou가-힣][a-zA-Z0-9가-힣_-]{1,10}$/, { message: '공백,특수문자 입력이 불가능합니다.' }),
  })
  .refine(
    (value) => {
      return value.password === value.passwordCheck;
    },
    { message: '비밀번호가 일치하지 않습니다.', path: ['passwordCheck'] },
  );

export const auctionFormSchema = z.object({
  // 이하 Art
  artTitle: z.string().min(1, { message: '필수 항목입니다.' }).max(30, {
    message: '30글자 이내로 작성해주세요.',
  }),
  artImage: z.string().min(1, { message: '필수 항목입니다.' }),
  // 이하 Auction
  artDetail: z.string().min(1, { message: '필수 항목입니다.' }),
  artSize: z.string().regex(/^\d+x\d+x\d+$/, { message: '가로x세로x높이 꼴로 입력해주세요' }),
  startDate: z.date({ required_error: '필수 항목입니다.' }),
  endDate: z.date({ required_error: '필수 항목입니다.' }),
  startPrice: z
    .number()
    .min(1, { message: '필수 항목입니다.' })
    .or(z.string().min(1, { message: '필수 항목입니다.' }))
    .transform((startPrice) => (typeof startPrice === 'string' ? Number(startPrice) : startPrice)),
  receiveType: z.string().min(1, { message: '필수 항목입니다.' }),
  notice: z
    .string()
    .max(160, {
      message: '160자 이내로 작성해주세요.',
    })
    .optional(),
});
