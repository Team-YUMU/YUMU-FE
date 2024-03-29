import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useRouter } from 'next/router';
import axios from 'axios';
// import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
// import { IoIosNotifications } from 'react-icons/io';
// import { HiDotsVertical } from 'react-icons/hi';
import SearchForm from './SearchForm';
import Image from 'next/image';
// import getMembers from '@/mocks/Member';

type userData = {
  nickname: string;
  profileImage: string | undefined;
};

export default function Header() {
  const [memberData, setMemberData] = useState<userData | null>(null);
  const router = useRouter();
  const boardId = router.query.id;

  //데이터를 불러온다.
  const userMembersData = async () => {
    try {
      const response = await axios.get<userData>('../../mocks/Member');
      const { nickname, profileImage } = response.data;
      console.log(response.data);
      setMemberData({ nickname, profileImage });
    } catch (error) {
      console.error(error);
    }
    console.log(memberData);
  };

  //id 값이 바뀔때 마다 실행되지만 accesstoken 로컬 스토리지에 존재하는 경우 닉네임 데이터를 가져 온다.
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    if (accessToken) {
      userMembersData();
    }
  }, [boardId]);

  //로그아웃 클릭시 토큰 제거와 메인 페이지 이동
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    if (!localStorage.getItem('accessToken')) {
      router.push('/');
    }
  };

  return (
    <header className=' bg-slate-50'>
      <div className='container mx-auto flex items-center justify-between'>
        <Link href='/'>
          <Image src='/svgs/yumu-logo.svg' alt='로고 이미지' width={139} height={27} />
        </Link>
        <div>
          <SearchForm />
        </div>
        <div>
          {memberData ? (
            <div className='relative flex cursor-pointer items-center gap-[1.2rem]'>
              <Avatar>
                {memberData.profileImage ? (
                  <AvatarImage src={memberData.profileImage} />
                ) : (
                  <div className='h-10 w-10 rounded-full bg-[gray]'></div>
                )}
              </Avatar>
              <span className='text-center text-16-600 sm:hidden'>{memberData.nickname}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='ml-[1rem]'>
                    ▼
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mr-[2rem] w-56'>
                  <DropdownMenuItem>
                    <LogOut className='mr-2 h-4 w-4' />
                    <span onClick={handleLogout}>로그아웃</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link href='/signin' className='mr-[2.5rem] text-[1.6rem] text-[#9E9E9E]'>
                로그인
              </Link>
              <Link href='/signup' className='mr-[2.5rem] text-[1.6rem]  text-[#9E9E9E]'>
                회원가입
              </Link>
              {/* <HoverCard> 알림기능
                <HoverCardTrigger asChild>
                  <Button>
                    <IoIosNotifications />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className='mr-[2rem] w-80 bg-[#ddd] pb-[0rem]'>
                  <div className='mb-4 flex justify-between space-x-4 rounded-[0.8rem] bg-[#fff] p-[0.4rem]'>
                    <div className='flex h-[2rem] w-[3rem] items-center justify-center rounded-full '>
                      <IoIosNotifications />
                    </div>
                    <div className='space-y-1'>
                      <h4 className='text-sm font-semibold'>경매 1시간전 </h4>
                      <p className='text-sm'>[백만불짜리]의 경매 시작 1시간전 입니다.</p>
                      <div className='flex items-center pt-2'>
                        <span className='text-xs text-muted-foreground'>08:00</span>
                      </div>
                    </div>
                    <div>
                      <HiDotsVertical />
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard> */}
            </>
          )}
          <Button size='header' className='mb-[1.1rem] mt-[1.3rem] bg-red-F font-bold leading-5 text-white '>
            <Link href='/registration' className='text-[1.6rem]'>
              경매등록하기
            </Link>
          </Button>
        </div>
      </div>
      {/* <div className='bg-[ bg-slate-50] container mx-auto flex justify-end'>
        <SearchForm />
      </div> */}
    </header>
  );
}
