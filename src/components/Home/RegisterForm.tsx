'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { RegisterSchema, RegisterType } from '@/schema';
import type { PopupState } from '@/types';

import Popup from '../popup/Popup';

type FormData = z.infer<typeof RegisterSchema>;
type FormErrors = Partial<Record<keyof FormData, string[]>>;
export default function RegisterForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [popupState, setPopupState] = useState<PopupState>({
    isVisible: false,
  });
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
  const validateForm = (data: FormData) => {
    try {
      RegisterSchema.parse(data);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.flatten().fieldErrors;
      }
      return {};
    }
  };
  const registerUser = async (e: any) => {
    e.preventDefault();
    setPopupState({
      isVisible: true,
      text: 'Loading',
      type: 'loading',
    });
    const newErrors = validateForm(data);
    setErrors(newErrors);
    console.log({ data });
    if (Object.keys(newErrors).length === 0) {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setPopupState({
          isVisible: true,
          text: 'User Registered',
          type: 'success',
        });

        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        setPopupState({
          isVisible: true,
          text: 'Signup failed',
          type: 'error',
        });
        console.error('Network error or server issue');
        setTimeout(() => {
          setPopupState({ isVisible: false });
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
              onChange={e => handleFieldChange(e, data, setData, setErrors)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
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
              onChange={e => handleFieldChange(e, data, setData, setErrors)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
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
                {passwordVisible ? (
                  <span>Hide</span> // Alternatively, use an eye icon here
                ) : (
                  <span>Show</span> // Alternatively, use an eye-slash icon here
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
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
      <div className="relative">
        <Popup data={popupState} />
      </div>
    </div>
  );
}
