import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: () => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type ChildrenProps = {
  children: ReactNode;
};

export type IToken = {
  accessToken: string;
  refreshToken?: string;
};

export interface CurrentUserProps {
  currentUser?: {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    password: string | null;
    isAdmin: boolean;
  } | null;
}
type likesType = {
  id: string;
};
type authorType = {
  id: string;
  image: string;
  name: string;
};

export interface PostInterface {
  author?: authorType;
  likes?: likesType[];
  id: string;
  date: string;
  content: string;
  image_url: string;
  commentCount: number;
  likeCount: number;
}
interface User {
  id: string;
  name: string;
  email: string;
}

export interface SessionInterface {
  user: User;
  status?: boolean;
}
export type LoginSchema = {
  name: string;
  password: string;
};
