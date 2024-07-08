"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import PageTitle from "@/markup/Layout/PageTitle";
import Jobfindbox from "@/markup/Element/Jobfindbox";
import Accordsidebar from "@/markup/Element/Accordsidebar";
import { useRouter } from "next/navigation";
import {
  useGetSectorQuery,
  useGetFilterJobMutation,
} from "@/store/global-store/global.query";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/Loading"; // Ensure you import your Loading component
import { formaterDate, formatDateAgo } from "@/utils/formateDate";

// Images
import logo from "./../../images/logo/icon1.png";
const bnr = require("./../../images/banner/bnr1.jpg");

function Browsejobfilterlist() {
  const searchParams = useSearchParams();
  const jobTitleQuery = searchParams.get("job_title") || "";
  const cityQuery = searchParams.get("city") || "";
  const sectorQuery = searchParams.get("sector") || "";
  const { push } = useRouter();
  console.log("query", jobTitleQuery, cityQuery, sectorQuery);

  const { data: sectorData, isLoading: isSectorLoading } = useGetSectorQuery();
  const [getFilterJob, { isLoading: isFilterLoading, data: jobsData }] =
    useGetFilterJobMutation();

  console.log("jobsData", jobsData);
  useEffect(() => {
    if (jobTitleQuery || cityQuery || sectorQuery) {
      getFilterJob({
        job_title: jobTitleQuery,
        city: cityQuery,
        sector: sectorQuery,
      });
    }
  }, [getFilterJob, jobTitleQuery, cityQuery, sectorQuery]);

  if (isSectorLoading || isFilterLoading) {
    return <Loading />;
  }

  const viewJobHandler = (id: number) => {
    push(`/job-detail?jobId=${id}`);
  };
  return (
    <div className="page-content bg-white">
      <div
        className="dez-bnr-inr overlay-black-middle"
        style={{ backgroundImage: `url(${bnr.default.src})` }}
      >
        <PageTitle motherName="Home" activeName="Browse Job Filter Grid" />
      </div>
      <Jobfindbox />
      <div className="content-block">
        <div className="section-full browse-job p-b50">
          <div className="container">
            <div className="row">
              <Accordsidebar />
              <div className="col-xl-9 col-lg-8 col-md-7">
                <div className="job-bx-title clearfix">
                  <h5 className="font-weight-700 pull-left text-uppercase">{`${
                    jobsData?.data?.length || 0
                  } Jobs Found`}</h5>
                  <div className="float-right">
                    <span className="select-title">Sort by freshness</span>
                    <select className="custom-btn">
                      <option>Last 2 Months</option>
                      <option>Last Months</option>
                      <option>Last Weeks</option>
                      <option>Last 3 Days</option>
                    </select>
                    <div className="float-right p-tb5 p-r10">
                      <Link href={"/browse-job-filter-list"} className="p-lr5">
                        <i className="fa fa-th-list"></i>
                      </Link>
                      <Link href={"/browse-job-filter-grid"} className="p-lr5">
                        <i className="fa fa-th"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <ul className="post-job-bx">
                  {jobsData?.data?.map((item, index) => (
                    <li key={index} >
                      <div className="post-bx">
                        <div className="d-flex m-b30">
                          <div className="job-post-info">
                            <h4>
                              <Link href={"/job-detail"} onClick={() => viewJobHandler(item.id)}>
                                {" "}
                                {item?.job_title}
                              </Link>
                            </h4>
                            <ul>
                              <li>
                                <i className="fa fa-map-marker"></i>{" "}
                                {item?.address}
                              </li>
                              <li>
                                <i className="fa fa-bookmark-o"></i>
                                {item?.location?.title}
                              </li>
                              <li>
                                <i className="fa fa-clock-o"></i> Published{" "}
                                {formaterDate(item?.created_at)}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="job-time mr-auto">
                            <Link href={""}>
                              <span>{item?.location?.title}</span>
                            </Link>
                          </div>

                          <div className="salary-bx">
                            <span>42000 - 55000</span>
                            <br />
                          </div>
                        </div>
                        <div className="posted-info clearfix">
                          <p className="m-tb0 text-primary float-left">
                            <span className="text-black m-r10">Posted:</span>{" "}
                            {formatDateAgo(item?.created_at)}
                          </p>
                          {/* <Link
                              href={"/jobs-my-resume"}
                              className="site-button button-sm float-right"
                            >
                              <i className="fa fa-eye"></i>
                            </Link> */}
                        </div>
                        <label className="like-btn">
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="pagination-bx float-right m-t30">
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
}

export default Browsejobfilterlist;
