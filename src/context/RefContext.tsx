'use client';

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type RefObject,
} from 'react';

export type RefContextType = {
  targetRef: RefObject<HTMLDivElement | null>;
};

const RefContext = createContext<RefContextType | undefined>(undefined);

export const useTargetRef = () => {
  const context = useContext(RefContext);
  if (!context) {
    throw new Error('useTargetRef must be used within a RefProvider');
  }
  return context;
};

export const RefProvider = ({ children }: { children: React.ReactNode }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const contextValue = useMemo(() => ({ targetRef }), []);
  return (
    <RefContext.Provider value={contextValue}>{children}</RefContext.Provider>
  );
};
