import { Carousel, CarouselContent, CarouselItem, MainCarouselNext, MainCarouselPrevious } from '../ui/mainCarousel';
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
        <MainCarouselPrevious variant='exhibitionArrow' className='-left-36 h-[7.7rem] w-[7.7rem]  ' />
        <MainCarouselNext variant='exhibitionArrow' className='-right-36 h-[7.7rem] w-[7.7rem]  ' />
      </Carousel>
    </div>
  );
}
