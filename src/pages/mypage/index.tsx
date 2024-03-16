import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import MyPageTabs from '../../components/domain/myPage/Tabs/MyPageTabs';
import Edit from '@/components/domain/myPage/Tabs/Edit/Edit';
import { useRouter } from 'next/router';
import { FaUserPen } from 'react-icons/fa6';
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
import Members from '@/mocks/Member';
// import { getMemberInfo } from '@/services/api';

export default function MyPage() {
  const [memberInfo, setMemberInfo] = useState({
    password: '',
    newPassword: '',
    newPasswordCheck: '',
    file: '',
    id: 2,
    email: 'example2@example.com',
    nickname: 'user2',
    profileImageUrl: '',
    introduce: '안녕하세요. 저는 유저2입니다.',
    snsLink: 'https://www.example.com/user2',
    address: null,
  });
  const [changeUi, setChangeUi] = useState(false);
  const router = useRouter();

  const MembersData = Members;

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
    router.push('/');
  };
  return (
    <main className='flex h-full min-h-[80vh] w-full items-center justify-center gap-[8rem] '>
      {changeUi === true ? (
        <Edit setChangeUi={setChangeUi} />
      ) : (
        <article className='flex flex-row gap-[1rem]'>
          <section className='flex flex-col gap-[1rem]'>
            <div className='flex flex-col items-center justify-center gap-5'>
              <Image
                src='svgs/email-icon.svg'
                width={183}
                height={183}
                alt='회원 이미지'
                className='h-[11.4375rem] w-[11.4375rem] rounded-[50rem] border-[0.1rem] border-red-F bg-gray-D'
              />
              <p
                onClick={handleChangeUi}
                className='text-15-400 flex items-center  justify-center  gap-2 border-red-F hover:border-b-[0.1rem]'
              >
                {memberInfo.nickname} <FaUserPen />
              </p>
              <div className='text-15-400 flexCenter gap-2'>
                <p className='flex  items-center justify-center'>{MembersData[1].introduce}</p>
                <Separator className='my-4 w-[27.625rem] bg-red-F' />
                <p>{MembersData[1].email}</p>
              </div>
              <Button onClick={handleLogoutClick} size='auth'>
                로그아웃
              </Button>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='outline' size='auth' className='hover:bg-red-F hover:text-white'>
                  탈퇴하기
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className='w-[34rem]'>
                <AlertDialogHeader>
                  <AlertDialogTitle>정말 탈퇴하시겠습니까?</AlertDialogTitle>
                  <AlertDialogDescription className='text-15-400 text-black-0'>
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
          <section>
            <MyPageTabs />
          </section>
        </article>
      )}
    </main>
  );
}
