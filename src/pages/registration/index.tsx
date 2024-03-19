'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
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
  request: {
    artName: '',
    artDescription: '',
    artSize: '',
    artCreatedDate: undefined,
    auctionStartDate: undefined,
    auctionEndDate: undefined,
    defaultBid: undefined,
    notice: '',
    receiveType: '',
  },
  image: undefined,
};

export default function Registration() {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const form = useForm<RegistrationType>({
    resolver: zodResolver(auctionFormSchema),
    defaultValues,
  });

  function onSubmit(data: RegistrationType) {
    const formData = {
      request: data.request,
      image: selectedImage,
    };

    console.log(formData);

    postAuction(formData);
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
            name='request.artName'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div className='pt-3'>
                  <FormLabel className='text-24-700 font-extrabold tracking-tight'>
                    작품 제목 <span className='text-red-F'>*</span>
                  </FormLabel>
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
            name='image'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div className='pt-3'>
                  <FormLabel className='text-24-700 font-extrabold tracking-tight'>
                    대표 이미지 <span className='text-red-F'>*</span>
                  </FormLabel>
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
            name='request.artSize'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div className='pt-3'>
                  <FormLabel className='text-24-700 font-extrabold tracking-tight'>
                    작품 규모 <span className='text-red-F'>*</span>
                  </FormLabel>
                </div>
                <div>
                  <FormControl>
                    <Input placeholder='가로(cm) x 세로(cm) x 높이(cm)' {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={form.control}
            name='request.artCreatedDate'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div className='pt-3'>
                  <FormLabel className='text-24-700 font-extrabold tracking-tight'>
                    제작 일자 <span className='text-red-F'>*</span>
                  </FormLabel>
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
                        {field.value ? format(field.value, 'yyyy년 MM월 dd일') : <span>제작 일자</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date >= new Date()}
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
            name='request.artDescription'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div className='pt-3'>
                  <FormLabel className='text-24-700 font-extrabold tracking-tight'>
                    작품 상세 <span className='text-red-F'>*</span>
                  </FormLabel>
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
            name='request.auctionStartDate'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div className='pt-3'>
                  <FormLabel className='text-24-700 font-extrabold tracking-tight'>
                    경매 기간 <span className='text-red-F'>*</span>
                  </FormLabel>
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
                        {field.value ? format(field.value, 'yyyy년 MM월 dd일 HH:mm') : <span>경매 시작 일시</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date <= new Date()}
                        initialFocus
                      />
                      <div className='border-t border-border p-2'>
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
            name='request.auctionEndDate'
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
            name='request.defaultBid'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div className='pt-3'>
                  <FormLabel className='text-24-700 font-extrabold tracking-tight'>
                    경매 시작가 <span className='text-red-F'>*</span>
                  </FormLabel>
                </div>
                <div>
                  <FormControl>
                    <Input placeholder='경매 시작가' {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={form.control}
            name='request.receiveType'
            render={({ field }) => (
              <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                <div className='pt-3'>
                  <FormLabel className='text-24-700 font-extrabold tracking-tight'>
                    수령 방법 <span className='text-red-F'>*</span>
                  </FormLabel>
                </div>
                <div>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='수령 방법' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='직접거래'>직접 거래</SelectItem>
                      <SelectItem value='배송'>택배 배송</SelectItem>
                      <SelectItem value='우편'>우편 배송</SelectItem>
                      <SelectItem value='이메일'>이메일</SelectItem>
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
            name='request.notice'
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
