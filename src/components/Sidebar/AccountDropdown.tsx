import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import React from 'react';

export default function AccountDropdown() {
  const logout = () => {
    signOut({ callbackUrl: `/` });
  };
  return (
    <div
      className="absolute right-0 bottom-12 w-full  border border-gray-200 rounded-xl shadow-lg z-50 p-2 bg-purple-600 hover:bg-purple-800 text-white"
      role="menu"
    >
      <button
        className="w-full text-left flex text-xs items-center  py-2 mx-2 rounded "
        role="menuitem"
        type="button"
        onClick={logout}
      >
        <LogOut className="" />
        <p>Logout</p>
        &nbsp;
        <span className="ml-auto px-4">@DemoMan</span>
      </button>
    </div>
  );
}
