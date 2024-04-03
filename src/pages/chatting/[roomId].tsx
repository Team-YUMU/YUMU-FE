'use client';

import * as StompJS from '@stomp/stompjs';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client, Message, over } from 'stompjs';

// 보내는 건 /live/~
// 받는 것(구독하는 입장)에서는 /liveRoom/~

const BASE_URL = 'http://43.200.219.117:8080';

interface ChatHistoryProps {
  type: string;
  memberId?: string;
  message: string;
}

// component
const Chating: React.FC = () => {
  const router = useRouter();
  const { roomId } = router.query;
  // username을 엑세스 토큰처럼 사용(임시)
  let username: string;
  if (typeof window !== 'undefined') {
    username = localStorage.getItem('username') || '';
  }
  const [chatHistory, setChatHistory] = useState<ChatHistoryProps[]>([
    { type: 'chat', memberId: '654321', message: `It's Test Message` },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [chatValue, setChatValue] = useState<ChatHistoryProps | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [stompClient, setStompClient] = useState<Client>();

  const connect = () => {
    if (!isConnected) {
      const socket = new SockJS(`${BASE_URL}/ws-stomp`);
      const client = over(socket);
      client.connect(
        {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: typeof window !== 'undefined' ? `Bearer ${sessionStorage.getItem('accessToken')}` : '',
          Refresh: typeof window !== 'undefined' ? `${sessionStorage.getItem('refreshToken')}` : '',
        },
        onConnected,
        onError,
      );
    }
  };

  const onConnected = () => {
    setTimeout(() => {
      setIsConnected(true);
    }, 1000);
  };

  const onError = (error: any) => {
    setIsConnected(false);
    setTimeout(connect, 1000 * 60);
    console.log('onError : ', error);
  };

  const onSubscribe = () => {
    client.current.subscribe('/liveRoom/' + roomId, () => {
      setChatHistory([...chatHistory, { type: 'CHAT', memberId: username, message: inputValue }]);
    });
  };

  const onDisconnect = () => {
    if (isConnected && stompClient) {
      stompClient.disconnect(() => {
        setIsConnected(false);
        setStompClient(undefined);
      });
    }
  };

  const onSendChat = () => {
    if (isConnected && stompClient?.connect) {
      console.log(inputValue);
      stompClient.send(`/live/chat/message`);
    }
  };

  useEffect(() => {
    connect();
    // return () => disconnect();
  }, []);

  // 챗히스토리에 챗 내용 저장 및 인풋 초기화
  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setChatHistory([...chatHistory, { type: 'CHAT', memberId: username, message: inputValue }]);
      setInputValue('');
    }
  };
  // 엔터 누르면 handleSendMessage 실행
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <main className={`flex min-h-screen w-full flex-col items-center justify-center gap-2 p-2`}>
      <div>
        <p>{typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('accessToken')}` : ''}</p>
        <p>{typeof window !== 'undefined' ? `${localStorage.getItem('refreshToken')}` : ''}</p>
      </div>
      <div className='flex flex-row items-center'>
        <p className='w-1/2 grow border-r border-white p-2 text-right'>Room : {roomId}</p>
        <p className='w-1/2 grow text-nowrap border-l border-white p-2 text-left'>your name : Me</p>
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
