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
  useGetAppliedJobsQuery,
  useGetCtcDataQuery,
  useGetSavedJobQuery,
} from "@/store/global-store/global.query";
import { useDispatch } from "react-redux";
import { fetchRecentJobsStart } from "@/store/global-store/global.slice";
import styles from "@/styles/JobDetailPopup.module.css";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { formaterDate } from "@/utils/formateDate";
import Link from "next/link";
import parse from "html-react-parser";

type JobDetailPopupType = {
  show: boolean;
  job: any;
  getJobs: any;
};

const JobDetailPopup = ({ job, getJobs }: JobDetailPopupType) => {
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

  const { data: appliedJob, refetch } = useGetAppliedJobsQuery();
  const { data: getCtcData, isLoading: getCtcDataLoading } =
    useGetCtcDataQuery();

  const {
    data: savedJob,
    refetch: savedJobRefetch,
    isLoading: savedJobLoading,
  } = useGetSavedJobQuery();

  const handleLikeToggle = async (jobId: string) => {
    if (isSaving || isDeleting) {
      return;
    }

    const isJobSaved = savedJob?.data?.some((saved: any) => saved.id == jobId);

    if (isJobSaved) {
      try {
        // Unsaving the job
        await deleteJob(jobId);
        savedJobRefetch();
        setLikedJobs(likedJobs.filter((id) => id !== jobId));
        dispatch(fetchRecentJobsStart());
        Swal.fire({
          icon: "success",
          title: "Job Unsaved Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error unsaving job:", error);
        Swal.fire({
          icon: "error",
          title: "Error in Unsaving Job",
          text: "Failed to unsave job.",
          confirmButtonText: "OK",
        });
      }
    } else {
      try {
        // Saving the job
        await saveJob({ job_id: jobId });
        savedJobRefetch();
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
    // Check if user has membership
    if (!user?.user?.membership) {
      Swal.fire({
        title: "No Membership Plan",
        text: "You don't have any membership plan to apply for jobs. Would you like to buy one?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Buy Subscription",
        cancelButtonText: "Go Back to Job",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to the subscription page (cart)
          router.push("/cart");
        } else {
          // Stay on the job details page
          return;
        }
      });
      return;
    }

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      setLoadingJobs([...loadingJobs, jobId]);
      const { data } = await applyJob({ job_id: jobId });
      if (data?.success) {
        getJobs(jobId);
        refetch();
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
  const handleLoginToApply = () => {
    router.push(`/login?page=job-detail?jobId=${job?.data?.id}`);
  };

  const isJobApplied = appliedJob?.data?.some(
    (applied: any) => applied.id === job?.data?.id
  );

  // Find the CTC title based on the job's CTC ID
  const getCtcTitle = (ctcId: string | number) => {
    const ctc = getCtcData?.data?.find(
      (ctcItem: any) => ctcItem.id === Number(ctcId)
    );
    return ctc ? ctc.title : "CTC not available";
  };

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
            {user ? (
              isJobApplied ? (
                <Button
                  className="btn mr-2 apply-saved-btn"
                  style={{
                    backgroundColor: "#2A6310",
                    borderColor: "#2A6310",
                    color: "#fff",
                  }}
                  disabled
                >
                  Applied
                </Button>
              ) : (
                <Button
                  className="btn mr-2 apply-saved-btn"
                  onClick={() => handleApplyJob(job?.data?.id.toString())}
                  disabled={loadingJobs.includes(job?.data?.id.toString())}
                  style={{
                    backgroundColor: "#2A6310",
                    borderColor: "#2A6310",
                    color: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1E4A08";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#2A6310";
                  }}
                >
                  Apply Job
                </Button>
              )
            ) : (
              <Button
                className="btn mr-2 apply-saved-btn"
                onClick={() => handleLoginToApply()}
                disabled={loadingJobs.includes(job?.data?.id.toString())}
                style={{
                  backgroundColor: "#2A6310",
                  borderColor: "#2A6310",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1E4A08";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#2A6310";
                }}
              >
                Login to apply
              </Button>
            )}

            {/* Conditional Save Job button */}
            {savedJob?.data?.some(
              (saved: any) => saved.id === job?.data?.id
            ) ? (
              <Button
                className="btn mr-2 apply-saved-btn"
                onClick={() => handleLikeToggle(job?.data?.id.toString())}
                style={{
                  backgroundColor: "#2A6310",
                  borderColor: "#2A6310",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1E4A08";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#2A6310";
                }}
              >
                Saved
              </Button>
            ) : (
              <Button
                className="btn mr-2 apply-saved-btn"
                onClick={() => handleLikeToggle(job?.data?.id.toString())}
                style={{
                  backgroundColor: "#fff",
                  borderColor: "#2A6310",
                  color: "#2A6310",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2A6310";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.color = "#2A6310";
                }}
              >
                Save Job
              </Button>
            )}
          </div>
        </div>
        <div className="mb-4">
          <h5>Job Posted By</h5>
          <div className="d-flex align-items-center">
            <Link href={"/job-poster-profile"}>
              <i className="fa fa-user mr-2" style={{ color: "#2A6310" }}></i>
              <span>{job?.data?.user?.name ||"Not specified"}</span>
            </Link>
          </div>
        </div>
        {/* Education, Experience, CTC, and Job Type Sections */}
        <div className="d-flex jd-split-wrap">
          {job?.data?.education && (
            <div className="mb-4">
              <h5>
                <i
                  className="fa fa-graduation-cap"
                  style={{ color: "#2A6310" }}
                ></i>{" "}
                Education
              </h5>
              <span
                className="badge badge-light p-2"
                style={{ color: "#2A6310" }}
              >
                {job?.data?.education?.name || "Not specified"}
              </span>
            </div>
          )}
          {job?.data?.total_experience && (
            <div className="mb-4">
              <h5>
                <i className="fa fa-briefcase" style={{ color: "#2A6310" }}></i>{" "}
                Experience
              </h5>
              <span
                className="badge badge-light p-2"
                style={{ color: "#2A6310" }}
              >
                {job?.data?.total_experience} Years
              </span>
            </div>
          )}
          {job?.data?.ctc && (
            <div className="mb-4">
              <h5>
                <i className="fa fa-money" style={{ color: "#2A6310" }}></i> CTC
              </h5>
              <span
                className="badge badge-light p-2"
                style={{ color: "#2A6310" }}
              >
                {getCtcTitle(job?.data?.ctc)}
              </span>
            </div>
          )}
          {job?.data?.job_type && (
            <div className="mb-4">
              <h5>
                <i className="fa fa-clock-o" style={{ color: "#2A6310" }}></i>{" "}
                Job Type
              </h5>
              <span
                className="badge badge-light p-2"
                style={{ color: "#2A6310" }}
              >
                {job?.data?.job_type?.title || "Full-time"}
              </span>
            </div>
          )}
          {/* Job Location */}
          {job?.data?.city && (
            <div className="mb-4">
              <h5>
                <i
                  className="fa fa-map-marker"
                  style={{ color: "#2A6310" }}
                ></i>{" "}
                Job Location
              </h5>
              <span
                className="badge badge-light p-2"
                style={{ color: "#2A6310" }}
              >
                {job?.data?.city}
              </span>
            </div>
          )}
        </div>
        {/* Job Description */}
        {job?.data?.job_description && (
          <div className="mb-4">
            <h5>
              <i className="fa fa-file-text-o" style={{ color: "#2A6310" }}></i>{" "}
              Full Job Description
            </h5>
            <div
              className="job-description"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></div>
          </div>
        )}

        {/* Requirements */}
        {requirements && requirements.length > 0 && (
          <div className="mb-4">
            <h5>
              <i className="fa fa-list" style={{ color: "#2A6310" }}></i>{" "}
              Requirements
            </h5>
            <ul className={styles.requirements} style={{ paddingLeft: "1rem" }}>
              {requirements.map((requirement: any, index: number) => (
                <li key={index}>{parse(requirement)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailPopup;
