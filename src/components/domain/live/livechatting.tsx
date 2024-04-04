import { useEffect, useState } from 'react';
import { Chat } from './chats';
import { SendHorizonal } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Bid } from './bids';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { Client, over } from 'stompjs';
import SockJS from 'sockjs-client';

const BASE_URL = 'http://43.200.219.117:8080';

function AuctionNotice({ notice }: { notice: string }) {
  return (
    <div className='flex w-full flex-row items-center gap-4'>
      <Separator className='shrink' color='#f3f3f3' />
      <p className='shrink-0 text-15-400 text-stone-300'>{notice}</p>
      <Separator className='shrink' color='#f3f3f3' />
    </div>
  );
}

interface ChatHistoryProps {
  type: string;
  memberId: string;
  message: string;
}

export function LiveChatting() {
  const router = useRouter();
  const { auctionid } = router.query;
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatHistoryProps[]>([
    { type: 'CHAT', memberId: 'Test', message: 'test message' },
  ]);
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
    console.log('onSubscribe : ', isConnected, '|', stompClient?.connected);
    if (isConnected && stompClient?.connected) {
      stompClient.subscribe('/liveRoom/' + auctionid, (message) => {
        console.log('subscribe! : ', message);
        console.log('typeof : ', typeof message.body);
        console.log('json : ', JSON.parse(message.body));
        console.log('message : ', JSON.parse(message.body).message);
        setChatHistory([
          {
            type: JSON.parse(message.body).type,
            memberId: JSON.parse(message.body).memberId,
            message: JSON.parse(message.body).message,
          },
          ...chatHistory,
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
      console.log('send : ', { memberId: 3, message: inputValue, auctionId: auctionid });
      stompClient.send(
        `/live/${auctionid}/chat.sendMessage`,
        {},
        JSON.stringify({ memberId: 3, message: inputValue, auctionId: auctionid }),
      );
    }
  };

  useEffect(() => {
    connect();
    console.log('connect');
    // return () => onDisconnect();
  }, []);

  useEffect(() => {
    if (isConnected && stompClient) {
      onSubscribe();
    }
  }, [isConnected, stompClient]);

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
    <div className='col-span-1 flex h-[63.8rem] flex-col gap-2 rounded-[1rem] border-2 border-[#F3F3F3] bg-white font-[notoKR]'>
      <div className='flex h-full flex-col-reverse justify-start gap-[1.2rem] overflow-y-auto p-2 px-[2.3rem] pb-[1.1rem] pt-[2.8rem] scrollbar-hide'>
        {!isConnected && <AuctionNotice notice='경매가 종료되었습니다.' />}
        {/* <Bid user='Have a Nice Day' bidPrice={100000} variant={'success'} />
        <Bid user='Have a Nice Day' bidPrice={100000} />
        <Bid user='Tiffany' bidPrice={100000} /> */}
        {chatHistory.map((chat, index) => (
          <Chat key={index} memberId={chat.memberId}>
            {chat.message}
          </Chat>
        ))}
        {isConnected && <AuctionNotice notice='경매가 시작되었습니다.' />}
      </div>
      <Separator className='h-1 bg-[#f3f3f3]' />
      <div className='relative px-[2.3rem] py-[1.7rem]'>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder='고운 채팅 쓰기'
          className='h-12 w-full rounded-[36px] border-none bg-zinc-100 py-[2.4rem] pl-[2.2rem] pr-[4.4rem] text-16-500 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
        />
        <div className='absolute right-[4.6rem] top-1/2 flex -translate-y-1/2 flex-row items-center gap-[0.8rem]'>
          <Button variant={'ghost'} className='h-fit rounded-full p-0' onClick={onDisconnect}>
            <SendHorizonal color='#9e9e9e' className='size-[1.6rem]' />
          </Button>
        </div>
      </div>
    </div>
  );
}
