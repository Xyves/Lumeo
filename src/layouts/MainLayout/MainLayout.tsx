import NewFollows from '@/components/Aside/NewFollowsers';
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
        <div className=" sm:w-full md:w-3/5 lg:w-2/5 h-auto flex px-10 mx-auto">
          {children}
        </div>
        <NewFollows />
      </main>
    </RefProvider>
  );
}
