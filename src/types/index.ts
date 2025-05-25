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
export type searchUserType = Pick<
  NonNullable<CurrentUserProps['currentUser']>,
  'id' | 'name' | 'image' | 'createdAt' | 'updatedAt'
>;
export type RegisterType = Pick<
  NonNullable<CurrentUserProps['currentUser']>,
  'name' | 'email' | 'password'
>;

type likesType = {
  id: string;
};
type authorType = {
  id: string;
  image: string;
  name: string;
};
export type editProfileType = {
  name: string;
  email: string;
  file: File;
};
export type getUsersProps = {
  input: string;
  userId: string;
  followed: boolean;
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
};
export interface PostComponentInterface {
  id: string;
  postId: string;
  authorId: string;
  userId: string;
  authorName: string;
  profile_image: string;
  content: string;
  post_image: string;
  date: Date;
  innerRef: any;
  likeCount: number;
  profileId: string;
  commentCount: number;
  isLiked: boolean;
  deletePost: any;
}
export type fetchLikedPostsType = Pick<
  PostComponentInterface,
  'profileId' | 'userId'
>;
export type loadUsersType = Pick<getUsersProps, 'userId' | 'input'> & {
  setLoading: (value: boolean) => void;
  setUsers: (users: any[]) => void;
  onlyFollowed: boolean;
};
export type loadProfileType = Pick<getUsersProps, 'id'> & {
  setLoading: (value: boolean) => void;
  setUser: (user: any) => void;
  authorId: string;
};
export type commentType = {
  commentLike: [];
  commentLikesCount: number;
  isLiked: boolean;
  text: string;
  timestamp: string;
};
export type toggleLikeType = {
  postId: string;
  userId: string;
  commentId: string;
};
export type followType = {
  isFollowed: boolean;
  followedId: string;
  followerId: string;
};
export type fetchPostType = Pick<PostComponentInterface, 'postId' | 'userId'>;
export type fetchUserPostsType = {
  start: string;
  userId: string;
  authorId: string;
};
export type PostCommentType = {
  text: string;
  isLiked: boolean;
  commentLikesCount: number;
  id: string;
  userId: string;
  name: string;
};
export interface PostInterface {
  author?: authorType;
  likes?: likesType[];
  authorId?: string;
  userId?: string;
  id: string;
  date: string;
  content: string;
  image_url: string;
  commentCount: number;
  likeCount: number;
}
export type editPostType = Pick<
  PostInterface,
  'id' | 'content' | 'image_url' | 'authorId'
>;
export type deletePostType = Pick<PostInterface, 'id' | 'authorId' | 'userId'>;
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

export type PopupState = {
  isVisible: boolean;
  text?: string;
  type?: 'success' | 'error' | 'loading';
};
export type PopupProps = {
  data: PopupState;
};
