"use client";
import React, { useState } from "react";
import {
  useJobSeekerFaqQuery,
  useJobPosterFaqQuery,
  useGeneralQuetionFaqQuery,
  useMonthlyMeetFaqQuery,
} from "@/app/my-resume/store/resume.query";
import Loading from "@/components/Loading";

interface FaqData {
  question: string;
  answers: string;
}

interface FaqSectionProps {
  title: string;
  data: FaqData[];
  activeIndex: number | null;
  handleClick: (index: number) => void;
}

const FaqSection: React.FC<FaqSectionProps> = ({
  title,
  data,
  activeIndex,
  handleClick,
}) => (
  <div className="faq-wrap my-4">
    <h2 className="text-center my-4">{title}</h2>
    <ul className="accordion-list">
      {data.map((faq, index) => (
        <li
          key={index}
          className={`accordion-item ${
            activeIndex === index ? "active" : ""
          }`}
          onClick={() => handleClick(index)}
        >
          <h3 className="faq-question">{faq.question}</h3>
          <div className={`answer ${activeIndex === index ? "show" : ""}`}>
            <p dangerouslySetInnerHTML={{ __html: faq.answers }} />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const Page: React.FC = () => {
  const { data: jobSeekerFaq, isLoading: jobSeekerLoading } =
    useJobSeekerFaqQuery();
  const { data: jobPosterFaq, isLoading: jobPosterLoading } =
    useJobPosterFaqQuery();
  const { data: generalQuestionFaq, isLoading: generalQuestionLoading } =
    useGeneralQuetionFaqQuery();
  const { data: monthlyMeetFaq, isLoading: monthlyMeetLoading } =
    useMonthlyMeetFaqQuery();

  const [activeIndex1, setActiveIndex1] = useState<number | null>(null);
  const [activeIndex2, setActiveIndex2] = useState<number | null>(null);
  const [activeIndex3, setActiveIndex3] = useState<number | null>(null);
  const [activeIndex4, setActiveIndex4] = useState<number | null>(null);

  const handleClick1 = (index: number) =>
    setActiveIndex1(activeIndex1 === index ? null : index);
  const handleClick2 = (index: number) =>
    setActiveIndex2(activeIndex2 === index ? null : index);
  const handleClick3 = (index: number) =>
    setActiveIndex3(activeIndex3 === index ? null : index);
  const handleClick4 = (index: number) =>
    setActiveIndex4(activeIndex4 === index ? null : index);

  if (
    jobSeekerLoading ||
    jobPosterLoading ||
    generalQuestionLoading ||
    monthlyMeetLoading
  ) {
    return <Loading />;
  }

  return (
    <>
      <div className="faq-container py-5 bg-light">
        <div className="container">
          <FaqSection
            title="Job Poster FAQ's"
            data={jobPosterFaq?.data || []}
            activeIndex={activeIndex2}
            handleClick={handleClick2}
          />
          <FaqSection
            title="Job Seeker FAQ's"
            data={jobSeekerFaq?.data || []}
            activeIndex={activeIndex1}
            handleClick={handleClick1}
          />
            <FaqSection
              title="Monthly Meetup FAQ's"
              data={monthlyMeetFaq?.data || []}
              activeIndex={activeIndex4}
              handleClick={handleClick4}
            />
          <FaqSection
            title="General Questions FAQ's"
            data={generalQuestionFaq?.data || []}
            activeIndex={activeIndex3}
            handleClick={handleClick3}
          />
        </div>
      </div>
      <style jsx>{`
        .faq-container {
          background-color: #f9f9f9;
          padding: 60px 0;
        }
        .faq-wrap {
          margin-bottom: 40px;
        }
        .text-center {
          text-align: center;
        }
        .accordion-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .accordion-item {
          background: #fff;
          border: 1px solid #ddd;
          margin-bottom: 10px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .accordion-item.active {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .faq-question {
          padding: 20px;
          background: #2a6310;
          color: #fff;
          margin: 0;
          font-size: 2rem;
          font-weight: 600;
        }
        .answer {
          display: none;
          padding: 20px;
          border-top: 1px solid #ddd;
          font-size: 1.5rem;
          line-height: 1.8;
        }
        .answer.show {
          display: block;
        }
        .answer p {
          margin: 0;
        }
        @media (max-width: 768px) {
          .faq-question {
            font-size: 1.25rem;
          }
          .answer {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default Page;
