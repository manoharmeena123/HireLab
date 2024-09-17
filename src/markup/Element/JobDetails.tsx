"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useGetJobByIdMutation,
  useGetRecentJobsQuery,
} from "@/store/global-store/global.query";
import Link from "next/link";
import Image from "next/image";
import PageTitle from "@/markup/Layout/PageTitle";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";
import { formaterDate } from "@/utils/formateDate";
import JobDetailPopup from "@/components/JobDetailPopup";

var bnr = require("./../../images/banner/bnr1.jpg");

function Jobdetail() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [getJobs, { data: job, error, isLoading }] = useGetJobByIdMutation();

  const { data: recentJob } = useGetRecentJobsQuery();
  console.log(recentJob);
  useEffect(() => {
    if (jobId) {
      console.log("Fetching job details for jobId:", jobId); 
      getJobs(jobId)
        .unwrap()
        .then((response) => {
          console.log("Job details response:", response); 
        })
        .catch((error) => {
          console.error("Error fetching job details:", error); 
        });
    }
  }, [jobId, getJobs]);

  return (
    <>
      {isLoading && <Loading />}
      <JobDetailPopup job={job} show={false} getJobs={getJobs}/>
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full content-inner">
            <div className="container">
              <div className="row recent-job-details p-4">
                {recentJob?.data?.slice(0, 4).map((item, index) => (
                  <div className=" p-0" key={index}>
                    <div className="blog-grid h-100" style={{width:"255px"}}>
                      <div
                        className="dez-info p-a20 border-1 shadow bg-white"
                        style={{ borderRadius: "10px" }}
                      >
                        <div className="dez-post-title ">
                          <h5 className="post-title">
                            {item.job_title}
                          </h5>
                        </div>
                        <div className="dez-post-meta ">
                          <ul>
                            <li className="post-date jd-recent-add">
                              {" "}
                              <i className="ti-location-pin rc-lp"></i>{" "}
                              <span>{item.address} </span>
                            </li>
                            <li className="post-author">
                              <i className="fa fa-bookmark-o" style={{margin:'0 11px 0 0'}}></i>
                              <Link href={"#"}>
                                {item?.user?.company_name || "company name"}
                              </Link>{" "}
                            </li>
                          </ul>
                        </div>
                        <div className="dez-post-text">
                          <div>
                            <strong className="font-weight-700 text-black">
                              Job Type
                            </strong>{" "}
                            :{item?.location?.title}
                          </div>
                          <div>
                            <strong className="font-weight-700 text-black">
                              Salary
                            </strong>{" "}
                            : &#8377; {item?.salary} Monthy
                          </div>
                          <div>
                            <strong className="font-weight-700 text-black">
                              Published :
                            </strong>{" "}
                            {formaterDate(item?.created_at)}
                          </div>
                        </div>
                        <div className="dez-post-readmore">
                          <Link
                            href={`/job-detail?jobId=${item.id}`}
                            title="READ MORE"
                            rel="bookmark"
                            className="site-button-link"
                          >
                            <span className="fw6">View Job</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Jobdetail;
