import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useRouter } from "next/navigation";
import styles from "@/styles/LatestDiscussions.module.css";
import {
  useGetDiscussionQuery,
  useGetCountsQuery,
  useAddLikeDiscussionMutation,
} from "@/store/global-store/global.query";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { formatDateTime } from "@/utils/formateDate";
import Link from "next/link";
import { Button } from "react-bootstrap";
import parse from "html-react-parser";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faComment as faCommentRegular } from "@fortawesome/free-regular-svg-icons"; // Import the regular comment icon

const LatestDiscussions = () => {
  const { user } = useLoggedInUser();
  const { push } = useRouter();
  const sectionRef = useRef(null);
  const [questionsPosted, setQuestionsPosted] = useState(0);
  const [jobPosted, setJobPosted] = useState(0);
  const [answersGiven, setAnswersGiven] = useState(0);
  const [totalForum, setTotalForum] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [likedDiscussions, setLikedDiscussions] = useState<Set<number>>(
    new Set()
  );

  const [addLikeDiscussion, { isLoading: likeLoading }] =
    useAddLikeDiscussionMutation();
  const { data: discussionData, isLoading: discussionLoading } =
    useGetDiscussionQuery();
  const { data: getCounts, isLoading: getCountsLoading } = useGetCountsQuery();

  const initialJobPosted = getCounts?.data?.job_listing;
  const initialQuestionsPosted = getCounts?.data?.community_query;
  const initialAnswersGiven = getCounts?.data?.active_jobs;
  const initialTotalForum = getCounts?.data?.active_thread;

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
      { threshold: 0.1 }
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
        setJobPosted(initialJobPosted);
        setQuestionsPosted(initialQuestionsPosted);
        setAnswersGiven(initialAnswersGiven);
        setTotalForum(initialTotalForum);
      }, 0);
    }
  }, [
    shouldAnimate,
    initialJobPosted,
    initialQuestionsPosted,
    initialAnswersGiven,
    initialTotalForum,
  ]);

  const toggleDescription = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Only expand the clicked item, collapse any other expanded item
  };

  const viewJobHandler = (title: any) => {
    const encodedTitle = encodeURIComponent(title).replace(/%20/g, "-");
    push(`/single-discussion?query=${encodedTitle}`);
  };

  const handleLike = async (discussionId: number) => {
    if (!user?.user) {
      push("/login");
    } else {
      try {
        const res = await addLikeDiscussion({
          discussion_id: discussionId,
        }).unwrap();
        toast.success(res.message, { theme: "colored" });

        // Update local state to reflect like change immediately
        setLikedDiscussions((prev) => {
          const updatedLikes = new Set(prev);
          if (updatedLikes.has(discussionId)) {
            updatedLikes.delete(discussionId); // Unlike
          } else {
            updatedLikes.add(discussionId); // Like
          }
          return updatedLikes;
        });
      } catch (error: any) {
        toast.error(error.message, { theme: "colored" });
        console.error("Failed to like discussion:", error);
      }
    }
  };

  return (
    <>
      {getCountsLoading && discussionLoading && <Loading />}
      <div className="container" ref={sectionRef}>
        <div className="section-head d-flex justify-content-between align-items-center mb-4">
          <div className="me-sm-auto">
            <Link href={"/view-all-discussion"}>
              <h2
                style={{ fontWeight: "600", cursor: "pointer" }}
                className="mb-2"
              >
                Latest updates
              </h2>
            </Link>
          </div>
          <div className="d-flex">
            <div className="head-counter-bx mr-4">
              <h2 style={{ fontWeight: "600" }} className="mb-1 counter">
                {shouldAnimate && (
                  <CountUp
                    start={0}
                    end={jobPosted}
                    duration={2}
                    preserveValue={true}
                  />
                )}
              </h2>
              <h6 className="fw3">Job Listings</h6>
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
              <h6 className="fw3">Community queries</h6>
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
              <h6 className="fw3">Active Jobs</h6>
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
              <h6 className="fw3">Active threads</h6>
            </div>
          </div>
        </div>
        <div className="row align-items-center mb-4">
          <div className="col"></div>
          <div className="col text-right">
            <Link href={"/view-all-discussion"}  className="site-button button-sm" style={{fontWeight:"600"}}>
                View All
            </Link>
          </div>
        </div>
        <div className="row">
          {discussionData?.data
            ?.slice(0, 3)
            .map((discussion: any, index: number) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4" >
                <div
                  className={`card ${styles.discussionCard} ${
                    expandedIndex === index ? styles.expanded : ""
                  }`}
                  // style={{
                  //   padding: "20px",
                  //   backgroundColor: "#fff",
                  //   boxShadow:
                  //   "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  //   minHeight: "300px",
                  //   display: "flex",
                  //   flexDirection: "column",
                  //   justifyContent: "space-between",
                  //   cursor: "pointer",
                  //   transition: "0.3s",
                  //   position: "relative", // Position relative for like button
                  //   border: "1px solid #e0e0e0",
                  //   borderRadius: "20px",
                  // }}
                >
                  <div className="card-body d-flex flex-column">
                    <p className="text-muted mb-2">
                      {formatDateTime(discussion?.created_at)}
                    </p>
                    <h5
                      onClick={() => viewJobHandler(discussion?.question)}
                      className={styles.link}
                    >
                      <Link href={""}>
                        {discussion?.question?.replace(/-/g, " ")}
                      </Link>
                    </h5>

                    <div
                      className={`card-text ${styles.description} ${
                        expandedIndex === index ? styles.expanded : ""
                      }`}
                      style={{
                        maxHeight: expandedIndex === index ? "none" : "100px",
                        overflow: "hidden",
                        flexGrow: 1,
                      }}
                    >
                      {parse(discussion?.description)}
                    </div>
                    {discussion?.description.length > 80 && (
                      <Button
                        variant="link"
                        onClick={() => toggleDescription(index)}
                        className="read-more-btn"
                        style={{
                          color: "#2a6310",
                          padding: "0px",
                          paddingBottom: "5px",
                          textDecoration: "underline",
                          alignSelf: "flex-start",
                        }}
                      >
                        {expandedIndex === index ? "Read Less" : "Read More"}
                      </Button>
                    )}
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <div className="d-flex align-items-center">
                        <span className="ml-2">
                          by {discussion?.user?.name}
                        </span>
                      </div>
                      <div className="d-flex">
                        {/* <span
                          className="mr-3"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleLike(discussion.id)}
                        >
                          <FontAwesomeIcon
                            icon={
                              likedDiscussions.has(discussion.id)
                                ? faHeartSolid
                                : faHeartRegular
                            }
                            color={
                              likedDiscussions.has(discussion.id)
                                ? "red"
                                : "black"
                            }
                            size="lg" // Increase the size of the heart icon
                          />{" "}
                          {discussion?.likes}
                        </span> */}
                          <span
                            className="mr-3"
                            style={{
                              cursor: "pointer",
                              padding: "5px 10px",
                              borderRadius: "4px",
                              backgroundColor: "transparent", // Default background
                              transition: "background-color 0.3s ease", // Smooth transition for hover effect
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#f0f0f0"; // Change background on hover
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent"; // Revert background on hover out
                            }}
                            onClick={() => viewJobHandler(discussion?.question)}
                          >
                            <FontAwesomeIcon
                              icon={faCommentRegular}
                              size="lg" // Use the same size as the heart icon
                            />{" "}
                            {discussion?.comments_count}
                          </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default LatestDiscussions;
