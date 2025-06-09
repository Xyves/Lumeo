'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { usePopup } from '@/context/PopupContext';

import GithubAuthButton from './GithubAuthButton';

export default function LoginWindow() {
  const { showPopup } = usePopup();
  const router = useRouter();

  const [data, setData] = useState({
    name: '',
    password: '',
  });
  const guestData = {
    name: 'Guest',
    password: 'DJSNGeo3',
  };
  const loginUser = async (
    e: React.FormEvent,
    { isGuest }: { isGuest: boolean }
  ) => {
    e.preventDefault();
    showPopup({
      isVisible: true,
      text: 'Loading',
      type: 'loading',
    });
    const res = await signIn('credentials', {
      ...(isGuest ? guestData : data),
      redirect: false,
    });
    if (res?.error) {
      showPopup({
        isVisible: true,
        text: 'Login Failed',
        type: 'error',
      });
      console.error('Login failed:', res.error);
    } else {
      showPopup({
        isVisible: true,
        text: 'Welcome back',
        type: 'success',
      });
      setTimeout(() => {
        showPopup({
          isVisible: false,
          text: '',
          type: undefined,
        });
        router.push('/feed');
      }, 2000);
    }
  };
  return (
    <div
      className="w-full md:w-2/5 bg-[#1f2937] h-full  text-[#f1f1f1] flex justify-center items-center flex-col  py-20 md:py-3 space-y-5 md:space-y-6 sm:p-8   md:h-full sm:h-full"
      data-testid="login-form"
    >
      <h2 className="flex items-center tracking-[.35rem]">
        <p className="text-xl sm:text-2xl font-lunar md:text-xl lg:text-3xl font-bold">
          Welcome to &nbsp;
        </p>
        <span className=" font-lunar  text-xl md:text-xl lg:text-3xl font-bold">
          Lumeo
        </span>
      </h2>

      <form
        onSubmit={e => loginUser(e, { isGuest: false })}
        className="flex flex-col [&>button]:p-3 py-2 md:py-8 lg:py-24  gap-3 md:w-3/4 lg:w-1/2 w-3/4     "
        method="get"
      >
        <label
          htmlFor="name"
          className="block  text-sm font-medium text-gray-900 dark:text-white"
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
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border mb-2 md:mb-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={data.password}
          onChange={(e: any) => {
            setData({ ...data, password: e.target.value });
          }}
          required
        />
        <button
          className="bg-[#05036d] text-[#f1f1f1] hover:bg-[#0f2f70] rounded-lg"
          type="submit"
          data-testid="login-button"
        >
          Login
        </button>

        <GithubAuthButton />
        <button
          className="bg-[#2b29aa] text-[#f1f1f1] hover:bg-[#0f2f70] rounded-lg"
          type="button"
          onClick={e => loginUser(e, { isGuest: true })}
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
