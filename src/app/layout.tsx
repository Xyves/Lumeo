import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';

import type { ChildrenProps } from '@/types';
import Popup from '@/components/popup/Popup';
import PopupProvider from '@/context/PopupContext';

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @font-face {
            font-family: 'Glitch';
            src: url('/fonts/glitch.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
            @font-face {
            font-family: 'Lunar';
            src: url('/fonts/LunarEscape.otf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
        `}</style>
      </head>
      <body
        className={`${inter.className} bg-[#171006] overflow-hidden min-h-full min-w-full`}
      >
        <ClientSessionProvider session={session}>
          <PopupProvider>
            <div className="h-full flex flex-col  ">
              {/* <Heading title="NeonSphere " /> */}
              <section className="flex-1 h-full">{children}</section>
              {/* <MainFooter /> */}
            </div>
            <Popup />
          </PopupProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
