"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Image from "next/image";
import {
  useGetManageJobQuery,
  useDeleteManageJobMutation,
  useUpdateManageJobMutation,
  useGetJobUserMutation,
} from "@/app/manage-job/store/manage-job.query";
import {
  useAcceptJobCandidateMutation,
  useRejectJobCandidateMutation,
} from "@/app/my-resume/store/resume.query";
import { JobData } from "@/app/manage-job/types/index";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useGetDesignationQuery } from "@/store/global-store/global.query";
import { useAuthToken } from "@/hooks/useAuthToken";
import { navigateSource } from "@/lib/action";
import { useLogoutMutation } from "@/app/login/store/login.query";
import Loading from "@/components/Loading";
import profileIcon from "../../images/favicon.png";
import { IMAGE_URL } from "@/lib/apiEndPoints";

const JobPosterDashboard = () => {
  const { push } = useRouter();
  const router = useRouter();

  const {
    data: jobsData,
    isLoading: jobsLoading,
    refetch: manageRefetch,
  } = useGetManageJobQuery();
  const [logout] = useLogoutMutation();
  const { removeToken } = useAuthToken();
  const [deleteManageJob] = useDeleteManageJobMutation();
  const [updatePostJob] = useUpdateManageJobMutation();
  const { user, refetch } = useLoggedInUser();
  const [totalJobsPosted, setTotalJobsPosted] = useState(0);
  const [activeListings, setActiveListings] = useState(0);
  const [applicationsReceived, setApplicationsReceived] = useState(0);
  const [pendingApplications, setPendingApplications] = useState(0);

  useEffect(() => {
    if (jobsData) {
      setTotalJobsPosted(user?.total_job_posted || 0);
      setActiveListings(user?.active_listing || 0);
      setApplicationsReceived(user?.application_recived || 0);
      setPendingApplications(user?.pendingApplication || 0);
    }
  }, [jobsData]);

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
        Swal.fire("Logout failed", "Failed to log out. Please try again.", "error");
      }
    }
  };

  return (
    <>
      {jobsLoading && <Loading />}
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4 m-b30">
                  <div className="sticky-top">
                    <div className="candidate-info company-info">
                      <div className="candidate-detail text-center">
                        <div className="canditate-des">
                          {user?.user?.image ? (
                            <Image
                              src={`${IMAGE_URL + user?.user?.image}`}
                              alt="profile picture"
                              width={300}
                              height={300}
                              onError={(e) =>
                                (e.currentTarget.src = "../../images/favicon.png")
                              }
                              style={{ borderRadius: "50%" }}
                            />
                          ) : (
                            <Image
                              src={profileIcon}
                              alt="profile picture"
                              width={300}
                              height={300}
                              onError={(e) =>
                                (e.currentTarget.src = "../../images/favicon.png")
                              }
                              style={{ borderRadius: "50%" }}
                            />
                          )}
                        </div>
                        <div className="candidate-title">
                          <h4 className="m-b5">
                            <Link href={"#"}>{user?.user?.name || "User Name"}</Link>
                          </h4>
                          <p className="m-b0">
                            <Link href={"#"}>{user?.user?.designation || "Not available"}</Link>
                          </p>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <Link href="/job-poster-dashboard" className="active">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <span>Dashboard</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/manage-job">
                            <i className="fa fa-cog" aria-hidden="true"></i>
                            <span>Manage jobs</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/job-poster">
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/post-job">
                            <i className="fa fa-file-text-o" aria-hidden="true"></i>
                            <span>Post A job</span>
                          </Link>
                        </li>
                      
                        <li>
                          <Link href="/cv-manager">
                            <i className="fa fa-id-card-o" aria-hidden="true"></i>
                            CV Manager
                          </Link>
                        </li>
                        <li>
                          <Link href="/switch-plan">
                            <i className="fa fa-money" aria-hidden="true"></i>
                            Switch Plan
                          </Link>
                        </li>
                        <li>
                          <Link href="/transaction">
                            <i className="fa fa-file-text-o" aria-hidden="true"></i>
                            <span>Transaction</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i
                              className="fa fa-bar-chart"
                              aria-hidden="true"
                            ></i>
                            <span>Analytics & Report</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fa fa-cog" aria-hidden="true"></i>
                            <span>Account Setting</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i
                              className="fa fa-life-ring"
                              aria-hidden="true"
                            ></i>
                            <span>Support</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="#" onClick={handleLogout}>
                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                            <span>Log Out</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx browse-job clearfix">
                    <div className="job-bx-title clearfix">
                      <div className="row">
                        <div className="col-lg-12 mb-2">
                        <h5 className="font-weight-700 pull-left text-uppercase">Welcome,{user?.user?.name || "User Name"}</h5>
                          <button
                           onClick={handleLogout}
                            className="site-button right-arrow button-sm float-right mb-1"
                            style={{ fontFamily: "__Inter_Fallback_aaf875" }}
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {/* Total Jobs Posted */}
                      <div className="col-lg-6 col-md-6 mb-2">
                        <div className="card bg-light shadow-sm">
                          <div className="card-body text-center">
                            <h4 className="card-title">Total Jobs Posted</h4>
                            <h2 className="font-weight-bold">{totalJobsPosted}</h2>
                            <p className="text-muted">All the jobs you have posted</p>
                          </div>
                        </div>
                      </div>

                      {/* Active Listings */}
                      <div className="col-lg-6 col-md-6 mb-2">
                        <div className="card bg-light shadow-sm">
                          <div className="card-body text-center">
                            <h4 className="card-title">Active Listings</h4>
                            <h2 className="font-weight-bold">{activeListings}</h2>
                            <p className="text-muted">Currently active job listings</p>
                          </div>
                        </div>
                      </div>

                      {/* Applications Received */}
                      <div className="col-lg-6 col-md-6">
                        <div className="card bg-light shadow-sm">
                          <div className="card-body text-center">
                            <h4 className="card-title">Applications Received</h4>
                            <h2 className="font-weight-bold">{applicationsReceived}</h2>
                            <p className="text-muted">Total applications received</p>
                          </div>
                        </div>
                      </div>

                      {/* Pending Applications */}
                      <div className="col-lg-6 col-md-6">
                        <div className="card bg-light shadow-sm">
                          <div className="card-body text-center">
                            <h4 className="card-title">Pending Applications</h4>
                            <h2 className="font-weight-bold">{pendingApplications}</h2>
                            <p className="text-muted">Applications awaiting review</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pagination or more content can go here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPosterDashboard;
