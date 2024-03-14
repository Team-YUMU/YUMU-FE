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
import SearchForm from './SearchForm';
import { useRouter } from 'next/router';
import axios from 'axios';
// import getMembers from '@/mocks/Member';

type userData = {
  nickname: string;
  profileImage: string | undefined;
};

export default function Header() {
  const [memberData, setMemberData] = useState<userData | null>(null);
  const router = useRouter();

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
    //의존성 배열 비워두면 안된다
  }, []);

  //로그아웃 클릭시 토큰 제거와 메인 페이지 이동
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    if (!localStorage.getItem('accessToken')) {
      router.push('/');
    }
  };

  return (
    <header>
      <div className='container mx-auto flex justify-between bg-[pink]'>
        <Link href='/'>로고</Link>
        <div>
          <Link href='#' className='mr-[2rem]'>
            작품등록
          </Link>
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
              <Link href='/signin'>로그인</Link>
            </>
          )}
        </div>
      </div>
      <div className='container mx-auto flex justify-end bg-[pink]'>
        <SearchForm />
      </div>
    </header>
  );
}
