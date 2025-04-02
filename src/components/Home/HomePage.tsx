'use client';

import React from 'react';
import type { EmblaOptionsType } from 'embla-carousel';

import EmblaCarousel from './EmblaCarousel';

import '@/styles/embla.css';

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 25;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
export default function HomePage() {
  return (
    <div>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  );
}
