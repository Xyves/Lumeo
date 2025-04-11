import { LogOut } from 'lucide-react';
import React from 'react';

export default function AccountDropdown() {
  return (
    <div
      className="absolute right-0 bottom-14 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-2"
      role="menu"
    >
      <button
        className="w-full text-left flex text-xs items-center  py-2 mx-2 hover:bg-gray-100 rounded text-black"
        role="menuitem"
        type="button"
      >
        <LogOut className="" />
        <p>Logout</p>
        &nbsp;
        <span className="ml-auto px-4">@DemoMan</span>
      </button>
    </div>
  );
}
