
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Image from "next/image";

import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import {   useGetBillingQuery,
  useGetSubscriptionQuery } from "@/store/global-store/global.query";
import { useAuthToken } from "@/hooks/useAuthToken";
import { navigateSource } from "@/lib/action";
import { useLogoutMutation } from "@/app/login/store/login.query";
import Loading from "@/components/Loading";
import profileIcon from "../../images/favicon.png";
import { IMAGE_URL } from "@/lib/apiEndPoints";

const AccountSetting = () => {

  const { data: getBilling, isLoading: getBillingLoading } = useGetBillingQuery({});
  const { data: getSubscription, isLoading: getSubscriptionLoading } = useGetSubscriptionQuery({});
  

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
        Swal.fire("Logout failed", "Failed to log out. Please try again.", "error");
      }
    }
  };

  return (
    <>
      {getBillingLoading && getSubscriptionLoading  && <Loading />}                            
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
                          <Link href="/job-poster-dashboard">
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
                            <span>Create new job</span>
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
                          <Link href="/analytics-and-report">
                            <i
                              className="fa fa-bar-chart"
                              aria-hidden="true"
                            ></i>
                            <span>Analytics & Report</span>
                          </Link>
                        </li>
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
                        <h5>Coming soon</h5>
                  
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
