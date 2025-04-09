import Sidebar from '@/components/Sidebar/Sidebar';
import type { ChildrenProps } from '@/types';

export default function MainLayout({ children }: ChildrenProps) {
  return (
    <main className="flex flex-row relative mx-auto  [&>*]:w-1/4 h-full">
      <Sidebar />
      {children}
    </main>
  );
}
