'use client';

import React, { useState } from 'react';
import type { z } from 'zod';
import { CircleX, PenLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

import { usePopup } from '@/context/PopupContext';
import type { editProfileSchema } from '@/schema';
import { validateForm } from '@/lib/utils';
import { useUsersLoader } from '@/hooks/useUsersLoader';

export default function ProfileModal({
  modalVisible,
  setModalVisible,
  user,
  id,
  setUser,
}) {
  const { updateUser } = useUsersLoader();
  const { showPopup } = usePopup();
  const { data: session, status } = useSession();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();
  type FormData = z.infer<typeof editProfileSchema>;
  type FormErrors = Partial<Record<keyof FormData, string[]>>;
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<{
    id: string;
    name: string;
    email: string;
    file: File | null;
  }>({
    id,
    name: '',
    email: '',
    file: null,
  });
  const initialData = {
    name: user?.name || '',
    email: user?.email || '',
    file: user?.image || '',
  };
  const userProfileImage =
    previewUrl ||
    (user?.image?.trim() ? user?.image : null) ||
    '/images/default_user.webp';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFormData(prev => ({
        ...prev,
        file,
      }));
    }
  };
  const editUser = async (e: React.FormEvent) => {
    e.preventDefault();
    showPopup({ isVisible: true, text: 'Loading', type: 'loading' });
    const newErrors = validateForm(formData, 'editUser');
    setErrors(newErrors);
    const form = new FormData();
    if (Object.keys(newErrors).length === 0) {
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== '' && value !== initialData[key]) {
          form.append(key, value);
        }
      });

      form.append('id', formData.id);
      const { statusCode, data } = await updateUser({ form, setUser });
      console.log('status:', status);
      if (statusCode === 200 || statusCode === 201) {
        showPopup({
          isVisible: true,
          text: 'Profile updated',
          type: 'success',
        });
        setTimeout(async () => {
          showPopup({ isVisible: false, text: '', type: 'undefined' });
          await signOut({});
          router.replace('/');
        }, 2000);
      } else {
        showPopup({
          isVisible: true,
          text: "Can't update user",
          type: 'error',
        });
      }
    } else {
      showPopup({
        isVisible: true,
        text: "Can't update user !!",
        type: 'error',
      });
    }
  };
  return (
    <div className="fixed inset-0 z-40 w-1/4  my-6 h-fit flex items-center justify-center backdrop-blur-lg bg-gray-900  mx-auto bg-opacity-50 ">
      <div className="flex flex-col">
        <div className="flex px-1 py-3 justify-around">
          <h1 className="text-3xl">Edit Profile</h1>
          <button
            className="ml-auto text-2xl"
            type="button"
            onClick={() => setModalVisible(false)}
          >
            <CircleX className="hover:text-gray-100" />
          </button>
        </div>
        <div className="px-5 py-10 flex flex-col">
          <form action="PATCH" onSubmit={editUser}>
            <div className=" flex justify-center  pt-1 py-2">
              <div className="flex items-center space-x-2  h-full ">
                <label
                  htmlFor="file-upload"
                  className="relative flex items-center gap-2 px-4 text-white rounded-full cursor-pointer transition"
                >
                  <div className="relative w-[120px] aspect-square rounded-full overflow-hidden mb-4">
                    <Image
                      src={userProfileImage}
                      width={120}
                      height={120}
                      alt="user profile image"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-2 right-6 w-[30px] h-[30px] bg-white rounded-full text-lg shadow-md flex items-center justify-center">
                    <PenLine color="black" />
                  </div>
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="hidden"
                  onChange={e => {
                    handleFileChange(e);
                  }}
                />
              </div>
            </div>
            <div className="p-1  flex flex-col">
              <label htmlFor="name" className="ml-3 my-1">
                Name
              </label>
              <input
                name="name"
                id="name"
                value={formData.name}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                type="text"
                placeholder={session?.user.name}
                className="rounded-lg mx-4 p-2 text-black placeholder:text-gray-700 mb-2"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
              <label htmlFor="email" className="ml-3 my-1">
                Email
              </label>
              <input
                name="email"
                id="email"
                value={formData.email}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                type="text"
                placeholder={user?.email ? user.email : 'email@example.com'}
                className="rounded-lg mx-4 p-2 text-black placeholder:text-gray-700 mb-6"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
              <button
                type="submit"
                className="bg-[#44138e] px-8 py-2 rounded-3xl  w-full hover:bg-[#3d1f84] mt-4 text-slate-50"
              >
                Save & Sign Me Out
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
