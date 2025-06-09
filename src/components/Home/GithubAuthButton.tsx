import { Github } from 'lucide-react';
import { signIn } from 'next-auth/react';
import React from 'react';

export default function GithubAuthButton() {
  const handleClick = () => {
    signIn('github');
  };
  return (
    <button
      className="bg-[#02012b] text-[#f1f1f1] flex  w-full hover:bg-[#1e1e44f8] rounded-lg"
      type="button"
      onClick={handleClick}
    >
      <p className="flex text-center items-center mx-auto ">
        <Github />
        <span>Log In with Github</span>
      </p>
    </button>
  );
}
