import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SingleEvent = dynamic(() => import('@/markup/Element/SingleEvent'), {
  ssr: false,
});

const SingleEventPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SingleEvent />
    </Suspense>
  );
};

export default SingleEventPage;
