import NewFollows from '@/components/Aside/NewFollowers';
import Sidebar from '@/components/Sidebar/Sidebar';
import { RefProvider } from '@/context/RefContext';
import type { ChildrenProps } from '@/types';

export default function MainLayout({ children }: ChildrenProps) {
  return (
    <RefProvider>
      <main className="flex flex-row  mx-auto h-full  [&>*]:w-1/4   w-[68%] ">
        <div className="h-auto flex">
          <Sidebar />
        </div>
        <div className=" sm:w-full md:w-3/5 lg:w-2/5 h-screen  flex md:px-10 px-2 mx-auto">
          {children}
        </div>
        <NewFollows />
      </main>
    </RefProvider>
  );
}
