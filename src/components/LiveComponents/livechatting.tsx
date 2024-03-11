import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Chat } from './chats';

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
  const [chatList, setChatList] = useState<ChatListProps[]>([
    { type: 'chat', user: 'T1', value: 'Chat 컴포넌트 확인용 데이터입니다.' },
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
  return (
    <div className='col-span-1 flex flex-col gap-2 rounded-xl bg-slate-50 p-2'>
      <div className='scrollbar-hide flex h-full flex-col-reverse justify-start gap-2 overflow-y-auto'>
        {chatList.map((chat, index) => (
          <Chat key={index} user={chat.user}>
            {chat.value}
          </Chat>
        ))}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full flex-row items-center gap-2 rounded-xl border bg-white focus-within:border-black'
        >
          <FormField
            control={form.control}
            name='chat'
            render={({ field }) => (
              <FormItem className='w-full focus-within:outline-none'>
                <FormControl>
                  <Input
                    placeholder='for chat'
                    className='rounded-xl border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit' className='h-full rounded-l-none rounded-r-lg'>
            0
          </Button>
        </form>
      </Form>
    </div>
  );
}
