import { MessageCircle } from 'lucide-react';
import React from 'react';

export default function CommentsButton({ commentsCount }) {
  return (
    <div className="flex ml-3">
      <button>
        <MessageCircle />
      </button>
      <p>4</p>
    </div>
  );
}
