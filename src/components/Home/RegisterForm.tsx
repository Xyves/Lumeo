'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import type { RegisterType } from '@/schema';
import { RegisterSchema } from '@/schema';

export default function RegisterForm() {
  const router = useRouter();
  const [data, setData] = useState<RegisterType>({
    name: '',
    email: '',
    password: '',
  });

  const registerUser = async (e: any) => {
    e.preventDefault();
    console.log({ data });
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const userInfo = await response.json();
    console.log(userInfo);
    router.push('/');
  };
  return (
    <div className="  lg:w-2/5  sm:w-full md:w-full bg-white rounded-lg shadow dark:border md:mt-0    dark:bg-gray-800 justify-center items-center flex dark:border-gray-700 ">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8  lg:w-1/2 sm:w-full md:w-full   items-center ">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an account
        </h1>
        <form
          className="space-y-4 md:space-y-6 "
          method="POST"
          onSubmit={registerUser}
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              value={data.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your username"
              required
              onChange={e => {
                setData({ ...data, name: e.target.value });
              }}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email"
              required
              onChange={e => {
                setData({ ...data, email: e.target.value });
              }}
            />
          </div>
          <div>
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
              value={data.password}
              onChange={e => {
                setData({ ...data, password: e.target.value });
              }}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Create an account
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              href="/"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500 underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
