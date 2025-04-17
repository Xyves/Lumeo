'use client';

import React, { useState } from 'react';
import { Github } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import GithubAuthButton from './GithubAuthButton';

export default function LoginWindow() {
  const router = useRouter();
  const [data, setData] = useState({
    name: '',
    password: '',
  });

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      console.error('Login failed:', res.error);
    } else {
      router.push('/feed'); // or wherever
    }
  };
  return (
    <div className="w-2/5  bg-[#1f2937] text-[#f1f1f1] flex justify-center items-center flex-col  space-y-4 md:space-y-6 sm:p-8 ">
      <h1 className="text-7xl">Hi there!</h1>
      <h2 className="text-2xl">
        Welcome to{' '}
        <span className="underline font-[cyberwayriders]">Lumeo</span>
      </h2>

      <form
        className="flex flex-col [&>button]:p-3 py-24  gap-3 w-1/2    "
        onSubmit={loginUser}
        method="get"
      >
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nickname
        </label>
        <input
          type="name"
          name="name"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your username"
          required
          value={data.name}
          onChange={(e: any) => {
            setData({ ...data, name: e.target.value });
          }}
        />
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border mb-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={data.password}
          onChange={(e: any) => {
            setData({ ...data, password: e.target.value });
          }}
          required
        />
        <button
          className="bg-[#05036d] text-[#f1f1f1] hover:bg-[#0f2f70]"
          type="submit"
        >
          Login
        </button>

        <GithubAuthButton />
        <button
          className="bg-[#05036d] text-[#f1f1f1] hover:bg-[#0f2f70]"
          type="button"
        >
          Guest user
        </button>
        <div className="flex items-center">
          <h3 className="text-sm mr-1">Don't have an account?</h3>
          <Link href="/signup">
            <span className="underline">Register now!</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
