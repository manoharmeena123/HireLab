"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick"; // Importing react-slick for carousel
import {
  useGetAppliedJobsQuery,
  useRecentJobSeekerJobQuery,
  useGetEventsQuery,
  useGetCommunityMutation,
} from "@/store/global-store/global.query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // Import relativeTime plugin
import Loading from "@/components/Loading";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { Modal, Button } from "react-bootstrap"; // Importing Bootstrap Modal
import { IMAGE_URL } from "@/lib/apiEndPoints";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime); // Extend dayjs with relativeTime plugin

const DashboardSection = () => {
  const { user } = useLoggedInUser();
  const { push } = useRouter();
  const { data: appliedJobsData, isLoading: appliedJobsLoading } =
    useGetAppliedJobsQuery();
  const { data: recentJobData, isLoading: recentJobLoading } =
    useRecentJobSeekerJobQuery();
  const { data: eventsData, isLoading: eventsLoading } = useGetEventsQuery(); // For fetching events data
  const [getCommunity, { data: getCommunityData }] = useGetCommunityMutation();

  const [showModal, setShowModal] = useState(false); // Modal control state
  
// Calling the API to get community data, replacing spaces with hyphens
useEffect(() => {
  if (user?.user?.communities?.length > 0) {
    const communityName = user.user.communities[0].name.replace(/\s+/g, "-");
    getCommunity(communityName); // Call the community API
  }
}, [user, getCommunity]);

  // Simulated profile completion value for demonstration purposes
  const profileCompletion = 35; // This can come dynamically from user data

  // Modal close handler
  const handleClose = () => setShowModal(false);

  if (appliedJobsLoading || recentJobLoading || eventsLoading) {
    return <Loading />;
  }

  const totalCredits = user?.total_credits || 10; // Default to 10 if total_credits not available
  const remainingCredits = user?.remaining_credits || 0; // Default to 0 if remaining_credits not available

  const recentJobs = recentJobData?.data || [];
  const appliedJobs = appliedJobsData?.data || [];
  const events = eventsData?.data || [];
  const communityUsers = getCommunityData?.data[0]?.users || [];

  const formatDate = (date: string) => dayjs(date).fromNow(); // Format the date relative to now

  // Carousel settings for slick
  const carouselSettings = {
    dots: true, // Show dots below for navigation
    infinite: true, // Infinite scroll for items
    speed: 500, // Transition speed
    slidesToShow: 2, // Number of job cards to show at once
    slidesToScroll: 1, // Number of job cards to scroll at a time
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
    <div className="container page-content bg-white mt-5">
      <div className="row">
        {/* Recommended Jobs Section */}
        <div className="col-lg-8">
          <div className=" p-4 bg-white mb-4 " 
            style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px", borderRadius: "20px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4 className="fw-bold">Recommended Jobs for You</h4>
              <Link href="/apply-jobs" className="btn btn-link text-success">
                View All
              </Link>
            </div>

            {/* Recommended Jobs Carousel */}
            <Slider {...carouselSettings}>
              {recentJobs.map((job: any) => (
                <div key={job.id} className="p-3">
                  <div
                    className="job-card p-4  shadow-sm"
                    style={{
                      background: "#fff",
                      transition: "0.3s",
                      cursor: "pointer",
                      border: "1px solid #e0e0e0",
                      borderRadius: "20px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                  >
                    <h6 className="text-dark mb-2 fw-semibold">
                      {job.job_title}
                    </h6>
                    <p className="text-muted mb-2">{job.company_name}</p>
                    <p className="text-muted small mb-2">
                      <i className="fa fa-calendar me-1 mr-1"></i>
                      {formatDate(job.created_at)}
                    </p>
                    <p className="text-muted small">
                      <i className="fa fa-map-marker me-1"></i>
                      {job.location?.title || "Location not available"}
                    </p>
                    <Link
                      href={`/job-detail?jobId=${job.id}`}
                      className="btn btn-block mt-3"
                      style={{
                        backgroundColor: "#2A6310",
                        color: "white",
                        borderRadius: "30px",
                        transition: "background-color 0.3s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#225307")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2A6310")}
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Applied Jobs Section */}
          <div className="p-4 bg-white "
            style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px", borderRadius: "20px" }}
          
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4 className="fw-bold">Applied Jobs</h4>
            </div>

            {/* Applied Jobs Carousel */}
            <Slider {...carouselSettings}>
              {appliedJobs.length > 0 ? (
                appliedJobs.map((job: any, index: number) => (
                  <div key={index} className="p-3">
                    <div
                      className="job-card p-4  shadow-sm"
                      style={{
                        background: "#fff",
                        transition: "0.3s",
                        cursor: "pointer",
                        border: "1px solid #e0e0e0",
                        borderRadius: "12px",
                        boxShadow:
                          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      }}
                    >
                      <h6 className="text-dark mb-2 fw-semibold">
                        {job.job_title}
                      </h6>
                      <p className="text-muted mb-2">{job.company_name}</p>
                      <p className="text-muted small mb-2">
                        <i className="fa fa-calendar me-1 mr-1"></i>
                        {formatDate(job.created_at)}
                      </p>
                      <p className="text-muted small">
                        <i className="fa fa-map-marker me-1"></i>
                        {job.location?.title || "Location not available"}
                      </p>
                      <Link
                        href={`/job-detail?jobId=${job.id}`}
                        className="btn btn-block mt-3"
                        style={{
                          backgroundColor: "#2A6310",
                          color: "white",
                          borderRadius: "30px",
                          transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#225307")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2A6310")}
                      >
                        View Job
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No applied jobs available</p>
              )}
            </Slider>
          </div>

          {/* Meetups and Events Section */}
          <div className="p-4 bg-white  mt-4"
            style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px", borderRadius: "20px" }}
          
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4 className="fw-bold">Meetups and Events</h4>
              <Link href="/single-event" className="btn btn-link text-success">
                View All
              </Link>
            </div>

            {/* Meetups and Events Carousel */}
            <Slider {...carouselSettings}>
              {events.length > 0 ? (
                events.map((event: any, index) => (
                  <div key={index} className="p-3">
                    <div
                      className="event-card p-4  shadow-sm"
                      style={{
                        background: "#fff",
                        transition: "0.3s",
                        cursor: "pointer",
                        border: "1px solid #e0e0e0",
                        borderRadius: "12px",
                        boxShadow:
                          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      }}
                    >
                      <h6 className="text-dark mb-2 fw-semibold">
                        {event.title}
                      </h6>
                      <p className="text-muted mb-2">{event.location}</p>
                      <p className="text-muted small mb-2">
                        <i className="fa fa-calendar me-1"></i> {event.date}
                      </p>
                      <p className="text-muted small">
                        <i className="fa fa-clock me-1"></i> {event.time}
                      </p>
                      <Link
                        href={`/event-detail?eventId=${event.id}`}
                        className="btn btn-block mt-3"
                        style={{
                          backgroundColor: "#2A6310",
                          color: "white",
                          borderRadius: "30px",
                          transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#225307")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2A6310")}
                      >
                        View Event
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No events available</p>
              )}
            </Slider>
          </div>
        </div>

        {/* Scrollable Right Sidebar */}
        <div className="col-lg-3">
          <div className="sticky-top" style={{ maxHeight: "calc(100vh - 20px)", overflowY: "auto" }}>
            {/* Profile Completion Section */}
             <div className=" p-3 bg-white mb-4 m-1" 
            style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px", borderRadius: "20px" }}
             
             >
              <h5 className="fw-bold">Profile Completion</h5>
              {/* Profile completion logic */}
              <div className="progress mb-3" style={{ height: "25px" }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: "70%" }} // This value can be dynamic
                  aria-valuenow={70}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  70% Complete
                </div>
              </div>
              <ul className="list-unstyled">
                <li>
                  <Link href="#" className="text-decoration-none text-dark">
                    Upload LinkedIn Profile
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-decoration-none text-dark">
                    Add Profile Picture
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-decoration-none text-dark">
                    Add Permanent Address
                  </Link>
                </li>
              </ul>
            </div>
            {/* My Community Section */}
            <div
              className="p-3 bg-white mb-4 m-1 text-center"
              style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px", borderRadius: "20px" }}
            >
              <h5 className="fw-bold">My Community</h5>
              <h6 className="text-muted">
                {getCommunityData?.data[0]?.name || "No Community"}
              </h6>
              <p className="text-muted">
                {communityUsers.length} {communityUsers.length === 1 ? "Member" : "Members"}
              </p>
              <button
                className="btn btn-outline-success w-100"
                style={{
                  backgroundColor: "#2A6310",
                  color: "white",
                  borderRadius: "30px",
                  // transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#225307")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2A6310")}
                onClick={() => setShowModal(true)}
              >
                View Members
              </button>
            </div>

            {/* Credits Section */}
            <div
              className="p-3 m-1 bg-white mb-4  text-center"
              style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px", borderRadius: "20px" }}
            >
              <h5 className="fw-bold">
                Credits Left ({Math.max(remainingCredits, 0)}/
                {totalCredits > 0 ? totalCredits : 0})
              </h5>
              {remainingCredits < 0 ? (
                <p className="text-danger">You have exceeded your credits!</p>
              ) : null}
              <button
                className="btn w-100 mt-2"
                style={{
                  backgroundColor: "#2A6310",
                  color: "white",
                  borderRadius: "30px",
                  // transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#225307")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2A6310")}
                onClick={() => push("/cart")}
              >
                Buy Credits
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to show community members */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#f0a500", color: "white" }} closeButton>
          <Modal.Title>
            {getCommunityData?.data[0]?.name} - Members List
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {communityUsers.length > 0 ? (
            <ul className="list-group">
              {communityUsers.map((user: any) => (
                <li
                  key={user.id}
                  className="list-group-item d-flex align-items-center py-3"
                  style={{ borderBottom: "1px solid #ddd" }}
                >
                  <div className="d-flex align-items-center">
                    {user.image ? (
                      <Image
                        src={`${IMAGE_URL}${user?.image}`}
                        alt={user.name}
                        className="rounded-circle me-3"
                        width={50}
                        height={50}
                        objectFit="cover"
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <p className="mb-0 fw-bold text-capitalize px-2">{user.name}</p>
                    <p className="text-muted small mb-0 px-2">{user.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No members found</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardSection;
