'use client';

import { createContext, useContext, useMemo, useState } from 'react';

import type { PopupState } from '@/types';

type PopupContextType = {
  popupData: PopupState;
  showPopup: (args: any) => void;
};
export const PopupContext = createContext<PopupContextType | undefined>(
  undefined
);

export default function PopupProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [popupData, setPopupData] = useState<PopupState>({
    isVisible: false,
  });
  type PopupType = 'success' | 'error' | 'loading' | undefined;

  type ShowPopupArgs = {
    isVisible: boolean;
    text: string;
    type: PopupType;
  };
  const showPopup = ({ isVisible, text, type }: ShowPopupArgs) => {
    setPopupData({ isVisible, text, type });
  };

  const value = useMemo(
    () => ({
      popupData,
      showPopup,
    }),
    [popupData, showPopup]
  );
  return (
    <div>
      <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
    </div>
  );
}
export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};
