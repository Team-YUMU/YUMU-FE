'use client';

import * as StompJS from '@stomp/stompjs';
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

  let accessToken;
  let refreshToken;

  if (typeof window !== 'undefined') {
    accessToken = sessionStorage.getItem('accessToken');
    refreshToken = sessionStorage.getItem('refreshToken');
  }

  // 웹 소켓 연결
  const webSocket = new WebSocket('ws://43.200.219.117:8080/ws-stomp');
  webSocket.onopen = function () {
    console.log('websocket open success!');
  };

  // stomp, Client 객체 생성
  const client = new StompJS.Client({
    brokerURL: 'ws://43.200.219.117:8080/ws-stomp',
    beforeConnect: () => {
      console.log('before connect');
    },
    connectHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
    debug(str) {
      console.log('debug', str);
    },
    reconnectDelay: 50000, // 자동 재연결
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });
  // 연결되면
  client.onConnect = function () {
    // 구독되면
    client.subscribe(`/${roomId as string}`, (message) => {
      const datas = JSON.parse(message.body);
      console.log('subscribe message', datas);
    });
  };

  client.onStompError = function (frame) {
    console.log(`========> Broker reported error`, frame.headers.message);
    console.log(`========> Additional details:${frame.body}`);
  };

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
        <p>{typeof window !== 'undefined' ? `Bearer ${sessionStorage.getItem('accessToken')}` : ''}</p>
        <p>{typeof window !== 'undefined' ? `${sessionStorage.getItem('refreshToken')}` : ''}</p>
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
