import { useCallback } from 'react';

import fetchComments from './useComments';

export function useCommentsLoader() {
  const loadComments = useCallback(
    async ({
      setComments,
      postId,
      userId,
      setLoading,
    }: {
      setComments: any;
      postId: string | string[];
      userId: string;
      setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    }) => {
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
  const handleNewComment = useCallback(
    ({
      setCommentsAction,
      newComment,
    }: {
      setCommentsAction: React.Dispatch<React.SetStateAction<any>>;
      newComment: any;
    }) => {
      console.log(newComment);
      setCommentsAction((prev: any) => [newComment, ...prev]);
    },
    []
  );
  return { loadComments, handleNewComment };
}
