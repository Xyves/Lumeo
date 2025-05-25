import { useCallback } from 'react';

import type { loadProfileType, loadUsersType } from '@/types';

import fetchUsers, {
  fetchUserProfile,
  updateFollowUser,
  updateUserHook,
} from './useUsers';

export function useUsersLoader() {
  const loadUsers = useCallback(
    async ({
      userId,
      setLoading,
      input,
      setUsers,
      onlyFollowed,
    }: loadUsersType) => {
      setLoading(true);
      try {
        const data = await fetchUsers({ userId, input, onlyFollowed });
        setUsers(data);
      } catch (err) {
        console.error('Initial user load error', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const loadProfile = useCallback(
    async ({ setLoading, setUser, id, authorId }: loadProfileType) => {
      setLoading(true);
      try {
        const data = await fetchUserProfile({ id, authorId });
        setUser(data);
      } catch (err) {
        console.error('Initial user load error', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const changeFollowState = useCallback(
    async (
      followerId: string,
      followedId: string,
      isFollowed: boolean,
      setIsFollowed: (value: boolean) => void,
      setLoading: (value: boolean) => void
    ) => {
      setLoading(true);
      try {
        await updateFollowUser({ followerId, followedId, isFollowed });
        setIsFollowed(!isFollowed);
      } catch (err) {
        console.error('Initial user load error', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const updateUser = useCallback(async ({ form, setUser }) => {
    try {
      const { statusCode, data } = await updateUserHook({ form });
      if (statusCode === 200 || statusCode === 201) {
        setUser(data);
      }

      return { statusCode, data };
    } catch (err) {
      console.error('Initial user load error', err);
    }
  }, []);
  return { loadUsers, loadProfile, changeFollowState, updateUser };
}
