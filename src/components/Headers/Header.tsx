import Link from 'next/link';
// import getMembers from '@/mocks/Member';
import { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import axios from 'axios';

//randing - index.tsx의 header 컴포너트 삭제하고 올려야한다.

type userData = {
  nickname: string;
  profileImage: string | undefined;
};

export default function Header() {
  const [memberData, setMemberData] = useState<userData | null>(null);

  /// 'api/v1/member' 의 데이터를 불러온다.
  // nickname을 담았다.
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

  return (
    <header>
      <div className='container mx-auto flex justify-between bg-[pink]'>
        <Link href='/'>로고</Link>
        <div>
          <Link href='#' className='mr-[2rem] bg-[#fff]'>
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
            </div>
          ) : (
            <>
              <Link href='/signin' className='text-16-400  text-black-3'>
                로그인
              </Link>
            </>
          )}
        </div>
      </div>
      <div className='container mx-auto flex justify-end bg-[pink]'>
        <div>검색 컴포넌트</div>
      </div>
    </header>
  );
}
