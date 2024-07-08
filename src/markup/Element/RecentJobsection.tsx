import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import {
  useGetRecentJobsQuery,
  usePostSaveJobMutation,
  useDeleteSavedJobMutation,
  useGetJobsQuery,
} from "@/store/global-store/global.query";
import { RecentJobData } from "@/types/index";
import { formaterDate } from "@/utils/formateDate";
import { useDispatch } from "react-redux";
import { fetchRecentJobsStart } from "@/store/global-store/global.slice";
import JobDetailPopup from "@/components/JobDetailPopup";
import { redirect, useRouter } from "next/navigation";

const RecentJobsection = () => {
  const { data: recentJob, isLoading, isError } = useGetRecentJobsQuery();
  const [saveJob, { isLoading: isSaving }] = usePostSaveJobMutation();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteSavedJobMutation();
  const [likedJobs, setLikedJobs] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const { push } = useRouter();

  // Function to toggle like state
  const handleLikeToggle = async (jobId: string) => {
    // Check if already liking or unliking
    if (isSaving || isDeleting) {
      return; // If already saving or deleting, do nothing
    }

    // Toggle liked state
    if (likedJobs.includes(jobId)) {
      // Unlike job
      try {
        await deleteJob(jobId);
        setLikedJobs(likedJobs.filter((id) => id !== jobId));
        dispatch(fetchRecentJobsStart());
        Swal.fire({
          icon: "success",
          title: "Job Deleted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error deleting job:", error);
        Swal.fire({
          icon: "error",
          title: "Error in Deleted Job",
          text: "Failed to deleting job.",
          confirmButtonText: "OK",
        });
      }
    } else {
      // Like job
      try {
        await saveJob({ job_id: jobId });
        setLikedJobs([...likedJobs, jobId]);
        dispatch(fetchRecentJobsStart());
        Swal.fire({
          icon: "success",
          title: "Job Saved Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error liking job:", error);
        Swal.fire({
          icon: "error",
          title: "Error in Saving Job",
          text: "Failed to saving job.",
          confirmButtonText: "OK",
        });
      }
    }
  };
  const { data: JobDetails, refetch } = useGetJobsQuery();
  // // Render loading state if data is still loading
  // if (isLoading) return <div>Loading...</div>;

  // // Render error message if there's an error fetching data
  // if (isError) return <div>Error fetching data</div>;
const viewJobHandler = (id:number) => {

  push(`/job-detail?jobId=${id}`)
}
  return (
    <div className="section-full bg-white content-inner-2">
      <div className="container">
        <div className="d-flex job-title-bx section-head">
          <div className="mr-auto">
            <h2 style={{ fontWeight: "501" }} className="m-b5">
              Recent Jobs
            </h2>
            <h6 className="fw4 m-b0">{recentJob?.data?.length}+ Recently Added Jobs</h6>
          </div>
          <div className="align-self-end">
            <Link href="/browse-jobs" className="site-button button-sm">
              Browse All Jobs <i className="fa fa-long-arrow-right"></i>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-9">
            <JobDetailPopup show={show} handleClose={handleClose} item={recentJob?.data} />
            <ul className="post-job-bx browse-job">
              {recentJob?.data?.map((item: RecentJobData, index: number) => (
                <li key={index} >
                  {item && (
                    <div className="post-bx">
                      <div className="d-flex m-b30">
                        <div className="job-post-info">
                          <h4 style={{cursor:'pointer'}} className="text-secondry">
                          <Link href={"/job-detail"} onClick={() => viewJobHandler(item.id)}>
                                {" "}
                                {item?.job_title}
                              </Link>
                          </h4>
                          <ul>
                            <li>
                              <i className="fa fa-map-marker"></i>
                              {item?.address}
                            </li>
                            <li>
                              <i className="fa fa-bookmark-o"></i>
                              {item?.location?.title}
                            </li>
                            <li>
                              <i className="fa fa-clock-o"></i> Published{" "}
                              {formaterDate(item?.created_at)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="job-time mr-auto">
                          <Link href="">
                            <span>{item?.location?.title}</span>
                          </Link>
                        </div>
                      
                        <div className="salary-bx">
                          <span>42000 - 55000</span><br />
                          {/* <span className="view-job" onClick={()=>viewJobHandler(item.id)}>
                            View Job
                          </span> */}
                        </div>
                      </div>
                      <label
                        className={`like-btn ${
                          likedJobs.includes(item.id.toString()) ? "liked" : ""
                        }`}
                        onClick={() => handleLikeToggle(item.id.toString())}
                      >
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="m-t30">
              <div className="d-flex">
                <Link className="site-button button-sm mr-auto" href="">
                  <i className="ti-arrow-left"></i> Prev
                </Link>
                <Link className="site-button button-sm" href="">
                  Next <i className="ti-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="sticky-top">
              <div className="candidates-are-sys m-b30">
                <div className="candidates-bx">
                  <div className="testimonial-pic radius">
                    <Image
                      src={require("../../images/testimonials/pic3.jpg")}
                      alt=""
                      width="100"
                      height="100"
                    />
                  </div>
                  <div className="testimonial-text">
                    <p>
                      I just got a job that I applied for via careerfy! I used
                      the site all the time during my job hunt.
                    </p>
                  </div>
                  <div className="testimonial-detail">
                    <strong className="testimonial-name">
                      Richard Anderson
                    </strong>
                    <span className="testimonial-position">Nevada, USA</span>
                  </div>
                </div>
              </div>
              <div className="quote-bx">
                <div className="quote-info">
                  <h4>Make a Difference with Your Online Resume!</h4>
                  <p>
                    Your resume in minutes with JobBoard resume assistant is
                    ready!
                  </p>
                  <Link href="/register" className="site-button">
                    Create an Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentJobsection;
