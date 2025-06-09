'use client';

import React, { useContext } from 'react';
import { OrbitProgress } from 'react-loading-indicators';

import { PopupContext } from '@/context/PopupContext';

export default function Popup() {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('Popup must be used within a PopupProvider');
  }
  const { popupData } = context;
  const { isVisible, text, type } = popupData;
  if (!isVisible) return null;
  let content;

  switch (type) {
    case 'success':
      content = (
        <div
          className="popup-message flex justify-between py-2 items-center bg-white rounded-2xl pr-8 h-16 z-50 blur-none"
          role="alert"
        >
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
        <div
          className="popup-message flex justify-between py-2 items-center z-50 bg-white rounded-2xl pr-8 h-16"
          role="alert"
        >
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
        <div
          className="popup-message flex justify-between py-2 items-center bg-white z-50 rounded-2xl px-8  h-16"
          role="alert"
        >
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
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 py-2 px-6 shadow-md flex items-center justify-center z-50">
      {content}
    </div>
  );
}
