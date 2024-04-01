import React from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { deleteWithMember } from '@/services/api';

export default function UserDeleteModal() {
  const router = useRouter();

  const handleDeleteUserClick = async () => {
    try {
      await deleteWithMember();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='myPageUserDelete' size='myPageUserDelete'>
          <span className='text-center text-16-400 leading-[2rem] text-gray-9'>탈퇴하기</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='flex h-[12rem] max-w-[30rem] flex-col items-center justify-center gap-2 '>
        <AlertDialogTitle className='text-16-400 text-red-F'>정말 탈퇴 하시겠습니까?</AlertDialogTitle>
        <AlertDialogDescription className='text-16-400 text-black-2'>
          탈퇴 후 계정 복구는 불가능합니다.
        </AlertDialogDescription>

        <AlertDialogFooter className='flex flex-col items-center justify-center gap-2'>
          <AlertDialogCancel className='left-[26rem] top-[1.5rem]'>
            <Image
              src={'svgs/my-page-modal-close-icon.svg'}
              width={30}
              height={30}
              className='absolute h-[2.5rem] w-[2.5rem] flex-shrink-0'
              alt='모달 닫기 버튼 아이콘'
            />
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteUserClick} className='w-[24rem]'>
            탈퇴
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
