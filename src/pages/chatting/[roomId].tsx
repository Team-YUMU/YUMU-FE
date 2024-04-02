'use client';

import * as StompJS from '@stomp/stompjs';
import { useRouter } from 'next/router';
import { disconnect } from 'process';
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
  const [chatHistory, setChatHistory] = useState<ChatHistoryProps[]>([
    { type: 'CHAT', memberId: '654321', message: `It's Test Message` },
  ]);
  const [inputValue, setInputValue] = useState('');

  const [isConnected, setIsConnected] = useState(false);
  const [stompClient, setStompClient] = useState<Client>();

  const connect = () => {
    console.log('isConnected check in connect : ', isConnected);
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
      setStompClient(client);
    }
  };

  const onConnected = (message: any) => {
    setTimeout(() => {
      setIsConnected(true);
      console.log('onConnected : ', message);
    }, 1000 * 5);
  };

  const onError = (error: any) => {
    setIsConnected(false);
    setTimeout(connect, 1000 * 60);
    console.log('onError : ', error);
  };

  const onSubscribe = () => {
    console.log('isConnected in onSubscribe : ', isConnected);
    console.log('stompClient?.connected in onSubscribe : ', stompClient?.connected);
    if (isConnected && stompClient?.connected) {
      stompClient.subscribe('/liveRoom/' + roomId, (message) => {
        console.log('subscribe! : ', message);
        console.log('typeof : ', typeof message.body);
        console.log('json : ', JSON.parse(message.body));
        console.log('message : ', JSON.parse(message.body).message);
        setChatHistory([
          ...chatHistory,
          {
            type: JSON.parse(message.body).type,
            memberId: JSON.parse(message.body).memberId,
            message: JSON.parse(message.body).message,
          },
        ]);
        console.log(chatHistory.length);
      });
    } else {
      console.log('not connected! :', isConnected, stompClient?.connected);
    }
  };

  const onDisconnect = () => {
    if (isConnected && stompClient) {
      stompClient.disconnect(() => {
        setIsConnected(false);
        setStompClient(undefined);
        console.log('disconnect success');
      });
    }
  };

  const onSendChat = () => {
    if (isConnected && stompClient?.connect) {
      console.log('inputValue : ', inputValue);
      stompClient.send(
        `/live/${roomId}/chat.sendMessage`,
        {},
        JSON.stringify({ memberId: 3, message: inputValue, auctionId: roomId }),
      );
    }
  };

  useEffect(() => {
    connect();
    // return () => onDisconnect();
  }, []);

  // 챗히스토리에 챗 내용 저장 및 인풋 초기화
  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      // 채팅 보내기
      onSendChat();
      // 입력창 초기화
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
      <div className='flex gap-2'>
        <button onClick={connect}>onConnected</button>
        <button onClick={onDisconnect}>onDisconnect</button>
        <button onClick={onSubscribe}>onSubscribe</button>
      </div>
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
              {index} : {chat.type} | {chat.memberId} : {chat.message}
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
