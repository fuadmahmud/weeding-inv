import { Carousel, CarouselContent, CarouselItem } from './carousel';
import { type CarouselApi } from './carousel';
import Autoplay from 'embla-carousel-autoplay';
import Gallery1 from '@/assets/gallery-1.webp';
import Gallery2 from '@/assets/gallery-2.webp';
import Gallery3 from '@/assets/gallery-3.webp';
import Gallery4 from '@/assets/gallery-4.webp';
import Gallery5 from '@/assets/gallery-5.webp';
import Gallery6 from '@/assets/gallery-6.webp';
import { useCallback, useEffect, useRef, useState } from 'react';

const IMAGE_ROW = [
  { alt: 'gallery-1', src: Gallery1 },
  { alt: 'gallery-2', src: Gallery2 },
  { alt: 'gallery-3', src: Gallery3 },
  { alt: 'gallery-4', src: Gallery4 },
  { alt: 'gallery-5', src: Gallery5 },
  { alt: 'gallery-6', src: Gallery6 },
];

export default function Gallery() {
  const [api, setApi] = useState<CarouselApi>();
  const [imgIndex, setImageIndex] = useState(0);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  useEffect(() => {
    if (!api) {
      return;
    }

    const autoplay = api.plugins().autoplay;
    const isPlaying = !autoplay ? false : autoplay.isPlaying();

    api.on('autoplay:select', () => {
      if (isPlaying) {
        setImageIndex(api.selectedScrollSnap());
      }
    });
  }, [api]);

  const handleClickItem = useCallback(
    (index: number) => {
      if (api) {
        const plugin = api.plugins().autoplay;
        const timeout = setTimeout(() => plugin.play(), 3000);

        api.scrollTo(index);
        setImageIndex(index);
        return () => clearTimeout(timeout);
      }
    },
    [api]
  );

  return (
    <div>
      <img
        className="mb-3 animate-fade animate-duration-1000 animate-delay-[250ms] animate-ease-in"
        src={IMAGE_ROW[imgIndex].src}
        alt={IMAGE_ROW[imgIndex].alt}
      />
      <Carousel
        opts={{ loop: true }}
        plugins={[plugin.current]}
        setApi={setApi}
      >
        <CarouselContent>
          {IMAGE_ROW.map((item, index) => (
            <CarouselItem
              className="basis-1/3 relative overflow-hidden"
              key={item.alt}
              onClick={() => handleClickItem(index)}
            >
              {imgIndex === index ? (
                <div className="h-full w-full bg-black/50 absolute" />
              ) : null}
              <img src={item.src} alt={item.alt} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
