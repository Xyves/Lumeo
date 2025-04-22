import { useCallback } from 'react';

import { fetchProfile } from '@/services/userService';

import fetchUsers, { fetchUserProfile } from './useUsers';
// import fetchUsers

export function useUsersLoader() {
  const loadUsers = useCallback(
    async ({ userId, setLoading, input, setUsers }) => {
      setLoading(true);
      try {
        const data = await fetchUsers({ userId, input });
        setUsers(data);
      } catch (err) {
        console.error('Initial user load error', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const loadProfile = useCallback(async ({ setLoading, setUser, id }) => {
    setLoading(true);
    try {
      const data = await fetchUserProfile({ id });
      setUser(data);
    } catch (err) {
      console.error('Initial user load error', err);
    } finally {
      setLoading(false);
    }
  }, []);
  return { loadUsers, loadProfile };
}
