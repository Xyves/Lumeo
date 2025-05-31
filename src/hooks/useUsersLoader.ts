import { useCallback } from 'react';

import type { loadProfileType, loadUsersType, UpdateUserArgs } from '@/types';

import fetchUsers, {
  fetchUserProfile,
  registerUser,
  updateFollowUser,
  updateUserHook,
} from './useUsers';

export function useUsersLoader() {
  const registerUserCallback = useCallback(
    async ({
      data,
    }: {
      data: { name: string; email: string; password: string };
    }) => {
      try {
        const response = await registerUser({ data });
        return response;
      } catch (err) {
        console.error('Cannot register user', err);
      }
    },
    []
  );
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
      setLoading: (value: boolean) => void
    ) => {
      setLoading(true);
      try {
        await updateFollowUser({ followerId, followedId, isFollowed });
      } catch (err) {
        console.error('Initial user load error', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const updateUser = useCallback(
    async ({ form, setUser }: UpdateUserArgs): Promise<any> => {
      // console.log('updatedUser:', form, setUser);
      try {
        const response = await updateUserHook({ form });
        if (!response) {
          return;
        }
        const { statusCode, data } = response;
        if (statusCode === 200 || statusCode === 201) {
          setUser(data);
        }
        return { statusCode };
      } catch (err) {
        console.error('Initial user load error', err);
      }
    },
    []
  );
  return {
    loadUsers,
    loadProfile,
    changeFollowState,
    updateUser,
    registerUserCallback,
  };
}
