import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useRouter } from "next/navigation";
import styles from "@/styles/LatestDiscussions.module.css";
import { useGetDiscussionQuery } from "@/store/global-store/global.query";
import { formatDateTime } from "@/utils/formateDate";
import Link from "next/link";
import { Button } from "react-bootstrap";
import parse from "html-react-parser";

const LatestDiscussions = () => {
  const { push } = useRouter();
  const [questionsPosted, setQuestionsPosted] = useState(0);
  const [answersGiven, setAnswersGiven] = useState(0);
  const [totalForum, setTotalForum] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false); // Add state to trigger animation

  const initialQuestionsPosted = 1800;
  const initialAnswersGiven = 1789;
  const initialTotalForum = 1801;

  const { data: discussionData } = useGetDiscussionQuery();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldAnimate(true);
          } else {
            setShouldAnimate(false);
          }
        });
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (shouldAnimate) {
      setQuestionsPosted(0);
      setAnswersGiven(0);
      setTotalForum(0);

      setTimeout(() => {
        setQuestionsPosted(initialQuestionsPosted);
        setAnswersGiven(initialAnswersGiven);
        setTotalForum(initialTotalForum);
      }, 0);
    }
  }, [shouldAnimate]);

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

    return () => clearInterval(interval);
  }, []);

  const toggleDescription = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Collapse if clicked again
    } else {
      setExpandedIndex(index); // Expand clicked description
    }
  };

  const viewJobHandler = (title: any) => {
    const encodedTitle = encodeURIComponent(title).replace(/%20/g, "-");
    push(`/single-discussion?query=${encodedTitle}`);
  };

  return (
    <div className="container" ref={sectionRef}>
      <div className="section-head d-flex justify-content-between align-items-center mb-4">
        <div className="me-sm-auto">
          <h2 style={{ fontWeight: "600" }} className="mb-2">
            Latest discussion
          </h2>
        </div>
        <div className="d-flex">
        <div className="head-counter-bx mr-4">
            <h2 style={{ fontWeight: "600" }} className="mb-1 counter">
              {shouldAnimate && (
                <CountUp
                  start={0}
                  end={questionsPosted}
                  duration={2}
                  preserveValue={true}
                />
              )}
            </h2>
            <h6 className="fw3">Job Posted</h6>
          </div>
          <div className="head-counter-bx mr-4">
            <h2 style={{ fontWeight: "600" }} className="mb-1 counter">
              {shouldAnimate && (
                <CountUp
                  start={0}
                  end={questionsPosted}
                  duration={2}
                  preserveValue={true}
                />
              )}
            </h2>
            <h6 className="fw3">Questions Posted</h6>
          </div>
          <div className="head-counter-bx mr-4">
            <h2 style={{ fontWeight: "600" }} className="mb-1 counter">
              {shouldAnimate && (
                <CountUp
                  start={0}
                  end={answersGiven}
                  duration={2}
                  preserveValue={true}
                />
              )}
            </h2>
            <h6 className="fw3">Answers Given</h6>
          </div>
          <div className="head-counter-bx">
            <h2 style={{ fontWeight: "600" }} className="mb-1 counter">
              {shouldAnimate && (
                <CountUp
                  start={0}
                  end={totalForum}
                  duration={2}
                  preserveValue={true}
                />
              )}
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
                <h5
                  onClick={() => viewJobHandler(discussion?.question)}
                  className={styles.link}
                >
                  <Link href={""}> {discussion?.question?.replace(/-/g, " ")}</Link>
                </h5>

                <div
                  className={`card-text ${styles.description} ${
                    expandedIndex === index ? styles.expanded : ""
                  }`}
                  style={{
                    maxHeight: expandedIndex === index ? "none" : "100px",
                    overflow: "hidden",
                  }}
                >
                  {parse(discussion?.description)}
                </div>
                {discussion?.description.length > 80 && (
                  <Button
                    variant="link"
                    onClick={() => toggleDescription(index)}
                    style={{
                      color: "#2a6310",
                      padding: "0",
                      textDecoration: "underline",
                    }}
                  >
                    {expandedIndex === index ? "Read Less" : "Read More"}
                  </Button>
                )}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="d-flex align-items-center">
                    <span className="ml-2">by {discussion?.user?.name}</span>
                  </div>
                  <div className="d-flex">
                    {/* <span className="mr-3">❤️ {discussion?.likes}</span> */}
                    <span className="mr-3">💬 {discussion?.comments}</span>
                    {/* <span>👀 {discussion?.views}</span> */}
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
