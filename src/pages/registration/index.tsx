'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Upload } from 'lucide-react';
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
import { auctionFormSchema } from '@/types/validator/auctionForm';
import { ReactNode, useState } from 'react';
import { TimePickerDemo } from '@/components/domain/live/time-picker-demo';
import { postAuction } from '@/services/api';
import { RegistrationProps } from '@/types/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const defaultValues: Partial<RegistrationProps> = {
  request: {
    artName: '',
    artSubTitle: '',
    artDescription: '',
    artSummary: '',
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

const tabMenus: Record<string, number> = {
  기본등록: 0,
  작품상세: 1,
};

const SecondLabel: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className='font-[NotoSansKR] text-20-500 text-[#9e9e9e]'>{children}</div>;
};
const ThirdLabel: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className='font-[NotoSansKR] text-20-700 text-[#686868]'>{children}</div>;
};
const ForthLabel: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className='font-[NotoSansKR] text-16-500 text-[#9e9e9e]'>{children}</div>;
};

export default function Registration() {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const form = useForm<RegistrationProps>({
    resolver: zodResolver(auctionFormSchema),
    defaultValues,
  });

  function onSubmit(data: RegistrationProps) {
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
    <div className='m-auto w-[137.6rem] pt-2 font-[TheJamsil] text-[#222] md:w-[60rem] sm:w-[40rem]'>
      <h1 className='mb-[8rem] p-0 text-36-400 '>작품등록</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs defaultValue='기본등록' className=' w-full'>
            <TabsList className='mb-[9.6rem] flex h-[3.7rem] w-full flex-row gap-[2rem] text-[#c5c5c5]'>
              {Object.keys(tabMenus).map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={`h-full w-[14.4rem] border-b-[0.4rem] pb-[1.5rem] pt-0 text-20-400 data-[state=active]:text-black-2`}
                >
                  {tab}
                </TabsTrigger>
              ))}
              <div className='grow' />
              <div className='text-16-700'>
                <Button
                  type='submit'
                  variant={'outline'}
                  className='h-[4.8rem] w-[16rem] shrink-0 border-[#ffad33] text-[#ffad33]'
                >
                  저장하기
                </Button>
              </div>
            </TabsList>
            <TabsContent value='기본등록' className='m-auto w-[120rem] px-[8.8rem]'>
              <FormField
                control={form.control}
                name='request.artName'
                render={({ field }) => (
                  <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                    <div className='space-y-[1.2rem] pt-3'>
                      <FormLabel className='text-28-400'>
                        작품 제목 <span className='text-red-F'>*</span>
                      </FormLabel>
                      <SecondLabel>
                        <p>
                          당신의 노력이 더욱 빛날 수 있도록
                          <br />
                          멋진 제목을 붙여주세요!
                        </p>
                      </SecondLabel>
                    </div>
                    <div className='space-y-[1.2rem]'>
                      <div>
                        <ThirdLabel>
                          <p>작품 제목</p>
                        </ThirdLabel>
                        <ForthLabel>*상세페이지에 나오는 제목입니다.</ForthLabel>
                      </div>
                      <FormControl>
                        <Input
                          placeholder='작품 제목을 입력해주세요.'
                          className='font-[NotoSansKR] text-16-500'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Separator className='my-[8rem]' />
              <FormField
                control={form.control}
                name='request.artSubTitle'
                render={({ field }) => (
                  <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                    <div className='space-y-[1.2rem] pt-3'>
                      <FormLabel className='text-28-400'>
                        짧은 제목 <span className='text-red-F'>*</span>
                      </FormLabel>
                      <SecondLabel>
                        <p>
                          작품을 빠르고 쉽게 이해할 수 있도록
                          <br />
                          명확하고 간략하게 소개해주세요!
                        </p>
                      </SecondLabel>
                    </div>
                    <div className='space-y-[1.2rem]'>
                      <div>
                        <ThirdLabel>
                          <p>작품 요약</p>
                        </ThirdLabel>
                        <ForthLabel>*메인페이지에 나오는 안내글입니다.</ForthLabel>
                      </div>
                      <FormControl>
                        <Input
                          placeholder='작품 제목을 입력해주세요.'
                          className='font-[NotoSansKR] text-16-500'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Separator className='my-[8rem]' />
              <FormField
                control={form.control}
                name='request.artSummary'
                render={({ field }) => (
                  <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                    <div className='space-y-[1.2rem] pt-3'>
                      <FormLabel className='text-28-400'>
                        작품 요약 <span className='text-red-F'>*</span>
                      </FormLabel>
                      <SecondLabel>
                        <p>
                          작품을 빠르고 쉽게 이해할 수 있도록
                          <br />
                          명확하고 간략하게 소개해주세요!
                        </p>
                      </SecondLabel>
                    </div>
                    <div className='space-y-[1.2rem]'>
                      <div>
                        <ThirdLabel>
                          <p>작품 요약</p>
                        </ThirdLabel>
                        <ForthLabel>*메인페이지에 나오는 안내글입니다.</ForthLabel>
                      </div>
                      <FormControl>
                        <Input
                          placeholder='작품 제목을 입력해주세요.'
                          className='font-[NotoSansKR] text-16-500'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Separator className='my-[8rem]' />
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                    <div className='space-y-[1.2rem] pt-3'>
                      <FormLabel className='text-28-400'>
                        대표 이미지 <span className='text-red-F'>*</span>
                      </FormLabel>
                      <SecondLabel>
                        <p>
                          작품을 쉽게 파악할 수 있도록
                          <br />
                          멋진 이미지를 선정해주세요!
                        </p>
                      </SecondLabel>
                    </div>
                    <div className='space-y-[1.2rem]'>
                      <div>
                        <ThirdLabel>
                          <p>대표 이미지</p>
                        </ThirdLabel>
                        <ForthLabel>*상세페이지에 나오는 이미지입니다.</ForthLabel>
                      </div>
                      <FormControl>
                        <div className='h-[18rem] w-full bg-[#fafafa] p-0 hover:bg-[#fafafa] focus:bg-[#fafafa] sm:h-[9rem]'>
                          <div className='relative m-0 h-full w-full p-0'>
                            <Input
                              style={{
                                backgroundImage: `url(${selectedImage})`,
                              }}
                              type='file'
                              onInput={handleFileChange}
                              accept='image/*'
                              className='z-20 h-full w-full border-none bg-contain bg-center bg-no-repeat p-0 font-[NotoSansKR] text-16-500 text-[#fafafa]'
                              {...field}
                            />
                            {!selectedImage && (
                              <div className='absolute bottom-1/2 right-1/2 z-10 flex translate-x-1/2 translate-y-1/2 flex-col items-center justify-center font-[NotoSansKR] text-20-700 text-[#9e9e9e]'>
                                <Upload color='#ff7752' className='mb-[0.8rem] size-[2rem]' />
                                <p className='text-[#686868]'>이미지 업로드</p>
                                <p className='text-16-500'>파일형식 : jpg 또는 png</p>
                                <p className='text-16-500'>사이즈 : 910px ⨯ 540px</p>
                                <p className='textnowrap text-16-500'>*작품 상세에서 가장 먼저 보이는 이미지입니다.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Separator className='my-[8rem]' />
              <FormField
                control={form.control}
                name='request.artSize'
                render={({ field }) => (
                  <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                    <div className='space-y-[1.2rem] pt-3'>
                      <FormLabel className='text-28-400'>
                        작품 규모 <span className='text-red-F'>*</span>
                      </FormLabel>
                      <SecondLabel>
                        <p>
                          당신의 작품의 크기를
                          <br />
                          정확하게 알려주세요!
                        </p>
                      </SecondLabel>
                    </div>
                    <div className='space-y-[1.2rem]'>
                      <div>
                        <ThirdLabel>
                          <p>작품 규모</p>
                        </ThirdLabel>
                        <ForthLabel>*단위는 cm입니다.</ForthLabel>
                      </div>
                      <FormControl>
                        <Input placeholder='가로x세로x높이' className='font-[NotoSansKR] text-16-500' {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Separator className='my-[8rem]' />
              <FormField
                control={form.control}
                name='request.artCreatedDate'
                render={({ field }) => (
                  <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                    <div className='space-y-[1.2rem] pt-3'>
                      <FormLabel className='text-28-400'>
                        제작 일자 <span className='text-red-F'>*</span>
                      </FormLabel>
                      <SecondLabel>
                        <p>
                          당신의 작품이 언제 탄생했는지
                          <br />
                          모두에게 알려주세요!
                        </p>
                      </SecondLabel>
                    </div>
                    <div className='space-y-[1.2rem]'>
                      <div>
                        <ThirdLabel>
                          <p>제작 일자</p>
                        </ThirdLabel>
                        <ForthLabel>*대략적인 제작 일자를 기입해주세요.</ForthLabel>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'h-[6.4rem] w-full justify-start rounded-[0.5rem] border border-[#e0e0e0] bg-[#fafafa] px-[3rem] py-[1rem] text-left text-16-500 hover:bg-[#fafafa]',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            <CalendarIcon color='#a4a09c' className='mr-[2rem] h-[2.4rem] w-[2.4rem]' />
                            {field.value ? (
                              format(field.value, 'yyyy년 MM월 dd일')
                            ) : (
                              <span className='font-[NotoSansKR] text-16-500 text-[#a4a09c]'>제작 일자</span>
                            )}
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
              <Separator className='my-[8rem]' />
              <FormField
                control={form.control}
                name='request.auctionStartDate'
                render={({ field }) => (
                  <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                    <div className='space-y-[1.2rem] pt-3'>
                      <FormLabel className='text-28-400'>
                        경매 기간 <span className='text-red-F'>*</span>
                      </FormLabel>
                      <SecondLabel>
                        <p>
                          언제 경매가 이뤄지는지
                          <br />
                          확실하게 말해주세요!
                        </p>
                      </SecondLabel>
                    </div>
                    <div className='space-y-[1.2rem]'>
                      <div>
                        <ThirdLabel>
                          <p>경매 시작 일시</p>
                        </ThirdLabel>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'h-[6.4rem] w-full justify-start rounded-[0.5rem] border border-[#e0e0e0] bg-[#fafafa] px-[3rem] py-[1rem] text-left text-16-500 hover:bg-[#fafafa]',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            <CalendarIcon color='#a4a09c' className='mr-[2rem] h-[2.4rem] w-[2.4rem]' />
                            {field.value ? (
                              format(field.value, 'yyyy년 MM월 dd일 HH:mm')
                            ) : (
                              <span className='font-[NotoSansKR] text-16-500 text-[#a4a09c]'>경매 시작 일시</span>
                            )}
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
                            <TimePickerDemo
                              setDate={field.onChange}
                              date={field.value}
                              isSeconds={false}
                              isIcon={false}
                            />
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
                    <div className='space-y-[1.2rem] pt-3'>
                      <div>
                        <ThirdLabel>
                          <p>경매 종료 일시</p>
                        </ThirdLabel>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'h-[6.4rem] w-full justify-start rounded-[0.5rem] border border-[#e0e0e0] bg-[#fafafa] px-[3rem] py-[1rem] text-left text-16-500 hover:bg-[#fafafa]',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            <CalendarIcon color='#a4a09c' className='mr-[2rem] h-[2.4rem] w-[2.4rem]' />
                            {field.value ? (
                              format(field.value, 'yyyy년 MM월 dd일 HH:mm')
                            ) : (
                              <span className='font-[NotoSansKR] text-16-500 text-[#a4a09c]'>경매 종료 일시</span>
                            )}
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
                            <TimePickerDemo
                              setDate={field.onChange}
                              date={field.value}
                              isSeconds={false}
                              isIcon={false}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Separator className='my-[8rem]' />
              <FormField
                control={form.control}
                name='request.defaultBid'
                render={({ field }) => (
                  <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                    <div className='space-y-[1.2rem] pt-3'>
                      <FormLabel className='text-28-400'>
                        경매 시작가 <span className='text-red-F'>*</span>
                      </FormLabel>
                      <SecondLabel>
                        <p>
                          당신의 작품의 최소 가치를
                          <br />
                          고려해주세요!
                        </p>
                      </SecondLabel>
                    </div>
                    <div className='space-y-[1.2rem]'>
                      <div>
                        <ThirdLabel>
                          <p>경매 시작가</p>
                        </ThirdLabel>
                        <ForthLabel>*단위는 원입니다</ForthLabel>
                      </div>
                      <FormControl>
                        <Input placeholder='경매 시작가' className='font-[NotoSansKR] text-16-500' {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Separator className='my-[8rem]' />
              <FormField
                control={form.control}
                name='request.receiveType'
                render={({ field }) => (
                  <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                    <div className='space-y-[1.2rem] pt-3'>
                      <FormLabel className='text-28-400'>
                        수령 방법 <span className='text-red-F'>*</span>
                      </FormLabel>
                      <SecondLabel>
                        <p>
                          당신의 노력이 더욱 빛날 수 있도록
                          <br />
                          멋진 제목을 붙여주세요!
                        </p>
                      </SecondLabel>
                    </div>
                    <div className='space-y-[1.2rem] font-[NotoSansKR] text-16-500'>
                      <div>
                        <ThirdLabel>
                          <p>수령 방법</p>
                        </ThirdLabel>
                        <ForthLabel>*상세페이지에 나오는 제목입니다.</ForthLabel>
                      </div>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className='h-[6.4rem] w-full rounded-[0.6rem] border border-[#e0e0e0] bg-[#fafafa] px-[3.2rem] py-[2rem] text-[#bdbdbd]'>
                            <SelectValue placeholder='수령 방법' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='rounded-[0.6rem] border border-[#e0e0e0] bg-[#fafafa] px-[3.2rem] py-[2rem]'>
                          <SelectItem value='직접거래' className='font-[NotoSansKR] text-16-500'>
                            직접 거래
                          </SelectItem>
                          <SelectItem value='배송' className='font-[NotoSansKR] text-16-500'>
                            택배 배송
                          </SelectItem>
                          <SelectItem value='우편' className='font-[NotoSansKR] text-16-500'>
                            우편 배송
                          </SelectItem>
                          <SelectItem value='이메일' className='font-[NotoSansKR] text-16-500'>
                            이메일
                          </SelectItem>
                          <SelectItem value='기타' className='font-[NotoSansKR] text-16-500'>
                            기타
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormItem>
                )}
              />
              <Separator className='my-[8rem]' />
              <FormField
                control={form.control}
                name='request.notice'
                render={({ field }) => (
                  <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                    <div className='space-y-[1.2rem] pt-3'>
                      <FormLabel className='text-28-400'>유의 사항</FormLabel>
                      <SecondLabel>
                        <p>
                          작품과 경매에서의
                          <br />
                          유의 사항을 알려주세요!
                        </p>
                      </SecondLabel>
                    </div>
                    <div className='space-y-[1.2rem]'>
                      <div>
                        <ThirdLabel>
                          <p>유의 사항</p>
                        </ThirdLabel>
                        <ForthLabel>*상세페이지에 나오는 유의사항입니다.</ForthLabel>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder='유의 사항'
                          className='min-h-[20rem] w-full resize-none border border-[#e0e0e0] bg-[#fafafa] px-[3.2rem] py-[2rem] font-[NotoSansKR] text-16-500 placeholder:text-[#bdbdbd]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value='작품상세' className='m-autoflex w-[120rem] flex-col gap-[8rem] px-[8.8rem]'>
              <FormField
                control={form.control}
                name='request.artDescription'
                render={({ field }) => (
                  <FormItem className='grid w-full grid-cols-[2fr_3fr] '>
                    <div className='space-y-[1.2rem] pt-3'>
                      <FormLabel className='text-28-400'>
                        작품 상세 <span className='text-red-F'>*</span>
                      </FormLabel>
                      <SecondLabel>
                        <p>
                          당신의 작품의 가치를
                          <br />
                          글로 보여주세요!
                        </p>
                      </SecondLabel>
                    </div>
                    <div className='space-y-[1.2rem]'>
                      <div>
                        <ThirdLabel>
                          <p>작품 상세</p>
                        </ThirdLabel>
                        <ForthLabel>*상세페이지에 나오는 내용입니다.</ForthLabel>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder='작품 상세'
                          className='min-h-[20rem] w-full resize-none border border-[#e0e0e0] bg-[#fafafa] px-[3.2rem] py-[2rem] font-[NotoSansKR] text-16-500 placeholder:text-[#bdbdbd]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}
