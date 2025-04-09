import React from 'react';
import Form from 'next/form';

export default function LoginWindow() {
  return (
    <div className=" [&>input]:mb-12 [&>input]:p-1  p-10  w-1/2 text-[#ffcc00]">
      <h2>Welcome to NeonSphere</h2>
      <Form action="" className="flex flex-col [&>button]:p-4  gap-3 ">
        <label htmlFor="">Nickname</label>
        <input type="text" className="p-3" />
        <label htmlFor="">Password</label>
        <input type="text" className="p-3" />
        <button className="bg-[#d40011]" type="submit">
          Login
        </button>
        <button className="bg-[#02012b]" type="button">
          Github Login
        </button>
        <button className="bg-[#fd7394]" type="button">
          Guest user
        </button>
        <h3 className="text-sm">Don't have an account?</h3>
        <span>Register now!</span>
      </Form>
    </div>
  );
}
