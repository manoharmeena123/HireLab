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
      <div className="page-content bg-white">
        <div
          className="dez-bnr-inr overlay-black-middle"
          style={{ backgroundImage: "url(" + bnr.default.src + ")" }}
        >
          <PageTitle activeName="Job Detail" motherName="Home" />
        </div>
        <div className="content-block">
          <div className="section-full content-inner-1">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="sticky-top">
                    <div className="row">
                      {/* <div className="col-lg-12 col-md-6">
                        <div className="m-b30">
                          <Image
                            src={require("../../images/blog/grid/pic1.jpg")}
                            alt=""
                          />
                        </div>
                      </div> */}
                      <div className="col-lg-12 col-md-6">
                        <div className="widget bg-white p-lr20 p-t20  widget_getintuch radius-sm shadow">
                          <h4 className="text-black font-weight-700 p-t10 m-b15">
                            Job Details
                          </h4>
                          <ul>
                            <li>
                              <i className="ti-location-pin"></i>
                              <strong className="font-weight-700 text-black">
                                Address
                              </strong>
                              <span className="text-black-light">
                                {" "}
                                {job?.data?.address}{" "}
                              </span>
                            </li>
                            <li>
                              <i className="ti-money"></i>
                              <strong className="font-weight-700 text-black">
                                Salary
                              </strong>{" "}
                              &#8377; {job?.data?.salary} Monthy
                            </li>
                            <li>
                              <i className="ti-shield"></i>
                              <strong className="font-weight-700 text-black">
                                Experience
                              </strong>
                              {job?.data?.total_experience}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="job-info-box">
                    <h3 className="m-t0 m-b10 font-weight-700 title-head">
                      <Link href={"#"} className="text-secondry m-r30">
                        {job?.data?.job_title}
                      </Link>
                    </h3>
                    <ul className="job-info">
                      <li>
                        <strong>Education</strong> {job?.data?.education?.name}
                      </li>
                      <li>
                        <strong>Deadline:</strong> 25th January 2018
                      </li>
                      <li>
                        <i className="ti-location-pin text-black m-r5"></i>{" "}
                        {/* NewYark{" "} */}
                        {job?.data?.location?.title}
                      </li>
                    </ul>
                    <p className="p-t20">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </p>
                    <h5 className="font-weight-600">Job Description</h5>
                    <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                    <p>{job?.data?.job_description}</p>
                    <h5 className="font-weight-600">How to Apply</h5>
                    <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages.
                    </p>
                    <h5 className="font-weight-600">Job Requirements</h5>
                    <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                    <ul className="list-num-count no-round">
                      <li>
                        The DexignLab Privacy Policy was updated on 25 June
                        2018.
                      </li>
                      <li>Who We Are and What This Policy Covers</li>
                      <li>
                        Remaining essentially unchanged It was popularised in
                        the 1960s{" "}
                      </li>
                      <li>
                        Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s,
                      </li>
                      <li>DexignLab standard dummy text ever since</li>
                    </ul>
                    <Link href={"/jobs-applied-job"} className="site-button">
                      Apply This Job
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-full content-inner">
            <div className="container">
              <div className="row">
                {recentJob?.data?.slice(0, 4).map((item, index) => (
                  <div className="col-xl-3 col-lg-6 col-md-6" key={index}>
                    <div className="m-b30 blog-grid">
                      {/* <div className="dez-post-media dez-img-effect ">
                        {" "}
                        <Link href={"/blog-details"}>
                          <Image src={item.image} alt="" />
                        </Link>{" "}
                      </div> */}
                      <div
                        className="dez-info p-a20 border-1 shadow bg-white"
                        style={{ borderRadius: "10px" }}
                      >
                        <div className="dez-post-title ">
                          <h5 className="post-title">
                            <Link href={"/blog-details"}>{item.job_title}</Link>
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
                              <i className="ti-user"></i>
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
