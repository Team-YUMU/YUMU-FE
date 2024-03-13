'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

const auctionFormSchema = z.object({
  artTitle: z.string({ required_error: '필수 항목입니다.' }).max(30, {
    message: '30글자 이내로 작성해주세요.',
  }),
  artImage: z.string({ required_error: '필수 항목입니다.' }),
  artDetail: z.string({ required_error: '필수 항목입니다.' }),
  artSize: z.string({ required_error: '필수 항목입니다.' }),
  startDate: z.date({ required_error: '필수 항목입니다.' }),
  reservedPrice: z
    .number()
    .or(z.string())
    .transform((reservedPrice) => (typeof reservedPrice === 'string' ? Number(reservedPrice) : reservedPrice)),
  deliveryMethod: z.string({ required_error: '필수 선택 사항입니다.' }),
  caution: z
    .string()
    .max(160, {
      message: '160자 이내로 작성해주세요.',
    })
    .optional(),
});

type AuctionFormTypes = z.infer<typeof auctionFormSchema>;

const defaultValues: Partial<AuctionFormTypes> = {
  artTitle: '',
  artImage: '',
  artDetail: '',
  artSize: '',
  startDate: new Date(),
  reservedPrice: 0,
  deliveryMethod: '',
  caution: '',
};

export default function AuctionAdd() {
  const form = useForm<AuctionFormTypes>({
    resolver: zodResolver(auctionFormSchema),
    defaultValues,
  });

  function onSubmit(data: AuctionFormTypes) {
    console.log(data);
  }

  return (
    <div className='m-auto w-[80%]'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='artTitle'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] bg-slate-50'>
                <div>
                  <FormLabel>작품 제목</FormLabel>
                </div>
                <div>
                  <FormControl>
                    <Input placeholder='작품 제목' {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={form.control}
            name='artImage'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] bg-slate-50'>
                <div>
                  <FormLabel>대표 이미지</FormLabel>
                </div>
                <div>
                  <FormControl>
                    <Input type='file' placeholder='대표 이미지' {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={form.control}
            name='artDetail'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] bg-slate-50'>
                <div>
                  <FormLabel>작품 상세</FormLabel>
                </div>
                <div>
                  <FormControl>
                    <Textarea placeholder='작품 상세' className='resize-none' {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={form.control}
            name='startDate'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] bg-slate-50'>
                <div>
                  <FormLabel>경매 기간</FormLabel>
                </div>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>경매 기간</span>}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={form.control}
            name='reservedPrice'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] bg-slate-50'>
                <div>
                  <FormLabel>경매 시작가</FormLabel>
                </div>
                <div>
                  <FormControl>
                    <Input type='number' placeholder='경매 시작가' {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={form.control}
            name='deliveryMethod'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] bg-slate-50'>
                <div>
                  <FormLabel>수령 방법</FormLabel>
                </div>
                <div>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='수령 방법' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='대면수령'>대면 수령</SelectItem>
                      <SelectItem value='택배배송'>택배 배송</SelectItem>
                      <SelectItem value='이메일 수신'>이메일 수신</SelectItem>
                      <SelectItem value='기타'>기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={form.control}
            name='caution'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] bg-slate-50'>
                <div>
                  <FormLabel>유의 사항</FormLabel>
                </div>
                <div>
                  <FormControl>
                    <Textarea placeholder='유의 사항' className='resize-none' {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type='submit'>Update account</Button>
        </form>
      </Form>
    </div>
  );
}
