import { z } from 'zod';

export const schema = z
  .object({
    email: z
      .string()
      .email({ message: '이메일 형식에 맞지 않는 메일 주소입니다.' })
      .min(2, { message: '이메일을 입력해 주세요.' }),
    password: z
      .string()
      .min(6, { message: '최소 6자 이상 입력해 주세요.' })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/, {
        message: '비밀번호는 영문 대/소 문자,숫자,특수기호를 조합해서 사용하세요.',
      }),
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
  request: z.object({
    artName: z.string().min(1, { message: '필수 항목입니다.' }).max(30, {
      message: '30글자 이내로 작성해주세요.',
    }),
    artDescription: z.string().min(1, { message: '필수 항목입니다.' }),
    artSize: z
      .string({ required_error: '필수 항목입니다.' })
      .regex(/^\d+x\d+x\d+$/, { message: '가로x세로x높이 꼴로 입력해주세요' }),
    artCreatedDate: z.date({ required_error: '필수 항목입니다.' }),
    auctionStartDate: z.date({ required_error: '필수 항목입니다.' }),
    auctionEndDate: z.date({ required_error: '필수 항목입니다.' }),
    defaultBid: z
      .number({ required_error: '필수 항목입니다.' })
      .min(1, { message: '필수 항목입니다.' })
      .or(z.string().min(1, { message: '필수 항목입니다.' }))
      .transform((startPrice) => (typeof startPrice === 'string' ? Number(startPrice) : startPrice)),
    receiveType: z.enum(['이메일', '우편', '배송', '직접거래', '기타']),
    notice: z
      .string()
      .max(160, {
        message: '160자 이내로 작성해주세요.',
      })
      .optional(),
  }),
  image: z.string({ required_error: '필수 항목입니다.' }).min(1, { message: '필수 항목입니다.' }),
});
