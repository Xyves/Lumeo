import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-full w-full ">
      <div className=" flex flex-1 bg-gray-800 ">{children}</div>
    </div>
  );
};
export default AuthLayout;
