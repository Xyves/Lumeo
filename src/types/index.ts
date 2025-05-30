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
    id: string;
    name: string;
    email: string | null;
    image: string | null;
    password: string | null;
    emailVerified: string | null | undefined;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
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

export type FollowerType = {
  id: string;
  name: string;
  profile_url: string;
  image: string;
};

export type editProfileType = {
  name: string;
  email: string;
  file: File;
};

export type getUsersProps = {
  input?: string | null;
  userId?: string | null;
  followed?: boolean;
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image: string | null;
};

export type profileUserInterface = Omit<
  NonNullable<CurrentUserProps['currentUser']>,
  'password' | 'emailVerified' | 'isAdmin'
> & {
  followedCounter: number;
  followingCounter: number;
  isFollowing: boolean;
};
export interface PostComponentInterface {
  id: string;
  postId?: string;
  authorId: string;
  userId?: string;
  authorName: string;
  profile_image: string;
  content: string;
  post_image: string;
  date: Date;
  innerRef: any;
  likeCount: number;
  profileId?: string;
  commentCount: number;
  isLiked: boolean;
  deletePost: any;
}

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

export type PostCommentType = {
  id: string;
  userId: string;
  name: string;
  text: string;
  profile_url?: string;
  isLiked: boolean;
  commentLikesCount: number;
};

export type editPostType = Pick<
  PostInterface,
  'id' | 'content' | 'image_url' | 'authorId'
>;

export type deletePostType = Pick<PostInterface, 'id' | 'authorId' | 'userId'>;

export type fetchLikedPostsType = Pick<
  PostComponentInterface,
  'profileId' | 'userId'
>;

export type fetchPostType = Pick<PostComponentInterface, 'postId' | 'userId'>;

export type fetchUserPostsType = {
  start?: number;
  id?: string | undefined | any;
  userId: string | undefined;
  authorId: string | undefined;
};

export type getSinglePost = {
  userId: PostComponentInterface['userId'];
  postId: string | string[];
};

export type toggleLikeType = {
  postId: string | undefined;
  userId: string;
  commentId: string | undefined;
};

export interface CloudinaryResponseInterface {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  original_filename: string;
  api_key: string;
}

export type loadUsersType = {
  input?: string;
  userId?: string;
  setLoading: (state: any) => void;
  setUsers: (users: any) => void;
  onlyFollowed: boolean;
};

export type userServiceGetUsersProps = Pick<
  getUsersProps,
  'userId' | 'input' | 'followed'
>;

export type loadProfileType = Pick<getUsersProps, 'id'> & {
  setLoading: (boolean: boolean) => void;
  setUser: (data: any) => void;
  authorId: string;
};

export type followType = {
  isFollowed: boolean;
  followedId: string;
  followerId: string;
};

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

export type UpdateUserResponse = {
  statusCode: number;
  data: any;
};

export type UpdateUserArgs = {
  form: FormData;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export type PopupState = {
  isVisible: boolean;
  text?: string;
  type?: 'success' | 'error' | 'loading';
};

export type PopupProps = {
  data: PopupState;
};

type ViewType = 'posts' | 'likes';

export type PostsLikesToggleProps = {
  view: ViewType;
  setView: React.Dispatch<React.SetStateAction<ViewType>>;
};

type likesType = {
  id: string;
};

type authorType = {
  id: string;
  image: string;
  name: string;
};

export interface Author {
  id: string;
  name: string;
  image: string;
}

export interface singlePostInterface {
  id: string;
  image_url: string | null;
  content: string;
  date: string;
  likeCount: number;
  commentCount: number;
  likes: string[];
  author: Author;
  isLiked: boolean;
}

export interface CommentUser {
  id: string;
  name: string;
  image: string;
}

export interface CommentInterface {
  id: string;
  text: string;
  timestamp: string;
  commentLikesCount: number;
  commentLike: any[];
  user: {
    id: string;
    name: string;
    image: string;
  };
  isLiked: boolean;
}

export interface createCommentInterface {
  id: string;
  post_id: string;
  user_id: string;
  text: string;
  timestamp: string;
  commentLikesCount: number;
  isLiked: boolean;
  user: {
    name: string;
    image: string;
  };
}
