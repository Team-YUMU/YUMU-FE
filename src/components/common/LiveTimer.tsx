import React, { useState, useEffect } from 'react';

/** TODO
 * 타이머 종료 후에 status: '종료' 업데이트 요청 보내기
 */
interface LiveTimerProps {
  startTime: string;
  className?: string;
}

function LiveTimer({ startTime, className }: LiveTimerProps) {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const targetTime = new Date(startTime).getTime() + 3600000;
      const timeDifference = targetTime - currentTime;

      if (timeDifference > 0) {
        setRemainingTime(timeDifference);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  };

  return <strong className={`${className}`}>{formatTime(remainingTime)}</strong>;
}

export default LiveTimer;
