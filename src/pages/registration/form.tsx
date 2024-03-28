import { useForm } from 'react-hook-form';
import { RegistrationProps } from '@/types/types';
import { Input } from '@/components/ui/input';
import { LegacyRef, MutableRefObject, useRef, useState, useEffect } from 'react';
import { postAuction } from '@/services/api';

export default function Registration() {
  const [postAuctionData, setPostAuctionData] = useState<RegistrationProps>({
    artName: '',
    artSubTitle: '',
    artDescription: '',
    artSummary: '',
    artSize: '',
    artCreatedDate: '',
    auctionStartDate: '',
    auctionEndDate: '',
    defaultBid: 0,
    notice: '',
    receiveType: '',
    image: '',
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit } = useForm<RegistrationProps>();

  const LeftLabel: React.FC<{ htmlFor: string; mainLabel: string; subLabel1: string; subLabel2?: string }> = ({
    htmlFor,
    mainLabel,
    subLabel1,
    subLabel2,
  }) => {
    return (
      <div>
        <label htmlFor={htmlFor} className='text-20-500'>
          {mainLabel}
        </label>
        <p className='text-16-400'>{subLabel1}</p>
        <p className='text-16-400'>{subLabel2}</p>
      </div>
    );
  };

  const handleAuctionData = async (data: RegistrationProps) => {
    if (inputRef.current?.files) {
      console.log('if문 실행 여부 확인용');
      const uploadFile = inputRef.current.files[0]; // <File>
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
        // image type : <FileList>
      });

      console.log(URL.createObjectURL(new Blob(data.image)));
      // blob:http://localhost:3000/c95dbc88-4350-4d66-826a-7b7bc8323590

      formData.append('image', uploadFile); //type : <File>

      // console.log('postAuctionData1', postAuctionData);

      const res = await postAuction(formData);

      console.log('postAuctionData2', postAuctionData);

      try {
        console.log('try');
        if (res.status === 200) {
          setPostAuctionData(res);
          alert('등록되었습니다.');
        }
      } catch (error) {
        console.log('handleAuctionData Error : ', error);
      }
    }
  };

  // useEffect(() => {
  //   handleAuctionData();
  // }, []);

  function onPost(data: RegistrationProps) {
    handleAuctionData(data);
    console.log('data : ', data);
  }

  return (
    <div className='m-auto w-[137.6rem] pt-2 font-[TheJamsil] text-[#222] md:w-[60rem] sm:w-[40rem]'>
      <h1 className='mb-[8rem] p-0 text-36-400'>작품등록</h1>
      <form onSubmit={handleSubmit(onPost)} encType='multipart/form-data' className='grid grid-cols-[2fr_3fr] gap-2'>
        <LeftLabel htmlFor='artName' mainLabel='작품 제목' subLabel1='멋진 제목을 붙여주세요!' subLabel2='최고!' />
        <Input {...register('artName')} id='artName' placeholder='작품 이름' className='border' />
        <div>
          <label className='text-20-500' htmlFor='artSubTitle'>
            작품 부제
          </label>
        </div>
        <Input {...register('artSubTitle')} id='artSubTitle' placeholder='작품 부제' className='border' />
        <div>
          <label className='text-20-500' htmlFor='artDescription'>
            작품 상세
          </label>
        </div>
        <Input {...register('artDescription')} id='artDescription' placeholder='작품 설명' className='border' />
        <div>
          <label className='text-20-500' htmlFor='artSummary'>
            작품 요약
          </label>
        </div>
        <Input {...register('artSummary')} id='artSummary' placeholder='작품 요약' className='border' />
        <div>
          <label className='text-20-500' htmlFor='artSize'>
            작품 규모
          </label>
        </div>
        <Input {...register('artSize')} id='artSize' placeholder='작품 크기' className='border' />
        <div>
          <label className='text-20-500' htmlFor='artCreatedDate'>
            제작 일자
          </label>
        </div>
        <Input
          {...register('artCreatedDate')}
          id='auctionStartDate'
          type='datetime-local'
          placeholder='제작 일자'
          className='border'
        />
        <div>
          <label className='text-20-500' htmlFor='auctionStartDate'>
            경매 시작 일시
          </label>
        </div>
        <Input
          {...register('auctionStartDate')}
          id='auctionStartDate'
          type='datetime-local'
          placeholder='경매 시작일'
          className='border'
        />
        <div>
          <label className='text-20-500' htmlFor='auctionEndDate'>
            경매 종료 일시
          </label>
        </div>
        <Input
          {...register('auctionEndDate')}
          id='auctionEndDate'
          type='datetime-local'
          placeholder='경매 종료일'
          className='border'
        />
        <div>
          <label className='text-20-500' htmlFor='defaultBid'>
            기본 입찰가
          </label>
        </div>
        <Input {...register('defaultBid')} id='defaultBid' type='number' placeholder='기본 입찰가' className='border' />
        <div>
          <label className='text-20-500' htmlFor='notice'>
            유의 사항
          </label>
        </div>
        <Input {...register('notice')} id='notice' placeholder='유의사항' className='border' />
        <div>
          <label className='text-20-500' htmlFor='receiveType'>
            수령 방법
          </label>
        </div>
        <Input {...register('receiveType')} id='receiveType' placeholder='수령 방법' className='border' />
        <div>
          <label className='text-20-500' htmlFor='image'>
            대표 이미지
          </label>
        </div>
        <Input
          {...register('image')}
          id='image'
          type='file'
          accept='image/*'
          required
          placeholder='이미지'
          className='border'
          ref={inputRef}
        />
        <button type='submit' className='col-span-2 border text-20-500'>
          등록
        </button>
      </form>
    </div>
  );
}
