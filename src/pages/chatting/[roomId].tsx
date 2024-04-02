'use client';

import * as StompJS from '@stomp/stompjs';
import { useRouter } from 'next/router';
import { disconnect } from 'process';
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

  // useEffect(() => {
  //   // stomp, Client 객체 생성
  //   const client = new StompJS.Client({
  //     brokerURL: 'http://43.200.219.117:8080/ws-stomp',
  //     beforeConnect: () => {
  //       console.log('before connect');
  //     },
  //     connectHeaders: {
  //       Authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('accessToken')}` : '',
  //       Refresh: typeof window !== 'undefined' ? `${localStorage.getItem('refreshToken')}` : '',
  //     },
  //     debug(str) {
  //       console.log('debug', str);
  //     },
  //     onConnect: () => {
  //       console.log('connect!');
  //       client.subscribe(`/liveRoom/${roomId}`, (message) => {
  //         const datas = JSON.parse(message.body);
  //         console.log('subscribe message', datas);
  //       });
  //       client.activate();
  //     },
  //     reconnectDelay: 50000, // 자동 재연결
  //     heartbeatIncoming: 4000,
  //     heartbeatOutgoing: 4000,
  //   });

  //   // // 연결되면
  //   // client.onConnect = function (frame) {
  //   //   // 구독되면
  //   //   client.subscribe(`/${roomId}`, (message) => {
  //   //     const datas = JSON.parse(message.body);
  //   //     console.log('subscribe message', datas);
  //   //   });
  //   // };

  //   client.onStompError = function (frame) {
  //     console.log(`========> Broker reported error`, frame.headers.message);
  //     console.log(`========> Additional details:${frame.body}`);
  //   };
  // }, []);

  // useEffect(() => {
  //   const socket = new SockJS('http://43.200.219.117:8080/ws-stomp');
  //   const client = new StompJS.Client();

  //   const connectCallback = () => {
  //     console.log('websocket 연결 성공');

  //     client.subscribe(`/liveRoom/${roomId}`, (message) => {
  //       console.log('subscribe success message : ', message);
  //     });
  //   };

  //   socket.onopen = () => {
  //     console.log('websocket 연결 열림');
  //     client.configure({
  //       brokerURL: 'ws://43.200.219.117:8080/ws-stomp',
  //       onConnect: connectCallback,
  //       onStompError: () => {
  //         console.log('error!');
  //       },
  //     });
  //     client.activate();
  //   };
  // }, []);

  const client = useRef<StompJS.Client>();

  const connect = () => {
    client.current = new StompJS.Client({
      brokerURL: 'ws://43.200.219.117:8080/ws-stomp',
      beforeConnect: () => {
        console.log('before connect');
      },
      onConnect: () => {
        console.log('success');
        subscribe();
      },
    });
    client.current.activate();
  };

  const subscribe = () => {
    client.current.subscribe('/liveRoom/' + roomId, () => {
      setChatHistory([...chatHistory, { type: 'CHAT', memberId: username, message: inputValue }]);
    });
  };

  const disconnect = () => {
    console.log('disconnect');
    // client.current.deactivate();
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
