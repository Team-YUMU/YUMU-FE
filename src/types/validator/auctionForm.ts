import { z } from 'zod';

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
