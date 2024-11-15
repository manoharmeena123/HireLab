"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Image from "next/image";

import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import {
  useGetBillingQuery,
  useGetSubscriptionQuery,
  useMakeUserPrivateMutation,
  useMakeUserPublicMutation,
  useMakeUserActivateMutation,
  useMakeUserDeactivateMutation,
} from "@/store/global-store/global.query";
import { useAuthToken } from "@/hooks/useAuthToken";
import { navigateSource } from "@/lib/action";
import { useLogoutMutation } from "@/app/login/store/login.query";
import Loading from "@/components/Loading";
import profileIcon from "../../images/favicon.png";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import styles from "@/styles/AccountSetting.module.css";
import { useGetDesignationQuery } from "@/store/global-store/global.query";

const AccountSetting = () => {
  const { data: getBilling, isLoading: getBillingLoading } = useGetBillingQuery(
    {}
  );
  const { data: getSubscription, isLoading: getSubscriptionLoading } =
    useGetSubscriptionQuery({});

  // Use mutations instead of queries for actions
  const [makeUserPrivate, { isLoading: makeUserPrivateLoading }] =
    useMakeUserPrivateMutation();
  const [makeUserPublic, { isLoading: makeUserPublicLoading }] =
    useMakeUserPublicMutation();
  const [makeUserActivate, { isLoading: makeUserActivateLoading }] =
    useMakeUserActivateMutation();
  const [makeUserDeactivate, { isLoading: makeUserDeactivateLoading }] =
    useMakeUserDeactivateMutation();

  const [logout] = useLogoutMutation();
  const { removeToken } = useAuthToken();
  const { user, refetch } = useLoggedInUser();

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
  // Handlers for Privacy Settings
const handleMakePrivate = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You are about to make your profile private.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, make it private!",
    cancelButtonText: "No, keep it public"
  });

  if (result.isConfirmed) {
    try {
      const response = await makeUserPrivate({}).unwrap();
      Swal.fire("Success", response.message, "success");
      refetch(); // Refresh user data
    } catch (error) {
      Swal.fire("Error", "Failed to make profile private.", "error");
    }
  }
};

const handleMakePublic = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You are about to make your profile public.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, make it public!",
    cancelButtonText: "No, keep it private"
  });

  if (result.isConfirmed) {
    try {
      const response = await makeUserPublic({}).unwrap();
      Swal.fire("Success", response.message, "success");
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to make profile public.", "error");
    }
  }
};

const handleActivate = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You are about to activate your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, activate!",
    cancelButtonText: "No, keep it deactivated"
  });

  if (result.isConfirmed) {
    try {
      const response = await makeUserActivate({}).unwrap();
      Swal.fire("Success", response.message, "success");
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to activate account.", "error");
    }
  }
};

const handleDeactivate = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You are about to deactivate your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, deactivate!",
    cancelButtonText: "No, keep it active"
  });

  if (result.isConfirmed) {
    try {
      const response = await makeUserDeactivate({}).unwrap();
      Swal.fire("Success", response.message, "success");
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to deactivate account.", "error");
    }
  }
};
const [designationOptions, setDesignationOptions] = useState<any[]>([]);
const [designationLabel, setDesignationLabel] = useState<string>("");
useEffect(() => {
  if (user && user.user?.designation_id !== null) {
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

  return (
    <>
      {getBillingLoading && getSubscriptionLoading && <Loading />}
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
                                (e.currentTarget.src =
                                  "../../images/favicon.png")
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
                                (e.currentTarget.src =
                                  "../../images/favicon.png")
                              }
                              style={{ borderRadius: "50%" }}
                            />
                          )}
                        </div>
                        <div className="candidate-title">
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
                      <ul>
                        {user?.user?.role === "job_poster" ? (
                          <>
                            <li>
                              <Link href="/job-poster-dashboard">
                                <i
                                  className="fa fa-heart-o"
                                  aria-hidden="true"
                                ></i>
                                <span>Dashboard</span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/job-poster">
                                <i
                                  className="fa fa-user-o"
                                  aria-hidden="true"
                                ></i>
                                <span>Profile</span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/post-job">
                                <i
                                  className="fa fa-file-text-o"
                                  aria-hidden="true"
                                ></i>
                                <span>Create New Job</span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/manage-job">
                                <i className="fa fa-cog" aria-hidden="true"></i>
                                <span>Manage Jobs</span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/cv-manager">
                                <i
                                  className="fa fa-id-card-o"
                                  aria-hidden="true"
                                ></i>
                                <span>CV Manager</span>
                              </Link>
                            </li>
                            {/* <li>
                              <Link href="/switch-plan">
                                <i
                                  className="fa fa-money"
                                  aria-hidden="true"
                                ></i>
                                <span>Switch Plan</span>
                              </Link>
                            </li> */}
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
                            
                          </>
                        ) : (
                          <>
                            <li>
                              <Link href="/dashboard-section">
                                <i
                                  className="fa fa-heart-o"
                                  aria-hidden="true"
                                ></i>
                                <span>Dashboard</span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/job-seeker">
                                <i
                                  className="fa fa-user-o"
                                  aria-hidden="true"
                                ></i>
                                <span>Profile</span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/jobs-my-resume">
                                <i
                                  className="fa fa-file-text-o"
                                  aria-hidden="true"
                                ></i>
                                <span>My Resume</span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/saved-jobs">
                                <i
                                  className="fa fa-heart-o"
                                  aria-hidden="true"
                                ></i>
                                <span>Saved Jobs</span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/applied-job">
                                <i
                                  className="fa fa-briefcase"
                                  aria-hidden="true"
                                ></i>
                                <span>Applied Jobs</span>
                              </Link>
                            </li>
                            <li>
                              <Link href="/job-alert">
                                <i
                                  className="fa fa-bell-o"
                                  aria-hidden="true"
                                ></i>
                                <span>Job Alerts</span>
                              </Link>
                            </li>
                            {/* <li>
                              <Link href="/switch-plan">
                                <i
                                  className="fa fa-money"
                                  aria-hidden="true"
                                ></i>
                                <span>Switch Plan</span>
                              </Link>
                            </li> */}
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
                          </>
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
                          <Link href="/account-setting" className="active">
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
                  <div className="job-bx browse-job clearfix">
                    <div className="job-bx-title clearfix">
                      <div className="row">
                        <div className="col-lg-12 mb-2">
                          <h5 className="font-weight-700 pull-left text-uppercase">
                            Welcome,{user?.user?.name || "User Name"}
                          </h5>
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
                    {/* Subscription and Billing Details */}
                    <div className={styles.contentSection}>
                      {/* <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className={styles.card}>
                            <h4 className={styles.cardTitle}>
                              Current Subscription Plan
                            </h4>
                            {getSubscription?.data ? (
                              <div>
                                <h5>{getSubscription.data.title}</h5>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: getSubscription.data.description,
                                  }}
                                ></div>
                                <p>
                                  <strong>Monthly Price:</strong>{" "}
                                  {getSubscription.data.monthly_price}
                                </p>
                                <p>
                                  <strong>Quarterly Price:</strong>{" "}
                                  {getSubscription.data.quarterly_price}
                                </p>
                                <Link
                                  href="/switch-plan"
                                  className={styles.getstartedbtn}
                                >
                                  Manage Subscription
                                </Link>
                              </div>
                            ) : (
                              <p>Loading subscription details...</p>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6 mb-4">
                          {/* Additional Features */}
                          {/* <div className={styles.card}>
                            <h4 className={styles.cardTitle}>
                              Additional Benefits
                            </h4>
                            {getSubscription?.data ? (
                              <ul className={styles.benefitsList}>
                                <li>
                                  <i
                                    className={`fa ${
                                      getSubscription.data
                                        .job_listing_CTC_based === "optional"
                                        ? "fa-check-circle"
                                        : "fa-times-circle"
                                    }`}
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Job Listing CTC Based:{" "}
                                  {getSubscription.data
                                    .job_listing_CTC_based === "optional"
                                    ? "Available"
                                    : "Not Available"}
                                </li>
                                <li>
                                  <i
                                    className={`fa ${
                                      getSubscription.data
                                        .priority_application === "yes"
                                        ? "fa-check-circle"
                                        : "fa-times-circle"
                                    }`}
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Priority Application:{" "}
                                  {getSubscription.data.priority_application ===
                                  "yes"
                                    ? "Available"
                                    : "Not Available"}
                                </li>
                                <li>
                                  <i
                                    className={`fa ${
                                      getSubscription.data
                                        .resume_and_cover_letter_reviews ===
                                      "yes"
                                        ? "fa-check-circle"
                                        : "fa-times-circle"
                                    }`}
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Resume and Cover Letter Reviews:{" "}
                                  {getSubscription.data
                                    .resume_and_cover_letter_reviews === "yes"
                                    ? "Available"
                                    : "Not Available"}
                                </li>
                                <li>
                                  <i
                                    className={`fa ${
                                      getSubscription.data
                                        .city_meetups_and_events === "yes"
                                        ? "fa-check-circle"
                                        : "fa-times-circle"
                                    }`}
                                    aria-hidden="true"
                                  ></i>{" "}
                                  City Meetups and Events:{" "}
                                  {getSubscription.data
                                    .city_meetups_and_events === "yes"
                                    ? "Available"
                                    : "Not Available"}
                                </li>
                              </ul>
                            ) : (
                              <p>Loading additional benefits...</p>
                            )}
                          </div>
                          <div className={styles.card}>
                            <h4 className={styles.cardTitle}>
                              Billing Information
                            </h4>
                            {getBilling?.data ? (
                              <div>
                                <p>
                                  <strong>Name:</strong> {getBilling.data.name}
                                </p>
                                <p>
                                  <strong>Status:</strong>{" "}
                                  {getBilling.data.status}
                                </p>
                                <p>
                                  <strong>Amount Paid:</strong> ₹
                                  {(
                                    parseFloat(getBilling.data.amount) / 100
                                  ).toFixed(2)}
                                </p>
                                <Link
                                  href="/transaction"
                                  className={styles.getstartedbtn}
                                >
                                  View Transaction History
                                </Link>
                              </div>
                            ) : (
                              <p>Loading billing information...</p>
                            )}
                          </div>{" "} */}
                        {/* </div> */}
                      {/* </div> */} 

                      {/* Privacy Settings */}
                      <div className={styles.card}>
                        <h4 className={styles.cardTitle}>Privacy Settings</h4>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <p>
                              <strong>Profile Visibility:</strong>{" "}
                              {user?.user?.is_public === "1"
                                ? "Public"
                                : "Private"}
                            </p>
                            {user?.user?.is_public === "1" ? (
                              <button
                                className="btn btn-warning"
                                onClick={handleMakePrivate}
                              >
                                Make Profile Private
                              </button>
                            ) : (
                              <button
                                className="btn btn-success"
                                onClick={handleMakePublic}
                              >
                                Make Profile Public
                              </button>
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <p>
                              <strong>Account Status:</strong>{" "}
                              {user?.user?.status === "1"
                                ? "Active"
                                : "Inactive"}
                            </p>
                            {user?.user?.status === "1" ? (
                              <button
                                className="btn btn-danger"
                                onClick={handleDeactivate}
                              >
                                Deactivate Account
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary"
                                onClick={handleActivate}
                              >
                                Activate Account
                              </button>
                            )}
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

export default AccountSetting;
