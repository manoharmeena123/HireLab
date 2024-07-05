import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import styles from "@/styles/LatestDiscussions.module.css";
import { useGetDiscussionQuery } from "@/store/global-store/global.query";
import { formatDateTime } from "@/utils/formateDate";

const LatestDiscussions = () => {
  const [questionsPosted, setQuestionsPosted] = useState(1800);
  const [answersGiven, setAnswersGiven] = useState(1789);
  const [totalForum, setTotalForum] = useState(1801);
  const [initialAnimationDone, setInitialAnimationDone] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // Track which description is expanded

  const { data: discussionData } = useGetDiscussionQuery();

  useEffect(() => {
    const updateCounts = () => {
      setQuestionsPosted((prev) => prev + 1);
      setAnswersGiven((prev) => prev + 1);
      setTotalForum((prev) => prev + 1);

      if (answersGiven > questionsPosted) {
        setAnswersGiven(questionsPosted);
      }
    };

    const interval = setInterval(updateCounts, 2000);

    setTimeout(() => setInitialAnimationDone(true), 2000);

    return () => clearInterval(interval);
  }, [questionsPosted, answersGiven]);

  const toggleDescription = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Collapse if clicked again
    } else {
      setExpandedIndex(index); // Expand clicked description
    }
  };

  return (
    <div className="container">
      <div className="section-head d-flex justify-content-between align-items-center mb-4">
        <div className="mr-auto">
          <h2 style={{ fontWeight: "600" }} className="mb-2">
            Latest discussion
          </h2>
        </div>
        <div className="d-flex">
          <div className="head-counter-bx mr-4">
            <h2 style={{ fontWeight: "600" }} className="mb-1 counter">
              <CountUp
                start={questionsPosted}
                end={questionsPosted}
                duration={1.5}
                preserveValue={true}
              />
            </h2>
            <h6 className="fw3">Questions Posted</h6>
          </div>
          <div className="head-counter-bx mr-4">
            <h2 style={{ fontWeight: "600" }} className="mb-1 counter">
              <CountUp
                start={answersGiven}
                end={answersGiven}
                duration={1.5}
                preserveValue={true}
              />
            </h2>
            <h6 className="fw3">Answers Given</h6>
          </div>
          <div className="head-counter-bx">
            <h2 style={{ fontWeight: "600" }} className="mb-1 counter">
              <CountUp
                start={totalForum}
                end={totalForum}
                duration={1.5}
                preserveValue={true}
              />
            </h2>
            <h6 className="fw3">Total Forum</h6>
          </div>
        </div>
      </div>
      <div className="row align-items-center mb-4">
        <div className="col"></div>
        <div className="col text-right">
          <button
            className="site-button button-md"
            style={{
              backgroundColor: "#2A6310",
              color: "#fff",
              borderColor: "#2A8310",
            }}
          >
            View All
          </button>
        </div>
      </div>
      <div className="row">
        {discussionData?.data?.map((discussion: any, index: number) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className={`card ${styles.discussionCard}`}>
              <div className="card-body">
                <p className="text-muted mb-2">
                  {formatDateTime(discussion?.created_at)}
                </p>
                <h5 className="card-title">{discussion?.question}</h5>
                <div
                  className={`card-text ${styles.description} ${
                    expandedIndex === index ? styles.expanded : ""
                  }`}
                  style={{
                    maxHeight: expandedIndex === index ? "none" : "100px",
                    overflow: "hidden",
                  }}
                >
                  {discussion?.description}
                </div>
                {discussion?.description.length > 80 && (
                  <button
                    className="btn btn-link text-primary"
                    onClick={() => toggleDescription(index)}
                  >
                    {expandedIndex === index ? "Read Less" : "Read More"}
                  </button>
                )}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="d-flex align-items-center">
                    <span className="ml-2">by {discussion?.user?.name}</span>
                  </div>
                  <div className="d-flex">
                    <span className="mr-3">❤️ {discussion?.likes}</span>
                    <span className="mr-3">💬 {discussion?.comments}</span>
                    <span>👀 {discussion?.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {discussionData?.data?.map((discussion: any, index: number) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className={`card ${styles.discussionCard}`}>
              <div className="card-body">
                <p className="text-muted mb-2">
                  {formatDateTime(discussion?.created_at)}
                </p>
                <h5 className="card-title">{discussion?.question}</h5>
                <div
                  className={`card-text ${styles.description} ${
                    expandedIndex === index ? styles.expanded : ""
                  }`}
                  style={{
                    maxHeight: expandedIndex === index ? "none" : "100px",
                    overflow: "hidden",
                  }}
                >
                  {discussion?.description}
                </div>
                {discussion?.description.length > 80 && (
                  <button
                    className="btn btn-link text-primary"
                    onClick={() => toggleDescription(index)}
                  >
                    {expandedIndex === index ? "Read Less" : "Read More"}
                  </button>
                )}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="d-flex align-items-center">
                    <span className="ml-2">by {discussion?.user?.name}</span>
                  </div>
                  <div className="d-flex">
                    <span className="mr-3">❤️ {discussion?.likes}</span>
                    <span className="mr-3">💬 {discussion?.comments}</span>
                    <span>👀 {discussion?.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestDiscussions;
