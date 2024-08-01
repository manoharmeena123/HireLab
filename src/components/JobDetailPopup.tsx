"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import {
  useGetRecentJobsQuery,
  usePostSaveJobMutation,
  useDeleteSavedJobMutation,
  usePostApplyJobMutation,
} from "@/store/global-store/global.query";
import { useDispatch } from "react-redux";
import { fetchRecentJobsStart } from "@/store/global-store/global.slice";
import styles from "@/styles/JobDetailPopup.module.css";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { formaterDate } from "@/utils/formateDate";

type JobDetailPopupType = {
  show: boolean;
  job: any;
};

const JobDetailPopup = ({ job }: JobDetailPopupType) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: recentJob, isLoading, isError } = useGetRecentJobsQuery();
  const [saveJob, { isLoading: isSaving }] = usePostSaveJobMutation();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteSavedJobMutation();
  const [likedJobs, setLikedJobs] = useState<string[]>([]);
  const [applyJob, { isLoading: applyJobIsLoading }] =
    usePostApplyJobMutation();
  const [loadingJobs, setLoadingJobs] = useState<string[]>([]);
  const { user } = useLoggedInUser();
  console.log(job);

  const handleLikeToggle = async (jobId: string) => {
    if (isSaving || isDeleting) {
      return;
    }

    if (likedJobs.includes(jobId)) {
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
          text: "Failed to delete job.",
          confirmButtonText: "OK",
        });
      }
    } else {
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
        console.error("Error saving job:", error);
        Swal.fire({
          icon: "error",
          title: "Error in Saving Job",
          text: "Failed to save job.",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const requirements = job?.data?.candidate_requirement
    ?.split(".     ")
    ?.map((req: any) => req.trim())
    ?.filter((req: any) => req.length > 0);

  const handleApplyJob = async (jobId: string) => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      setLoadingJobs([...loadingJobs, jobId]);
      const { data } = await applyJob({ job_id: jobId });
      if (data?.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Job applied successfully!",
        });
      }
    } catch (error) {
      console.error("Error applying job:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to apply for the job.",
      });
    } finally {
      setLoadingJobs(loadingJobs.filter((id) => id !== jobId));
    }
  };

  // Sanitize the job description
  const sanitizedDescription = DOMPurify.sanitize(
    job?.data?.job_description || ""
  );

  return (
    <div className="container p-4">
      <div className="shadow p-4 rounded">
        <div className="d-flex align-items-center mb-2">
          <div>
            <h4 className="mb-0" style={{ textTransform: "capitalize" }}>
              {job?.data?.job_title}
            </h4>
            <ul className="jd-top-list mt-2 flex-wrap">
              <li>
                <i className="fa fa-bookmark-o"></i>
                {job?.data?.company_name}
              </li>
              <li>
                <i className="fa fa-map-marker"></i>
                {job?.data?.address}
              </li>
              <li>
                <i className="fa fa-clock-o"></i> Published{" "}
                {formaterDate(job?.data?.created_at)}
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <div className="mt-3 mt-md-0">
            <Button
              className="btn mr-2 apply-saved-btn"
              // style={{ backgroundColor: "#2A6310", borderColor: "#2A6310" }}
              onClick={() => handleApplyJob(job?.data?.id.toString())}
              disabled={loadingJobs.includes(job?.data?.id.toString())}
            >
              {user ? "Apply Job" : "Login to apply"}
            </Button>
            <Button
              className="btn btn-outline apply-saved-btn"
              onClick={() => handleLikeToggle(job?.data?.id.toString())}
              style={{
                backgroundColor: likedJobs.includes(job?.data?.id?.toString())
                  ? "#2A6310"
                  : "",
                borderColor: "#2A6310",
                color: likedJobs.includes(job?.data?.id?.toString())
                  ? "#fff"
                  : "",
              }}
            >
              {likedJobs.includes(job?.data?.id?.toString())
                ? "Saved"
                : "Save Job"}
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <h5>Job Posted By</h5>
          <div className="d-flex align-items-center">
            <i className="fa fa-user mr-2" style={{ color: "#2A6310" }}></i>
            <span>{job?.data?.user?.name}</span>
          </div>
        </div>
        <div className="mb-4">
          <Button
            className={styles.btnCustom}
            style={{
              backgroundColor: "transparent",
              borderColor: "#2A6310",
              color: "#2A6310",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2A6310";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#2A6310";
            }}
          >
            Connect Now
          </Button>
        </div>
        <div className="d-flex jd-split-wrap">
          <div className="mb-4">
            <h5>Location</h5>
            <div className="d-flex align-items-center">
              <i
                className="fa fa-map-marker mr-2"
                style={{ color: "#2A6310" }}
              ></i>
              <span
                className="badge badge-light p-2"
                style={{ color: "#2A6310" }}
              >
                {/* {job?.data?.location?.title || job?.data?.location} */}
                {job?.data?.address}

              </span>
            </div>
          </div>
          <div className="mb-4">
            <h5>Experience</h5>
            <div className="d-flex align-items-center">
              <i
                className="fa fa-briefcase mr-2"
                style={{ color: "#2A6310" }}
              ></i>
              <span
                className="badge badge-light p-2"
                style={{ color: "#2A6310" }}
              >
                {job?.data?.total_experience} Years
              </span>
            </div>
          </div>
          <div className="mb-4">
            <h5>Job Type</h5>
            <div className="d-flex align-items-center">
              <i
                className="fa fa-briefcase mr-2"
                style={{ color: "#2A6310" }}
              ></i>
              <span
                className="badge badge-light p-2"
                style={{ color: "#2A6310" }}
              >
                {job?.data?.job_type?.title || "Full-time"}
              </span>
            </div>
          </div>
          {/* <div className="mb-4">
            <h5>Shift and Schedule</h5>
            <div className="d-flex align-items-center">
              <i
                className="fa fa-clock-o mr-2"
                style={{ color: "#2A6310" }}
              ></i>
              <span
                className="badge badge-light p-2"
                style={{ color: "#2A6310" }}
              >
                Rotational shift
              </span>
            </div>
          </div> */}
        </div>
        <div className="mb-4">
          <h5>Full Job Description</h5>
          <div
            className="job-description"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          ></div>
        </div>
        {/* key responsibility */}
        {/* <div className="mb-4">
          <h5>Key Responsibilities</h5>
          <ul
            className={styles.responsibilities}
            style={{ paddingLeft: "1rem" }}
          >
            <li>Develop new user-facing features using React.js</li>
            <li>
              Build reusable components and front-end libraries for future use
            </li>
            <li>Translate designs and wireframes into high-quality code</li>
            <li>
              Optimize components for maximum performance across a vast array of
              web-capable devices and browsers
            </li>
            <li>Collaborate with other team members and stakeholders</li>
          </ul>
        </div> */}
        <div className="mb-4">
          <h5>Requirements</h5>
          <ul className={styles.requirements} style={{ paddingLeft: "1rem" }}>
            {requirements?.map((requirement: any, index: number) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>
        {job?.data?.education?.name && (
          <div className="mb-4">
            <h5>Education</h5>
            <ul className={styles.education} style={{ paddingLeft: "1rem" }}>
              <li>{job?.data?.education?.name}</li>
            </ul>
          </div>
        )}
        {job?.data?.city && (
          <div className="mb-4">
            <h5>Job Location</h5>
            <ul className={styles.jobLocation} style={{ paddingLeft: "1rem" }}>
              <li>{job?.data?.city}</li>
            </ul>
          </div>
        )}
        {job?.data?.ctc && (
          <div className="mb-4">
            <h5>CTC</h5>
            <ul className={styles.jobLocation} style={{ paddingLeft: "1rem" }}>
              <li>{job?.data?.ctc} LPA</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailPopup;
