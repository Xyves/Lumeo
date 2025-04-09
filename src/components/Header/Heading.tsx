'use client';

import Header from '.';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <nav className="flex justify-start bg-[#171006] py-4">
      <header className="h-12 w-auto px-6 py-2 flex items-start ">
        <div className="text-2xl font-bold">{title}</div>
        <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
      </header>
    </nav>
  );
};

export default Heading;
