"use client";
import React, { useState } from "react";
import Link from "next/link";
import PageTitle from "@/markup/Layout/PageTitle";
import Jobfindbox from "@/markup/Element/Jobfindbox";
import Accordsidebar from "@/markup/Element/Accordsidebar";
import {
  useGetJobsQuery,
  useGetSectorQuery,
} from "@/store/global-store/global.query";
import { formaterDate } from "@/utils/formateDate";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";
import styles from "@/styles/BrowseJobGrid.module.css";
var bnr = require("./../../images/banner/bnr1.jpg");
interface Job {
  id: number;
  job_title: string;
  address: string;
  location: { title: string };
  experience: { title: string };
  education?: { name: string };
  created_at: string;
  salary: string;
}

interface Filters {
  experience: string[];
  location: string[];
  education: string[];
  cities: string[];
  jobTitles: string[];
}

const BrowseJobGrid: React.FC = () => {
  const { push } = useRouter();
  const { data: getAlljobs, isLoading: getAlljobsLoading } = useGetJobsQuery();
  const { data: sectorData, isLoading: sectorLoading } = useGetSectorQuery();

  const [view, setView] = useState<"list" | "grid">("grid");
  const [sortOption, setSortOption] = useState("last2Months");
  const [filters, setFilters] = useState<Filters>({
    experience: [],
    location: [],
    education: [],
    cities: [],
    jobTitles: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const viewJobHandler = (id: number) => {
    push(`/job-detail?jobId=${id}`);
  };

  const sortJobs = (jobs: Job[]): Job[] => {
    const now = new Date();
    const twoMonthsAgo = new Date(now.getTime());
    twoMonthsAgo.setMonth(now.getMonth() - 2);
    const oneMonthAgo = new Date(now.getTime());
    oneMonthAgo.setMonth(now.getMonth() - 1);
    const oneWeekAgo = new Date(now.getTime());
    oneWeekAgo.setDate(now.getDate() - 7);
    const threeDaysAgo = new Date(now.getTime());
    threeDaysAgo.setDate(now.getDate() - 3);
    const oneDayAgo = new Date(now.getTime());
    oneDayAgo.setDate(now.getDate() - 1);

    switch (sortOption) {
      case "last2Months":
        return jobs.filter((job) => new Date(job.created_at) >= twoMonthsAgo);
      case "lastMonth":
        return jobs.filter((job) => new Date(job.created_at) >= oneMonthAgo);
      case "lastWeeks":
        return jobs.filter((job) => new Date(job.created_at) >= oneWeekAgo);
      case "last3Days":
        return jobs.filter((job) => new Date(job.created_at) >= threeDaysAgo);
      case "lastDay":
        return jobs.filter((job) => new Date(job.created_at) >= oneDayAgo);
      default:
        return jobs;
    }
  };

  const applyFilters = (jobs: any[]): any[] => {
    return jobs
      .filter((job) =>
        filters.experience.length
          ? filters?.experience?.includes(job?.experience?.title)
          : true
      )
      .filter((job) =>
        filters.location.length
          ? filters?.location.includes(job?.location?.title)
          : true
      )
      .filter((job) =>
        filters.education.length
          ? filters.education.includes(job?.education?.name ?? "")
          : true
      )
      .filter((job) =>
        filters.cities.length
          ? filters?.cities?.some((city) =>
              job?.address?.toLowerCase().includes(city.toLowerCase())
            )
          : true
      )
      .filter((job) =>
        filters?.jobTitles?.length
          ? filters.jobTitles.includes(job?.job_title)
          : true
      );
  };

  const sortedAndFilteredJobs = sortJobs(applyFilters(getAlljobs?.data || []));

  const paginatedJobs = sortedAndFilteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // if (getAlljobsLoading || sectorLoading) {
  //   return <Loading />;
  // }

  return (
    <>
      {getAlljobsLoading && sectorLoading && <Loading />}
      <div className="page-content bg-white">
        <div
          className="dez-bnr-inr overlay-black-middle"
          style={{ backgroundImage: `url(${bnr.default.src})` }}
        >
          <PageTitle motherName="Home" activeName="Browse Job Grid" />
        </div>
        <div className="content-block">
          <Jobfindbox />
          <div className="section-full bg-white browse-job p-b50">
            <div className="container">
              <div className="row">
                <Accordsidebar filters={filters} setFilters={setFilters} />
                <div className="col-xl-9 col-lg-8 col-md-7">
                  <div className="job-bx-title clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">
                      {`${sortedAndFilteredJobs.length} Jobs Found`}
                    </h5>
                    <div className="float-right">
                      <span className="select-title">Sort by freshness</span>
                      <select
                        className="custom-btn"
                        onChange={(e) => setSortOption(e.target.value)}
                      >
                        <option value="last2Months">Last 2 Months</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="lastWeeks">Last Weeks</option>
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

                  {sortedAndFilteredJobs.length === 0 ? (
                    <div
                      className="no-jobs-found"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "60%",
                        // backgroundColor: "rgba(0,0,0,0.5)",
                      }}
                    >
                      <h3>No jobs found</h3>
                    </div>
                  ) : (
                    <>
                      {view === "list" ? (
                        <ul className="post-job-bx">
                          {paginatedJobs.map((item) => (
                            <li
                              key={item.id}
                              onClick={() => viewJobHandler(item.id)}
                            >
                              <div className="post-bx">
                                <div className="d-flex m-b30">
                                  <div className="job-post-info">
                                    <h5>
                                      <Link href="/job-detail">
                                        {item.job_title}
                                      </Link>
                                    </h5>
                                    <ul>
                                      <li>
                                        <i className="fa fa-map-marker"></i>{" "}
                                        {item.address}
                                      </li>
                                      <li>
                                        <i className="fa fa-bookmark-o"></i>{" "}
                                        {item.location.title}
                                      </li>
                                      <li>
                                        <i className="fa fa-clock-o"></i>{" "}
                                        Published{" "}
                                        {formaterDate(item.created_at)}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="d-flex">
                                  <div className="job-time mr-auhref">
                                    <Link href="#">
                                      <span>{item.location.title}</span>
                                    </Link>
                                  </div>
                                  <div className="salary-bx">
                                    <span>{item.salary}</span>
                                  </div>
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
                          {paginatedJobs.map((item) => (
                            <li
                              className="col-lg-6 col-md-6"
                              key={item.id}
                              onClick={() => viewJobHandler(item.id)}
                            >
                              <div className="post-bx">
                                <div className="d-flex m-b30">
                                  <div className="job-post-info">
                                    <h5>
                                      <Link href="/job-detail">
                                        {item.job_title}
                                      </Link>
                                    </h5>
                                    <ul>
                                      <li>
                                        <i className="fa fa-map-marker"></i>{" "}
                                        {item.address}
                                      </li>
                                      <li>
                                        <i className="fa fa-bookmark-o"></i>{" "}
                                        {item.location.title}
                                      </li>
                                      <li>
                                        <i className="fa fa-clock-o"></i>{" "}
                                        Published{" "}
                                        {formaterDate(item.created_at)}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="d-flex">
                                  <div className="job-time mr-auhref">
                                    <Link href="#">
                                      <span>{item.location.title}</span>
                                    </Link>
                                  </div>
                                  <div className="salary-bx">
                                    <span>{item.salary}</span>
                                  </div>
                                </div>
                                <label className="like-btn">
                                  <input type="checkbox" />
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={sortedAndFilteredJobs.length}
                        onPageChange={setCurrentPage}
                      />
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
};

export default BrowseJobGrid;
