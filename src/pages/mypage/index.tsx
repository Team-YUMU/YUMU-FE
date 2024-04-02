import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import MyPageTabs from '../../components/domain/myPage/Tabs/MyPageTabs';
import Edit from '@/components/domain/myPage/Tabs/Edit/Edit';
import { useRouter } from 'next/router';
import { getMemberInfo, postAuthLogout } from '@/services/api';

interface MembersInfoProps {
  nickname: string;
  email: string;
  introduce: null | string;
  snsLink: null | string;
  profileImage: string;
  loginStatus: null | string;
}

export default function MyPage() {
  const [memberInfo, setMemberInfo] = useState<MembersInfoProps>({
    nickname: '',
    email: '',
    introduce: '',
    snsLink: '',
    profileImage: '',
    loginStatus: null,
  });
  const [changeUi, setChangeUi] = useState(false);
  const router = useRouter();

  const memberInfoData = async () => {
    const res = await getMemberInfo();
    setMemberInfo(res);
  };

  useEffect(() => {
    memberInfoData();
  }, []);
  const handleChangeUi = () => {
    setChangeUi(!changeUi);
  };
  const handleLogoutClick = async () => {
    try {
      await postAuthLogout();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleMyPageReload = () => {
    router.reload();
  };

  return (
    <div className='flex h-full min-h-[60vh] w-full flex-col justify-center gap-[4.2rem] md:w-[120rem]'>
      <div
        className='mac:ml-[3rem] ml-[28rem] mt-[8rem] inline-flex items-center  gap-[0.6rem] py-[1rem]'
        onClick={handleMyPageReload}
      >
        <h1 className='font-TheJamsil text-36-500 text-black-2'>마이페이지</h1>
        <div className='flex h-[1.5556rem] w-[1.5556rem] items-center justify-center'>
          {changeUi === true ? (
            <Image src={'/svgs/my-page-arrow-icon.svg'} width={15.556} height={15.556} alt='정보 수정 화살표 아이콘' />
          ) : null}
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div className='flex flex-row gap-[10.5rem]'>
          {changeUi === true ? (
            <Edit />
          ) : (
            <>
              {' '}
              <div className='inline-flex flex-col items-center gap-[3rem]'>
                <Image
                  src={memberInfo.profileImage}
                  width={183}
                  height={183}
                  alt='회원 이미지'
                  className='h-[20rem] w-[20rem] rounded-[20rem] bg-no-repeat'
                />
                <div className='inline-flex gap-[0.6rem] py-[1rem] pr-0' onClick={handleChangeUi}>
                  <p className='text-center text-36-500 leading-[2rem] text-black-2 '>{memberInfo.nickname}</p>
                  <div className='flex h-[1.5556rem] w-[1.5556rem] items-center justify-center'>
                    <Image
                      src={'/svgs/my-page-arrow-icon.svg'}
                      width={15.556}
                      height={15.556}
                      alt='정보 수정 화살표 아이콘'
                    />
                  </div>
                </div>
                <p className='h-[6.3rem] w-[22rem] break-words text-center text-16-500 leading-[2rem] text-gray-9'>
                  {memberInfo.introduce === null ? '소개 글을 작성 해주세요.' : memberInfo.introduce}
                </p>

                <Separator className='w-full' />
                <p className='h-[2.3rem] w-[28rem] text-center text-16-400 leading-[2rem] text-gray-9'>
                  {memberInfo.loginStatus === 'DEFAULT' ? memberInfo.email : '카카오로 로그인 되었습니다.'}
                </p>

                <Button onClick={handleLogoutClick} size={'myPage'} variant={'myPage'}>
                  <span className='  text-center text-16-500  text-gray-9'>로그아웃</span>
                </Button>
              </div>
              <section>
                <MyPageTabs />
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
