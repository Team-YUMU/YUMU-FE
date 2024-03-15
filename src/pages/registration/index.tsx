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
import { auctionFormSchema } from '@/types/validation';
import { useState } from 'react';
import { TimePickerDemo } from '@/components/domain/live/time-picker-demo';
import { postAuction } from '@/services/api';
import { RegistrationType } from '@/types/types';

const defaultValues: Partial<RegistrationType> = {
  artTitle: '',
  artImage: '',
  artDetail: '',
  artSize: '',
  startDate: new Date(0),
  endDate: new Date(0),
  startPrice: 0,
  receiveType: '',
  notice: '',
};

export default function Registration() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const form = useForm<RegistrationType>({
    resolver: zodResolver(auctionFormSchema),
    defaultValues,
  });

  function onSubmit(data: RegistrationType) {
    console.log(data);
    postAuction(data);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(String(reader.result));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='m-auto w-[100rem] pt-2 md:w-[60rem] sm:w-[40rem]'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='artTitle'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div className='pt-3'>
                  <FormLabel className='text-24-700 font-extrabold tracking-tight'>작품 제목</FormLabel>
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
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div className='pt-3'>
                  <FormLabel className='text-24-700 font-extrabold tracking-tight'>대표 이미지</FormLabel>
                </div>
                <div className='space-y-2'>
                  <FormControl>
                    <Button
                      asChild
                      style={{
                        backgroundImage: `url(${selectedImage})`,
                      }}
                      className='h-[18rem] w-[32rem] bg-transparent bg-contain bg-center bg-no-repeat sm:h-[9rem] sm:w-[16rem]'
                    >
                      <Input
                        type='file'
                        placeholder='대표 이미지'
                        onInput={handleFileChange}
                        accept='image/*'
                        {...field}
                      />
                    </Button>
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
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div className='pt-3'>
                  <FormLabel className='text-24-700 font-extrabold tracking-tight'>작품 상세</FormLabel>
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
            name='artSize'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div className='pt-3'>
                  <FormLabel className='text-24-700 font-extrabold tracking-tight'>작품 규모</FormLabel>
                </div>
                <div>
                  <FormControl>
                    <Input placeholder='가로 x 세로 x 높이' {...field} />
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
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div className='pt-3'>
                  <FormLabel className='text-24-700 font-extrabold tracking-tight'>경매 기간</FormLabel>
                </div>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[36rem] justify-start text-left font-normal sm:w-[24rem]',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {field.value ? format(field.value, 'yyyy-MM-dd HH:mm:ss') : <span>경매 시작 일시</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                      <div className='border-t border-border p-3'>
                        <TimePickerDemo setDate={field.onChange} date={field.value} isSeconds={false} isIcon={false} />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='endDate'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div />
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'sm:w-[24 w-[36rem] justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {field.value ? format(field.value, 'yyyy년 MM월 dd일 HH:mm') : <span>경매 종료 일시</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                      <div className='border-t border-border p-3'>
                        <TimePickerDemo setDate={field.onChange} date={field.value} isSeconds={false} isIcon={false} />
                      </div>
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
            name='startPrice'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div className='pt-3'>
                  <FormLabel className='text-24-700 font-extrabold tracking-tight'>경매 시작가</FormLabel>
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
            name='receiveType'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div className='pt-3'>
                  <FormLabel className='text-24-700 font-extrabold tracking-tight'>수령 방법</FormLabel>
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
            name='notice'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div className='pt-3'>
                  <FormLabel className='text-24-700 font-extrabold tracking-tight'>유의 사항</FormLabel>
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
          <Button type='submit' className='float-right'>
            경매 등록
          </Button>
        </form>
      </Form>
    </div>
  );
}
