import React from 'react';
import Form from 'next/form';
import { Github, GithubIcon } from 'lucide-react';
import Link from 'next/link';

export default function LoginWindow() {
  return (
    <div className="  w-1/2  bg-[#1f2937] text-[#f1f1f1] flex justify-center items-center flex-col  space-y-4 md:space-y-6 sm:p-8 ">
      <h1 className="text-7xl">Hi there!</h1>
      <h2 className="text-2xl">
        Welcome to <span className="underline">NeonSphere</span>
      </h2>

      <Form
        action=""
        className="flex flex-col [&>button]:p-3 py-24  gap-3 w-1/3     "
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        <button
          className="bg-[#05036d] text-[#f1f1f1] hover:bg-[#0f2f70]"
          type="submit"
        >
          Login
        </button>

        <button
          className="bg-[#02012b] text-[#f1f1f1] flex  w-full hover:bg-[#1e1e44f8]"
          type="button"
        >
          <p className="flex text-center items-center mx-auto ">
            <Github />
            <span>Log In with Github</span>
          </p>
        </button>
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
      </Form>
    </div>
  );
}
