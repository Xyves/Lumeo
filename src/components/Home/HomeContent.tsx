import Image from 'next/image';
import React from 'react';

import EmblaCarousel from './EmblaCarousel';

export default function HomeContent() {
  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 12;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <div className="flex items-center lg:flex-1 justify-center lg:w-1/2 sm:w-full  h-full flex-col bg-[#3772FF]">
      <Image
        src="/images/cyberpunkvector.png"
        alt="x"
        height="200"
        width="500"
      />
      <h2>Step into the feature</h2>
      {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}
    </div>
  );
}
