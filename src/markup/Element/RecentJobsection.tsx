import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import {
  useGetRecentJobsQuery,
  usePostSaveJobMutation,
  useDeleteSavedJobMutation,
  useGetCtcDataQuery,
  useGetTestimonialsQuery,
  useGetSavedJobQuery,
  useCreateAccountQuery,
} from "@/store/global-store/global.query";
import { RecentJobData } from "@/types/index";
import { formaterDate } from "@/utils/formateDate";
import { useDispatch } from "react-redux";
import { fetchRecentJobsStart } from "@/store/global-store/global.slice";
import { useRouter } from "next/navigation";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import parse from "html-react-parser";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import Loading from "@/components/Loading";
import Pagination from "./Pagination"; // Import the Pagination component

const RecentJobsection = () => {
  const { data: recentJob, isLoading: recentJobLoading } =
    useGetRecentJobsQuery();
  const [saveJob, { isLoading: isSavingLoading }] = usePostSaveJobMutation();
  const [deleteJob, { isLoading: isDeletingLoading }] =
    useDeleteSavedJobMutation();
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { user } = useLoggedInUser();
  const { data: ctcData } = useGetCtcDataQuery();
  const { data: testimonialData } = useGetTestimonialsQuery();
  const { data: savedJob, refetch: savedJobRefetch } = useGetSavedJobQuery();
  const { data: createAccount } = useCreateAccountQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of jobs per page

  const lastTestimonial = testimonialData?.data?.slice(-1)[0];
  const savedJobsMap = new Map(
    savedJob?.data?.map((job: any) => [job.id.toString(), true])
  );

  const getCtcTitleById = (id: any) => {
    const ctcItem = ctcData?.data?.find((item) => item.id == id);
    return ctcItem ? ctcItem.title : "N/A";
  };

  const handleLikeToggle = async (jobId: string) => {
    if (!user) {
      push("/login");
      return;
    }

    if (savedJobsMap.has(jobId)) {
      try {
        await deleteJob(jobId);
        await savedJobRefetch();
        dispatch(fetchRecentJobsStart());
        Swal.fire({
          icon: "success",
          title: "Job Deleted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error deleting job:", error);
        Swal.fire({
          icon: "error",
          title: "Error in Deleting Job",
          text: "Failed to delete job.",
          confirmButtonText: "OK",
        });
      }
    } else {
      try {
        await saveJob({ job_id: jobId });
        await savedJobRefetch();
        dispatch(fetchRecentJobsStart());
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

  const viewJobHandler = (id: number) => {
    push(`/job-detail?jobId=${id}`);
  };

  // Pagination logic
  const totalJobs = recentJob?.data?.length || 0;
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = recentJob?.data?.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <>
      {recentJobLoading && isSavingLoading && isDeletingLoading && <Loading />}
      <div className="section-full bg-white content-inner-2">
        <div className="container">
          <div className="d-flex job-title-bx section-head">
            <div className="mr-auto">
              <h2 style={{ fontWeight: "501" }} className="m-b5">
                Recent Jobs
              </h2>
              <h6 className="fw4 m-b0">
                {recentJob?.data?.length}+ Recently Added Jobs
              </h6>
            </div>
            <div className="align-self-end">
              <Link href="/browse-jobs-grid" className="site-button button-sm">
                Browse All Jobs <i className="fa fa-long-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9">
              <ul className="post-job-bx browse-job recent-job-scroll-mob">
                {currentJobs?.map((item: RecentJobData, index: number) => (
                  <li key={index}>
                    {item && (
                      <div className="post-bx">
                        <div className="d-flex m-b30">
                          <div className="job-post-info">
                            <h4
                              style={{ cursor: "pointer" }}
                              className="text-secondry"
                              onClick={() => viewJobHandler(item.id)}
                            >
                              <Link href="">{item?.job_title}</Link>
                            </h4>
                            <ul>
                              <li>
                                <i className="fa fa-bookmark-o"></i>
                                {item?.company_name}
                              </li>
                              <li>
                                <i className="fa fa-map-marker"></i>
                                {item?.address}
                              </li>
                              <li>
                                <i className="fa fa-clock-o"></i> Published{" "}
                                {formaterDate(item?.created_at)}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="job-time m-t15 m-b10">
                          {item.tags &&
                            item.tags.split(",").map((tag, index) => (
                              <Link key={index} href="#" className="mr-1">
                                <span className="tag">{tag.trim()}</span>
                              </Link>
                            ))}
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <div className="job-time">
                            <Link href="">
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
                        <label
                          className={`like-btn ${
                            savedJobsMap.has(item.id.toString()) ? "liked" : ""
                          }`}
                          onClick={() => handleLikeToggle(item.id.toString())}
                        >
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              {/* Pagination Component */}
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalJobs}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            <div className="col-lg-3">
              <div className="sticky-top">
                <div className="candidates-are-sys m-b30">
                  {lastTestimonial && (
                    <div className="candidates-bx">
                      <div className="testimonial-pic radius">
                        <Image
                          src={`${IMAGE_URL + lastTestimonial?.image}`}
                          width={100}
                          height={100}
                          alt={lastTestimonial?.name || "Testimonial"}
                        />
                      </div>
                      <div className="testimonial-text">
                        <p>
                          {lastTestimonial
                            ? parse(lastTestimonial.content)
                            : ""}
                        </p>
                      </div>
                      <div className="testimonial-detail">
                        <strong className="testimonial-name">
                          {lastTestimonial.name}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>
                <div className="quote-bx">
                  <div className="quote-info">
                    <h4>
                      {createAccount?.data?.heading
                        ? parse(createAccount.data.heading)
                        : ""}
                    </h4>
                    <p>
                      {createAccount?.data?.description
                        ? parse(createAccount.data.description)
                        : ""}
                    </p>
                    <Link href="/register" className="site-button">
                      {createAccount?.data?.title}
                    </Link>
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

export default RecentJobsection;
