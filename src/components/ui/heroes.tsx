import Heroes1 from '@/assets/heroes.webp';
import Heroes2 from '@/assets/heroes-2.webp';
import Autoplay from 'embla-carousel-autoplay';
import { CalendarHeart } from 'lucide-react';
import { useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem } from './carousel';

interface HeroesProps {
  date: string;
}

const HEROES_IMG = [
  { src: Heroes2, alt: 'Heroes 2' },
  { src: Heroes1, alt: 'Heroes 1' },
];

export default function Heroes({ date }: HeroesProps) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  return (
    <div className="relative h-screen w-full flex flex-col justify-end">
      <Carousel
        opts={{ loop: true }}
        plugins={[plugin.current]}
        className="h-full w-full"
      >
        <CarouselContent
          wrapperClass="h-full w-full overflow-auto"
          className="h-full w-full ml-0"
        >
          {HEROES_IMG.map((item) => (
            <CarouselItem key={item.alt} className="h-full w-full pl-0">
              <img
                className="h-full w-full object-cover"
                src={item.src}
                alt={item.alt}
                loading="eager"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="h-1/2 w-full absolute z-10 bottom-0 bg-gradient-to-t from-white to-50%">
        <div className="p-4 text-left text-gold flex flex-col gap-4">
          <p>The Weeding Of</p>
          <p className="text-playwrite text-2xl">Gunawan & Novita</p>
          <p className="text-sm">
            We invite you to join and celebrate our weeding
          </p>
          <p>{date}</p>
          <a
            href="#date"
            className="w-max bg-gold rounded-3xl text-night mt-2 flex flex-row items-center py-2 px-4 gap-2 text-sm"
          >
            <CalendarHeart height={16} width={16} />
            Save the date
          </a>
        </div>

        <div className="curved-edge bg-gold h-20 flex flex-col items-center justify-center text-center text-playwrite text-lg text-night">
          <span data-aos="fade-down">We're Getting Married 💞</span>
        </div>
      </div>
    </div>
  );
}
