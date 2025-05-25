import React from 'react';

import type { searchUserType } from '@/types';

import SearchUser from './SearchUser';

export default function SearchUserList({ users }: { users: searchUserType }) {
  if (!users || !Array.isArray(users)) {
    return <p>No users found.</p>;
  }
  return (
    <div className="w-full ">
      {users.map(user => (
        <div key={user.id} className="w-full">
          <SearchUser name={user.name} id={user.id} image={user.image} />
        </div>
      ))}
    </div>
  );
}
