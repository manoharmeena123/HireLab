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

  const [sortOption, setSortOption] = useState<string>("last3Months");
  const [ctcRange, setCtcRange] = useState<[number, number]>([10, 50]); // Dynamic CTC range slider value

  const sortJobs = (jobs: any[]): any[] => {
    const now = new Date();
    const threeMonthsAgo = new Date(now.getTime());
    threeMonthsAgo.setMonth(now.getMonth() - 3);
    const oneMonthAgo = new Date(now.getTime());
    oneMonthAgo.setMonth(now.getMonth() - 1);
    const oneWeekAgo = new Date(now.getTime());
    oneWeekAgo.setDate(now.getDate() - 7);
    const threeDaysAgo = new Date(now.getTime());
    threeDaysAgo.setDate(now.getDate() - 3);
    const oneDayAgo = new Date(now.getTime());
    oneDayAgo.setDate(now.getDate() - 1);

    switch (sortOption) {
      case "last3Months":
        return jobs.filter((job) => new Date(job.created_at) >= threeMonthsAgo);
      case "lastMonth":
        return jobs.filter((job) => new Date(job.created_at) >= oneMonthAgo);
      case "lastWeek":
        return jobs.filter((job) => new Date(job.created_at) >= oneWeekAgo);
      case "last3Days":
        return jobs.filter((job) => new Date(job.created_at) >= threeDaysAgo);
      case "lastDay":
        return jobs.filter((job) => new Date(job.created_at) >= oneDayAgo);
      default:
        return jobs;
    }
  };

  // Helper function to extract the numeric range from the CTC title
  const extractCtcRange = (title: string): [number, number] => {
    const [min, max] = title
      .replace("lac", "") // Remove the "lac" string
      .split("-")         // Split by the dash (-) to get the range
      .map((str) => parseInt(str.trim())); // Convert to numbers
    return [min, max];
  };

  // Function to get CTC title by its ID
  const getCtcTitleById = (id: any) => {
    const ctcItem = ctcDatas?.data?.find((item) => item.id == id);
    return ctcItem ? ctcItem.title : "N/A";
  };

  // Apply filters and include CTC range logic
  const applyFilters = (jobs: any[]): any[] => {
    const [minCtc, maxCtc] = ctcRange;

    return jobs
      .filter((job) =>
        filters.experience.length
          ? filters.experience.includes(job.experience.title)
          : true
      )
      .filter((job) =>
        filters.location.length
          ? filters.location.includes(job.location.title)
          : true
      )
      .filter((job) =>
        filters.education.length
          ? filters.education.includes(job.education.name ?? "")
          : true
      )
      .filter((job) =>
        filters.cities.length
          ? filters.cities.some((city) => job.address.includes(city))
          : true
      )
      .filter((job) =>
        filters.jobTitles.length
          ? filters.jobTitles.includes(job.job_title)
          : true
      )
      .filter((job) => {
        // Get the CTC title from the job (assuming job.ctc contains the ID)
        const ctcItem = ctcDatas?.data?.find((item) => item.id == job.ctc);
        if (!ctcItem) return false;

        // Extract CTC range from the title
        const [ctcMin, ctcMax] = extractCtcRange(ctcItem.title);

        // Filter jobs where the job's CTC range falls within the selected slider range
        return ctcMin >= minCtc && ctcMax <= maxCtc;
      });
  };

  const paginatedJobs = jobsData?.data || ctcData?.data
    ? sortJobs(
        applyFilters(jobsData?.data || ctcData?.data).slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      )
    : [];

  if (isSectorLoading || isFilterLoading) {
    return <Loading />;
  }

  const viewJobHandler = (id: number) => {
    push(`/job-detail?jobId=${id}`);
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
                <Accordsidebar
                  filters={filters}
                  setFilters={setFilters}
                  ctcRange={ctcRange}
                  setCtcRange={setCtcRange}
                />
                <div className="col-xl-9 col-lg-8 col-md-7">
                  <div className="job-bx-title clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">{`${
                      paginatedJobs.length || 0
                    } Jobs Found`}</h5>
                    <div className="float-right">
                      <span className="select-title">Sort by freshness</span>
                      <select
                        className="custom-btn"
                        onChange={(e) => setSortOption(e.target.value)}
                      >
                        <option value="last3Months">Last 3 Months</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="lastWeek">Last Week</option>
                        <option value="last3Days">Last 3 Days</option>
                        <option value="lastDay">Last Day</option>
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
