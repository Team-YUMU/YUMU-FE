import React, { useState, useEffect } from 'react';

interface LiveTimerProps {
  startTime: string;
  className?: string;
  endTime: string;
}

function LiveTimer({ startTime, className, endTime }: LiveTimerProps) {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const endDate = new Date(endTime);
      const startDate = new Date(startTime);
      const timeDifference = startDate.getTime() - currentDate.getTime();
      const startTimeDifference = endDate.getTime() - currentDate.getTime();
      const remaining = timeDifference <= 0 ? startTimeDifference : 0;

      if (remaining > 0) {
        setRemainingTime(remaining);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, endTime]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  };

  return <strong>{formatTime(remainingTime)}</strong>;
}

export default LiveTimer;
