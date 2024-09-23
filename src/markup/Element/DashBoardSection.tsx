"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Modal, Button, Form } from "react-bootstrap"; // Importing react-bootstrap components
import {
  useRecentJobSeekerJobQuery,
  usePostSaveJobMutation,
  useDeleteSavedJobMutation,
  useGetEventsQuery,
  useGetMembershipQuery,
  useGetCtcDataQuery,
  useUserListDiscussionQuery,
  useCreateDiscussionMutation,
  useDeleteDiscussionMutation,
  useUpdateDiscussionMutation,
} from "@/store/global-store/global.query";
import dayjs from "dayjs"; // Date manipulation library
import { RecentJobData } from "@/types/index";
import { fetchRecentJobsStart } from "@/store/global-store/global.slice";
import { formaterDate } from "@/utils/formateDate";
import Loading from "@/components/Loading";
import Pagination from "./Pagination"; // Importing your existing Pagination component
import RangeSlider from "react-range-slider-input"; // CTC Range Slider
import "react-range-slider-input/dist/style.css"; // Range slider styling
import { useLoggedInUser } from "@/hooks/useLoggedInUser";

// Type for creating discussion form data
type CreateFormData = {
  question: string;
  description: string;
  status: string;
};

// Type for editing discussion form data
type EditFormData = {
  id: string;
  question: string;
  description: string;
};

interface Filters {
  experience: string[];
  location: string[];
  education: string[];
  cities: string[];
  jobTitles: string[];
}

const DashboardSection = () => {
  const { user } = useLoggedInUser();
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { data: membershipData } = useGetMembershipQuery();
  const {
    data: recentJob,
    isLoading: recentLoading,
    isError,
  } = useRecentJobSeekerJobQuery();
  const [saveJob, { isLoading: isSaving }] = usePostSaveJobMutation();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteSavedJobMutation();
  const { data: eventsData, isLoading: eventLoading } = useGetEventsQuery();
  const { data: ctcData } = useGetCtcDataQuery();
  const [likedJobs, setLikedJobs] = useState<string[]>([]);
  const {
    data: discussionData,
    isLoading: discussionLoading,
    refetch,
  } = useUserListDiscussionQuery();
  const [createDiscussion] = useCreateDiscussionMutation();
  const [deleteDiscussion] = useDeleteDiscussionMutation();
  const [updateDiscussion] = useUpdateDiscussionMutation();

  // State for modal control and form data for creating and editing discussions
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [createFormData, setCreateFormData] = useState<CreateFormData>({
    question: "",
    description: "",
    status: "1", // Default value for status
  });

  const [editFormData, setEditFormData] = useState<EditFormData>({
    id: "",
    question: "",
    description: "",
  });

  // State for filters
  const [filters, setFilters] = useState<Filters>({
    experience: [],
    location: [],
    education: [],
    cities: [],
    jobTitles: [],
  });

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of jobs per page

  // CTC filter range
  const [ctcRange, setCtcRange] = useState<[number, number]>([10, 50]); // Default CTC range

  // Sort option state for date-based filtering
  const [sortOption, setSortOption] = useState<string>("last3Months");

  const getCtcTitleById = (id: any) => {
    const ctcItem = ctcData?.data?.find((item) => item.id == id);
    return ctcItem ? ctcItem.title : "N/A";
  };

  // Helper function to extract the numeric range from the CTC title
  const extractCtcRange = (title: string): [number, number] => {
    const [min, max] = title
      .replace("lac", "") // Remove the "lac" string
      .split("-") // Split by the dash (-) to get the range
      .map((str) => parseInt(str.trim())); // Convert to numbers
    return [min, max];
  };

  // Apply CTC range filter
  const filterByCtcRange = (job: any) => {
    const ctcItem = ctcData?.data?.find((item) => item.id == job.ctc);
    if (!ctcItem) return false;
    const [ctcMin, ctcMax] = extractCtcRange(ctcItem.title);
    return ctcMin >= ctcRange[0] && ctcMax <= ctcRange[1];
  };

  // Apply other filters (similar to BrowseJobFilter)
  const applyFilters = (jobs: RecentJobData[]) => {
    return jobs
      .filter((job) =>
        filters.experience.length
          ? filters.experience.includes(job.experience?.title || "")
          : true
      )
      .filter((job) =>
        filters.location.length
          ? filters.location.includes(job.location?.title || "")
          : true
      )
      .filter((job) =>
        filters.education.length
          ? filters.education.includes(job.education?.name || "")
          : true
      )
      .filter((job) =>
        filters.cities.length
          ? filters.cities.some((city) => job.address?.includes(city) || false)
          : true
      )
      .filter((job) =>
        filters.jobTitles.length
          ? filters.jobTitles.includes(job.job_title)
          : true
      );
  };

  // Date filtering function (similar to BrowseJobFilter)
  const sortJobs = (jobs: RecentJobData[]): RecentJobData[] => {
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

  // Paginate and sort jobs by 'created_at' in descending order, applying filters and CTC filter
  const sortedAndFilteredJobs = recentJob?.data
    ?.filter(filterByCtcRange)
    ?.filter((job: any) => applyFilters([job]).length > 0)
    ?.sort(
      (a: RecentJobData, b: RecentJobData) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  const totalJobs = sortedAndFilteredJobs?.length || 0;
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = sortJobs(
    sortedAndFilteredJobs?.slice(indexOfFirstJob, indexOfLastJob) || []
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUpdateDiscussion = async () => {
    try {
      await updateDiscussion({
        id: editFormData.id,
        question: editFormData.question,
        description: editFormData.description,
      }).unwrap();
      refetch();
      setShowEditModal(false);
      Swal.fire("Success!", "Your discussion has been updated.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to update discussion.", "error");
    }
  };

  const handleCreateDiscussion = async () => {
    try {
      const res: any = await createDiscussion(createFormData);
      if (res?.data?.code == 200) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Discussion Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setCreateFormData({
          question: "",
          description: "",
          status: "1", // Reset form fields to initial values
        });
        setShowCreateModal(false); // Close modal after submission
      } else if (res?.data?.code == 404) {
        Swal.fire({
          icon: "error",
          title: "Error Creating Discussion",
          text: res?.data?.data?.error?.question,
          confirmButtonText: "OK",
        });
        setCreateFormData({
          question: "",
          description: "",
          status: "1", // Reset form fields to initial values
        });
        setShowCreateModal(false);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error Creating Discussion",
        text: error?.message,
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      {recentLoading && eventLoading && discussionLoading && <Loading />}
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-b50">
            <div className="ds-wrap">
              <div className="row">
                <div className="col-lg-9">
                  <div className="d-flex justify-content-between align-items-center">
                    {/* Centered Heading */}
                    <h3
                      className="text-center mt-5 mx-auto"
                      style={{ fontWeight: "600", fontSize: "bold" }}
                    >
                      Jobs for you
                    </h3>

                    {/* Time Filter - Positioned at the end */}
                    <select
                      className="form-select mt-5 ms-auto"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value as string)}
                      style={{
                        maxWidth: "200px",
                        borderRadius: "5px",
                        padding: "5px",
                      }}
                    >
                      <option value="last3Months">Last 3 Months</option>
                      <option value="lastMonth">Last Month</option>
                      <option value="lastWeek">Last Week</option>
                      <option value="last3Days">Last 3 Days</option>
                      <option value="lastDay">Last Day</option>
                    </select>
                  </div>

                  <div>
                    <ul className="post-job-bx" style={{ padding: "5px" }}>
                      {currentJobs.length > 0 ? (
                        currentJobs.map(
                          (item: RecentJobData, index: number) => (
                            <li key={index}>
                              <div className="post-bx">
                                <div className="d-flex m-b30">
                                  <div className="job-post-info">
                                    <h4
                                      style={{ cursor: "pointer" }}
                                      className="text-secondry"
                                      onClick={() =>
                                        push(`/job-detail?jobId=${item.id}`)
                                      }
                                    >
                                      <Link href="">{item?.job_title}</Link>
                                    </h4>
                                    <ul>
                                      <li>
                                        <i className="fa fa-map-marker"></i>
                                        {item?.address || "N/A"}
                                      </li>
                                      <li>
                                        <i className="fa fa-bookmark-o"></i>
                                        {item?.location?.title || "N/A"}
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
                                <label
                                  className={`like-btn ${
                                    likedJobs.includes(item.id.toString())
                                      ? "liked"
                                      : ""
                                  }`}
                                >
                                  <input type="checkbox" />
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                            </li>
                          )
                        )
                      ) : (
                        <p className="text-center">No Job Found</p>
                      )}
                    </ul>

                    {/* Pagination component */}
                    <Pagination
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                      totalItems={totalJobs}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>

                {/* Membership, CTC filter, Meetups, and Discussion Forum */}
                <div className="col-lg-3">
                  {/* CTC Range Filter */}
                  <div
                    className="shadow p-3 bg-white"
                    style={{ marginTop: "20px" }}
                  >
                    <h6 className="text-center">
                      <i className="fa fa-sliders m-r5"></i> CTC Filter
                    </h6>
                    <RangeSlider
                      value={ctcRange}
                      onInput={setCtcRange}
                      min={10}
                      max={50}
                    />
                    <div className="d-flex justify-content-between gap-1 mt-2">
                      <span>{ctcRange[0]} Lac</span>
                      <span>{ctcRange[1]} Lac</span>
                    </div>
                  </div>

                  {/* Membership Card */}
                  <div
                    className="sticky-top browse-candidates shadow"
                    style={{
                      marginTop: "40px",
                      display: "grid",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        paddingTop: "20px",
                      }}
                    >
                      Membership Plan
                    </h3>
                    <p className="text-center">Your path to Success</p>

                    <div className="ds-mp-wrap">
                      {membershipData?.data?.map((item, index) => (
                        <div
                          className="membership_class"
                          style={{
                            backgroundColor:
                              user?.user?.membership?.membership_id === item.id
                                ? "#2A6310"
                                : "rgb(42 99 16 / 67%)",
                            padding: "10px",
                            minWidth: "230px",
                            position: "relative",
                            height: "auto",
                            cursor: "pointer",
                          }}
                          key={index}
                          onClick={() => push(`/cart?plan=${item?.id}`)}
                        >
                          <div className="quote-info">
                            <div className="d-flex align-items-center relative">
                              <h5 className="text-white text-center  flex-grow-1 mb-0">
                                {item?.title}
                              </h5>
                              {user?.user?.membership?.membership_id ===
                                item.id && (
                                <div
                                  className="px-2 absolute"
                                  style={{ right: "0", top: "5px" }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="26"
                                    height="26"
                                    viewBox="0 0 36 36"
                                    fill="none"
                                  >
                                    <circle
                                      cx="18"
                                      cy="18"
                                      r="18"
                                      fill="#42A5F5"
                                    />
                                    <path
                                      d="M25.5 11.41L15.5 21.41L10 15.91L11.41 14.5L15.5 18.58L24.09 10L25.5 11.41Z"
                                      fill="#fff"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>

                            <h6
                              className="text-white text-center mb-1"
                              style={{
                                fontFamily: "Lato, sans-serif !important",
                              }}
                            >
                              Price
                            </h6>
                            <li
                              className="text-center mp-lists"
                              style={{
                                fontFamily: "Lato, sans-serif !important",
                                letterSpacing: "0.05em",
                              }}
                            >
                              {item?.monthly_price}
                            </li>

                            <li
                              className="text-center mp-lists"
                              style={{
                                fontFamily: "Lato, sans-serif !important",
                                letterSpacing: "0.05em",
                              }}
                            >
                              {item?.quarterly_price}
                            </li>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Meetups and Discussion Forum */}
              <div
                className="row mt-3 justify-content-center"
                style={{ gap: "2rem" }}
              >
                {/* Meetups */}
                <div
                  className="col-lg-6 col-md-12 shadow p-4"
                  style={{
                    marginTop: "30px",
                    paddingRight: "-15px",
                    borderRadius: "1rem",
                    maxWidth: "550px",
                  }}
                >
                  <h2 style={{ fontWeight: 600, textAlign: "center" }}>
                    Meet Ups
                  </h2>
                  <ul
                    className="post-job-bx col"
                    style={{
                      paddingTop: "10px",
                    }}
                  >
                    {eventsData &&
                      eventsData.data.slice(0, 2).map((event, index) => (
                        <li key={index}>
                          <div className="post-bx">
                            <div className="d-flex m-b10">
                              <div className="job-post-info w-100">
                                <div className="d-flex justify-content-between w-100">
                                  <h5>
                                    <Link
                                      href={`/single-event?query=${event.title}`}
                                      style={{ fontWeight: "600" }}
                                    >
                                      {event.title}
                                    </Link>
                                  </h5>
                                </div>
                                <ul
                                  style={{
                                    display: "flex",
                                    marginTop: "20px",
                                    color: "#2A6310 !important",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <li className="mr-4">
                                    <i
                                      className="fa fa-map-marker"
                                      style={{
                                        fontSize: "large",
                                        color: "#2A6310",
                                      }}
                                    ></i>
                                    {event.location}
                                  </li>
                                  <li className="mr-4">{event.date}</li>
                                  <li className="mr-4">{event.time}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="mt-4 mb-3"
                  >
                    <button
                      className="btn btn-primary"
                      style={{
                        background: "rgb(42, 99, 16)",
                        border: "none",
                      }}
                    >
                      Browse All
                    </button>
                  </div>
                </div>

                {/* Discussion Forum Section */}
                <div
                  className="col-lg-6 col-md-12 shadow p-4"
                  style={{
                    marginTop: "30px",
                    paddingLeft: "-15px",
                    borderRadius: "1rem",
                    maxWidth: "550px",
                  }}
                >
                  <h2 style={{ fontWeight: 600, textAlign: "center" }}>
                    Discussion Forum
                  </h2>
                  <ul
                    className="post-job-bx col"
                    style={{
                      paddingTop: "10px",
                      maxHeight: "320px", // Limit height to display only 2 items initially
                      overflowY: "auto", // Enable scrolling after 2 items
                    }}
                  >
                    {discussionData?.data?.map((item: any) => (
                      <li key={item?.id}>
                        <div className="post-bx">
                          <div className="d-flex m-b10">
                            <div className="job-post-info w-100 d-flex justify-content-between">
                              <div>
                                <h5
                                  onClick={() =>
                                    push(
                                      `/single-discussion?query=${item?.question}`
                                    )
                                  }
                                  style={{
                                    fontWeight: "600",
                                    cursor: "pointer",
                                  }}
                                >
                                  <Link href="#">
                                    Q: {item?.question?.replace(/-/g, " ")}
                                  </Link>
                                </h5>
                                <ul
                                  style={{
                                    display: "flex",
                                    marginTop: "10px",
                                    color: "#2A6310",
                                  }}
                                >
                                  <p>Author: {item?.user?.name}</p>
                                </ul>
                              </div>

                              {/* Edit and Delete icons aligned to the end */}
                              <div className="d-flex align-items-center">
                                <i
                                  className="fa fa-pencil mr-3"
                                  onClick={() => {
                                    setEditFormData({
                                      id: item.id,
                                      question: item.question,
                                      description: item.description,
                                    });
                                    setShowEditModal(true);
                                  }} // Open modal with data
                                  style={{
                                    cursor: "pointer",
                                    color: "green",
                                    fontSize: "18px",
                                  }}
                                ></i>
                                <i
                                  className="fa fa-trash"
                                  onClick={() =>
                                    Swal.fire({
                                      title: "Are you sure?",
                                      text: "You won't be able to undo this!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes, delete it!",
                                    }).then(async (result) => {
                                      if (result.isConfirmed) {
                                        await deleteDiscussion(item.id);
                                        refetch();
                                      }
                                    })
                                  }
                                  style={{
                                    cursor: "pointer",
                                    color: "red",
                                    fontSize: "18px",
                                  }}
                                ></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {/* Static Ask a Question button outside the scrollable list */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <button
                      className="btn btn-primary"
                      style={{
                        background: "rgb(42, 99, 16)",
                        border: "none",
                      }}
                      onClick={() => {
                        if (!user?.user?.membership) {
                          Swal.fire({
                            title: "No Membership Plan",
                            text: "You need a membership to create a discussion. Would you like to buy one?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Buy Subscription",
                            cancelButtonText: "Cancel",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              push("/cart");
                            }
                          });
                        } else {
                          setShowCreateModal(true);
                        }
                      }}
                    >
                      Ask a Question
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for creating a discussion */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ask a Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                name="question"
                value={createFormData.question}
                onChange={(e) =>
                  setCreateFormData({
                    ...createFormData,
                    question: e.target.value,
                  })
                }
                placeholder="Enter your question"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={createFormData.description}
                onChange={(e) =>
                  setCreateFormData({
                    ...createFormData,
                    description: e.target.value,
                  })
                }
                placeholder="Enter description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateDiscussion}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing a discussion */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Discussion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                name="question"
                value={editFormData.question}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, question: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={editFormData.description}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateDiscussion}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DashboardSection;
