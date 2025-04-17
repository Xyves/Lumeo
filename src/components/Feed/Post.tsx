import React from 'react';
import { MessageCircle, Heart } from 'lucide-react';
import Zoom from 'react-medium-image-zoom';
import '@/styles/zoom.css';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);
export default function Post({ id, name, profile_url, time }) {
  return (
    <div
      className="flex-col flex [&>section]:px-4 mb-6 last:mb-24"
      data-user-id={id}
    >
      <section className="size-16 bg-green-500 w-full flex-row flex items-center ">
        <div className="h-full w-24 bg-yellow-500" />
        <p className="">{name}</p>
        <p>
          - <ReactTimeAgo date={time} locale="en-US" />{' '}
        </p>
        <div className="menu-bar ml-auto">
          {/* If user === the id of the user comment then add this line options edit delete */}
          X
        </div>
      </section>
      <section className="  bg-blue-600 w-full flex-col flex justify-center ">
        <p className="p-2">Cool projects!</p>
        {profile_url ? (
          <Zoom>
            <div className="w-11/12 mx-auto h-44 mb-3 overflow-hidden ">
              <img
                src="/images/cyberpunkvector.png"
                alt=""
                className="h-44 w-full object-cover bg-no-repeat"
              />
            </div>
          </Zoom>
        ) : (
          ''
        )}
      </section>
      <section className="h-1/4 bg-red-500 py-3 w-full flex-row flex items-center">
        <button>
          <Heart />
        </button>
        <span>3</span>

        <button>
          <MessageCircle />
        </button>
        <p>2</p>
      </section>
      <aside>XDD</aside>
    </div>
  );
}
