import React from 'react';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

import MainLayout from '@/layouts/MainLayout/MainLayout';

export default function page() {
  return (
    <MainLayout>
      <div className=" mb-24 w-4/6  h-auto bg-yellow-300 ">
        <div id="user-info relative">
          <div className="bg-emerald-200 w-full h-24     inset-0 z-0" />
          <Image
            className="rounded-full aspect-square object-cover absolute top-16 ml-6"
            width={100}
            height={355}
            src="/images/cyberpunkvector.png"
          />
          <div className=" pl-6 relative z-10 pt-20">
            <div>
              <h2 className="pb-3">GuestUser</h2>
              <h3 className="flex pb-2">
                <Calendar type="span" /> Join March 15
              </h3>
            </div>
            <span>15 Following</span>
            <span>1 Followers</span>
          </div>
        </div>
        <div className="w-full bg-green-600 flex ">
          <button className=" bg-yellow-400 w-1/2 text-center py-3">
            Posts
          </button>
          <button className="bg-blue-700 w-1/2 text-center py-3">Likes</button>
        </div>
      </div>
    </MainLayout>
  );
}
