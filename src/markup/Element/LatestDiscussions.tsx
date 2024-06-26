import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import styles from "@/styles/LatestDiscussions.module.css";
import { discussions } from "@/data/latestDiscussions";

const LatestDiscussions = () => {
  // State for dynamic counters
  const [questionsPosted, setQuestionsPosted] = useState(1800);
  const [answersGiven, setAnswersGiven] = useState(1789);
  const [totalForum, setTotalForum] = useState(1801);
  const [initialAnimationDone, setInitialAnimationDone] = useState(false);

  useEffect(() => {
    // Function to randomly increase or decrease the count
    const updateCounts = () => {
      setQuestionsPosted((prev) => prev + 1);
      setAnswersGiven((prev) => prev + 1);
      setTotalForum((prev) => prev + 1); // Total forum count always increases

      // Ensure answers given is never more than questions posted
      if (answersGiven > questionsPosted) {
        setAnswersGiven(questionsPosted);
      }
    };

    // Update the counts every 2 seconds
    const interval = setInterval(updateCounts, 2000);

    // Mark initial animation as done after the first update
    setTimeout(() => setInitialAnimationDone(true), 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [questionsPosted, answersGiven]);

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
          <button className="btn btn-primary">View All</button>
        </div>
      </div>
      <div className="row">
        {discussions?.map((discussion) => (
          <div key={discussion.id} className="col-lg-4 col-md-6 mb-4">
            <div className={`card ${styles.discussionCard}`}>
              <div className="card-body">
                <p className="text-muted mb-2">
                  {discussion.date} | {discussion.time}
                </p>
                <h5 className="card-title">{discussion.title}</h5>
                <p className="card-text">{discussion.description}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="d-flex align-items-center">
                    <span className="ml-2">by {discussion.author}</span>
                  </div>
                  <div className="d-flex">
                    <span className="mr-3">❤️ {discussion.likes}</span>
                    <span className="mr-3">💬 {discussion.comments}</span>
                    <span>👀 {discussion.views}</span>
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
