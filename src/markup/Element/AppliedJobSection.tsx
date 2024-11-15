"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  useGetAppliedJobsQuery,
  useDeleteAppliedJobMutation,
} from "@/store/global-store/global.query";
import { useGetDesignationQuery } from "@/store/global-store/global.query";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useLogoutMutation } from "@/app/login/store/login.query";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useRouter } from "next/navigation";
import profileIcon from "../../images/favicon.png";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import { formatDateAgo } from "@/utils/formateDate";
import Pagination from "./Pagination"; // Pagination component import
import { navigateSource } from "@/lib/action";

const MySwal = withReactContent(Swal);

const AppliedJobSection = () => {
  const { data: appliedJob, refetch } = useGetAppliedJobsQuery();
  const [deleteAppliedJob] = useDeleteAppliedJobMutation();
  const { user } = useLoggedInUser();
  const { data: designationData } = useGetDesignationQuery();
  const [logout] = useLogoutMutation();
  const { removeToken } = useAuthToken();
  const [designationOptions, setDesignationOptions] = useState<any[]>([]);
  const [designationLabel, setDesignationLabel] = useState<string>("");
  const { push } = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    if (designationData?.data) {
      const options = designationData.data.map((designation: any) => ({
        value: designation.title,
        label: designation.title,
        id: designation.id.toString(),
      }));
      setDesignationOptions(options);
    }
  }, [designationData]);

  useEffect(() => {
    if (user && user?.user?.designation_id !== null) {
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
  }, [user, designationOptions]);

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

  const handleDeleteJob = async (jobId: string) => {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteAppliedJob(jobId).unwrap();
        MySwal.fire("Deleted!", "Your job has been deleted.", "success");
        refetch();
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      MySwal.fire("Error!", "Failed to delete the job.", "error");
    }
  };

  const viewJobHandler = (id: number) => {
    push(`/job-detail?jobId=${id}`);
  };

  // Pagination logic
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = appliedJob?.data?.slice(indexOfFirstJob, indexOfLastJob);
  const totalJobs = appliedJob?.data?.length || 0;

  return (
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
                        <Link href={"/job-seeker"}>
                          <i className="fa fa-user-o" aria-hidden="true"></i>
                          <span>Profile</span>
                        </Link>
                      </li>
                      <li>
                        <Link href={"/jobs-my-resume"}>
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
                        <Link href={"/applied-job"} className="active">
                          <i className="fa fa-briefcase" aria-hidden="true"></i>
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
                        <Link href={"/switch-plan"}>
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
                        <Link href={"#"} onClick={handleLogout}>
                          <i className="fa fa-sign-out" aria-hidden="true"></i>
                          <span>Log Out</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-8 m-b30 browse-job">
                <div className="job-bx-title clearfix">
                  <h5 className="font-weight-700 pull-left text-uppercase">
                    {totalJobs} Jobs Found
                  </h5>
                </div>

                {totalJobs === 0 ? (
                   <div  style={{ display :"flex", justifyContent:"center"}}>
                     No applied job available
                   </div>
                ) : (
                  <ul className="post-job-bx browse-job">
                    {currentJobs?.map((item: any, index: number) => (
                      <li key={index}>
                        <div className="post-bx">
                          <div className="job-post-info m-a0">
                            <h4>
                              <Link href="/job-detail">{item?.job_title}</Link>
                            </h4>
                            <ul>
                              <li>
                                <Link href="/company-profile">
                                  {item?.company_name}
                                </Link>
                              </li>
                              <li>
                                <i className="fa fa-map-marker"></i>{" "}
                                {item?.address}
                              </li>
                              <li>
                                <i className="fa fa-money"></i> {item?.ctc}{" "}
                                lakhs
                              </li>
                            </ul>
                            <div className="job-time m-t15 m-b10">
                              {item?.tags
                                ?.split(",")
                                .map((tag: string, index: number) => (
                                  <Link href="#" key={index} className="mr-1">
                                    <span>{tag}</span>
                                  </Link>
                                ))}
                            </div>
                            <div className="posted-info clearfix">
                              <p className="m-tb0 text-primary float-left">
                                <span className="text-black m-r10">
                                  Posted:
                                </span>{" "}
                                {formatDateAgo(item?.created_at)}
                              </p>
                              <div className="float-right">
                                <button
                                  className="site-button button-sm mr-2"
                                  onClick={() => viewJobHandler(item?.id)}
                                >
                                  <i className="fa fa-eye"></i>
                                </button>
                                <button
                                  className="site-button button-sm"
                                  onClick={() => handleDeleteJob(item?.id)}
                                >
                                  <i className="ti-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {totalJobs > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalJobs}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobSection;
