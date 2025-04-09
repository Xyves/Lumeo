import Image from 'next/image';
import React from 'react';
import { Image as Img } from 'lucide-react';

export default function CreatePost() {
  return (
    <div className="w-full h-40 bg-yellow-300 p-3">
      <div className="w-full h-1/2 flex p-3 items-center">
        <div className="image w-12 h-12 relative ">
          <Image
            src="https://randomuser.me/api/portraits/men/35.jpg"
            className="rounded-3xl"
            fill
          />
        </div>
        <textarea
          name=""
          id=""
          rows={12}
          placeholder="What is happening?"
          className="w-5/6  p-2 mx-auto resize-none placeholder:text-black text-black"
        />
      </div>
      <div className=" flex items-end pt-4">
        <Img size="32" className="ml-5" />
        {/* img(add photo) */}
        <button className="bg-blue-500 px-6 py-2 rounded-3xl ml-auto">
          Post
        </button>
      </div>
    </div>
  );
}
