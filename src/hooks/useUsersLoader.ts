import { useCallback } from 'react';

import { fetchProfile } from '@/services/userService';

import fetchUsers, { fetchUserProfile, updateFollowUser } from './useUsers';
// import fetchUsers

export function useUsersLoader() {
  const loadUsers = useCallback(
    async ({ userId, setLoading, input, setUsers, onlyFollowed }) => {
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
    async ({ setLoading, setUser, id, authorId }) => {
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
      setLoading
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
  return { loadUsers, loadProfile, changeFollowState };
}
