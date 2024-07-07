// app/single-discussion/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SingleDiscussion = dynamic(() => import('@/markup/Element/SingleDiscussion'), {
  ssr: false,
});

const SingleDiscussionPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SingleDiscussion />
    </Suspense>
  );
};

export default SingleDiscussionPage;
