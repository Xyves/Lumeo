'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

type ClientSessionProviderProps = {
  session: Session | null;
  children: React.ReactNode;
};

const ClientSessionProvider = ({
  session,
  children,
}: ClientSessionProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
export default ClientSessionProvider;
