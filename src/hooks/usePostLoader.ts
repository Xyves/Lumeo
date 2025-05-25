import type React from 'react';
import { useCallback } from 'react';

import fetchPosts, {
  deletePostById,
  fetchLikedPosts,
  fetchPost,
  fetchUserPosts,
  useToggleLike,
} from './usePostFeed';

export type LoadPostsArgs = {
  start: number;
  userId: string;
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  feedType: string;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
};
export function usePostLoader() {
  const loadPosts = useCallback(
    async ({
      setPosts,
      start,
      userId,
      setLoading,
      setHasMore,
      feedType,
    }: LoadPostsArgs) => {
      setLoading(true);
      try {
        const data = await fetchPosts({ start, userId, feedType });
        if (start === 0) {
          if (!data || Object.keys(data).length === 0) {
            console.warn('No post found. Skipping setPost.');
            setHasMore(false);
            return; // Stop further processing
          }
          setPosts(data);
        } else {
          if (!data || data.length === 0) {
            setHasMore(false);
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
    async ({ setPost, postId, setLoading, userId }) => {
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
  const deletePostFromDb = useCallback(async ({ id, authorId, userId }) => {
    console.log('Waiting to delete post id of', id);
    try {
      const data = await deletePostById({ id, authorId, userId });
      return data;
    } catch (err) {
      console.error("Can't delete post", err);
    }
  }, []);

  const loadUserPosts = useCallback(
    async ({ setPosts, start, userId, setLoading, authorId }) => {
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
    async ({ userId, setLoading, setPosts, profileId }) => {
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
  const updateStart = useCallback(setStart => {
    setStart((prev: any) => prev + 5);
  }, []);
  const handleNewPost = useCallback((setPosts, newPost) => {
    setPosts((prev: any) => [newPost, ...prev]);
  }, []);
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
  };
}
