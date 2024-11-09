"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import {
  useGetAppliedJobsQuery,
  useRecentJobSeekerJobQuery,
  useGetEventsQuery,
  useGetCommunityMutation,
} from "@/store/global-store/global.query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Loading from "@/components/Loading";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { Modal, Button } from "react-bootstrap";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/app/login/store/login.query";
import { useAuthToken } from "@/hooks/useAuthToken";
import { navigateSource } from "@/lib/action";
import Swal from "sweetalert2";

dayjs.extend(relativeTime);

const DashboardSection = () => {
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { removeToken } = useAuthToken();
  const { user } = useLoggedInUser();
  const { push } = useRouter();
  const { data: appliedJobsData, isLoading: appliedJobsLoading } =
    useGetAppliedJobsQuery();
  const { data: recentJobData, isLoading: recentJobLoading } =
    useRecentJobSeekerJobQuery();
  const { data: eventsData, isLoading: eventsLoading } = useGetEventsQuery();
  const [getCommunity, { data: getCommunityData }] = useGetCommunityMutation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?.user?.communities?.length > 0) {
      const communityName = user.user.communities[0].name.replace(/\s+/g, "-");
      getCommunity(communityName);
    }
  }, [user, getCommunity]);

  const profileCompletion = 35;
  const handleClose = () => setShowModal(false);

  if (appliedJobsLoading || recentJobLoading || eventsLoading) {
    return <Loading />;
  }

  const totalCredits = user?.total_credits || 10;
  const remainingCredits = user?.remaining_credits || 0;

  const recentJobs = recentJobData?.data || [];
  const appliedJobs = appliedJobsData?.data || [];
  const events = eventsData?.data || [];
  const communityUsers = getCommunityData?.data[0]?.users || [];

  const formatDate = (date: string) => dayjs(date).fromNow();

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const getUserPlanUpgradeOptions = () => {
    const plans = [];
    if (user?.user?.membership?.name === "CHAMPS") {
      plans.push({ name: "PRODIGY", value: 3 });
      plans.push({ name: "WIZARD", value: 1 });
    } else if (user?.user?.membership?.name === "PRODIGY") {
      plans.push({ name: "WIZARD", value: 1 });
    }
    return plans;
  };

  const viewJobHandler = (title: any) => {
    const encodedTitle = encodeURIComponent(title).replace(/%20/g, "-");
    push(`/single-event?query=${encodedTitle}`);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "No, stay logged in",
    });

    if (result.isConfirmed) {
      try {
        await logout().unwrap();
        removeToken();
        navigateSource("/");
        Swal.fire(
          "Logged out!",
          "You have been logged out successfully.",
          "success"
        );
      } catch (error) {
        console.error("Logout failed:", error);
        Swal.fire(
          "Logout failed",
          "Failed to log out. Please try again.",
          "error"
        );
      }
    }
  };
  return (
    <div className="container page-content bg-white mt-5">
      <div className="row">
        {/* Row 1: Recommended Jobs and Profile Completion */}
        <div className="col-lg-8">
          <div
            className="p-4 bg-white mb-4"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              borderRadius: "20px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4 className="fw-bold">Recommended Jobs for You</h4>
              <Link href="/apply-jobs" className="btn btn-link text-success">
                View All
              </Link>
            </div>
            <div>
              {recentJobs.length > 0 ? (
                <Slider {...carouselSettings}>
                  {recentJobs.map((job: any) => (
                    <div key={job.id} className="p-3">
                      <div
                        className="job-card p-4 shadow-sm"
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
                          onMouseEnter={(e) => (
                            (e.currentTarget.style.backgroundColor = "white"),
                            (e.currentTarget.style.color = "black"),
                            (e.currentTarget.style.border = "1px solid black")
                          )}
                          onMouseLeave={(e) => (
                            (e.currentTarget.style.backgroundColor = "#2A6310"),
                            (e.currentTarget.style.color = "white"),
                            (e.currentTarget.style.border = "none")
                          )}
                        >
                          View Job
                        </Link>
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <div
                  style={{
                    minHeight: "265px",// Adjust height as needed
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "20px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  }}
                >
                  <p className="text-muted">No recent jobs available</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div
            className="p-3 bg-white mb-4"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              borderRadius: "20px",
            }}
          >
            <h5 className="fw-bold">Profile Completion</h5>
            <div className="progress mb-3" style={{ height: "25px" }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: "70%" }}
                aria-valuenow={70}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                70% Complete
              </div>
            </div>

            <div
              className="p-3"
              style={{
                background: "#fff4f2",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            >
              <p className="text-dark fw-bold mb-2">What are you missing?</p>
              <ul className="list-unstyled">
                <li className="d-flex align-items-center mb-1 m-1">
                  <i
                    className="fa fa-check-circle text-danger "
                    style={{ color: "#ff4500" }}
                  >
                    {" "}
                    Daily job recommendations
                  </i>
                </li>
                <li className="d-flex align-items-center mb-1 m-1">
                  <i
                    className="fa fa-check-circle text-danger"
                    style={{ color: "#ff4500" }}
                  >
                    {" "}
                    Job application updates
                  </i>
                </li>
                <li className="d-flex align-items-center mb-1 m-1">
                  <i
                    className="fa fa-check-circle text-danger"
                    style={{ color: "#ff4500" }}
                  >
                    {" "}
                    Direct jobs from recruiters
                  </i>
                </li>
              </ul>
            </div>

            <button
              className="btn btn-block text-white"
              style={{
                backgroundColor: "#2A6310",
                borderRadius: "50px",
                padding: "10px 10px",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#225307")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#2A6310")
              }
              onClick={() => push("/job-seeker")}
            >
              Complete Profile
            </button>
            {/* Logout Button */}
            <button
              className="btn btn-block text-white mt-3"
              style={{
                backgroundColor: "#FF4500",
                borderRadius: "50px",
                padding: "10px 10px",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#CC3700")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#FF4500")
              }
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Applied Jobs and Meetups and Events */}
      <div className="row">
        <div className="col-lg-6">
          <div
            className="p-4 bg-white"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              borderRadius: "20px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4 className="fw-bold">Applied Jobs</h4>
              <Link href="/applied-job" className="btn btn-link text-success">
                View All
              </Link>
            </div>
            <div>
              {appliedJobs.length > 0 ? (
                <Slider {...carouselSettings}>
                  {appliedJobs.map((job: any, index: number) => (
                    <div key={index} className="p-3">
                      <div
                        className="job-card p-4 shadow-sm"
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
                          onMouseEnter={(e) => (
                            (e.currentTarget.style.backgroundColor = "white"),
                            (e.currentTarget.style.color = "black"),
                            (e.currentTarget.style.border = "1px solid black")
                          )}
                          onMouseLeave={(e) => (
                            (e.currentTarget.style.backgroundColor = "#2A6310"),
                            (e.currentTarget.style.color = "white"),
                            (e.currentTarget.style.border = "none")
                          )}
                        >
                          View Job
                        </Link>
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <div
                  style={{
                    minHeight: "285px", // Adjust height as needed
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "20px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  }}
                >
                  <p className="text-muted">No applied jobs available</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div
            className="p-4 bg-white"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              borderRadius: "20px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4 className="fw-bold">Meetups and Events</h4>
              <Link href="/single-event" className="btn btn-link text-success">
                View All
              </Link>
            </div>
            <Slider {...carouselSettings}>
              {events.length > 0 ? (
                events.map((event: any, index) => (
                  <div key={index} className="p-3">
                    <div
                      className="event-card p-4 shadow-sm"
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
                      <button
                        onClick={() => viewJobHandler(event.title)}
                        className="btn btn-block mt-3"
                        style={{
                          backgroundColor: "#2A6310",
                          color: "white",
                          borderRadius: "30px",
                          transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => (
                          (e.currentTarget.style.backgroundColor = "white"),
                          (e.currentTarget.style.color = "black"),
                          (e.currentTarget.style.border = "1px solid black")
                        )}
                        onMouseLeave={(e) => (
                          (e.currentTarget.style.backgroundColor = "#2A6310"),
                          (e.currentTarget.style.color = "white"),
                          (e.currentTarget.style.border = "none")
                        )}
                      >
                        View Event
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No events available</p>
              )}
            </Slider>
          </div>
        </div>
      </div>

      {/* Row 3: My Community and Resume Score in one column, Buy Credits and Upgrade Plan in another */}
      <div className="row mt-3">
        <div className="col-lg-6">
          {/* My Community */}
          <div className="row">
            <div className="col-lg-12">
              <div
                className="p-3 bg-white mb-4 m-1 text-center"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  borderRadius: "20px",
                }}
              >
                <h5 className="fw-bold">My Community</h5>
                <p className="text-muted">
                  <span className="fw-bold">Community name : </span>
                  {getCommunityData?.data[0]?.name || "No Community"}
                </p>
                <p className="text-muted">
                  <span className="fw-bold">Total member : </span>
                  {communityUsers.length}{" "}
                  {communityUsers.length === 1 ? "Member" : "Members"}
                </p>
                <button
                  className="btn btn-outline-success w-50"
                  style={{
                    backgroundColor: "#2A6310",
                    color: "white",
                    borderRadius: "30px",
                  }}
                  onMouseEnter={(e) => (
                    (e.currentTarget.style.backgroundColor = "white"),
                    (e.currentTarget.style.color = "black"),
                    (e.currentTarget.style.border = "1px solid black")
                  )}
                  onMouseLeave={(e) => (
                    (e.currentTarget.style.backgroundColor = "#2A6310"),
                    (e.currentTarget.style.color = "white"),
                    (e.currentTarget.style.border = "none")
                  )}
                  onClick={() => push("/my-community")}
                >
                  View Members
                </button>
              </div>
            </div>

            {/* Resume Score */}
            <div className="col-lg-12">
              <div
                className="p-3 bg-white mb-4 m-1 text-center"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  borderRadius: "20px",
                }}
              >
                <h5 className="fw-bold">Resume Score</h5>
                <p className="text-muted">Coming Soon...</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          {/* Buy Credits and Upgrade Plan */}
          <div className="row">
            <div className="col-lg-12">
              <div
                className="p-3 m-1 bg-white mb-4 text-center"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  borderRadius: "20px",
                }}
              >
                <h5 className="fw-bold">
                  Credits Left ({Math.max(remainingCredits, 0)}/
                  {totalCredits > 0 ? totalCredits : 0})
                </h5>
                {remainingCredits < 0 && (
                  <p className="text-danger">You have exceeded your credits!</p>
                )}
                <button
                  className="btn w-50 mt-2"
                  style={{
                    backgroundColor: "#2A6310",
                    color: "white",
                    borderRadius: "30px",
                  }}
                  onMouseEnter={(e) => (
                    (e.currentTarget.style.backgroundColor = "white"),
                    (e.currentTarget.style.color = "black"),
                    (e.currentTarget.style.border = "1px solid black")
                  )}
                  onMouseLeave={(e) => (
                    (e.currentTarget.style.backgroundColor = "#2A6310"),
                    (e.currentTarget.style.color = "white"),
                    (e.currentTarget.style.border = "none")
                  )}
                  onClick={() => push("/cart")}
                >
                  Buy Credits
                </button>
              </div>
            </div>

            <div className="col-lg-12">
              <div
                className="p-3 m-1 bg-white mb-4 text-center"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  borderRadius: "20px",
                }}
              >
                <h5 className="fw-bold">Upgrade Plan</h5>
                {getUserPlanUpgradeOptions().length > 0 ? (
                  getUserPlanUpgradeOptions().map((plan) => (
                    <button
                      key={plan.name}
                      // className="btn w-50 mt-2"
                      className="btn mt-2 d-block mx-auto w-50"
                      style={{
                        backgroundColor: "#2A6310",
                        color: "white",
                        borderRadius: "30px",
                      }}
                      onMouseEnter={(e) => (
                        (e.currentTarget.style.backgroundColor = "white"),
                        (e.currentTarget.style.color = "black"),
                        (e.currentTarget.style.border = "1px solid black")
                      )}
                      onMouseLeave={(e) => (
                        (e.currentTarget.style.backgroundColor = "#2A6310"),
                        (e.currentTarget.style.color = "white"),
                        (e.currentTarget.style.border = "none")
                      )}
                      onClick={() => push(`/cart?plan=${plan.value}`)}
                    >
                      Upgrade to {plan.name}
                    </button>
                  ))
                ) : (
                  <p>No upgrades available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to show community members */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header
          style={{ backgroundColor: "#f0a500", color: "white" }}
          closeButton
        >
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <p className="mb-0 fw-bold text-capitalize px-2">
                      {user.name}
                    </p>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardSection;
