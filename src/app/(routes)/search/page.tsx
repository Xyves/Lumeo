import React from 'react';

import MainLayout from '@/layouts/MainLayout/MainLayout';
import NewFollows from '@/components/Aside/NewFollowsers';
import SearchContainer from '@/components/Aside/SearchContainer';

export default function route() {
  return (
    <MainLayout>
      <div className="w-4/6 border-4 mx-6">
        <SearchContainer />
      </div>
      <NewFollows />
    </MainLayout>
  );
}
