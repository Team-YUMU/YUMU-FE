import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useRouter } from 'next/router';
import SearchForm from './SearchForm';
import Image from 'next/image';
import { getMemberInfo, postAuthLogout } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

interface userData {
  nickname: string;
  profileImage: string;
}

export default function Header() {
  const router = useRouter();

  const { data: memberData } = useQuery<userData>({
    queryKey: ['memberData'],
    queryFn: () => getMemberInfo(),
  });

  const handleLogout = async () => {
    try {
      await postAuthLogout();
      router.reload();
      window.location.href = '/';
    } catch (error) {
      console.error('로그아웃 오류:', error);
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
        <div className='flex'>
          {memberData ? (
            <div className='flex cursor-pointer items-center gap-[1.2rem]'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className='mr-[3.3rem] flex items-center'>
                    <Avatar className='mr-[.8rem] h-[2.4rem] w-[2.4rem]'>
                      <AvatarImage src={memberData.profileImage} />
                    </Avatar>
                    <span className='text-center text-16-400  leading-[2rem] text-[#9E9E9E]'>
                      {memberData.nickname}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mt-[1.2rem] w-[14.5rem]'>
                  <DropdownMenuItem>
                    <User strokeWidth={2.5} size={15} color='#C5C5C5' className='mr-2 text-[##C5C5C5]' />
                    <Link href='/mypage' className='text-16-500 leading-[2rem] text-[#9E9E9E]'>
                      마이페이지
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut strokeWidth={2.5} size={15} color='#C5C5C5' className='mr-2 ' />
                    <span className='text-16-500 leading-[2rem] text-[#9E9E9E]'>로그아웃</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className='flex items-center'>
              <Link href='/signin' className='mr-[2.5rem] text-[1.6rem] text-[#9E9E9E]'>
                로그인
              </Link>
              <Link href='/signup' className='mr-[2.5rem] text-[1.6rem]  text-[#9E9E9E]'>
                회원가입
              </Link>
            </div>
          )}
          <Button size='header' className='mb-[1.1rem] mt-[1.3rem] bg-red-F font-bold leading-5 text-white '>
            <Link href='/registration' className='text-[1.6rem]'>
              경매등록하기
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
