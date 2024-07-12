"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  useGetRecentJobsQuery,
  usePostSaveJobMutation,
  useDeleteSavedJobMutation,
} from "@/store/global-store/global.query";
import { RecentJobData } from "@/types/index";
import { formaterDate } from "@/utils/formateDate";
import { useDispatch } from "react-redux";
import { fetchRecentJobsStart } from "@/store/global-store/global.slice";

type JobDetailPopupType = {
  show: boolean;
  handleClose: () => void;
  item: RecentJobData;
};

const JobDetailPopup = ({
  show,
  handleClose,
  item,
  job,
}: JobDetailPopupType) => {
  const { data: recentJob, isLoading, isError } = useGetRecentJobsQuery();
  const [saveJob, { isLoading: isSaving }] = usePostSaveJobMutation();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteSavedJobMutation();
  const [likedJobs, setLikedJobs] = useState<string[]>([]);

  const dispatch = useDispatch();

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
  const requirements = job?.data?.candidate_requirement
  .split(".     ")
  .map(req => req.trim())
  .filter(req => req.length > 0);

console.log(requirements);
  return (
    <>
      <div className="single-event-wrap p-4">
        <div className="jd-wrap mb-3">
          <div className="d-flex jd-header mb-3">
            <div>
              <img
                src="https://c8.alamy.com/comp/H9674H/isolated-abstract-red-color-circular-sun-logo-round-shape-logotype-H9674H.jpg"
                alt="image"
                className="jd-img"
              />
            </div>
            <div>
              <h4 className="mb-0">{job?.data?.job_title}</h4>
              <div className="d-flex jd-header flex-wrap">
                <div className="jd-loc-wrap">
                  <i className="fa fa-map-marker"></i>
                  <span>{job?.data?.address}</span>
                </div>
                <div className="jd-loc-wrap">
                  <i className="fa fa-bookmark-o"></i>
                  <span>india</span>
                </div>
                <div className="jd-loc-wrap">
                  <i className="fa fa-clock-o"></i> Published{" "}
                  <span>11 months ago</span>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
            <div className="job-time mr-2 jd-ft-price">
              <span>{job?.data?.location?.title}</span>
            </div>
            <div className="salary-bx">
              <span style={{ fontFamily: "__Inter_aaf875", fontSize: "20px" }}>
                &#8377; {job?.data?.salary}
              </span>
            </div>
          </div>
          <div className="d-flex jd-header mb-3" style={{ maxWidth: "300px" }}>
            <Button className="jd-btn">Apply Now</Button>
            <label
              className={`like-btn ${
                likedJobs.includes(item?.id?.toString()) ? "liked" : ""
              }`}
              onClick={() => handleLikeToggle(item?.id.toString())}
            >
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        <div className="shadow bg-white full-job-d-wrap p-4">
          <h3>Job Posted By</h3>
          <div className="mb-3">
            <div className="jd-postby">
              {" "}
              <i className="fa fa-user"></i>
              <span> {job?.data?.company_name}</span>

            </div>
          </div>
          <Button className="mb-3 jd-btn">Connect Now</Button>
          <div>
            <h4>Location</h4>
            <div className="jd-postby mb-3">
              {" "}
              <i className="fa fa-map-marker"></i>
              <span> {job?.data?.location?.title}</span>
            </div>
          </div>
          <div>
            <h4>Full Job Description</h4>
            <h5>Experience: {job?.data?.total_experience} Years</h5>
            <p>{job?.data?.job_description}</p>
            <h4>Key Responsibilities:</h4>

            <ul style={{ paddingLeft: "1rem" }}>
              <li>Develop new user-facing features using React.js</li>
              <li>
                Build reusable components and front-end libraries for future use
              </li>
              <li>Translate designs and wireframes into high-quality code</li>
              <li>
                Optimize components for maximum performance across a vast array
                of web-capable devices and browsers
              </li>
              <li>Collaborate with other team members and stakeholders</li>
            </ul>
            <h4>Requirements:</h4>

            <ul style={{ paddingLeft: "1rem" }}>
            <ul>
    {requirements?.map((requirement, index) => (
      <li key={index}>{requirement}</li>
    ))}
  </ul>
            </ul>

            <h5>Education:</h5>
            <ul style={{ paddingLeft: "1rem" }}>
              <li>{job?.data?.education?.name}</li>
            </ul>
            <h5>Schedule</h5>
            <ul style={{ paddingLeft: "1rem" }}>
              <li>Day shift</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailPopup;
