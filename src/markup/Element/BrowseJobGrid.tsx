"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageTitle from "@/markup/Layout/PageTitle";
import Jobfindbox from "@/markup/Element/Jobfindbox";
import Accordsidebar from "@/markup/Element/Accordsidebar";
import {
  useGetJobsQuery,
  useGetSectorQuery,
  useGetCtcDataQuery,
  usePostSaveJobMutation,
  useDeleteSavedJobMutation,
  useGetSavedJobQuery,
} from "@/store/global-store/global.query";
import { formaterDate } from "@/utils/formateDate";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";
import styles from "@/styles/BrowseJobGrid.module.css";
import Swal from "sweetalert2";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
var bnr = require("./../../images/banner/bnr1.jpg");

interface Job {
  company_name: string;
  id: number;
  job_title: string;
  address: string;
  location: { title: string };
  experience: { title: string };
  education?: { name: string };
  created_at: string;
  salary: string;
  ctc: string;
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
  const { data: ctcDatas } = useGetCtcDataQuery();
  const {
    data: savedJobsData,
    isLoading: savedJobsLoading,
    refetch,
  } = useGetSavedJobQuery();
  const { user } = useLoggedInUser();
  const [saveJob, { isLoading: isSaving }] = usePostSaveJobMutation();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteSavedJobMutation();
  const [likedJobs, setLikedJobs] = useState<string[]>([]);
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

  // New state for CTC range filter
  const [ctcRange, setCtcRange] = useState<[number, number]>([10, 50]);

  useEffect(() => {
    if (savedJobsData) {
      console.log("Saved Jobs Data:", savedJobsData);
      setLikedJobs(
        savedJobsData?.data?.map((job: { id: number }) => job.id.toString())
      );
    }
  }, [savedJobsData]);

  const viewJobHandler = (id: number) => {
    push(`/job-detail?jobId=${id}`);
  };

  const handleLikeToggle = async (jobId: string) => {
    if (!user) {
      push("/login");
      return;
    }

    if (isSaving || isDeleting) {
      return;
    }

    if (likedJobs.includes(jobId)) {
      try {
        await deleteJob(jobId);
        refetch();
        setLikedJobs(likedJobs.filter((id) => id !== jobId));
        Swal.fire({
          icon: "success",
          title: "Job Removed from Saved Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error removing saved job:", error);
        Swal.fire({
          icon: "error",
          title: "Error in Removing Saved Job",
          text: "Failed to remove saved job.",
          confirmButtonText: "OK",
        });
      }
    } else {
      try {
        await saveJob({ job_id: jobId });
        refetch();
        setLikedJobs([...likedJobs, jobId]);
        Swal.fire({
          icon: "success",
          title: "Job Saved Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error saving job:", error);
        Swal.fire({
          icon: "error",
          title: "Error in Saving Job",
          text: "Failed to save job.",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const sortJobs = (jobs: Job[]): Job[] => {
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

  // Helper function to extract the numeric range from the CTC title
  const extractCtcRange = (title: string): [number, number] => {
    const [min, max] = title
      .replace("lac", "")
      .split("-")
      .map((str) => parseInt(str.trim()));
    return [min, max];
  };

  // Apply filters and include CTC range logic
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
      )
      .filter((job) => {
        const ctcItem = ctcDatas?.data?.find((item: any) => item.id == job.ctc);
        if (!ctcItem) return false;
        const [ctcMin, ctcMax] = extractCtcRange(ctcItem.title);
        return ctcMin >= ctcRange[0] && ctcMax <= ctcRange[1];
      });
  };

  const sortedAndFilteredJobs = sortJobs(applyFilters(getAlljobs?.data || []));

  const paginatedJobs = sortedAndFilteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getCtcTitleById = (id: any) => {
    const ctcItem = ctcDatas?.data?.find((item) => item.id == id);
    return ctcItem ? ctcItem.title : "N/A";
  };

  return (
    <>
      {(getAlljobsLoading || sectorLoading || savedJobsLoading) && <Loading />}
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
                <Accordsidebar
                  filters={filters}
                  setFilters={setFilters}
                  ctcRange={ctcRange}
                  setCtcRange={setCtcRange} // Pass CTC range and setter
                />
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
                        <option value="last3Months">Last 3 Months</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="lastWeeks">Last Week</option>
                        <option value="last3Days">Last 3 Days</option>
                        <option value="lastDay">Last Day</option>
                      </select>
                      <div className="float-right p-tb5 p-r10">
                        <span
                          className={`${styles.viewToggle} ${
                            view === "list" ? styles.active : ""
                          }`}
                          onClick={() => setView("list")}
                          style={{ marginRight: "10px", cursor: "pointer" }}
                        >
                          <i className="fa fa-th-list"></i>
                        </span>
                        <span
                          className={`${styles.viewToggle} ${
                            view === "grid" ? styles.active : ""
                          }`}
                          onClick={() => setView("grid")}
                          style={{ marginRight: "10px", cursor: "pointer" }}
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
                      }}
                    >
                      <h3>No jobs found</h3>
                    </div>
                  ) : (
                    <>
                      {view === "list" ? (
                        <ul className="post-job-bx">
                          {paginatedJobs.map((item: any) => (
                            <li
                              key={item.id}
                              onClick={() => viewJobHandler(item.id)}
                            >
                              <div className={styles.sectionContainer}>
                                <div className="d-flex m-b30">
                                  <div className="job-post-info">
                                    <h5 className={styles.jobTitle}>
                                      <Link href="/job-detail" >
                                        {item.job_title}
                                      </Link>
                                    </h5>
                                    <ul>
                                      <li>
                                        <i className="fa fa-bookmark-o"></i>{" "}
                                        {item?.company_name}
                                      </li>
                                      <li>
                                        <i className="fa fa-map-marker"></i>{" "}
                                        {item.address}
                                      </li>
                                      <li>
                                        <i className="fa fa-clock-o"></i>{" "}
                                        Published{" "}
                                        {formaterDate(item.created_at)}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="job-time m-t15 m-b10">
                                  {item.tags
                                    ?.split(",")
                                    .map((tag: any, index: number) => (
                                      <Link
                                        key={index}
                                        href="#"
                                        className="mr-1"
                                      >
                                        <span className="tag">
                                          {tag.trim()}
                                        </span>
                                      </Link>
                                    ))}
                                </div>
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <span
                                      className={`badge text-white p-2 ${styles.ctcBadge}`}
                                    >
                                      <span className="mr-1">₹</span>
                                      {getCtcTitleById(item.ctc)}
                                    </span>
                                  </div>
                                  <div className="job-time">
                                    <Link href="#">
                                      <span
                                        className="badge text-white p-2"
                                        style={{
                                          backgroundColor: "#2A6310",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => viewJobHandler(item.id)}
                                      >
                                        View Job
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                                <label
                                  className={`like-btn ${
                                    likedJobs.includes(item.id.toString())
                                      ? "liked"
                                      : ""
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleLikeToggle(item.id.toString());
                                  }}
                                >
                                  <input type="checkbox" />
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <ul
                          className="post-job-bx browse-job-grid row"
                          style={{ display: "flex", flexWrap: "wrap" }}
                        >
                          {paginatedJobs.map((item: any) => (
                            <li
                              className="col-lg-6 col-md-6 col-sm-12"
                              key={item.id}
                              onClick={() => viewJobHandler(item.id)}
                            >
                              <div className={styles.sectionContainer}>
                                <div className="d-flex m-b30">
                                  <div className="job-post-info">
                                  <h5 className={styles.jobTitle}>
                                      <Link href="/job-detail">
                                        {item.job_title}
                                      </Link>
                                    </h5>
                                    <ul>
                                      <li>
                                        <i className="fa fa-bookmark-o"></i>{" "}
                                        {item?.company_name}
                                      </li>
                                      <li>
                                        <i className="fa fa-map-marker"></i>{" "}
                                        {item.address}
                                      </li>
                                      <li>
                                        <i className="fa fa-clock-o"></i>{" "}
                                        Published{" "}
                                        {formaterDate(item.created_at)}
                                      </li>
                                    </ul>
                                  </div>
                                  <label
                                    className={`like-btn ${
                                      likedJobs.includes(item.id.toString())
                                        ? "liked"
                                        : ""
                                    }`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleLikeToggle(item.id.toString());
                                    }}
                                  >
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                  </label>
                                </div>
                                <div className="job-time m-t15 m-b10">
                                  {item.tags
                                    ?.split(",")
                                    .map((tag: any, index: number) => (
                                      <Link
                                        key={index}
                                        href="#"
                                        className="mr-1"
                                      >
                                        <span className="tag">
                                          {tag.trim()}
                                        </span>
                                      </Link>
                                    ))}
                                </div>
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <span
                                      className={`badge text-white p-2 ${styles.ctcBadge}`}
                                    >
                                      <span className="mr-1">₹</span>
                                      {getCtcTitleById(item.ctc)}
                                    </span>
                                  </div>
                                  <div className="job-time">
                                    <Link href="#">
                                      <span
                                        className="badge text-white p-2"
                                        style={{
                                          backgroundColor: "#2A6310",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => viewJobHandler(item.id)}
                                      >
                                        View Job
                                      </span>
                                    </Link>
                                  </div>
                                </div>
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
