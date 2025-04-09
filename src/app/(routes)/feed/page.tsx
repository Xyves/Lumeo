import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import Post from '@/components/Feed/Post';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import NewFollows from '@/components/Aside/NewFollowsers';
import Search from '@/components/Aside/SearchContainer';
import CreatePost from '@/components/Feed/CreatePost';

export default function Feed() {
  const posts = [
    {
      id: 'd9f3a8k1',
      name: 'User_rk3gq',
    },
    {
      id: '8h2k3mzl',
      name: 'User_qp1vx',
      profile_url: 'https://example.com/profile/k9s4d8ja',
    },
    {
      id: 'x7v2p90n',
      name: 'User_w9lek',
      profile_url: 'https://example.com/profile/m8c3x6vz',
    },
    {
      id: 'b3u7a4hs',
      name: 'User_tz7nm',
      profile_url: 'https://example.com/profile/c7h1s0gp',
    },
    {
      id: 'n2d5x3lk',
      name: 'User_vq8jt',
      profile_url: 'https://example.com/profile/l0k9r2jf',
    },
  ];
  TimeAgo.addDefaultLocale(en);

  // Create formatter (English).
  const timeAgo = new TimeAgo('en-US');
  const time = timeAgo.format(Date.now() - 2 * 60 * 60 * 1000, 'round');
  return (
    <MainLayout>
      <div className=" w-4/6 bg-[#1f1e1c] p-7 overflow-y-auto">
        <div className="">
          <CreatePost />
          {posts.map(user => {
            return (
              <Post
                name={user.name}
                profile_url={user.profile_url}
                id={user.id}
                time={time}
                key={user.id}
              />
            );
          })}
        </div>
      </div>
      <aside className="w-72 ml-12   p-3">
        {/* <Search /> */}
        <NewFollows />
      </aside>
    </MainLayout>
  );
}
