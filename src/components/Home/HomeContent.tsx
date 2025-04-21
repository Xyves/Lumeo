import Image from 'next/image';
import React from 'react';

import EmblaCarousel from './EmblaCarousel';

export default function HomeContent() {
  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 12;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <div
      className="flex items-center lg:flex-1 justify-center lg:w-1/2 sm:w-full  h-full flex-col bg-[#3772FF] bg-[url(/images/gradient-background.avif)]
     bg-no-repeat bg-cover flex-[1]"
    >
      <div className="relative lg:w-1/3 md:w-full sm:w-60 h-1/3 sm:h-1/2 aspect-[11/12]">
        <Image
          src="/images/character-portrait.png"
          alt="cyberpunk image"
          fill
        />
      </div>
      <Image
        src="/images/hometext2xl.png"
        alt="Step into the future"
        height="300"
        width="700"
        className=" mt-10"
      />
      <Image
        src="/images/homedescription.png"
        alt="x"
        height="600"
        width="900"
        className="p-3 "
      />
      {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}
    </div>
  );
}
