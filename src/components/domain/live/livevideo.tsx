import { useEffect, useState } from 'react';
import { AspectRatio } from '../../ui/aspect-ratio';
import InfoBox from '@/components/common/InfoBox';

interface LiveVideoProps {
  notice: string;
}

export function LiveVideo({ notice }: LiveVideoProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
    });
  }, []);

  return (
    <div className='col-span-2 bg-white'>
      <AspectRatio ratio={16 / 9} className='bg-black'>
        {stream && (
          <video
            playsInline
            ref={(ref) => ref && (ref.srcObject = stream)}
            autoPlay
            controls
            className='h-full w-full rounded-xl'
          />
        )}
      </AspectRatio>
      {notice && <InfoBox className='mb-[2rem]' notice={notice} />}
      <div className='rounded-xl bg-slate-50 p-2'>{notice}</div>
    </div>
  );
}
