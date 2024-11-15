"use client";
import React, { useEffect, useState } from "react";
import SavedJobs from "@/markup/Element/SavedJobs";
import Link from "next/link";
import Image from "next/image";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import { useGetDesignationQuery } from "@/store/global-store/global.query";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
var teamImg = require("../../images/team/pic1.jpg");
import { useLogoutMutation } from "@/app/login/store/login.query";
import { useAuthToken } from "@/hooks/useAuthToken";
import { navigateSource } from "@/lib/action";
import Swal from "sweetalert2";
import profileIcon from "../../images/favicon.png";


const JobSavedSection = () => {
  const { user, refetch } = useLoggedInUser();
  const { data: designationData } = useGetDesignationQuery();
  const [designationOptions, setDesignationOptions] = useState<any[]>([]);
  const [designationLabel, setDesignationLabel] = useState<string>("");
  const [logout] = useLogoutMutation();
  const { removeToken } = useAuthToken();

  useEffect(() => {
    // Map designation options
    if (designationData?.data) {
      const options = designationData.data.map((designation: any) => ({
        value: designation.title,
        label: designation.title,
        id: designation.id.toString(),
      }));
      setDesignationOptions(options);
    }
  }, [designationData, refetch]);

  useEffect(() => {
    if (user && user?.user?.designation_id !== null) {
      // Only proceed if user and designation_id are not null
      const designationId = user.user.designation_id.toString();
      const designation = designationOptions.find(
        (option) => option.id === designationId
      );
      if (designation) {
        setDesignationLabel(designation.label);
      } else {
        setDesignationLabel("Designation not found");
      }
    } else {
      setDesignationLabel("Designation not available");
    }
  }, [user, designationOptions, refetch]);

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
    <>
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4 m-b30">
                  <div className="sticky-top">
                    <div className="candidate-info">
                      <div className="candidate-detail text-center">
                        <div className="canditate-des">
                        {user?.user?.image ? (
                            <Image
                              src={`${IMAGE_URL + user?.user?.image}`}
                              alt="profile picture"
                              width={300}
                              height={300}
                              onError={(e) =>
                                (e.currentTarget.src =
                                  "../../images/favicon.png")
                              } // Fallback image
                              style={{ borderRadius: "50%" }}
                            />
                          ) : (
                            <Image
                              src={profileIcon}
                              alt="profile picture"
                              width={300}
                              height={300}
                              onError={(e) =>
                                (e.currentTarget.src =
                                  "../../images/favicon.png")
                              } // Fallback image
                              style={{ borderRadius: "50%" }}
                            />
                          )}
                        </div>
                        <div className="candidate-title">
                          <div className="">
                            <h4 className="m-b5">
                              <Link href={"#"}>
                                {user?.user?.name || "User Name"}
                              </Link>
                            </h4>
                            <p className="m-b0">
                              <Link href={"#"}>
                                {designationLabel || "Not available"}
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <Link href="/dashboard-section">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <span>Dashboard</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/job-seeker">
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/my-resume">
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            <span>My Resume</span>
                          </Link>
                        </li>

                        <li>
                          <Link href="/saved-jobs" className="active">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <span>Saved Jobs</span>
                          </Link>
                        </li>

                        <li>
                          <Link href="/applied-job">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <span>Applied Jobs</span>
                          </Link>
                        </li>

                        <li>
                          <Link href="/job-alert">
                            <i className="fa fa-bell-o" aria-hidden="true"></i>
                            <span>Job Alerts</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/switch-plan">
                            <i className="fa fa-money" aria-hidden="true"></i>
                            Switch Plan
                          </Link>
                        </li>
                        {user?.user?.role === "job_poster" ? (
                              <li>
                              <Link href="/transaction">
                                <i
                                  className="fa fa-file-text-o"
                                  aria-hidden="true"
                                ></i>
                                <span>Coins and voucher</span>
                              </Link>
                            </li>
                            ):(
                              <li>
                              <Link href="/transaction">
                                <i
                                  className="fa fa-file-text-o"
                                  aria-hidden="true"
                                ></i>
                                <span>Billing</span>
                              </Link>
                            </li>
                            )}
                        {/* <li>
                          <Link href="/analytics-and-report">
                            <i
                              className="fa fa-bar-chart"
                              aria-hidden="true"
                            ></i>
                            <span>Analytics & Report</span>
                          </Link>
                        </li> */}
                        <li>
                          <Link href="/account-setting">
                            <i className="fa fa-cog" aria-hidden="true"></i>
                            <span>Account Setting</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/support">
                            <i
                              className="fa fa-life-ring"
                              aria-hidden="true"
                            ></i>
                            <span>Support</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="#" onClick={handleLogout}>
                            <i
                              className="fa fa-sign-out"
                              aria-hidden="true"
                            ></i>
                            <span>Log Out</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <SavedJobs />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSavedSection;
