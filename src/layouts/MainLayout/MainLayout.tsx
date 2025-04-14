import Sidebar from '@/components/Sidebar/Sidebar';
import { RefProvider } from '@/context/RefContext';
import type { ChildrenProps } from '@/types';

export default function MainLayout({ children }: ChildrenProps) {
  return (
    <RefProvider>
      <main className="flex flex-row relative mx-auto h-full min-h-screen [&>*]:w-1/4  w-[68%]">
        <div className=" h-auto flex">
          <Sidebar />
        </div>
        {children}
      </main>
    </RefProvider>
  );
}
