import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '../../ui/form';
import { Input } from '../../ui/input';
import { useState } from 'react';
import { Chat } from './chats';
import { HandCoins, SmilePlus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Bid } from './bids';
import { Button } from '@/components/ui/button';

const chatSchema = z.object({
  chat: z.string().min(1),
});

interface ChatListProps {
  type: 'chat' | 'tender';
  user: string;
  currentBid?: number;
  value: string;
}

export function LiveChatting() {
  const [logined, setLogined] = useState<boolean>(false);
  const [chatList, setChatList] = useState<ChatListProps[]>([
    { type: 'chat', user: 'T1', value: 'Chat 컴포넌트 확인용 데이터입니다.' },
    { type: 'chat', user: 'Me', value: 'Chat 컴포넌트 확인용 데이터입니다.' },
    {
      type: 'chat',
      user: 'T1',
      value: '조금 길어진 경우를 테스트하고 싶어서 길게 쓰고 있는데 얼마나 써야할 지 모르겠어요.',
    },
  ]);

  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: { chat: '' },
  });

  function onSubmit(values: z.infer<typeof chatSchema>) {
    console.log(values);
    const newChat: ChatListProps = {
      type: 'chat',
      user: 'Me',
      value: values.chat,
    };
    setChatList([newChat, ...chatList]);
    form.reset();
  }

  const handleBid = () => {
    alert('응찰버튼');
  };
  const handleIcon = () => {
    alert('이모티콘');
  };

  return (
    <div className='col-span-1 flex h-[63.8rem] flex-col gap-2 rounded-[1rem] border-2 border-[#F3F3F3] bg-white'>
      <div className='flex h-full flex-col-reverse justify-start gap-[1.2rem] overflow-y-auto p-2 px-[2.3rem] pb-[1.1rem] pt-[2.8rem] scrollbar-hide'>
        <div className='flex w-full flex-row items-center gap-4'>
          <Separator className='shrink' color='#f3f3f3' />
          <p className='shrink-0 text-15-400 text-stone-300'>경매가 종료되었습니다.</p>
          <Separator className='shrink' color='#f3f3f3' />
        </div>
        <Bid user='Have a Nice Day' bidPrice={100000} variant={'success'} />
        <Bid user='Have a Nice Day' bidPrice={100000} />
        <Bid user='Tiffany' bidPrice={100000} />
        {chatList.map((chat, index) => (
          <Chat key={index} user={chat.user}>
            {chat.value}
          </Chat>
        ))}
        <div className='flex w-full flex-row items-center gap-4'>
          <Separator className='shrink' color='#f3f3f3' />
          <p className='shrink-0 text-15-400 text-stone-300'>경매가 시작되었습니다.</p>
          <Separator className='shrink' color='#f3f3f3' />
        </div>
      </div>
      <Separator className='h-1 bg-[#f3f3f3]' />
      <div className='relative p-2'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex w-full flex-row items-center justify-center rounded-[36px] bg-zinc-100'
          >
            <FormField
              control={form.control}
              name='chat'
              render={({ field }) => (
                <FormItem className='w-full focus-within:outline-none'>
                  <FormControl>
                    <Input
                      placeholder={logined ? '고운 채팅 쓰기' : '로그인이 필요합니다'}
                      variant={'chat'}
                      className='h-12 rounded-[36px] border-none bg-zinc-100 px-4 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className='absolute right-[1.6rem] top-[1.3rem] flex flex-row items-center gap-2'>
          <Button variant={'ghost'} className='h-fit rounded-full p-0' onClick={handleBid}>
            <HandCoins size={15} color='#9e9e9e' />
          </Button>
          <Button variant={'ghost'} className='h-fit rounded-full p-0' onClick={handleIcon}>
            <SmilePlus size={15} color='#9e9e9e' />
          </Button>
        </div>
      </div>
    </div>
  );
}
