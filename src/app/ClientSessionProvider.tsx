'use client';

import { SessionProvider, useSession } from 'next-auth/react';

const ClientSessionProvider = ({ session, children }: any) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
export default ClientSessionProvider;
