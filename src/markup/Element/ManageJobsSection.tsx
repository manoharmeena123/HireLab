"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Image from "next/image";
import {
  useGetManageJobQuery,
  useDeleteManageJobMutation,
  useUpdateManageJobMutation,
  useGetJobUserMutation
} from "@/app/manage-job/store/manage-job.query";
import { JobData } from "@/app/manage-job/types/index";
import { formatDate } from "@/utils/formateDate";
import ModalPopup from "../../components/ModalPopup";
import { usePostJobMutation } from "@/app/post-job/store/post-job.query";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useGetDesignationQuery } from "@/store/global-store/global.query";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useRouter } from "next/navigation";
import { navigateSource } from "@/lib/action";
import { useLogoutMutation } from "@/app/login/store/login.query";
import Loading from "@/components/Loading";
import profileIcon from "../../images/favicon.png";
import { IMAGE_URL } from "@/lib/apiEndPoints";

const ManageJobs = () => {
  const { push } = useRouter();
  const {
    data: jobsData,
    error: jobsError,
    isLoading: jobsLoading,
    refetch: manageRefetch,
  } = useGetManageJobQuery();
  const [logout] = useLogoutMutation();
  const { removeToken } = useAuthToken();
  const [deleteManageJob] = useDeleteManageJobMutation();
  const [updatePostJob] = useUpdateManageJobMutation();
  const [getJobUser, {data: getJobuser}] = useGetJobUserMutation()
  console.log('getJobuser', getJobuser)
  const { user, refetch } = useLoggedInUser();
  const [company, setCompany] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobData | null>(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteJob = async (jobId: number) => {
    try {
      const res: any = await deleteManageJob(jobId.toString()).unwrap();
      if (res.code === 200) {
        manageRefetch();
        toast.success(res?.message, { theme: "colored" });
      }
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  const flattenedJobsData = jobsData?.data?.flat() || [];


  const handleEditJob = async (selectedJob: any) => {
    try {
      const response = await updatePostJob({ data: selectedJob }).unwrap();
      if (response.code === 200) {
        toast.success("Post Job Edit successfully!", { theme: "colored" });
      } else if (response.code === 401) {
        toast.error(response.message, { theme: "colored" });
      } else if (response.code === 404) {
        console.log("error");
      } else {
        console.error("Unexpected error format:", response);
      }
    } catch (err) {
      console.error("Error posting job:", err);
    }
    setShow(false);
  };

  const { data: designationData } = useGetDesignationQuery();

  const [designationOptions, setDesignationOptions] = useState<any[]>([]);
  const [designationLabel, setDesignationLabel] = useState<string>("");

  useEffect(() => {
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
    try {
      await logout().unwrap();
      removeToken();
      navigateSource("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (jobsLoading) {
    <Loading />;
  }

  const viewJobHandler = (id: number) => {
    push(`/job-edit?jobId=${id}`);
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
                        <li>
                          <Link href="/job-poster">
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>{user?.user?.name} Profile</span>
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
                          <Link href="/credit-earned">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <span>Credit Earned</span>
                          </Link>
                        </li>

                        <li>
                          <Link href="/manage-job" className="active">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <span>Manage Jobs</span>
                          </Link>
                        </li>

                        <li>
                          <Link href="/" onClick={handleLogout}>
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
                <ModalPopup
                  show={show}
                  handleClose={handleClose}
                  title="Edit Job"
                  onSubmit={handleEditJob}
                  selectedJob={selectedJob || null}
                />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx browse-job clearfix">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Manage jobs
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
                          <th>Job Title</th>
                          <th>Location</th>
                          <th>Applications</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {flattenedJobsData?.map((job, index) => (
                          <tr key={index}>
                            <td className="feature">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={`check${index}`}
                                  name="example1"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={`check${index}`}
                                ></label>
                              </div>
                            </td>
                            <td className="job-name">
                              <div
                                className="nav-link"
                                onClick={() => {
                                  setSelectedJob(job);
                                  setCompany(true);
                                }}
                              >
                                <span>{job.job_title}</span>
                                <ul className="job-post-info">
                                  <li>
                                    <i className="fa fa-map-marker"></i>{" "}
                                    {job?.user?.location}
                                  </li>
                                  <li>
                                    <i className="fa fa-bookmark-o"></i>{" "}
                                    {job?.job_type?.title}
                                  </li>
                                  <li>
                                    <i className="fa fa-filter"></i>{" "}
                                    {job?.user?.location}
                                  </li>
                                </ul>
                              </div>
                            </td>
                            <td className="application text-primary">
                              {job?.address}
                            </td>
                            <td className="text-primary">
                              ({job?.applicant_count})Applications
                            </td>
                            <td className="expired pending">
                              {formatDate(job?.created_at)}
                            </td>
                            <td className="job-links">
                              <div
                                className="nav-link mn-icon"
                                onClick={
                                  () => viewJobHandler(job.id)
                                  // setSelectedJob(job);
                                  // setShow(true);
                                }
                              >
                                <i className="fa fa-edit"></i>
                              </div>
                              <div
                                className="nav-link"
                                onClick={() => handleDeleteJob(job?.id)}
                              >
                                <i className="ti-trash"></i>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="pagination-bx m-t30 float-right">
                      <ul className="pagination">
                        <li className="previous">
                          <Link href="#">
                            <div>
                              <i className="ti-arrow-left"></i> Prev
                            </div>
                          </Link>
                        </li>
                        <li className="active">
                          <Link href="#">
                            <div>1</div>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <div>2</div>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <div>3</div>
                          </Link>
                        </li>
                        <li className="next">
                          <Link href="#">
                            <div>
                              Next <i className="ti-arrow-right"></i>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <Modal
                      show={company}
                      onHide={() => setCompany(false)}
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
                            <h5 className="modal-title">
                              {selectedJob?.company_name}
                            </h5>
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
                                <p> {selectedJob?.job_title} </p>
                              </li>
                              <li>
                                <strong>Experience :</strong>
                                <p>{selectedJob?.user?.experience} Years</p>
                              </li>
                              <li>
                                <strong>Description :</strong>
                                <p>{selectedJob?.user?.description}</p>
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

export default ManageJobs;
