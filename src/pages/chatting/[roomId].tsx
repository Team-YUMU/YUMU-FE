'use client';

import { CompatClient, Stomp } from '@stomp/stompjs';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

// 보내는 건 /live/~
// 받는 것(구독하는 입장)에서는 /liveRoom/~

const BASE_URL = 'http://43.200.219.117:8080';

interface ChatHistoryProps {
  type: string;
  memberId?: string;
  message: string;
}

const memberId = '123456';

// component
const Chating: React.FC = () => {
  const router = useRouter();
  const { roomId } = router.query;
  // username을 엑세스 토큰처럼 사용(임시)
  const username = localStorage.getItem('username') || undefined;
  const [chatHistory, setChatHistory] = useState<ChatHistoryProps[]>([
    { type: 'chat', memberId: '654321', message: `It's Test Message` },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [chatValue, setChatValue] = useState<ChatHistoryProps | null>(null);

  // Stomp의 CompatClient 객체를 참조하는 객체 (리렌더링에도 유지하기 위해 useRef 사용)
  // Stomp 라이브러와와 소켓 연결을 수행하는 client 객체에 접근하기 위함
  const client = useRef<CompatClient | null>(null);

  // 입장하기
  // /live/join

  // 소켓 연결 + 연결 성공하면 '/live/{roomID}/chat.addUser' 받아서 메세지 출력
  const connectHandler = () => {
    // const socket = new SockJS(`${BASE_URL}/socket-connect`);
    client.current = Stomp.over(function () {
      console.log('connecting...');
      return new SockJS(`${BASE_URL}/ws-stomp`);
    });
    console.log('connect success');
    client.current.connect(
      {
        Authorization: `Bearer ${typeof window !== 'undefined' ? `Bearer ${sessionStorage.getItem('accessToken')}` : ''}`,
        Refresh: `${typeof window !== 'undefined' ? `${sessionStorage.getItem('refreshToken')}` : ''}`,
      },
      () => {
        client.current?.subscribe(
          `${BASE_URL}/liveRoom/${roomId}`,
          (message) => {
            console.log('connect', message);
          },
          {
            Authorization: `Bearer ${typeof window !== 'undefined' ? `Bearer ${sessionStorage.getItem('accessToken')}` : ''}`,
            Refresh: `${typeof window !== 'undefined' ? `${sessionStorage.getItem('refreshToken')}` : ''}`,
          },
        );
      },
    );
  };

  useEffect(() => {
    connectHandler();
  }, [roomId]);

  const sendHandler = (memberId: string, inputValue: string) => {
    if (client.current && client.current.connected) {
      client.current.send(
        `${BASE_URL}/live/${roomId}/chat.sendMessage`,
        {
          'Content-Type': 'application/json',
        },
        JSON.stringify({ type: 'CHAT', message: inputValue, memberId: memberId }),
      );
    }
  };

  useEffect(() => {
    sendHandler(memberId, inputValue);
  }, [inputValue]);

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setChatHistory([...chatHistory, { type: 'CHAT', memberId: username, message: inputValue }]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <main className={`flex min-h-screen w-full flex-col items-center justify-center gap-2 p-2`}>
      <div>
        <p>{typeof window !== 'undefined' ? `Bearer ${sessionStorage.getItem('accessToken')}` : ''}</p>
        <p>{typeof window !== 'undefined' ? `${sessionStorage.getItem('refreshToken')}` : ''}</p>
      </div>
      <div className='flex flex-row items-center'>
        <p className='w-1/2 grow border-r border-white p-2 text-right'>Room : {roomId}</p>
        <p className='w-1/2 grow text-nowrap border-l border-white p-2 text-left'>your name : {username}</p>
      </div>
      <div className='flex h-full w-full flex-col items-center justify-center gap-1 border bg-white p-2'>
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <p>
              {chat.memberId} : {chat.message}
            </p>
          </div>
        ))}
      </div>
      <div className='flex w-full flex-row gap-2'>
        <input
          className='w-full border p-1'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className='border bg-white p-1' onClick={handleSendMessage}>
          Submit
        </button>
      </div>
    </main>
  );
};

export default Chating;
