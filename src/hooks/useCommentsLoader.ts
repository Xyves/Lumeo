import { useCallback } from 'react';

import fetchComments from './useComments';

export function useCommentsLoader() {
  const loadComments = useCallback(
    async ({ setComments, postId, userId, setLoading }) => {
      setLoading(true);
      try {
        const data = await fetchComments({ postId, userId });
        setComments(data);
        console.log('set comments:', data);
      } catch (err) {
        console.error('Initial load error', err);
      } finally {
        setLoading(false);
      }
    },
    [fetchComments]
  );
  const handleNewComment = useCallback((setComments, newComment) => {
    console.log(newComment);
    setComments(prev => [newComment, ...prev]);
  }, []);
  return { loadComments, handleNewComment };
}
