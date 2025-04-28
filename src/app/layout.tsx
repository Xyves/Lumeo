import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';

import type { ChildrenProps } from '@/types';
import Heading from '@/components/Header/Heading';

import ClientSessionProvider from './ClientSessionProvider';
import { authOptions } from './api/auth/[...nextauth]/route';

export const metadata = {
  description:
    'A highly opinionated and complete starter for Next.js projects ready to production. Includes Typescript, Styled Components, Prettier, ESLint, Husky, SEO, and more.',
  keywords: 'Facebook, Instagram, TheOdinProject, TOP, TOP project, nextjs',
  title: 'Lumeo',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
});

export default async function RootLayout({ children }: ChildrenProps) {
  // Await the session data
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#171006] overflow-hidden min-h-full min-w-full`}
      >
        <ClientSessionProvider session={session}>
          <div className="h-full flex flex-col  ">
            <Heading title="NeonSphere " />
            <section className="flex-1 h-full">{children}</section>
            {/* <MainFooter /> */}
          </div>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
