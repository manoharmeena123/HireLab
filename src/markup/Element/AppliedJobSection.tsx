"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/app/layouts/Header";
import Footer from "@/app/layouts/Footer";
import { useGetAppliedJobsQuery } from "@/store/global-store/global.query";
import { formatDateAgo } from "@/utils/formateDate";
import { useGetDesignationQuery } from "@/store/global-store/global.query";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useLogoutMutation } from "@/app/login/store/login.query";
import { useAuthToken } from "@/hooks/useAuthToken";
import { navigateSource } from "@/lib/action";

const AppliedJobSection = () => {
  const { data: appliedJob, isLoading } = useGetAppliedJobsQuery();
  console.log("appliedJob", appliedJob);
  const { user, refetch } = useLoggedInUser();
  const { data: designationData } = useGetDesignationQuery(); 
  const [logout] = useLogoutMutation();
  const { removeToken } = useAuthToken();
  const [designationOptions, setDesignationOptions] = useState<any[]>([]);
  const [designationLabel, setDesignationLabel] = useState<string>("");

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
    try {
      await logout().unwrap();
      removeToken();
      navigateSource("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
                        <Link href={"#"}>
                          <Image
                         src={`http://thinkdream.in/hirelab/public/images/${user?.user?.image}`}
                            alt="Company Logo"
                            width={300}
                            height={300}
                          />
                        </Link>
                        {/* <div
                          className="upload-link"
                          title="update"
                          data-toggle="tooltip"
                          data-placement="right"
                        >
                          <input type="file" className="update-flie" />
                          <i className="fa fa-camera"></i>
                        </div> */}
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
                        <Link href={"/jobs-cv-manager"}>
                          <i className="fa fa-id-card-o" aria-hidden="true"></i>
                          <span>CV Manager</span>
                        </Link>
                      </li>
                      <li>
                        <Link href={"./"} onClick={handleLogout}>
                          <i className="fa fa-sign-out" aria-hidden="true"></i>
                          <span>Log Out</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-8 m-b30 browse-job">
                <div className="job-bx-title  clearfix">
                  <h5 className="font-weight-700 pull-left text-uppercase">
                    {appliedJob?.data?.length} Jobs Found
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
                <ul className="post-job-bx browse-job">
                  {appliedJob?.data?.map((item: any, index: number) => (
                    <li key={index}>
                      <div className="post-bx">
                        <div className="job-post-info m-a0">
                          <h4>
                            <Link href={"/job-detail"}>
                              {item?.company_name}
                            </Link>
                          </h4>
                          <ul>
                            <li>
                              <Link href={"/company-profile"}>
                                @company-name
                              </Link>
                            </li>
                            <li>
                              <i className="fa fa-map-marker"></i>{" "}
                              {item?.address}
                            </li>
                            <li>
                              <i className="fa fa-money"></i> {item?.ctc}
                            </li>
                          </ul>
                          <div className="job-time m-t15 m-b10">
                            <Link href={""} className="mr-1">
                              <span>PHP</span>
                            </Link>
                            <Link href={""} className="mr-1">
                              <span>Angular</span>
                            </Link>
                            <Link href={""} className="mr-1">
                              <span>Bootstrap</span>
                            </Link>
                            <Link href={""} className="mr-1">
                              <span>Wordpress</span>
                            </Link>
                          </div>
                          <div className="posted-info clearfix">
                            <p className="m-tb0 text-primary float-left">
                              <span className="text-black m-r10">Posted:</span>{" "}
                              {formatDateAgo(item?.created_at)}
                            </p>
                            <Link
                              href={"/jobs-my-resume"}
                              className="site-button button-sm float-right"
                            >
                              <i className="fa fa-eye"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="pagination-bx m-t30">
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
  );
};
export default AppliedJobSection;
