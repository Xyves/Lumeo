import { MessageCircle } from 'lucide-react';
import React from 'react';

export default function CommentsButton({
  commentsCount,
  id,
}: {
  commentsCount: number;
  id: string;
}) {
  return (
    <div className="flex ml-3">
      <button type="button">
        <MessageCircle />
      </button>
      <p className="pl-1">{commentsCount}</p>
    </div>
  );
}
