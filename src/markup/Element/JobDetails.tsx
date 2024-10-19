"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  useGetJobByIdMutation,
  useGetRecentJobsQuery,
} from "@/store/global-store/global.query";
import Link from "next/link";
import Slider from "react-slick"; // Importing react-slick for carousel
import Loading from "@/components/Loading";
import JobDetailPopup from "@/components/JobDetailPopup";
import { formaterDate } from "@/utils/formateDate";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime); // Extend dayjs with relativeTime plugin

function Jobdetail() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [getJobs, { data: job, error, isLoading }] = useGetJobByIdMutation();
  const { data: recentJob } = useGetRecentJobsQuery();
  const formatDate = (date: string) => dayjs(date).fromNow(); // Format the date relative to now

  useEffect(() => {
    if (jobId) {
      getJobs(jobId)
        .unwrap()
        .then((response) => {
          console.log("Job details response:", response);
        })
        .catch((error) => {
          console.error("Error fetching job details:", error);
        });
    }
  }, [jobId, getJobs]);

  // Settings for the carousel
  const carouselSettings = {
    dots: true, // Shows dots below the carousel
    infinite: false, // Infinite loop of slides
    speed: 500, // Transition speed
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at a time
    responsive: [
      {
        breakpoint: 1024, // For medium-sized screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // For small screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      {isLoading && <Loading />}
      <JobDetailPopup job={job} show={false} getJobs={getJobs} />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full content-inner">
            <div className="container">
              <h4 className="fw-bold mb-2">Similar Jobs</h4>
              <Slider {...carouselSettings}>
                {recentJob?.data?.map((item, index) => (
                  <div className="p-3" key={index}>
                    <div
                      className="blog-grid h-100"
                      style={{
                        width: "305px",
                        height: "350px", // Fixed height for the job cards
                      }}
                    >
                      <div
                        className="dez-info p-a20 border-1 bg-white"
                        style={{
                          borderRadius: "15px",
                          height: "100%", // Ensuring the div fills the height
                          boxShadow: "rgba(0, 0, 0, 0.05) 0px 4px 12px", // Subtle shadow effect
                          overflow: "hidden", // Prevents content overflow
                          display: "flex",
                          flexDirection: "column", // Column layout for content
                          justifyContent: "space-between", // Space items properly
                          transition: "transform 0.3s ease", // Animation for hover effect
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      >
                        <div>
                          <div className="dez-post-title">
                            {/* Job Title Clickable for Redirection */}
                            <Link
                              href={`/job-detail?jobId=${item.id}`}
                              className="text-decoration-none"
                            >
                              <h5
                                className="post-title"
                                style={{
                                  color: "#2A6310",
                                  fontWeight: "bold",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                }}
                              >
                                {item.job_title}
                              </h5>
                            </Link>
                          </div>
                          <div className="dez-post-meta">
                            <ul>
                              <li className="post-date jd-recent-add">
                                <i className="ti-location-pin rc-lp"></i>
                                <span>{item.address}</span>
                              </li>
                              <li
                                className="post-date jd-recent-add text-muted small mx-1 my-1"
                                style={{ display: "block" }}
                              >
                                <i className="fa fa-calendar me-1 mr-1"></i>
                                <span>{formaterDate(item?.created_at)}</span>
                              </li>
                              <li className="post-author mx-1 ">
                                <i className="fa fa-bookmark-o"></i>
                                <Link href={"#"}>
                                  {item?.user?.company_name || "company name"}
                                </Link>{" "}
                              </li>
                            </ul>
                          </div>
                          <div className="dez-post-text">
                            <div>
                              <strong className="font-weight-700 text-black">
                                Job Type
                              </strong>{" "}
                              : {item?.location?.title}
                            </div>
                          </div>
                        </div>
                        <div className="dez-post-readmore">
                          <Link
                            href={`/job-detail?jobId=${item.id}`}
                            title="READ MORE"
                            rel="bookmark"
                            className="site-button-link"
                            style={{
                              color: "#fff",
                              backgroundColor: "#2A6310",
                              padding: "8px 16px",
                              borderRadius: "5px",
                              transition: "background-color 0.3s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#3a7415")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#2A6310")
                            }
                          >
                            <span className="fw6">View Job</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Jobdetail;
