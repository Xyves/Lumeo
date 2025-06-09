import Image from 'next/image';
import React from 'react';

export default function HomeContent() {
  return (
    <div
      className="md:flex items-center lg:flex-1  justify-center lg:w-1/2 sm:w-full  h-full flex-col bg-[#3772FF] bg-[url(/images/inline_image_preview.jpg)]
     bg-no-repeat bg-cover flex-[1] hidden h-0 md:h-full"
    >
      <div className="relative hidden md:inline-block lg:w-1/2 md:w-full w-60 sm:w-60 h-1/3 sm:h-1/2 aspect-[11/12]">
        <Image
          src="/images/character-portrait2.png"
          alt="cyberpunk image"
          fill
        />
      </div>

      <h2 className="mt-10 lg:text-6xl md:text-3xl sm:text-xl text-md font-lunar text-[#29cbe0]">
        Step into the future
      </h2>
      <h2 className="mt-6 lg:text-4xl md:text-xl sm:text-lg text-md font-lunar text-[#81bdbd]">
        Join the best community and connect with others.
      </h2>
    </div>
  );
}
