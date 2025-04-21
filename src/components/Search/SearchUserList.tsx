import React from 'react';

import SearchUser from './SearchUser';

export default function SearchUserList({ users }) {
  if (!users || !Array.isArray(users)) {
    return <p>No users found.</p>;
  }

  return (
    <div className="w-full">
      {users.map(user => (
        <div key={user.id} className="w-full">
          <SearchUser name={user.name} id={user.id} image={user.image} />
        </div>
      ))}
    </div>
  );
}
