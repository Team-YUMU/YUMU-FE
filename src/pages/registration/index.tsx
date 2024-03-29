import { useForm } from 'react-hook-form';
import { RegistrationProps } from '@/types/types';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { postAuction } from '@/services/api';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ScrollButtons from '@/components/common/ScrollButtons';

const LeftLabel: React.FC<{
  htmlFor: string;
  mainLabel: string;
  subLabel1?: string;
  subLabel2?: string;
  requiered?: boolean;
}> = ({ htmlFor, mainLabel, subLabel1, subLabel2, requiered }) => {
  return (
    <div className='font-[TheJamsil]'>
      <label htmlFor={htmlFor} className='text-28-400'>
        {mainLabel} {requiered && <span className='text-red-F'>*</span>}
      </label>
      <p className='text-20-500 text-[#9e9e9e]'>{subLabel1}</p>
      <p className='text-20-500 text-[#9e9e9e]'>{subLabel2}</p>
    </div>
  );
};

const RightLabel: React.FC<{ mainLabel: string; subLabel?: string }> = ({ mainLabel, subLabel }) => {
  return (
    <div className='mb-[1.2rem] font-[TheJamsil] '>
      <p className='text-20-700 text-[#686868]'>{mainLabel}</p>
      {subLabel && <p className='text-16-500 text-[#9e9e9e]'>{subLabel}</p>}
    </div>
  );
};

export default function Registration() {
  const { register, handleSubmit } = useForm<RegistrationProps>();

  const [imageFile, setImageFile] = useState<File>();
  const [selectedImage, setSelectedImage] = useState<string>(''); // 대표 이미지 미리보기용

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
      setImageFile(file);
      console.log('Selected image:', file);
      // 대표 이미지 미리보기용
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(String(reader.result));
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No image selected');
    }
  };

  const handleAuctionData = async (data: RegistrationProps) => {
    console.log('handleAuctionData');

    const formData = new FormData();
    formData.append('image', imageFile as unknown as string);

    for (const [key, value] of Object.entries(data)) {
      console.log(key, value);
      formData.append(key, value);
    }

    postAuction(formData).then(() => alert('저장되었습니다!'));
  };

  function onPost(data: RegistrationProps) {
    console.log('data : ', data);
    handleAuctionData(data);
  }

  return (
    <div className='relative m-auto flex w-[138rem] gap-2 pt-2 text-[#222] md:w-[60rem] sm:w-[40rem]'>
      <form onSubmit={handleSubmit(onPost)} encType='multipart/form-data' className='w-full'>
        <div className='relative mb-[8rem] flex w-full flex-row items-center justify-between text-20-500'>
          <h1 className='p-0 font-[TheJamsil] text-36-400'>작품 등록</h1>
          <Button
            type='submit'
            variant={'outline'}
            className='h-[4.8rem] w-[16rem] shrink-0 border-[#ffad33] text-[#ffad33]'
          >
            저장하기
          </Button>
        </div>
        <div className='grid w-full grid-cols-[1fr_2fr] gap-2 px-[8.8rem]'>
          <LeftLabel
            htmlFor='artName'
            mainLabel='작품 제목'
            subLabel1='당신의 노력이 더욱 빛날 수 있도록'
            subLabel2='멋진 제목을 붙여주세요!'
            requiered
          />
          <div>
            <RightLabel mainLabel='긴 제목' subLabel='* 상세 페이지에 나오는 제목입니다.' />
            <Input
              {...register('artName')}
              id='artName'
              placeholder='긴 제목을 입력해주세요.'
              className='mb-[3rem] text-16-500 '
            />
            <RightLabel mainLabel='짧은 제목' subLabel='* 배너에 나오는 제목입니다.' />
            <Input
              {...register('artSubTitle')}
              id='artSubTitle'
              placeholder='짧은 제목을 입력해주세요.'
              className='text-16-500'
            />
          </div>
          <Separator className='col-span-2 my-[8rem]' />
          <LeftLabel
            htmlFor='artDescription'
            mainLabel='작품 상세'
            subLabel1='당신의 작품을'
            subLabel2='상세히 소개해주세요!'
            requiered
          />
          <div>
            <RightLabel mainLabel='작품 상세' subLabel='* 이미지 없이, 글로만 설명이 가능합니다.' />
            <Textarea
              {...register('artDescription')}
              id='artDescription'
              placeholder='작품 상세를 입력해주세요.'
              className='mb-[3rem] min-h-[20rem] w-full resize-none border border-[#e0e0e0] bg-[#fafafa] px-[3.2rem] py-[2rem] font-[NotoSansKR] text-16-500 placeholder:text-[#bdbdbd] '
            />
            <RightLabel mainLabel='작품 요약' subLabel='* 메인페이지에 나오는 요약입니다.' />
            <Textarea
              {...register('artSummary')}
              id='artSummary'
              placeholder='작품 요약을 입력해주세요.'
              className='min-h-[10rem] w-full resize-none border border-[#e0e0e0] bg-[#fafafa] px-[3.2rem] py-[2rem] font-[NotoSansKR] text-16-500 placeholder:text-[#bdbdbd]'
            />
          </div>
          <Separator className='col-span-2 my-[8rem]' />
          <LeftLabel
            htmlFor='image'
            mainLabel='대표 이미지'
            subLabel1='작품을 쉽게 파악할 수 있도록'
            subLabel2='멋진 이미지를 선정해주세요!'
          />
          <div className='m-0 h-fit w-full p-0'>
            <RightLabel mainLabel='대표 이미지' subLabel='* 작품을 나타내는 이미지입니다.' />
            <div className='relative m-0 h-[36rem] w-full p-0'>
              <Input
                id='image'
                type='file'
                accept='image/*'
                required
                style={{
                  backgroundImage: `url(${selectedImage})`,
                }}
                className='z-20 h-full w-full bg-contain bg-center bg-no-repeat p-0 text-16-500 text-[#fafafa]'
                onChange={handleImageChange}
              />
              {!imageFile && (
                <div className='absolute bottom-1/2 right-1/2 z-10 flex translate-x-1/2 translate-y-1/2 flex-col items-center justify-center font-[NotoSansKR] text-20-700 text-[#9e9e9e]'>
                  <Upload color='#ff7752' className='mb-[0.8rem] size-[2rem]' />
                  <p className='text-[#686868]'>이미지 업로드</p>
                  <p className='text-16-500'>파일형식 : jpg 또는 png</p>
                  <p className='text-16-500'>사이즈 : 910px ⨯ 540px</p>
                  <p className='text-nowrap text-16-500'>*작품 상세에서 가장 먼저 보이는 이미지입니다.</p>
                </div>
              )}
            </div>
          </div>
          <Separator className='col-span-2 my-[8rem]' />
          <LeftLabel
            htmlFor='artSize'
            mainLabel='작품 규모'
            subLabel1='당신의 작품의 크기를'
            subLabel2='모두에게 알려주세요!'
            requiered
          />
          <div>
            <RightLabel mainLabel='작품 규모' subLabel='* 단위는 cm입니다.' />
            <Input
              {...register('artSize')}
              id='artSize'
              placeholder='작품 규모를 입력해주세요.'
              className='text-16-500'
            />
          </div>
          <Separator className='col-span-2 my-[8rem]' />
          <LeftLabel
            htmlFor='artCreatedDate'
            mainLabel='제작 일자'
            subLabel1='당신의 작품이 언제 탄생했는지'
            subLabel2='모두에게 알려주세요!'
            requiered
          />
          <div>
            <RightLabel mainLabel='제작 일자' subLabel='* 대략적인 제작 일자를 입력해주세요.' />
            <Input
              {...register('artCreatedDate')}
              id='artCreatedDate'
              type='datetime-local'
              className='w-1/2 text-16-500'
            />
          </div>
          <Separator className='col-span-2 my-[8rem]' />
          <LeftLabel
            htmlFor='auctionStartDate'
            mainLabel='경매 기간'
            subLabel1='언제 경매가 이뤄지는지'
            subLabel2='확실하게 말해주세요!'
            requiered
          />
          <div>
            <RightLabel mainLabel='경매 시작일' />
            <Input
              {...register('auctionStartDate')}
              id='auctionStartDate'
              type='datetime-local'
              className='mb-[3rem] w-1/2 text-16-500'
            />
            <RightLabel mainLabel='경매 종료일' />
            <Input
              {...register('auctionEndDate')}
              id='auctionEndDate'
              type='datetime-local'
              className='w-1/2 text-16-500'
            />
          </div>
          <Separator className='col-span-2 my-[8rem]' />
          <LeftLabel
            htmlFor='defaultBid'
            mainLabel='기본 입찰가'
            subLabel1='당신 작품의 최소 가치를'
            subLabel2='고려해주세요!'
          />
          <div>
            <RightLabel mainLabel='기본 입찰가' subLabel='* 최저 입찰액입니다.' />
            <Input
              {...register('defaultBid')}
              id='defaultBid'
              type='number'
              placeholder='기본 입찰가를 입력해주세요.'
              className='text-16-500'
            />
          </div>
          <Separator className='col-span-2 my-[8rem]' />
          <LeftLabel
            htmlFor='receiveType'
            mainLabel='수령 방법'
            subLabel1='당신의 작품은'
            subLabel2='어떻게 전달되나요?'
          />
          <div>
            <RightLabel mainLabel='수령 방법' subLabel='* 기타일 경우, 유의사항이나 작품 상세에 입력해주세요.' />
            <select
              {...register('receiveType')}
              id='receiveType'
              className='h-[6.4rem] w-1/2 rounded-[0.6rem] border-[0.1rem] border-[#e0e0e0] bg-[#fafafa] px-[4rem] py-[1.5rem] text-16-500 outline-gray-E focus:outline-orange-F focus-visible:ring-offset-2'
            >
              <option value='직접거래' className='text-16-500'>
                직접 거래
              </option>
              <option value='배송' className='text-16-500'>
                택배 배송
              </option>
              <option value='우편' className='text-16-500'>
                우편 배송
              </option>
              <option value='이메일' className='text-16-500'>
                이메일
              </option>
              <option value='기타' className='text-16-500'>
                기타
              </option>
            </select>
          </div>
          <Separator className='col-span-2 my-[8rem]' />
          <LeftLabel
            htmlFor='notice'
            mainLabel='유의 사항'
            subLabel1='작품과 경매에서의'
            subLabel2='유의 사항을 알려주세요!'
          />
          <div>
            <RightLabel mainLabel='유의 사항' subLabel='* 상세 페이지에 나오는 유의 사항입니다.' />
            <Textarea
              {...register('notice')}
              id='notice'
              placeholder='유의사항 '
              className='min-h-[20rem] w-full resize-none border border-[#e0e0e0] bg-[#fafafa] px-[3.2rem] py-[2rem] font-[NotoSansKR] text-16-500 placeholder:text-[#bdbdbd]'
            />
          </div>
        </div>
      </form>
      <ScrollButtons />
    </div>
  );
}
