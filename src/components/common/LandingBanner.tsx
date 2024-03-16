import Image from 'next/image';
import { BannerCard, BannerCardContent } from '../ui/BannerCard';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '../ui/button';
import {
  BannerCarousel,
  BannerCarouselContent,
  BannerCarouselItem,
  BannerCarouselNext,
  BannerCarouselPrevious,
  CarouselApi,
} from '../ui/BannerCarousel';
import React from 'react';

export function LandingBanner() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div className='flex flex-col items-center justify-center'>
      <BannerCarousel setApi={setApi} className='w-2/3' plugins={[Autoplay({ delay: 4000 })]}>
        <BannerCarouselPrevious />
        <BannerCarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <BannerCarouselItem key={index}>
              <BannerCard className='rounded-full border-none'>
                <BannerCardContent className='flex items-center justify-center bg-white p-6'>
                  {index === 0 ? (
                    <Image width={1375} height={398} src={'/svgs/배너.svg'} alt='배너 이미지' className='relative' />
                  ) : index === 1 ? (
                    <Image
                      width={137}
                      height={39}
                      src={'/svgs/email-icon.svg'}
                      alt='배너 이미지'
                      className='relative'
                    />
                  ) : index === 2 ? (
                    <Image width={137} height={39} src={'/svgs/yumu-logo.svg'} alt='배너 이미지' className='relative' />
                  ) : null}
                </BannerCardContent>
              </BannerCard>
            </BannerCarouselItem>
          ))}
        </BannerCarouselContent>
        <BannerCarouselNext />
        <div className=' flex flex-row items-center justify-center gap-2 pl-[90%]'>
          {Array.from(Array(count).keys()).map((_, index) => (
            <Button
              key={index}
              size={'sm'}
              className={`h-[1.5rem] rounded-full bg-gray-D  ${index === current - 1 ? 'bg-red-F ' : 'bg-gray-D'}`}
              onClick={() => api?.scrollTo(index)}
            ></Button>
          ))}
        </div>
      </BannerCarousel>
    </div>
  );
}
