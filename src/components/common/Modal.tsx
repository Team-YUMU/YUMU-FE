import React, { useState } from 'react';

export default function Modal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen} className='m-5 rounded-lg border border-gray-300'>
        Open
      </button>
      {open && (
        <div className='flex w-[20%] flex-col gap-3 rounded-lg border border-black-1 p-6'>
          <div className='flex justify-between'>
            <label>Modal</label>
            <button onClick={handleClose}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}
