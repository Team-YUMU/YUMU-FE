import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/my-page-textarea';
import { Separator } from '@/components/ui/separator';
import { putMemberIntroduceData } from '@/services/api';
interface FormData {
  introduce: string;
}

export default function IntroEditForm({ introduce }: FormData) {
  const { register, handleSubmit, getValues } = useForm<FormData>();

  const INPUT_SETTING = {
    placeholder: {
      introduce: `${introduce}`,
    },
  };

  const onChangeIntroduce = async () => {
    const introduceParams = getValues('introduce');
    try {
      const res = await putMemberIntroduceData(introduceParams);
      if (res.status === 200) {
        alert('성공적으로 수정되었습니다.');
      }
    } catch (error) {
      alert(error);
    } finally {
      window.location.reload();
    }
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='relative flex flex-col gap-[1rem]'>
        <div className='h-[2.3rem] w-[28rem] flex-shrink-0'>
          <label className='text-12-500 leading-[2rem] text-gray-9'>작가설명</label>
        </div>
        <Separator orientation='vertical' className='h-[0.1rem] w-full bg-[#686868] p-0' />
        <>
          <Textarea
            {...register('introduce')}
            placeholder={introduce === null ? '소개 글을 작성 해주세요.' : INPUT_SETTING.placeholder.introduce}
          />
          <div className='flex justify-end'>
            <Button
              type='button'
              onClick={onChangeIntroduce}
              className=' bottom-[1.4rem] right-[1.9rem] rounded-[0.4rem]'
            >
              <span>저장하기</span>
            </Button>
          </div>
        </>
      </div>
    </form>
  );
}
