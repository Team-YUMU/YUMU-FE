'use client';

import { Skeleton } from '@/components/ui/skeleton';
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios, { AxiosResponse } from 'axios';
import { Chat } from '@/components/domain/live/chats';

type IChatMessage = {
  userName: string;
  message: string;
};

// component
const Index: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // connected flag
  const [connected, setConnected] = useState<boolean>(false);

  // init chat and message
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [userNameInput, setUserNameInput] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  // dispatch message to other users
  const sendApiSocketChat = async (chatMessage: IChatMessage): Promise<Response> => {
    return await fetch('/api/socket/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chatMessage),
    });
  };

  // const sendApiSocketChat = async (chatMessage: IChatMessage): Promise<AxiosResponse> => {
  //   try {
  //     const response = await axios.post('/api/socket/chat', chatMessage, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     return response;
  //   } catch (error) {
  //     throw new Error('Failed to send chat message');
  //   }
  // };

  const sendMessage = async () => {
    if (messageInput) {
      const chatMessage: IChatMessage = {
        userName,
        message: messageInput,
      };

      const resp = await sendApiSocketChat(chatMessage);

      if (resp.ok) setMessageInput('');
    }

    inputRef.current!.focus();
  };

  const sendEnterRoomMessage = async () => {
    const chatMessage: IChatMessage = {
      userName: 'Bot',
      message: `${userName} enter to chat rooom`,
    };

    const resp = await sendApiSocketChat(chatMessage);
    if (!resp.ok) {
      setTimeout(() => {
        sendEnterRoomMessage();
      }, 500);
    }
  };

  useEffect(() => {
    if (userName) {
      sendEnterRoomMessage();
    }
  }, [userName]);

  useEffect((): any => {
    const socket = io(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: '/api/socket/io',
      addTrailingSlash: false,
    });

    // log socket connection
    socket.on('connect', () => {
      console.log('SOCKET CONNECTED!', socket.id);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on('message', (message: IChatMessage) => {
      setChatMessages((prev) => [...prev, message]);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  if (!connected) {
    return (
      <div className='mx-auto flex min-h-screen items-center justify-center p-4'>
        <div className='flex h-full w-full flex-row items-center justify-center gap-4'>
          <Skeleton className='h-8 w-8 rounded-xl' />
          <Skeleton className='h-8 w-8 rounded-xl' />
          <Skeleton className='h-8 w-8 rounded-xl' />
        </div>
      </div>
    );
  }

  if (!userName) {
    return (
      <div className='mx-auto flex min-h-screen items-center justify-center p-4'>
        <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
          <div className='h-20 bg-slate-50 p-4 dark:bg-slate-950'>
            <div className='flex h-full flex-1 flex-row divide-x divide-gray-200 dark:divide-gray-800'>
              <div className='flex-1 pr-2'>
                <input
                  type='text'
                  value={userNameInput}
                  placeholder={connected ? 'Your Name' : 'Connecting...'}
                  className='text-black h-full w-full rounded border border-gray-600 px-2 shadow dark:border-gray-400 dark:text-white'
                  disabled={!connected}
                  onChange={(e) => setUserNameInput(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      setUserName(userNameInput);
                    }
                  }}
                />
              </div>
              <div className='flex flex-col items-stretch justify-center pl-2'>
                <button
                  className='text-sm text-black h-full rounded bg-slate-200 px-2 shadow dark:bg-slate-800 dark:text-white'
                  onClick={() => {
                    setUserName(userNameInput);
                  }}
                  disabled={!connected}
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-screen w-full flex-col'>
      <div className='text-black sticky top-0  bg-slate-300 py-4 dark:bg-slate-950 dark:text-white'>
        <h1 className='text-2xl text-center font-semibold'>Realtime Chat App</h1>
        <h2 className='mt-2 text-center'>in Next.js and Socket.io</h2>
      </div>
      <div className='flex flex-1 flex-col bg-slate-100 dark:bg-slate-900'>
        <div className='flex-1 p-4 font-mono'>
          {/* {chatMessages.length ? (
            chatMessages.map((chatMessage, i) => (
              <div key={'msg_' + i} className='text-black mt-1 dark:text-white'>
                <span
                  className={chatMessage.userName === userName ? `text-red-500` : `text-slate-800 dark:text-slate-200`}
                >
                  {chatMessage.userName === userName ? '[Me]' : `[${chatMessage.userName}]`}
                </span>
                : {chatMessage.message}
              </div>
            ))
          ) : (
            <div className='text-sm py-6 text-center text-gray-600 dark:text-gray-400'>No chat messages</div>
          )} */}
          {chatMessages.length &&
            chatMessages.map((chatMessage, index) => (
              <div key={'msg_' + index}>
                <Chat user={chatMessage.userName === userName ? '[Me]' : `[${chatMessage.userName}]`}>
                  {chatMessage.message}
                </Chat>
              </div>
            ))}
        </div>
        <div className='sticky bottom-0 h-20 bg-slate-300 p-4 dark:bg-slate-950'>
          <div className='flex h-full flex-1 flex-row divide-x divide-gray-200 dark:divide-gray-800'>
            <div className='flex-1 pr-2'>
              <input
                ref={inputRef}
                type='text'
                value={messageInput}
                placeholder={connected ? 'Type a message...' : 'Connecting...'}
                className='text-black h-full w-full rounded border border-gray-600 px-2 shadow dark:border-gray-400 dark:text-white'
                disabled={!connected}
                onChange={(e) => {
                  setMessageInput(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage();
                  }
                }}
              />
            </div>
            <div className='flex flex-col items-stretch justify-center pl-2'>
              <button
                className='text-sm text-black h-full rounded bg-slate-50 px-2 shadow dark:bg-slate-950 dark:text-white'
                onClick={() => {
                  sendMessage();
                }}
                disabled={!connected}
              >
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
