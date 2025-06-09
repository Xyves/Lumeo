'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { z } from 'zod';

import { RegisterSchema } from '@/schema';
import { usePopup } from '@/context/PopupContext';
import { validateForm } from '@/lib/utils';
import { useUsersLoader } from '@/hooks/useUsersLoader';

type FormData = z.infer<typeof RegisterSchema>;
type FormErrors = Partial<Record<keyof FormData, string[]>>;
export default function RegisterForm() {
  const { showPopup } = usePopup();
  const { registerUserCallback } = useUsersLoader();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });
  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  const registerUser = async (e: any) => {
    e.preventDefault();
    showPopup({ isVisible: true, text: 'Loading', type: 'loading' });
    const newErrors = validateForm(data, 'register');
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const response = await registerUserCallback({ data });
      if (response?.ok) {
        showPopup({
          isVisible: true,
          text: 'User Registered',
          type: 'success',
        });
        setTimeout(() => {
          showPopup({
            isVisible: false,
            text: '',
            type: undefined,
          });
          router.push('/');
        }, 2000);
      } else {
        showPopup({
          isVisible: true,
          text: 'Signup failed',
          type: 'error',
        });
        console.error('Network error or server issue');
        setTimeout(() => {
          showPopup({ isVisible: false });
        }, 3000);
      }
    }
  };
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: FormData,
    setData: React.Dispatch<React.SetStateAction<FormData>>,
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>
  ) => {
    const { name, value } = e.target;

    const updated = { ...data, [name]: value };
    setData(updated);

    const fieldSchema = (RegisterSchema.shape as Record<string, z.ZodTypeAny>)[
      name
    ];
    const result = fieldSchema.safeParse(value);

    setErrors(prev => ({
      ...prev,
      [name]: result.success ? undefined : result.error.issues[0].message,
    }));
  };
  return (
    <div className=" h-full lg:w-2/5  sm:w-full md:w-full bg-white rounded-lg shadow dark:border md:mt-0    dark:bg-gray-800 justify-center items-center flex dark:border-gray-700 ">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8  w-full sm:w-full md:w-full   items-center  justify-center">
        <h1 className="text-4xl font-bold leading-tight tracking-wide text-gray-900 md:text-5xl dark:text-white text-center font-glitch ">
          Create new account
        </h1>
        <form
          className="space-y-4 md:space-y-6 flex flex-col items-center mx-auto  "
          method="POST"
          onSubmit={registerUser}
        >
          <div className="w-3/4  md:w-3/4 lg:w-1/2">
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
              onChange={e => handleFieldChange(e, data, setData, setErrors)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div className="w-3/4  md:w-3/4 lg:w-1/2">
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
              onChange={e => handleFieldChange(e, data, setData, setErrors)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="w-3/4  md:w-3/4 lg:w-1/2">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                id="password"
                value={data.password}
                onChange={e => handleFieldChange(e, data, setData, setErrors)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white"
              >
                {passwordVisible ? <span>Hide</span> : <span>Show</span>}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            data-testid="register-button"
            className="text-white bg-[#0C0F19] w-1/3 rounded-2xl hover:bg-brand-main focus:bg-brand-accent focus:outline-none font-medium text-sm px-5 py-2.5 text-center dark:bg-brand-main dark:hover:bg-brand-main dark:focus:bg-brand-accent transition duration-200 ease-in-out"
          >
            Create account
          </button>
          <p className="text-lg lg:text-md font-light text-gray-500 dark:text-gray-400">
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
