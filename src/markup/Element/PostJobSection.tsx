"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Form } from "react-bootstrap";
import Select, { SingleValue } from "react-select";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setPostJobData,
  setPostJobErrors,
} from "@/app/post-job/store/post-job.slice";
import {
  selectPostJobState,
  selectPostJobErrors,
} from "@/app/post-job/store/post-job.selectors";
import { usePostJobMutation } from "@/app/post-job/store/post-job.query";
import styles from "@/styles/PostJob.module.css";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useAuthToken } from "@/hooks/useAuthToken";
import { navigateSource } from "@/lib/action";
import { useLogoutMutation } from "@/app/login/store/login.query";
import {
  useGetLocationsQuery,
  useGetEducationsQuery,
  useGetTagsQuery,
  useGetJobTypeQuery,
  useGetCompensationsQuery,
  useGetAdditionalPerkQuery,
  useGetCtcDataQuery,
  useGetDesignationQuery,
  useGetSectorQuery,
  useGetExperienceQuery,
} from "@/store/global-store/global.query";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import Loading from "@/components/Loading";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import profileIcon from "../../images/favicon.png";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import Swal from "sweetalert2";
import { addNotificationToFirestore } from "@/app/notifications/firebaseConfig"; // Import the function
import { experienceOptions } from "@/data/indexSearch";

const PostJobSection = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const profileData = useSelector(selectPostJobState);
  const errors = useSelector(selectPostJobErrors);
  const { user, refetch } = useLoggedInUser();
  const [logout] = useLogoutMutation();
  const [postJob, { isLoading }] = usePostJobMutation();
  const { data: educationData, isLoading: educationDataLoading } =
    useGetEducationsQuery();
  const { data: locationData, isLoading: locationDataLoading } =
    useGetLocationsQuery();
  const { data: tagsData, isLoading: tagsDataLoading } = useGetTagsQuery();
  const { data: jobtTypeData, isLoading: jobtTypeDataLoading } =
    useGetJobTypeQuery();
  const { data: compensationData, isLoading: compensationDataLoading } =
    useGetCompensationsQuery();
  const { data: additionalPerkData, isLoading: additionalPerkDataLoading } =
    useGetAdditionalPerkQuery();
  const { data: designationData, isLoading: designationDataLoading } =
    useGetDesignationQuery(); // Fetch designation data
  const { data: getCtcData, isLoading: getCtcDataLoading } =
    useGetCtcDataQuery();
  const { data: getSectorData, isLoading: getSectorDataLoading } =
    useGetSectorQuery();
  const { data: getExperience } = useGetExperienceQuery();
  console.log("getExperience", getExperience);
  const { removeToken } = useAuthToken();
  const [isJobTypeHovered, setIsJobTypeHovered] = useState(
    Array(3).fill(false)
  );
  const [isLocationHovered, setIsLocationHovered] = useState(
    Array(3).fill(false)
  );
  const [isCompensationHovered, setIsCompensationHovered] = useState(
    Array(2).fill(false)
  );
  const [isAdditionalPerkHovered, setIsAdditionalPerkHovered] = useState(
    Array(5).fill(false)
  );
  const [isJoiningFeeHovered, setIsJoiningFeeHovered] = useState(
    Array(2).fill(false)
  );
  const [isMaximumEducationHovered, setIsMaximumEducationHovered] = useState(
    Array(3).fill(false)
  );
  const [isTotalExperienceHovered, setIsTotalExperienceHovered] = useState(
    Array(3).fill(false)
  );
  const [isTagHovered, setIsTagHovered] = useState(Array(10).fill(false));

  const [selectedJobType, setSelectedJobType] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [selectedCompensation, setSelectedCompensation] = useState<
    number | null
  >(null);
  const [selectedJoiningFee, setSelectedJoiningFee] = useState<number | null>(
    null
  );
  const [selectedMaximumEducation, setSelectedMaximumEducation] = useState<
    number | null
  >(null);
  const [selectedTotalExperience, setSelectedTotalExperience] = useState<
    number | null
  >(null);
  const [selectedAdditionalPerks, setSelectedAdditionalPerks] = useState<
    number[]
  >([]);
  const [selectedSalary, setSelectedSalary] =
    useState<SingleValue<OptionType>>(null);
  const [selectedSector, setSelectedSector] =
    useState<SingleValue<OptionType>>(null);

  const handleMouseEnter = (
    index: number,
    setIsHovered: React.Dispatch<React.SetStateAction<boolean[]>>
  ) => {
    setIsHovered((prev) =>
      prev.map((hovered, i) => (i === index ? true : hovered))
    );
  };

  const [selectedExperience, setSelectedExperience] = useState(null);

  const handleExperienceChange = (selectedOption: any) => {
    setSelectedExperience(selectedOption);
    dispatch(setPostJobData({ experience: selectedOption?.value || "" }));
  };

  const handleMouseLeave = (
    index: number,
    setIsHovered: React.Dispatch<React.SetStateAction<boolean[]>>
  ) => {
    setIsHovered((prev) =>
      prev.map((hovered, i) => (i === index ? false : hovered))
    );
  };

  const handleToggleSelect = (
    index: number,
    field: string,
    setSelectedState:
      | React.Dispatch<React.SetStateAction<number | null>>
      | React.Dispatch<React.SetStateAction<number[]>>,
    selectedState: number | null | number[],
    isMultiSelect = false
  ) => {
    if (isMultiSelect) {
      let newSelected: number[] = Array.isArray(selectedState)
        ? [...selectedState]
        : [];
      if (newSelected.includes(index)) {
        newSelected = newSelected.filter((i) => i !== index);
      } else {
        newSelected.push(index);
      }
      (setSelectedState as React.Dispatch<React.SetStateAction<number[]>>)(
        newSelected
      );
      dispatch(setPostJobData({ [field]: newSelected.join(",") }));
    } else {
      const valueToDispatch = index === selectedState ? null : index;
      (setSelectedState as React.Dispatch<React.SetStateAction<number | null>>)(
        valueToDispatch
      );
      dispatch(
        setPostJobData({
          [field]: valueToDispatch !== null ? valueToDispatch.toString() : "",
        })
      );
    }
  };
  const handleSubmit = async (status: any) => {
    console.log("status", status);
    dispatch(setPostJobData({ status })); // Adds status to the payload

    // Check if user has membership
    if (!user?.user?.membership) {
      const membershipResult = await Swal.fire({
        title: "No Membership Plan",
        text: "You don't have any membership plan to apply for jobs. Would you like to buy one?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Buy Subscription",
        cancelButtonText: "Go Back to Job",
      });

      if (membershipResult.isConfirmed) {
        router.push("/cart");
      } else {
        return;
      }
    } else {
      // Proceed with the job posting process
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You are about to ${
          status === "draft" ? "save as draft" : "publish"
        } this job.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Yes, ${
          status === "draft" ? "save draft" : "publish"
        } it!`,
        cancelButtonText: "No, cancel",
      });

      if (result.isConfirmed) {
        try {
          const response = await postJob(profileData).unwrap();
          if (response.code === 200) {
            Swal.fire({
              icon: "success",
              title: `Job ${status === "draft" ? "Drafted" : "Posted"}`,
              text: response?.message,
            });
            router.push("/manage-job");
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: response?.message,
            });
            dispatch(setPostJobErrors(response.errors));
          }
        } catch (err: any) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err?.message,
          });
        }
      }
    }
  };
  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [candidateRequirement, setCandidateRequirement] = useState<string>("");

  const handleInputSelectChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
    const tagValues = tags.join(",");
    dispatch(setPostJobData({ tags: tagValues }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const tagValues = tags.join(",");
    dispatch(setPostJobData({ tags: tagValues }));
    dispatch(setPostJobData({ [name]: value }));
  };

  const handleAddTag = (tag: string) => {
    setTags([...tags, tag]);
    setInputValue("");
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  const spanStyles = (isHovered: boolean, isSelected: boolean) => ({
    display: "flex",
    fontFamily: "Lato",
    padding: "8px 20px",
    justifyContent: "center",
    lineHeight: "24px",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: "16px",
    border: `1px solid ${isHovered || isSelected ? "#2A6310" : "#000"}`,
    color: isHovered || isSelected ? "#2A6310" : "#000",
    background: isHovered || isSelected ? "rgba(11, 102, 195, 0.10)" : "#FFF",
    transition: "color 0.3s, border-color 0.3s",
    margin: "5px",
    whiteSpace: "nowrap",
    cursor: "pointer",
  });

  const plusStyle = {
    fontSize: "1.5em",
    color: "#646464",
    background: "none",
    width: "14px",
    height: "21px",
    fontWeight: "bold",
  };

  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: 38,
      minHeight: 38,
    }),
  };

  const [designationOptions, setDesignationOptions] = useState<any[]>([]);
  const [designationLabel, setDesignationLabel] = useState<string>("");

  useEffect(() => {
    // Map designation options
    if (designationData?.data) {
      const options = designationData.data.map((designation: any) => ({
        value: designation.title,
        label: designation.title,
        id: designation.id.toString(),
      }));
      setDesignationOptions(options);
    }
  }, [designationData, refetch]);

  useEffect(() => {
    if (user && user.user?.designation_id !== null) {
      // Only proceed if user and designation_id are not null
      const designationId = user.user.designation_id.toString();
      const designation = designationOptions.find(
        (option) => option.id === designationId
      );
      if (designation) {
        setDesignationLabel(designation.label);
      } else {
        setDesignationLabel("Designation not found");
      }
    } else {
      setDesignationLabel("Designation not available");
    }
  }, [user, designationOptions, refetch]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "No, stay logged in",
    });

    if (result.isConfirmed) {
      try {
        await logout().unwrap();
        removeToken();
        navigateSource("/");
        Swal.fire(
          "Logged out!",
          "You have been logged out successfully.",
          "success"
        );
      } catch (error) {
        console.error("Logout failed:", error);
        Swal.fire(
          "Logout failed",
          "Failed to log out. Please try again.",
          "error"
        );
      }
    }
  };

  interface OptionType {
    value: string;
    label: string;
    id: string;
  }

  const ctcOptions: OptionType[] =
    getCtcData?.data?.map((ctc) => ({
      value: ctc.title,
      label: ctc.title,
      id: ctc.id.toString(),
    })) || [];

  const sectorOptions: OptionType[] =
    getSectorData?.data?.map((sector) => ({
      value: sector.name,
      label: sector.name,
      id: sector.id.toString(),
    })) || [];

  const handleSelectChange = (option: any) => {
    setSelectedSalary(option);
    dispatch(setPostJobData({ ctc: option?.id }));
  };

  const handleSectorSelectChange = (option: any) => {
    setSelectedSector(option);
    dispatch(setPostJobData({ sector: option?.id }));
  };

  return (
    <div className="page-content bg-white">
      <div className="content-block">
        <div className="section-full bg-white p-t50 p-b20">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-4 m-b30">
                <div className="sticky-top">
                  <div className="candidate-info company-info">
                    <div className="candidate-detail text-center">
                      <div className="canditate-des">
                        {user?.user?.image ? (
                          <Image
                            src={`${IMAGE_URL + user?.user?.image}`}
                            alt="profile picture"
                            width={300}
                            height={300}
                            onError={(e) =>
                              (e.currentTarget.src = "../../images/favicon.png")
                            } // Fallback image
                            style={{ borderRadius: "50%" }}
                          />
                        ) : (
                          <Image
                            src={profileIcon}
                            alt="profile picture"
                            width={300}
                            height={300}
                            onError={(e) =>
                              (e.currentTarget.src = "../../images/favicon.png")
                            } // Fallback image
                            style={{ borderRadius: "50%" }}
                          />
                        )}
                      </div>
                      <div className="candidate-title">
                        <h4 className="m-b5">
                          <Link href={"#"}>
                            {user?.user?.name || "User Name"}
                          </Link>
                        </h4>
                        <p className="m-b0">
                          <Link href={"#"}>
                            {designationLabel || "Not available"}
                          </Link>
                        </p>
                      </div>
                    </div>
                    {/* Sidebar Links */}
                    <ul>
                      <li>
                        <Link href="/job-poster-dashboard">
                          <i className="fa fa-heart-o" aria-hidden="true"></i>
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/manage-job">
                          <i className="fa fa-cog" aria-hidden="true"></i>
                          <span>Manage jobs</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/job-poster">
                          <i className="fa fa-user-o" aria-hidden="true"></i>
                          <span>Profile</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/post-job" className="active">
                          <i
                            className="fa fa-file-text-o"
                            aria-hidden="true"
                          ></i>
                          <span>Create new job</span>
                        </Link>
                      </li>
                      {/* <li>
                        <Link href="/job-posted">
                          <i className="fa fa-briefcase" aria-hidden="true"></i>
                          Job Posted
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link href="/my-resume">
                          <i
                            className="fa fa-file-text-o"
                            aria-hidden="true"
                          ></i>
                          My Resume
                        </Link>
                      </li>
                      <li>
                        <Link href="/saved-jobs">
                          <i className="fa fa-heart-o" aria-hidden="true"></i>
                          Saved Jobs
                        </Link>
                      </li>
                      <li>
                        <Link href="/applied-job">
                          <i className="fa fa-briefcase" aria-hidden="true"></i>
                          Applied Jobs
                        </Link>
                      </li>
                      <li>
                        <Link href="/job-alert">
                          <i className="fa fa-bell-o" aria-hidden="true"></i>
                          Job Alerts
                        </Link>
                      </li> */}
                      <li>
                        <Link href="/cv-manager">
                          <i className="fa fa-id-card-o" aria-hidden="true"></i>
                          CV Manager
                        </Link>
                      </li>
                      <li>
                        <Link href="/switch-plan">
                          <i className="fa fa-money" aria-hidden="true"></i>
                          Switch Plan
                        </Link>
                      </li>
                      <li>
                        <Link href="/transaction">
                          <i
                            className="fa fa-file-text-o"
                            aria-hidden="true"
                          ></i>
                          <span>Transaction</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <i className="fa fa-bar-chart" aria-hidden="true"></i>
                          <span>Analytics & Report</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <i className="fa fa-cog" aria-hidden="true"></i>
                          <span>Account Setting</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <i className="fa fa-life-ring" aria-hidden="true"></i>
                          <span>Support</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#" onClick={handleLogout}>
                          <i className="fa fa-sign-out" aria-hidden="true"></i>
                          <span>Log Out</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-8 m-b30">
                <div className="job-bx submit-resume">
                  <div className="job-bx-title clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">
                      Create new job
                    </h5>
                    <button
                      onClick={() => router.back()}
                      className="site-button right-arrow button-sm float-right"
                      style={{ fontFamily: "__Inter_Fallback_aaf875" }}
                    >
                      Back
                    </button>
                  </div>
                  <form
                    method="post"
                    onSubmit={handleSubmit}
                    className={styles.customScrollbar}
                  >
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Company you are hiring for</label>
                          <input
                            type="text"
                            className="form-control"
                            name="company_name"
                            onChange={handleInputChange}
                            placeholder="Enter Company Name"
                          />
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.company_name?.[0]}
                        </span>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Job Title / Designation</label>
                          <input
                            type="text"
                            name="job_title"
                            onChange={handleInputChange}
                            placeholder="Enter a job title"
                            className="form-control tags_input"
                          />
                          <span className="text-red-500 text-danger">
                            {errors?.job_title?.[0]}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Experience</label>
                          <Select
                            options={experienceOptions}
                            value={selectedExperience}
                            onChange={handleExperienceChange}
                            placeholder="Select experience"
                            isClearable
                            styles={{
                              menu: (provided) => ({
                                ...provided,
                                maxHeight: "500px", // Limits the height of the dropdown menu
                              }),
                              control: (base) => ({
                                ...base,
                                padding: "10px",
                                borderRadius: "20px",
                                border: "none",
                                boxShadow: "none",
                                backgroundColor: "#F8F8F8",
                                width: "100%",
                              }),
                              placeholder: (base) => ({
                                ...base,
                                color: "#6F6F6F",
                                fontSize: "15px",
                              }),
                            }}
                          />
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.experience?.[0]}
                        </span>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Job Type</label>
                          <div
                            className="job-time d-flex flex-wrap mr-auto"
                            style={{ gap: "1rem" }}
                          >
                            {jobtTypeData?.data?.map((job_type, index) => (
                              <div
                                key={job_type.id}
                                onClick={() =>
                                  handleToggleSelect(
                                    job_type.id,
                                    "job_type",
                                    setSelectedJobType,
                                    selectedJobType
                                  )
                                }
                                onMouseEnter={() =>
                                  handleMouseEnter(index, setIsJobTypeHovered)
                                }
                                onMouseLeave={() =>
                                  handleMouseLeave(index, setIsJobTypeHovered)
                                }
                                style={spanStyles(
                                  isJobTypeHovered[index],
                                  selectedJobType === job_type.id
                                )}
                              >
                                {job_type?.title}
                              </div>
                            ))}
                          </div>
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.job_type?.[0]}
                        </span>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Location</label>
                          <div
                            className="job-time d-flex gap-3 mr-auto"
                            style={{ gap: "1rem" }}
                          >
                            {locationData?.data?.map((text, index) => (
                              <span
                                key={index}
                                style={spanStyles(
                                  isLocationHovered[index],
                                  selectedLocation === index + 1
                                )}
                                onMouseEnter={() =>
                                  handleMouseEnter(index, setIsLocationHovered)
                                }
                                onMouseLeave={() =>
                                  handleMouseLeave(index, setIsLocationHovered)
                                }
                                onClick={() =>
                                  handleToggleSelect(
                                    index + 1,
                                    "location",
                                    setSelectedLocation,
                                    selectedLocation
                                  )
                                }
                              >
                                {text?.title}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.location?.[0]}
                        </span>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Compensation</label>
                          <div
                            className="job-time d-flex gap-3 mr-auto"
                            style={{ gap: "1rem" }}
                          >
                            {compensationData?.data?.map((text, index) => (
                              <span
                                key={index}
                                style={spanStyles(
                                  isCompensationHovered[index],
                                  selectedCompensation === index + 1
                                )}
                                onMouseEnter={() =>
                                  handleMouseEnter(
                                    index,
                                    setIsCompensationHovered
                                  )
                                }
                                onMouseLeave={() =>
                                  handleMouseLeave(
                                    index,
                                    setIsCompensationHovered
                                  )
                                }
                                onClick={() =>
                                  handleToggleSelect(
                                    index + 1,
                                    "compensation",
                                    setSelectedCompensation,
                                    selectedCompensation
                                  )
                                }
                              >
                                {text?.title}
                              </span>
                            ))}
                          </div>
                          <span className="text-red-500 text-danger">
                            {errors?.compensation?.[0]}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Do You Offer any additional Perks?</label>
                          <div
                            className="job-time d-flex flex-wrap mr-auto"
                            style={{ gap: "1rem" }}
                          >
                            {additionalPerkData?.data?.map((text, index) => (
                              <span
                                key={index}
                                style={spanStyles(
                                  isAdditionalPerkHovered[index],
                                  selectedAdditionalPerks.includes(index + 1)
                                )}
                                onMouseEnter={() =>
                                  handleMouseEnter(
                                    index,
                                    setIsAdditionalPerkHovered
                                  )
                                }
                                onMouseLeave={() =>
                                  handleMouseLeave(
                                    index,
                                    setIsAdditionalPerkHovered
                                  )
                                }
                                onClick={() =>
                                  handleToggleSelect(
                                    index + 1,
                                    "additional_perk",
                                    setSelectedAdditionalPerks,
                                    selectedAdditionalPerks,
                                    true
                                  )
                                }
                              >
                                {text?.title?.replace(" +", "")}
                                <span style={plusStyle}>+</span>
                              </span>
                            ))}
                          </div>
                          <span className="text-red-500 text-danger">
                            {errors?.additional_perk?.[0]}
                          </span>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>
                            Is There Any Joining Fee or Deposit Required from
                            the Candidate?
                          </label>
                          <div
                            className="job-time d-flex flex-wrap mr-auto"
                            style={{ gap: "1rem" }}
                          >
                            {["No", "YES"].map((text, index) => (
                              <span
                                key={index}
                                style={spanStyles(
                                  isJoiningFeeHovered[index],
                                  selectedJoiningFee === index + 1
                                )}
                                onMouseEnter={() =>
                                  handleMouseEnter(
                                    index,
                                    setIsJoiningFeeHovered
                                  )
                                }
                                onMouseLeave={() =>
                                  handleMouseLeave(
                                    index,
                                    setIsJoiningFeeHovered
                                  )
                                }
                                onClick={() =>
                                  handleToggleSelect(
                                    index + 1,
                                    "joining_fee",
                                    setSelectedJoiningFee,
                                    selectedJoiningFee
                                  )
                                }
                              >
                                {text}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.joining_fee?.[0]}
                        </span>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Maximum Education</label>
                          <div
                            className="job-time d-flex gap-3 mr-auto"
                            style={{ gap: "1rem" }}
                          >
                            {educationData?.data?.map((text, index) => (
                              <span
                                key={index}
                                style={spanStyles(
                                  isMaximumEducationHovered[index],
                                  selectedMaximumEducation === index + 1
                                )}
                                onMouseEnter={() =>
                                  handleMouseEnter(
                                    index,
                                    setIsMaximumEducationHovered
                                  )
                                }
                                onMouseLeave={() =>
                                  handleMouseLeave(
                                    index,
                                    setIsMaximumEducationHovered
                                  )
                                }
                                onClick={() =>
                                  handleToggleSelect(
                                    index + 1,
                                    "maximum_education",
                                    setSelectedMaximumEducation,
                                    selectedMaximumEducation
                                  )
                                }
                              >
                                {text?.name}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.maximum_education?.[0]}
                        </span>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Total Experience Required</label>
                          <div
                            className="job-time d-flex gap-3 mr-auto"
                            style={{ gap: "1rem" }}
                          >
                            {getExperience?.data?.map(
                              (text: any, index: any) => (
                                <span
                                  key={index}
                                  style={spanStyles(
                                    isTotalExperienceHovered[index],
                                    selectedTotalExperience === index + 1
                                  )}
                                  onMouseEnter={() =>
                                    handleMouseEnter(
                                      index,
                                      setIsTotalExperienceHovered
                                    )
                                  }
                                  onMouseLeave={() =>
                                    handleMouseLeave(
                                      index,
                                      setIsTotalExperienceHovered
                                    )
                                  }
                                  onClick={() =>
                                    handleToggleSelect(
                                      index + 1,
                                      "total_experience",
                                      setSelectedTotalExperience,
                                      selectedTotalExperience
                                    )
                                  }
                                >
                                  {text?.title}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.total_experience?.[0]}
                        </span>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Tags</label>
                          <div
                            className="job-time d-flex flex-wrap mr-auto"
                            style={{ gap: "1rem" }}
                          >
                            <div className="tags-container">
                              <ReactTagInput
                                tags={tags}
                                onChange={(newTags: any) => setTags(newTags)}
                                placeholder="Type tags and press Enter"
                              />
                            </div>
                          </div>
                          <span className="text-red-500 text-danger">
                            {errors?.tags?.[0]}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>CTC</label>
                          <Select
                            value={selectedSalary}
                            onChange={handleSelectChange}
                            options={ctcOptions}
                            placeholder="Select Salary"
                          />
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.ctc?.[0]}
                        </span>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Industry</label>
                          <Select
                            value={selectedSector}
                            onChange={handleSectorSelectChange}
                            options={sectorOptions}
                            placeholder="Select Industry"
                          />
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.sector?.[0]}
                        </span>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            name="city"
                            onChange={handleInputChange}
                            placeholder="Enter City"
                            className="form-control tags_input"
                          />
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.city?.[0]}
                        </span>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>State</label>
                          <input
                            type="text"
                            name="state"
                            onChange={handleInputChange}
                            placeholder="Enter State"
                            className="form-control tags_input"
                          />
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.state?.[0]}
                        </span>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Office Address/Landmark</label>
                          <input
                            type="text"
                            name="address"
                            onChange={handleInputChange}
                            placeholder="Enter a address"
                            className="form-control tags_input"
                          />
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.address?.[0]}
                        </span>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Candidate Requirement</label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={candidateRequirement}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setCandidateRequirement(data);
                              dispatch(
                                setPostJobData({ candidate_requirement: data })
                              );
                            }}
                          />
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.candidate_requirement?.[0]}
                        </span>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Job Description</label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={jobDescription}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setJobDescription(data);
                              dispatch(
                                setPostJobData({ job_description: data })
                              );
                            }}
                          />
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.job_description?.[0]}
                        </span>
                      </div>
                    </div>
                    <div className="button-group">
                      <button type="button" className="site-button m-b30" disabled>
                        Previous Job
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          handleSubmit("draft");
                        }}
                        style={{ marginLeft: "10px" }}
                        className="site-button m-b30"
                      >
                        {isLoading ? "Loading..." : "Save as Draft"}
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.preventDefault();
                          handleSubmit("publish");
                        }}
                        className="site-button m-b30"
                        style={{ marginLeft: "10px" }}
                      >
                        {isLoading ? "Loading..." : "Create New Job"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar {
          overflow: scroll;
          height: 700px;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #2a8310; /* Blue color */
          border-radius: 10px;
          border: 3px solid #ffffff;
        }
        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: auto;
          scrollbar-color: #2a8310 #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default PostJobSection;
