'use client';

import { Search, X } from 'lucide-react';
import React, { useRef, useState } from 'react';

export default function SearchContainer({ input, setInput }) {
  const [value, setValue] = useState('');
  const inputRef = useRef('');
  const clearInput = () => {
    setInput('');
    inputRef.current?.focus();
  };
  return (
    <form className="flex h-12  bg-[#000000d9] items-center relative mb-6 mt-2">
      <Search className="absolute left-2 -translate-y-1/2 top-1/2 p-1" />
      <input
        type="search"
        placeholder="Search"
        ref={inputRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        className="w-full  appearance-none [&::-webkit-search-cancel-button]:hidden  text-white bg-inherit  p-1  px-8 h-full"
      />
      {value && (
        <button onClick={clearInput} type="button">
          <X className="absolute right-2 -translate-y-1/2 top-1/2 p-1" />
        </button>
      )}
    </form>
  );
}
