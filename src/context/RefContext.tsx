'use client';

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  type RefObject,
} from 'react';

type RefContextType = {
  targetRef: RefObject<HTMLDivElement>;
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

  // ✅ Memoize the value
  const contextValue = useMemo(() => ({ targetRef }), []);

  return (
    <RefContext.Provider value={contextValue}>{children}</RefContext.Provider>
  );
};
