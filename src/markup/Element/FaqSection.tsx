"use client";
import React, { useState } from "react";
import {
  useJobSeekerFaqQuery,
  useJobPosterFaqQuery,
  useGeneralQuetionFaqQuery,
  useMonthlyMeetFaqQuery,
} from "@/app/my-resume/store/resume.query";
import Loading from "@/components/Loading";
import parse from "html-react-parser";

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
    <h2 className="text-center my-4" style={{color:"#2a6310" , fontWeight:700}}>{title}</h2>
    <ul className="accordion-list">
      {data.map((faq, index) => (
        <li
          key={index}
          className={`accordion-item ${activeIndex === index ? "active" : ""}`}
          onClick={() => handleClick(index)}
        >
          <h3 className="faq-question" style={{ fontSize: "20px" }}>
            {faq.question}
          </h3>
          <div className={`answer ${activeIndex === index ? "show" : ""}`}>
            {faq.answers &&
              parse(faq.answers.replace(/<p/g, '<p style="font-size: 17px;"'))}
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
          background-color: #f9f9f9 !important;
          padding: 60px 0 !important;
        }
        .faq-wrap {
          margin-bottom: 40px !important;
        }
        .text-center {
          text-align: center !important;
        }
        .accordion-list {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        .accordion-item {
          background: #fff !important;
          border: 1px solid #ddd !important;
          margin-bottom: 10px !important;
          border-radius: 8px !important;
          overflow: hidden !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
        }
        .accordion-item.active {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
        }
        .faq-question {
          padding: 20px !important;
          background: #2a6310 !important;
          color: #fff !important;
          margin: 0 !important;
          font-size: 20px !important;
          font-weight: 600 !important;
        }
        .answer {
          display: none !important;
          padding: 20px !important;
          border-top: 1px solid #ddd !important;
          font-size: 17px !important;
          line-height: 1.8 !important;
          background: #f9f9f9 !important;
        }
        .answer.show {
          display: block !important;
        }
        .answer p {
          margin: 0 !important;
          padding: 0 !important;
        }
        @media (max-width: 768px) {
          .faq-question {
            font-size: 15px !important;
          }
          .answer {
            font-size: 12px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Page;
