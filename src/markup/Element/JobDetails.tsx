"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime); // Extend dayjs with relativeTime plugin
import {
  useGetJobByIdMutation,
  useGetRecentJobsQuery,
  useGetCtcDataQuery,
  useGetSavedJobQuery,
  usePostSaveJobMutation,
  useDeleteSavedJobMutation,
} from "@/store/global-store/global.query";
import Link from "next/link";
import { RecentJobData } from "@/types/index";
import { useRouter } from "next/navigation";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import Slider from "react-slick"; // Importing react-slick for carousel
import Loading from "@/components/Loading";
import JobDetailPopup from "@/components/JobDetailPopup";
import { formaterDate } from "@/utils/formateDate";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { fetchRecentJobsStart } from "@/store/global-store/global.slice";
import Swal from "sweetalert2";
import styles from "@/styles/RecentJobSection.module.css"; // Import the CSS module

function Jobdetail() {
  const searchParams = useSearchParams();
  const { user } = useLoggedInUser();
  const { push } = useRouter();
  const dispatch = useDispatch();
  const jobId = searchParams.get("jobId");
  const [getJobs, { data: job, error, isLoading }] = useGetJobByIdMutation();
  const { data: recentJob } = useGetRecentJobsQuery();
  const formatDate = (date: string) => dayjs(date).fromNow(); // Format the date relative to now
  const { data: ctcData } = useGetCtcDataQuery();
  const { data: savedJob, refetch: savedJobRefetch } = useGetSavedJobQuery();
  const [saveJob] = usePostSaveJobMutation();
  const [deleteJob] = useDeleteSavedJobMutation();
  const savedJobsMap = new Map(
    savedJob?.data?.map((job: any) => [job.id.toString(), true])
  );
  const getCtcTitleById = (id: any) => {
    const ctcItem = ctcData?.data?.find((item) => item.id == id);
    return ctcItem ? ctcItem.title : "N/A";
  };

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
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };
  const viewJobHandler = (id: number) => {
    push(`/job-detail?jobId=${id}`);
  };
  const handleLikeToggle = async (jobId: any) => {
    if (!user) {
      push("/login");
      return;
    }

    if (savedJobsMap.has(jobId)) {
      try {
        await deleteJob(jobId);
        await savedJobRefetch();
        dispatch(fetchRecentJobsStart());
        Swal.fire({
          icon: "success",
          title: "Job Deleted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error in Deleting Job",
          text: "Failed to delete job.",
          confirmButtonText: "OK",
        });
      }
    } else {
      try {
        await saveJob({ job_id: jobId });
        await savedJobRefetch();
        dispatch(fetchRecentJobsStart());
        Swal.fire({
          icon: "success",
          title: "Job Saved Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error in Saving Job",
          text: "Failed to save job.",
          confirmButtonText: "OK",
        });
      }
    }
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
              <Slider {...sliderSettings}>
                {recentJob?.data?.map((item: RecentJobData, index) => (
                  <div key={index} className="p-3">
                    <div className={styles.sectionContainer}>
                      <div>
                        <h4
                          onClick={() => viewJobHandler(item.id)}
                          className={styles.jobTitle}
                        >
                          {item.job_title}
                        </h4>
                        <ul className={styles.jobDetailsList}>
                          <li>
                            <i className="fa fa-bookmark-o"></i>{" "}
                            {item.company_name}
                          </li>
                          <li>
                            <i className="fa fa-map-marker mr-1" />{" "}
                            {item.address}
                          </li>
                          <li>
                            <i className="fa fa-clock-o mr-1" /> Published{" "}
                            {formaterDate(item.created_at)}
                          </li>
                        </ul>
                      </div>
                      {/* <div className={styles.jobTags}> */}
                      <div className="job-time m-t15 m-b10">
                        {item.tags
                          ?.split(",")
                          .slice(0, 2)
                          .map((tag, index) => (
                            <Link key={index} href="#" className="mr-1">
                              <span className="tag">{tag.trim()}</span>
                            </Link>
                          ))}
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span
                          className={`badge text-white p-2 ${styles.ctcBadge}`}
                        >
                          <span className="mr-1">₹</span>{" "}
                          {getCtcTitleById(item.ctc)}
                        </span>
                        <span
                          className={`badge text-white p-2 ${styles.ctcBadge}`}
                          onClick={() => viewJobHandler(item.id)}
                        >
                          View Job
                        </span>
                      </div>
                      <div
                        className={`${styles.likeButton} ${
                          savedJobsMap.has(item.id.toString())
                            ? styles.liked
                            : styles.notLiked
                        }`}
                        onClick={() => handleLikeToggle(item.id.toString())}
                      >
                        <i
                          className={`fa ${
                            savedJobsMap.has(item.id.toString())
                              ? "fa-heart"
                              : "fa-heart-o"
                          }`}
                        />
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
