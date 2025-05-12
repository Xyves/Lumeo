import React from 'react';
import { OrbitProgress } from 'react-loading-indicators';

import type { PopupProps } from '@/types';

export default function Popup({ data: { isVisible } }: PopupProps) {
  // if (!isVisible) return null;
  let content;
  const type = 'error';
  // const text = 'Signing user...';
  const text = 'Please login';
  let colorClass;
  switch (type) {
    case 'success':
      content = (
        <div className="popup-message flex justify-between py-2 items-center bg-white rounded-2xl pr-8 h-16">
          <video
            src="/images/success-animation.webm"
            autoPlay
            muted
            playsInline
            style={{ width: '80px', height: '100px' }}
          />
          <span className="text-sm text-gray-800 ml-4">{text}</span>
        </div>
      );
      break;
    case 'error':
      content = (
        <div className="popup-message flex justify-between py-2 items-center bg-white rounded-2xl pr-8 h-16">
          <video
            src="/images/fail-animation.webm"
            autoPlay
            muted
            playsInline
            style={{ width: '80px', height: '100px' }}
          />
          <span className="text-sm text-gray-800">{text}</span>
        </div>
      );
      break;
    case 'loading':
      content = (
        <div className="popup-message flex justify-between py-2 items-center bg-white rounded-2xl px-8  h-16">
          <OrbitProgress
            variant="track-disc"
            color="#1a2bc5"
            speedPlus={2}
            size="small"
            text=""
            textColor=""
          />
          <span className="text-sm text-gray-800 ml-4">{text}</span>
        </div>
      );
      break;
    default:
      content = null;
  }

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 py-2 px-6 shadow-md flex items-center justify-center ">
      {content}
    </div>
  );
}
