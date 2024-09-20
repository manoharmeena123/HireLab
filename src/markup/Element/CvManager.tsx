"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import { useLogoutMutation } from "@/app/login/store/login.query";
import { useAuthToken } from "@/hooks/useAuthToken";
import { navigateSource } from "@/lib/action";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import profileIcon from "../../images/favicon.png";
import Image from "next/image";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import { useGetCvManagerQuery } from "@/app/my-resume/store/resume.query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const managerBlog = [
  {
    id: 1,
    image: require("./../../images/testimonials/pic1.jpg"),
    title: "Alexander Weir",
  },
  {
    id: 2,
    image: require("./../../images/testimonials/pic2.jpg"),
    title: "Jennifer Wood",
  },
  {
    id: 3,
    image: require("./../../images/testimonials/pic3.jpg"),
    title: "Melissa Hassib",
  },
  {
    id: 4,
    image: require("./../../images/testimonials/pic1.jpg"),
    title: "Joseph Macfarlan",
  },
  {
    id: 5,
    image: require("./../../images/testimonials/pic2.jpg"),
    title: "Henry Crooks",
  },
  {
    id: 6,
    image: require("./../../images/testimonials/pic3.jpg"),
    title: "James Rogers",
  },
];

const CvManager = () => {
  const { data: cvManagerData } = useGetCvManagerQuery();
  console.log("cvManagerData", cvManagerData);
  const [logout] = useLogoutMutation();
  const { removeToken } = useAuthToken();
  const { user, refetch } = useLoggedInUser();
  const router = useRouter();
  const [contacts, setContacts] = useState(managerBlog);
  // delete data
  const handleDeleteClick = (contactId: any) => {
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setContacts(newContacts);
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
                              <Link href={"#"}>David Matin</Link>
                            </h4>
                            <p className="m-b0">
                              <Link href={"#"}>Web developer</Link>
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
                          <Link href={"/job-seeker"}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/post-job">
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            <span>Post A job</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/job-posted">
                            <i  className="fa fa-briefcase" aria-hidden="true"></i>
                            Job Posted
                          </Link>
                        </li>
                        <li>
                          <Link href={"/my-resume"}>
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            <span>My Resume</span>
                          </Link>
                        </li>
                        <li>
                          <Link href={"/saved-jobs"}>
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <span>Saved Jobs</span>
                          </Link>
                        </li>
                        <li>
                          <Link href={"/applied-job"}>
                            <i
                              className="fa fa-briefcase"
                              aria-hidden="true"
                            ></i>
                            <span>Applied Jobs</span>
                          </Link>
                        </li>
                        <li>
                          <Link href={"/job-alert"}>
                            <i className="fa fa-bell-o" aria-hidden="true"></i>
                            <span>Job Alerts</span>
                          </Link>
                        </li>
                        <li>
                          <Link href={"/cv-manager"} className="active">
                            <i
                              className="fa fa-id-card-o"
                              aria-hidden="true"
                            ></i>
                            <span>CV Manager</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={"/switch-plan"}
                          >
                            <i className="fa fa-money" aria-hidden="true"></i>
                            Switch Plan
                          </Link>
                        </li>
                        <li>
                          <Link href={"/transaction"}>
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            <span>Transaction</span>
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
                          <button
                            onClick={() => router.back()}
                            className="site-button right-arrow button-sm float-right mb-1"
                            style={{ fontFamily: "__Inter_Fallback_aaf875" }}
                          >
                            Back
                          </button>
                        </div>
                      </div>

                      <h5 className="font-weight-700 pull-left text-uppercase">
                        CV Manager
                      </h5>
                      <div className="float-right">
                        <span className="select-title">Sort by freshness</span>
                        <select className="custom-btn">
                          <option>Last 2 Months</option>
                          <option>Last Months</option>
                          <option>Last Weeks</option>
                          <option>Last 3 Days</option>
                        </select>
                      </div>
                    </div>
                    <ul className="cv-manager">
                      {contacts.map((contact, index) => (
                        <li key={index}>
                          <div className="d-flex float-left">
                            <div className="job-post-company">
                              <Link href={"#"}>
                                <span>
                                  <img alt="" src={contact.image} />
                                </span>
                              </Link>
                            </div>
                            <div className="job-post-info">
                              <h6>
                                <Link href={"#"}>{contact.title}</Link>
                              </h6>
                              <ul>
                                <li>
                                  <i className="fa fa-map-marker"></i>{" "}
                                  Sacramento, California
                                </li>
                                <li>
                                  <i className="fa fa-bookmark-o"></i> Full Time
                                </li>
                                <li>
                                  <i className="fa fa-clock-o"></i> 11 days ago
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="job-links action-bx">
                            <Link href={"/files/pdf-sample.pdf"} target="blank">
                              <i className="fa fa-download"></i>
                            </Link>
                            <Link
                              href={"#"}
                              onClick={() => handleDeleteClick(contact.id)}
                            >
                              <i className="ti-trash"></i>
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="pagination-bx float-right">
                      <ul className="pagination">
                        <li className="previous">
                          <Link href={"#"}>
                            <i className="ti-arrow-left"></i> Prev
                          </Link>
                        </li>
                        <li className="active">
                          <Link href={"#"}>1</Link>
                        </li>
                        <li>
                          <Link href={"#"}>2</Link>
                        </li>
                        <li>
                          <Link href={"#"}>3</Link>
                        </li>
                        <li className="next">
                          <Link href={"#"}>
                            Next <i className="ti-arrow-right"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
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
export default CvManager;
