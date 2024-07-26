"use client";
import React, { useState } from 'react';
import { useJobSeekerFaqQuery } from '../my-resume/store/resume.query';
import Loading from '@/components/Loading';

const Page = () => {
  const { data: jobSeekerFaq, isLoading: jobSeekerLoading } = useJobSeekerFaqQuery();
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index:any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (jobSeekerLoading) {
    return <Loading />;
  }

  return (
    <div className='faq-wrap'>
        <h2 className='text-center'>
            FAQ's
        </h2>
      <ul className="accordion-list">
        {jobSeekerFaq?.data.map((faq, index) => (
          <li
            key={index}
            className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleClick(index)}
          >
            <h3>{faq.question}</h3>
            <div className={`answer ${activeIndex === index ? 'show' : ''}`}>
            <div dangerouslySetInnerHTML={{ __html: faq.answers }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
