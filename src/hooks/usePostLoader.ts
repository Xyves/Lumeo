import { useCallback } from 'react';

import fetchPosts from './usePostFeed';

type LoadPostsArgs = {
  start: number;
  userId: string;
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
export function usePostLoader() {
  const loadPosts = useCallback(
    async ({ setPosts, start, userId, setLoading }: LoadPostsArgs) => {
      setLoading(true);
      try {
        const data = await fetchPosts({ start, userId });
        if (start === 0) {
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
  const updateStart = useCallback(setStart => {
    setStart(prev => prev + 5);
  }, []);
  const handleNewPost = useCallback((setPosts, newPost) => {
    setPosts(prev => [newPost, ...prev]);
  }, []);

  return { loadPosts, updateStart, handleNewPost };
}
