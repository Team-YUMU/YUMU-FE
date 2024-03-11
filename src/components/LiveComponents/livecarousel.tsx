import { Card, CardContent } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export function LiveCarousel() {
  return (
    <div className='col-span-3 flex justify-center'>
      <Carousel className='w-2/3' plugins={[Autoplay({ delay: 4000 })]}>
        <CarouselPrevious />
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className='p-1'>
                <Card className='rounded-full border-none bg-slate-50'>
                  <CardContent className='flex items-center justify-center p-6'>
                    <span className='text-4xl font-semibold'>기획전 {index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
}
