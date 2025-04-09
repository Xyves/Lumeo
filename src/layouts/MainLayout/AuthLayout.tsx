import type { ReactNode } from 'react';
import Image from 'next/image';

import EmblaCarousel from '@/components/Home/EmblaCarousel';

interface AuthLayoutProps {
  children: ReactNode;
}
const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 12;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-full w-full ">
      <div
        className="w-1/2  flex items-center justify-center h-full"
        style={{ backgroundColor: '#00ff99' }}
      >
        {children}
      </div>
      <div
        className="flex items-center justify-center w-1/2  h-full flex-col"
        style={{ backgroundColor: '	#0077ff' }}
      >
        <Image
          src="/images/cyberpunkvector.png"
          alt="x"
          height="200"
          width="500"
        />
        <h2>Step into the feature</h2>
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </div>
  );
};
export default AuthLayout;
