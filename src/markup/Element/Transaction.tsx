"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import Image from "next/image";
import { useGetDesignationQuery } from "@/store/global-store/global.query";
import { useLogoutMutation } from "@/app/login/store/login.query";
import { useAuthToken } from "@/hooks/useAuthToken";
import { navigateSource } from "@/lib/action";
import profileIcon from "../../images/favicon.png";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation'

const Transaction = () => {
  const router = useRouter();
  const { user, refetch } = useLoggedInUser();
  const { removeToken } = useAuthToken();
  const [company, setCompany] = useState<boolean>(false);
  const { data: designationData } = useGetDesignationQuery(); // Fetch designation data
  const [logout] = useLogoutMutation();
  const [designationOptions, setDesignationOptions] = useState<any[]>([]);
  const [designationLabel, setDesignationLabel] = useState<string>("");

  const dummyData = [
    {
      id: 1,
      description: "Credit for job post: Social Media Expert",
      credit: 100,
      date: "2023-07-01",
      status: "Credited",
    },
    {
      id: 2,
      description: "Debit for job application: Web Designer",
      credit: -50,
      date: "2023-07-05",
      status: "Debited",
    },
    {
      id: 3,
      description: "Credit for job post: Finance Accountant",
      credit: 200,
      date: "2023-07-10",
      status: "Credited",
    },
    {
      id: 4,
      description: "Debit for job application: Social Media Expert",
      credit: -30,
      date: "2023-07-15",
      status: "Debited",
    },
    {
      id: 5,
      description: "Credit for job post: Web Designer",
      credit: 150,
      date: "2023-07-20",
      status: "Credited",
    },
  ];

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
    if (user && user.user?.designation_id !== null) {
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
                          <Link href={"/job-poster"}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Profile</span>
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
                          <Link href={"/cv-manager"} >
                            <i
                              className="fa fa-id-card-o"
                              aria-hidden="true"
                            ></i>
                            <span>CV Manager</span>
                          </Link>
                        </li>
                        <li>
                          <Link href={"/transaction"} className="active">
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
                        TRANSACTIONS
                      </h5>
                      <div className="float-right">
                        <span className="select-title">Sort by freshness</span>
                        <select className="custom-btn">
                          <option>All</option>
                          <option>None</option>
                          <option>Read</option>
                          <option>Unread</option>
                          <option>Starred</option>
                          <option>Unstarred</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <h3>
                        <span style={{ color: "blue" }}>6700</span>{" "}
                        Transactions
                      </h3>
                    </div>
                    <table className="table-job-bx cv-manager company-manage-job">
                      <thead>
                        <tr>
                          <th className="feature">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                id="check12"
                                className="custom-control-input selectAllCheckBox"
                                name="example1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="check12"
                              ></label>
                            </div>
                          </th>
                          <th>Description</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyData.map((item) => (
                          <tr key={item.id}>
                            <td className="feature">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={`check${item.id}`}
                                  name="example1"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={`check${item.id}`}
                                ></label>
                              </div>
                            </td>
                            <td className="job-name">
                              <Link href={"#"}>{item.description}</Link>
                            </td>
                            <td className={`application ${item.credit < 0 ? 'text-red' : 'text-primary'}`}>
                            {item.credit} {item.credit < 0 ? 'Debited' : 'Credits'}
                            </td>
                            <td className={`application ${item.credit < 0 ? 'text-red' : 'text-primary'}`}>
                              {item.status}
                            </td>
                            <td className="expired pending">{item.date} </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="pagination-bx m-t30 float-right">
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

                    <Modal
                      show={company}
                      onHide={setCompany}
                      className="modal fade modal-bx-info"
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="logo-img">
                              <img
                                alt=""
                                src={require("./../../images/logo/icon2.png")}
                              />
                            </div>
                            <h5 className="modal-title">Company Name</h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setCompany(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul>
                              <li>
                                <strong>Job Title :</strong>
                                <p> Web Developer – PHP, HTML, CSS </p>
                              </li>
                              <li>
                                <strong>Experience :</strong>
                                <p>5 Year 3 Months</p>
                              </li>
                              <li>
                                <strong>Description :</strong>
                                <p>
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry has been the
                                  industry's standard dummy text ever since.
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setCompany(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
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
export default Transaction;
