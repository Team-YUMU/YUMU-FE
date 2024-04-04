import React, { useState } from 'react';
import { useRouter } from 'next/router';
import * as StompJS from '@stomp/stompjs';

const Home: React.FC = () => {
  const router = useRouter();
  const [usernameValue, setUsernameValue] = useState<string>('');
  const [roomIdValue, setRoomIdValue] = useState<number>(0);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue) {
      setUsernameValue(newValue);
    }
  };
  const handleRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      setRoomIdValue(Math.max(0, newValue)); // 입력된 값이 0보다 작을 경우 0으로 설정
    }
  };
  const handleRoomEnter = async () => {
    // 로컬스토리지에 유저 네임 저장 => 엑세스 토큰처럼 사용
    router.push(`/chatting/${roomIdValue}`);
  };

  return (
    <main className={`flex min-h-screen w-full items-center justify-center`}>
      <div className='flex h-full w-1/2 flex-col items-center justify-center gap-2 p-2'>
        <input type='text' className='w-full border p-2' value={usernameValue} onChange={handleUsernameChange} />
        <input type='number' min={0} className='w-full border p-2' value={roomIdValue} onChange={handleRoomIdChange} />
        <button className='w-full border bg-slate-100 p-2' onClick={handleRoomEnter}>
          Go!
        </button>
      </div>{' '}
    </main>
  );
};
export default Home;
