import React from 'react';

import Post from './Post';

export default function PostsList({ posts }: { posts: any }) {
  return posts.map(post => {
    return (
      <Post
        name={post.name}
        profile_url={post.profile_url}
        id={post.id}
        time={post.time}
        key={post.id}
      />
    );
  });
}
