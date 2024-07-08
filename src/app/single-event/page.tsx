import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Loading from "@/components/Loading";

const SingleEvent = dynamic(() => import('@/markup/Element/SingleEvent'), {
  ssr: false,
});

const SingleEventPage = () => {
  return (
    <Suspense fallback={<div><Loading/></div>}>
      <SingleEvent />
    </Suspense>
  );
};

export default SingleEventPage;
