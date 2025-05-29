import type React from 'react';
import { useCallback } from 'react';
import { boolean } from 'zod';

import type { fetchUserPostsType } from '@/types';

import fetchPosts, {
  createNewPostHook,
  deletePostById,
  fetchLikedPosts,
  fetchPost,
  fetchUserPosts,
  useToggleLike,
} from './usePostFeed';

export type LoadPostsArgs = {
  start: number;
  userId: string | undefined;
  authorId?: string | undefined;
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  feedType?: string;
};
export type ProfileModalArgs = {
  modalVisible: boolean;
  setModalVisibleAction: React.Dispatch<React.SetStateAction<boolean>>;
  id: string | string[];
  setUserAction: React.Dispatch<React.SetStateAction<any>>;
  user: {
    name?: string;
    email?: string;
    image?: string;
    file?: string;
  };
};
export type loadPostArg = {
  setPost: React.Dispatch<React.SetStateAction<any>>;
  postId: string | string[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
};
export function usePostLoader() {
  const createNewPost = useCallback(
    async ({
      content,
      id,
      file,
      name,
      image,
    }: {
      content: string;
      id: string;
      file: File | null;
      name: string;
      image: string;
    }) => {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('id', id);
      formData.append('name', name);
      formData.append('image', image);
      if (file) {
        formData.append('file', file);
      }
      const newPost = await createNewPostHook({ formData });
      return newPost;
    },
    []
  );
  const loadPosts = useCallback(
    async ({
      setPosts,
      start,
      userId,
      setLoading,
      feedType,
    }: LoadPostsArgs) => {
      setLoading(true);
      try {
        const data = await fetchPosts({ start, userId, feedType });
        if (start === 0) {
          if (!data || Object.keys(data).length === 0) {
            console.warn('No post found. Skipping setPost.');
            return; // Stop further processing
          }
          setPosts(data);
        } else {
          if (!data || data.length === 0) {
            return;
          }
          setPosts(prev => [...prev, ...data]);
        }
      } catch (err) {
        console.error('Initial load error', err);
      } finally {
        setLoading(false);
      }
    },
    [fetchPosts]
  );
  const loadPost = useCallback(
    async ({ setPost, postId, setLoading, userId }: loadPostArg) => {
      setLoading(true);
      try {
        const data = await fetchPost({ postId, userId });
        console.log('Fetched data:', data);
        setPost(data);
      } catch (err) {
        console.error('Initial load error', err);
      } finally {
        setLoading(false);
      }
    },
    [fetchPost]
  );
  const deletePostFromDb = useCallback(
    async ({ id, authorId, userId }: fetchUserPostsType) => {
      console.log('Waiting to delete post id of', id);
      if (!id) return null;
      try {
        const data = await deletePostById({ id, authorId, userId });
        return data;
      } catch (err) {
        console.error("Can't delete post", err);
      }
    },
    []
  );

  const loadUserPosts = useCallback(
    async ({
      setPosts,
      start,
      userId,
      setLoading,
      authorId,
    }: LoadPostsArgs) => {
      setLoading(true);
      try {
        const data = await fetchUserPosts({ start, userId, authorId });
        if (start === 0) {
          if (!data || Object.keys(data).length === 0) {
            console.warn('No post found. Skipping setPost.');
            return;
          }
          setPosts(data);
        } else {
          setPosts(prev => [...prev, ...data]);
        }
      } catch (err) {
        console.error('Initial load error', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const loadLikedPosts = useCallback(
    async ({
      userId,
      setLoading,
      setPosts,
      profileId,
    }: {
      userId: string | undefined;
      setLoading: React.Dispatch<React.SetStateAction<boolean>>;
      setPosts: React.Dispatch<React.SetStateAction<any>>;
      profileId: string | string[] | any;
    }) => {
      setLoading(true);
      try {
        const data = await fetchLikedPosts({ profileId, userId });
        console.log('Fetched data:', data);
        setPosts(data);
      } catch (err) {
        console.error('Initial load error', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const updateStart = useCallback((setStart: any) => {
    setStart((prev: any) => prev + 5);
  }, []);
  const handleNewPost = useCallback(
    ({
      setPostsAction,
      newPost,
    }: {
      setPostsAction: React.Dispatch<React.SetStateAction<any>>;
      newPost: any;
    }) => {
      console.log('new post added:', newPost);
      setPostsAction((prev: any) => [newPost, ...prev]);
    },
    []
  );
  const updateLikeStatus = useCallback(
    async ({
      userId,
      postId,
      commentId,
      setLoading,
    }: {
      userId: string;
      postId?: string;
      commentId?: string;
      setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    }) => {
      setLoading(true);
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const data = await useToggleLike({ userId, postId, commentId });
        return data;
      } catch (err) {
        console.error('Initial load error', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );
  return {
    loadPosts,
    loadPost,
    updateStart,
    handleNewPost,
    updateLikeStatus,
    loadUserPosts,
    loadLikedPosts,
    deletePostFromDb,
    createNewPost,
  };
}
