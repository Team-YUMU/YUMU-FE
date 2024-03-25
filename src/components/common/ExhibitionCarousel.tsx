import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

const ExhibitionInformation = [
  {
    src: '/svgs/exhibitions.svg',
  },
  {
    src: '/svgs/exhibitions.svg',
  },
  {
    src: '/svgs/exhibitions.svg',
  },
];

export function ExhibitionCarousel() {
  return (
    <div className='col-span-3 mx-auto flex h-[20rem] w-[117.3rem]'>
      <Carousel plugins={[Autoplay({ delay: 4000 })]}>
        <CarouselPrevious />
        <CarouselContent>
          {ExhibitionInformation.map((item, index) => (
            <CarouselItem key={index}>
              <Image
                src={item.src}
                alt={`기획전 이미지 ${index}`}
                width={1173}
                height={200}
                className='h-full w-full'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
}
