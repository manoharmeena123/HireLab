"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PageTitle from "@/markup/Layout/PageTitle";
import Jobfindbox from "@/markup/Element/Jobfindbox";
import Accordsidebar from "@/markup/Element/Accordsidebar";
import { useRouter } from "next/navigation";
import {
  useGetSectorQuery,
  useGetFilterJobMutation,
  useGetCtcDataByIdMutation,
  useGetCtcDataQuery,
} from "@/store/global-store/global.query";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/Loading"; // Ensure you import your Loading component
import { formaterDate, formatDateAgo } from "@/utils/formateDate";
import Pagination from "./Pagination";
import styles from "@/styles/BrowseJobGrid.module.css";

// Images
const bnr = require("./../../images/banner/bnr1.jpg");

interface Filters {
  experience: string[];
  location: string[];
  education: string[];
  cities: string[];
  jobTitles: string[];
}

function Browsejobfilterlist() {
  const searchParams = useSearchParams();
  const jobTitleQuery = searchParams.get("job_title") || "";
  const cityQuery = searchParams.get("city") || "";
  const sectorQuery = searchParams.get("sector") || "";
  const jobId = searchParams.get("jobId") || "";

  const { push } = useRouter();
  console.log("query", jobTitleQuery, cityQuery, sectorQuery);
  const [getJobs, { data: ctcData, isLoading: isCtcLoading }] =
    useGetCtcDataByIdMutation();
  const { data: ctcDatas } = useGetCtcDataQuery();

  const { data: sectorData, isLoading: isSectorLoading } = useGetSectorQuery();
  const [getFilterJob, { isLoading: isFilterLoading, data: jobsData }] =
    useGetFilterJobMutation();

  console.log("jobsData", jobsData, jobId);
  console.log("ctcData", ctcData);
  useEffect(() => {
    if (jobId) {
      getJobs(jobId);
    }
  }, [jobId]);

  useEffect(() => {
    if (jobTitleQuery || cityQuery || sectorQuery) {
      getFilterJob({
        job_title: jobTitleQuery,
        city: cityQuery,
        sector: sectorQuery,
      });
    }
  }, [getFilterJob, jobTitleQuery, cityQuery, sectorQuery]);

  const [filters, setFilters] = useState<Filters>({
    experience: [],
    location: [],
    education: [],
    cities: [],
    jobTitles: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState<"list" | "grid">("grid");
  const itemsPerPage = 10;

  const applyFilters = (jobs: any[]): any[] => {
    return jobs
      .filter((job) =>
        filters.experience.length
          ? filters?.experience?.includes(job?.experience?.title)
          : true
      )
      .filter((job) =>
        filters.location.length
          ? filters.location.includes(job?.location?.title)
          : true
      )
      .filter((job) =>
        filters.education.length
          ? filters.education.includes(job?.education?.name ?? "")
          : true
      )
      .filter((job) =>
        filters.cities.length
          ? filters.cities.some((city) => job?.address?.includes(city))
          : true
      )
      .filter((job) =>
        filters.jobTitles.length
          ? filters.jobTitles.includes(job?.job_title)
          : true
      );
  };

  const paginatedJobs = jobsData?.data
    ? applyFilters(jobsData?.data).slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : ctcData?.data
    ? applyFilters(ctcData?.data).slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  if (isSectorLoading || isFilterLoading) {
    return <Loading />;
  }

  const viewJobHandler = (id: number) => {
    push(`/job-detail?jobId=${id}`);
  };
  const getCtcTitleById = (id: any) => {
    const ctcItem = ctcDatas?.data?.find((item) => item.id == id);
    return ctcItem ? ctcItem.title : "N/A";
  };
  return (
    <>
      {isSectorLoading && isFilterLoading && <Loading />}
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
                <Accordsidebar filters={filters} setFilters={setFilters} />
                <div className="col-xl-9 col-lg-8 col-md-7">
                  <div className="job-bx-title clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">{`${
                      paginatedJobs.length || 0
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
                        <span
                          className={`${styles.viewToggle} ${
                            view === "list" ? styles.active : ""
                          }`}
                          onClick={() => setView("list")}
                          style={{ marginRight: "10px" }}
                        >
                          <i className="fa fa-th-list"></i>
                        </span>
                        <span
                          className={`${styles.viewToggle} ${
                            view === "grid" ? styles.active : ""
                          }`}
                          onClick={() => setView("grid")}
                        >
                          <i className="fa fa-th"></i>
                        </span>
                      </div>
                    </div>
                  </div>

                  {paginatedJobs.length === 0 ? (
                    <div className="no-jobs-found">
                      <h3>No jobs found</h3>
                    </div>
                  ) : (
                    <>
                      {view === "list" ? (
                        <ul className="post-job-bx">
                          {paginatedJobs.map((item, index) => (
                            <li key={index}>
                              <div className="post-bx">
                                <div className="d-flex m-b30">
                                  <div className="job-post-info">
                                    <h4
                                      style={{ cursor: "pointer" }}
                                      onClick={() => viewJobHandler(item.id)}
                                    >
                                      <Link href={"/job-detail"}>
                                        {" "}
                                        {item?.job_title}
                                      </Link>
                                    </h4>
                                    <ul>
                                      <li>
                                        <i className="fa fa-bookmark-o"></i>
                                        {item?.company_name}
                                      </li>
                                      <li>
                                        <i className="fa fa-map-marker"></i>{" "}
                                        {item?.address}
                                      </li>
                                      <li>
                                        <i className="fa fa-clock-o"></i>{" "}
                                        Published{" "}
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
                                    <span className="text-black m-r10">
                                      Posted:
                                    </span>{" "}
                                    {formatDateAgo(item?.created_at)}
                                  </p>
                                </div>
                                <label className="like-btn">
                                  <input type="checkbox" />
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="post-job-bx browse-job-grid row">
                          {paginatedJobs.map((item, index) => (
                            <li className="col-lg-6" key={index}>
                              <div className="post-bx">
                                <div className="d-flex m-b30">
                                  <div className="job-post-info">
                                    <h4
                                      style={{ cursor: "pointer" }}
                                      onClick={() => viewJobHandler(item.id)}
                                      className="browse-card-head"
                                    >
                                      <Link href={"/job-detail"}>
                                        {" "}
                                        {item?.job_title}
                                      </Link>
                                      <label className="like-btn">
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                      </label>
                                    </h4>
                                    <ul>
                                      <li>
                                        <i className="fa fa-bookmark-o"></i>
                                        {item?.company_name}
                                      </li>
                                      <li>
                                        <i className="fa fa-map-marker"></i>{" "}
                                        {item?.address}
                                      </li>
                                      <li>
                                        <i className="fa fa-clock-o"></i>{" "}
                                        Published{" "}
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
                                    <span className="ctc-badge">
                                      <i className="fa fa-money"></i>{" "}
                                      {getCtcTitleById(item.ctc)}
                                    </span>
                                  </div>
                                </div>
                                <div className="posted-info clearfix">
                                  <p className="m-tb0 text-primary float-left">
                                    <span className="text-black m-r10">
                                      Posted:
                                    </span>{" "}
                                    {formatDateAgo(item?.created_at)}
                                  </p>
                                </div>
                                {/* <label className="like-btn">
                                  <input type="checkbox" />
                                  <span className="checkmark"></span>
                                </label> */}
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      {paginatedJobs.length > 0 && (
                        <Pagination
                          currentPage={currentPage}
                          itemsPerPage={itemsPerPage}
                          totalItems={
                            jobsData?.data.length || ctcData?.data?.length || 0
                          }
                          onPageChange={setCurrentPage}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Browsejobfilterlist;
