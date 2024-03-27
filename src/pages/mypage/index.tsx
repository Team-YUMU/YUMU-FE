import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import MyPageTabs from '../../components/domain/myPage/Tabs/MyPageTabs';
import Edit from '@/components/domain/myPage/Tabs/Edit/Edit';
import { useRouter } from 'next/router';
import Members from '@/mocks/Member';
// import { getMemberInfo } from '@/services/api';

export default function MyPage() {
  const [memberInfo] = useState({
    password: '',
    newPassword: '',
    newPasswordCheck: '',
    file: '',
    id: 2,
    email: 'example2@example.com',
    nickname: '홍길동',
    profileImageUrl: '',
    introduce: '안녕하세요. 저는 유저2입니다.',
    snsLink: 'https://www.example.com/user2',
    address: null,
  });
  const [changeUi, setChangeUi] = useState(false);
  const router = useRouter();

  const MembersData = Members;

  const handleChangeUi = () => {
    setChangeUi(!changeUi);
  };
  const handleLogoutClick = () => {
    // localStorage.removeItem
    router.push('/');
  };

  return (
    <main className='flex h-full min-h-[60vh] w-full flex-col justify-center gap-[8.2rem]'>
      <p className='ml-[28rem] mt-[8rem] font-TheJamsil text-36-500 text-black-2'>마이페이지</p>
      <div className='flex items-center justify-center'>
        <div className='flex flex-row gap-[10.5rem]'>
          {changeUi === true ? (
            <Edit setChangeUi={setChangeUi} />
          ) : (
            <>
              {' '}
              <div className='inline-flex flex-col items-center gap-[3rem]'>
                <Image
                  src='svgs/profile-image.svg'
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
                <p className='h-[6.3rem] w-[22rem] text-center text-16-500 leading-[2rem] text-gray-9'>
                  작가설명을 이렇게 넣어요! 최대 3줄이 들어가요! 이렇게!
                </p>

                <Separator className='w-full' />
                <p className='h-[2.3rem] w-[28rem] text-center text-16-400 leading-[2rem] text-gray-9'>
                  {MembersData[1].email}
                </p>

                <Button
                  onClick={handleLogoutClick}
                  className='  text-center text-16-500  text-gray-9'
                  size={'myPage'}
                  variant={'myPage'}
                >
                  로그아웃
                </Button>
              </div>
              <section>
                <MyPageTabs />
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
