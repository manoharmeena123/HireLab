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

const JobDetailPopup = ({ show, handleClose, item }: JobDetailPopupType) => {
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
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton className="jd-model-header">
        <Modal.Title>Job Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              <h4 className="mb-0">Digital Marketing Executive</h4>
              <div className="d-flex jd-header flex-wrap">
                <div className="jd-loc-wrap">
                  <i className="fa fa-map-marker"></i>
                  <span>kerala</span>
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
              <span>Full Time</span>
            </div>
            <div className="salary-bx">
              <span style={{ fontFamily: "__Inter_aaf875", fontSize: "20px" }}>
                $1200 - $ 2500
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
              <span>Satya Suresh</span>
            </div>
          </div>
          <Button className="mb-3 jd-btn">Connect Now</Button>
          <div>
            <h4>Location</h4>
            <div className="jd-postby mb-3">
              {" "}
              <i className="fa fa-map-marker"></i>
              <span>Sacramanto,California</span>
            </div>
          </div>
          <div>
            <h4>Full Job Description</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default JobDetailPopup;
