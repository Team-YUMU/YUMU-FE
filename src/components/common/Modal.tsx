import React, { useState, ChangeEvent } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export default function Modal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <div>
      <button onClick={handleOpen} className='m-5 rounded-lg border border-gray-300'>
        Open
      </button>
      {open && (
        <div className='flex w-[20%] flex-col gap-3 rounded-lg border border-black-1 p-6'>
          <div className='flex justify-between'>
            <label>상품명</label>
            <button onClick={handleClose}>X</button>
          </div>
          <div>
            <label htmlFor='message' className='text-sm mb-2 block font-medium text-gray-900 dark:text-white'>
              작품설명
            </label>
            <Textarea className='text-sm block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500' />
          </div>
          <div>
            <label>금액</label>
            <Input type='number' />
          </div>

          <div>
            <label>유의사항</label>
            <Textarea className='text-sm block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500' />
          </div>

          <button onClick={handleSubmit} className='rounded-lg border border-gray-300'>
            응찰하기
          </button>
        </div>
      )}
    </div>
  );
}
