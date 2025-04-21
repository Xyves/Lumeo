import { Heart } from 'lucide-react';
import React from 'react';

export default function LikeButton({ likeCount }) {
  return (
    <button className="flex">
      <Heart />
      <span>{likeCount}</span>
    </button>
  );
}
