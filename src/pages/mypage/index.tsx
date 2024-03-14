import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import MyPageTabs from '../../components/domain/myPage/Tabs/MyPageTabs';
import Edit from '@/components/domain/myPage/Tabs/Edit/Edit';
import { useRouter } from 'next/router';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
// import { getMemberInfo } from '@/services/api';

export default function MyPage() {
  const [memberInfo, setMemberInfo] = useState({
    email: '',
    nickname: '닉네임',
    profileImage: null,
  });
  const [changeUi, setChangeUi] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const router = useRouter();

  // const getMembersData = async () => {
  //   try {
  //     const data = await getMemberInfo();
  //     const { email, nickname, profileImage } = data;
  //     setMemberInfo({ email, nickname, profileImage });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   getMembersData();
  // }, []);

  const handleChangeUi = () => {
    setChangeUi(!changeUi);
  };
  const handleLogoutClick = () => {
    // localStorage.removeItem
    router.push('/');
  };

  const handleDeleteUserClick = () => {
    // deleteMembersData();
    setIsOpenModal(!!true);
    router.push('/');
  };
  return (
    <main className='flex h-full min-h-[80vh] w-full items-center justify-center '>
      <article className='flex flex-row gap-[10rem]'>
        <section className='flex flex-col gap-[1rem]'>
          <div className='flex flex-col items-center justify-center gap-5'>
            <Image
              src=''
              width={'183'}
              height={'183'}
              alt='회원 이미지'
              className='border-1 rounded-[50rem] bg-gray-D'
            />
            <p
              onClick={handleChangeUi}
              className=' flex  items-center justify-center gap-[0.1rem] border-black-0 hover:border-b-[0.1rem]'
            >
              {memberInfo.nickname}
            </p>
            <p className='flex h-[2.9rem] w-[9.6rem] items-center justify-center'>작가 설명</p>
            <Separator className='my-4' />
            <p>카카오톡으로 로그인 중</p>
            <Button className='h-[7.2rem] w-[34.6rem]' onClick={handleLogoutClick} variant={'default'} size={'default'}>
              로그아웃
            </Button>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='outline' size='sm' className='hover:bg-red-F hover:text-white'>
                탈퇴하기
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-[34rem]'>
              <AlertDialogHeader>
                <AlertDialogTitle>정말 탈퇴하시겠습니까?</AlertDialogTitle>
                <AlertDialogDescription className='text-14-400 text-black-0'>
                  탈퇴 후 계정 복구는 불가능합니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteUserClick}>탈퇴</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
        <section>{changeUi === true ? <Edit /> : <MyPageTabs />}</section>
      </article>
    </main>
  );
}
