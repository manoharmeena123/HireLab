"use client";
import React, { useState } from 'react';
import { useMonthlyMeetFaqQuery } from '../my-resume/store/resume.query';
import Loading from '@/components/Loading';

const Page = () => {
  const { data: monthlyMeetFaq, isLoading: monthlyMeetLoading } = useMonthlyMeetFaqQuery();
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index:any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (monthlyMeetLoading) {
    return <Loading />;
  }

  return (
    <div className='faq-wrap'>
        <h2 className='text-center'>
            FAQ's
        </h2>
      <ul className="accordion-list">
        {monthlyMeetFaq?.data.map((faq, index) => (
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
