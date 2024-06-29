"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useGetJobsQuery, usePostApplyJobMutation } from "@/store/global-store/global.query";
import { formatDateAgo } from "@/utils/formateDate";
import Swal from "sweetalert2";

const Jobsappliedjob = () => {
  const { data: jobsData, isLoading, isError } = useGetJobsQuery();
  const [applyJob, { isLoading: isApplying }] = usePostApplyJobMutation(); 

  // Local state to manage loading state for each job
  const [loadingJobs, setLoadingJobs] = useState<string[]>([]); 

  const handleApplyJob = async (jobId: string) => {
    try {
      setLoadingJobs([...loadingJobs, jobId]);
      const { data } = await applyJob({ job_id: jobId }); 
      if (data?.success) {
        // Show success SweetAlert
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Job applied successfully!",
        });
        console.log("Job applied successfully!");
      }
    } catch (error) {
      console.error("Error applying job:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to apply for the job.",
      });
    } finally {
      // Remove jobId from loadingJobs to reset loading state
      setLoadingJobs(loadingJobs.filter(id => id !== jobId));
    }
  };

  return (
    <>
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <div className="col-xl-12 col-lg-12 m-b30 browse-job">
                  <div className="job-bx-title  clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">
                      {jobsData?.data.length} Jobs Found
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
                    {jobsData?.data?.map((item, index) => (
                      <li key={index}>
                        <div className="post-bx">
                          <div className="job-post-info m-a0">
                            <h4>
                              <Link href={"/job-detail"}>
                                {item?.job_title}
                              </Link>
                            </h4>
                            <ul>
                              <li>
                                <Link href={"/company-profile"}>
                                  {item?.company_name}
                                </Link>
                              </li>
                              <li>
                                <i className="fa fa-map-marker"></i>{" "}
                                {item?.location?.title}
                              </li>
                              <li>
                                <i className="fa fa-money"></i> 45,000
                              </li>
                            </ul>
                            <div className="job-time m-t15 m-b10">
                              <Link href={""} className="mr-1">
                                <span>React</span>
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
                                <span className="text-black m-r10">
                                  Posted:
                                </span>{" "}
                                {formatDateAgo(item?.created_at)}
                              </p>
                              <button
                                onClick={() => handleApplyJob(item?.id.toString())} 
                                className="site-button button-sm float-right"
                                disabled={loadingJobs.includes(item?.id.toString())}
                              >
                                {loadingJobs.includes(item?.id.toString()) ? "Applying..." : "Apply Job"}
                              </button>
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
    </>
  );
};

export default Jobsappliedjob;
