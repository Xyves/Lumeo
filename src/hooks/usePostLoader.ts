import { useCallback } from 'react';

import fetchPosts, { fetchPost, useToggleLike } from './usePostFeed';

type LoadPostsArgs = {
  start: number;
  userId: string;
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  feedType: string;
};
export function usePostLoader() {
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
  const updateStart = useCallback(setStart => {
    setStart(prev => prev + 5);
  }, []);
  const handleNewPost = useCallback((setPosts, newPost) => {
    setPosts(prev => [newPost, ...prev]);
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
        const data = await useToggleLike({ userId, postId, commentId });
        return data;
      } catch (err) {
        console.error('Initial load error', err);
      } finally {
        setLoading(false);
      }
    },
    [fetchPosts]
  );
  return { loadPosts, loadPost, updateStart, handleNewPost, updateLikeStatus };
}
