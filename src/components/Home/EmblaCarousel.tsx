'use client';

import React, { useEffect } from 'react';
import type { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import '@/styles/embla.css';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = props => {
  const { slides, options } = props;
  const autoplayOptions = {
    delay: 1100,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
  };
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [Autoplay(autoplayOptions)]
  );
  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map(index => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
