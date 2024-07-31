"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Form } from "react-bootstrap";
import Select, { SingleValue } from "react-select";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setPostJobData,
  setPostJobErrors,
} from "@/app/post-job/store/post-job.slice";
import {
  selectPostJobState,
  selectPostJobErrors,
} from "@/app/post-job/store/post-job.selectors";
import {
  usePostJobMutation,
  useUpdateJobMutation,
} from "@/app/post-job/store/post-job.query";
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
  useGetJobByIdMutation,
} from "@/store/global-store/global.query";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import Loading from "@/components/Loading";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const JobEditSection = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const profileData = useSelector(selectPostJobState);
  const errors = useSelector(selectPostJobErrors);
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [getJobs, { data: jobEditData, error, isLoading: getJobByIdLoading }] =
    useGetJobByIdMutation();
  const [updateJob, { isLoading: updateJobLoading, isError, isSuccess }] =
    useUpdateJobMutation();
  const { user, refetch } = useLoggedInUser();
  const [logout] = useLogoutMutation();
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
    useGetDesignationQuery();
  const { data: getCtcData, isLoading: getCtcDataLoading } =
    useGetCtcDataQuery();
  const { data: getSectorData, isLoading: getSectorDataLoading } =
    useGetSectorQuery();
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
  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState<string>("");

  const handleMouseEnter = (
    index: number,
    setIsHovered: React.Dispatch<React.SetStateAction<boolean[]>>
  ) => {
    setIsHovered((prev) =>
      prev.map((hovered, i) => (i === index ? true : hovered))
    );
  };

  const handleMouseLeave = (
    index: number,
    setIsHovered: React.Dispatch<React.SetStateAction<boolean[]>>
  ) => {
    setIsHovered((prev) =>
      prev.map((hovered, i) => (i === index ? false : hovered))
    );
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      removeToken();
      navigateSource("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await updateJob({
        ...profileData,
        id: jobId,
        job_type: selectedJobType?.toString() || "",
        experience: selectedTotalExperience?.toString() || "",
        location: selectedLocation?.toString() || "",
        compensation: selectedCompensation?.toString() || "",
        additional_perk: selectedAdditionalPerks.join(","),
      }).unwrap();
      if (response.code === 200) {
        toast.success("Job updated successfully!", { theme: "colored" });
        router.push("/manage-job");
      } else if (response.code === 401) {
        toast.error(response.message, { theme: "colored" });
      } else if (response.code === 404) {
        dispatch(setPostJobErrors(response.errors));
      } else {
        console.error("Unexpected error format:", response);
      }
    } catch (err) {
      console.error("Error updating job:", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(setPostJobData({ [name]: value }));
  };

  const handleSelectChange = (option: any, field: string) => {
    if (field === "ctc") {
      setSelectedSalary(option);
    } else if (field === "sector") {
      setSelectedSector(option);
    }
    dispatch(setPostJobData({ [field]: option?.id }));
  };

  useEffect(() => {
    if (jobId) {
      getJobs(jobId)
        .unwrap()
        .then((response: any) => {
          if (response.data) {
            const { data } = response;
            dispatch(setPostJobData(data));
            setSelectedJobType(data.job_type.id);
            setSelectedLocation(data.location.id);
            setSelectedCompensation(data.compensation.id);
            setSelectedJoiningFee(Number(data.joining_fee));
            setSelectedMaximumEducation(Number(data.maximum_education));
            setSelectedTotalExperience(Number(data.experience.id));
            setSelectedAdditionalPerks(
              data.additional_perk ? [data.additional_perk.id] : []
            );
            setTags(data.tags.split(","));
            setSelectedSalary({
              value: data.ctc.toString(),
              label: getCtcData?.data?.find(
                (ctc) => ctc.id.toString() === data.ctc.toString()
              )?.title,
              id: data.ctc.toString(),
            });
            setSelectedSector({
              value: data.sector.toString(),
              label: getSectorData?.data?.find(
                (sector) => sector.id.toString() === data.sector.toString()
              )?.name,
              id: data.sector.toString(),
            });
            setJobDescription(data.job_description);
          }
        })
        .catch((error) => {
          console.error("Error fetching job details:", error);
        });
    }
  }, [jobId, getJobs, dispatch, getCtcData, getSectorData]);

  interface OptionType {
    value: string;
    label: string | any;
    id: string;
  }

  const ctcOptions: OptionType[] =
    getCtcData?.data?.map((ctc) => ({
      value: ctc.id.toString(),
      label: ctc.title,
      id: ctc.id.toString(),
    })) || [];

  const sectorOptions: OptionType[] =
    getSectorData?.data?.map((sector) => ({
      value: sector.id.toString(),
      label: sector.name,
      id: sector.id.toString(),
    })) || [];

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
                        <Link href={"#"}>
                          <Image
                            src={`https://thinkdream.in/hirelab-api/public/images/${user?.user?.image}`}
                            alt="Company Logo"
                            width={300}
                            height={300}
                          />
                        </Link>
                      </div>
                      <div className="candidate-title">
                        <h4 className="m-b5">
                          <Link href={"#"}>
                            {user?.user?.name || "User Name"}
                          </Link>
                        </h4>
                        <p className="m-b0">
                          <Link href={"#"}>
                            {user?.user?.designation || "Not available"}
                          </Link>
                        </p>
                      </div>
                    </div>
                    <ul>
                    
                      <li>
                        <Link href="/job-poster">
                          <i className="fa fa-user-o" aria-hidden="true"></i>
                          <span>{user?.user?.name} Profile</span>
                        </Link>
                      </li>
                      <li>
                          <Link href="/dashboard-section">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <span>Dashboard</span>
                          </Link>
                        </li>
                      <li>
                        <Link className="active" href="/post-job">
                          <i
                            className="fa fa-file-text-o"
                            aria-hidden="true"
                          ></i>
                          <span>Post A job</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/credit-earned">
                          <i className="fa fa-heart-o" aria-hidden="true"></i>
                          <span>Credit Earned</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/manage-job">
                          <i className="fa fa-heart-o" aria-hidden="true"></i>
                          <span>Manage Jobs</span>
                        </Link>
                      </li>
                      
                      <li>
                        <Link href="/" onClick={handleLogout}>
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
                      Update Job
                    </h5>
                    <Link
                      href={"/company-profile"}
                      className="site-button right-arrow button-sm float-right"
                      style={{ fontFamily: "__Inter_Fallback_aaf875" }}
                    >
                      Back
                    </Link>
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
                            value={profileData.company_name}
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
                            value={profileData.job_title}
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
                          <Form.Control
                            as="select"
                            name="total_experience"
                            value={profileData.total_experience}
                            onChange={(e) => handleInputChange(e as any)}
                            className="custom-select"
                          >
                            <option selected>select experience</option>
                            <option value="0">0 Years</option>
                            <option value="1">1 Years</option>
                            <option value="2">2 Years</option>
                            <option value="3">3 Years</option>
                            <option value="4">4 Years</option>
                            <option value="5">5 Years</option>
                          </Form.Control>
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
                                  selectedLocation === text.id
                                )}
                                onMouseEnter={() =>
                                  handleMouseEnter(index, setIsLocationHovered)
                                }
                                onMouseLeave={() =>
                                  handleMouseLeave(index, setIsLocationHovered)
                                }
                                onClick={() =>
                                  handleToggleSelect(
                                    text.id,
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
                          <label>Office Address/Landmark</label>
                          <input
                            type="text"
                            name="address"
                            value={profileData.address}
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
                                  selectedCompensation === text.id
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
                                    text.id,
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
                                  selectedAdditionalPerks.includes(text.id)
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
                                    text.id,
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
                          <label>Candidate Requirement</label>
                          <input
                            type="text"
                            className="form-control"
                            name="candidate_requirement"
                            value={profileData.candidate_requirement}
                            placeholder="Requirement"
                            onChange={handleInputChange}
                          />
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.candidate_requirement?.[0]}
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
                                  selectedMaximumEducation === text.id
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
                                    text.id,
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
                            {["Fresher Only", "Experience Only", "Any"].map(
                              (text, index) => (
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
                                  {text}
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
                          <label>Ctc</label>
                          <Select
                            value={selectedSalary}
                            onChange={(option) =>
                              handleSelectChange(option, "ctc")
                            }
                            options={ctcOptions}
                            placeholder="Select Salary"
                          />
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.salary?.[0]}
                        </span>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Industry</label>
                          <Select
                            value={selectedSector}
                            onChange={(option) =>
                              handleSelectChange(option, "sector")
                            }
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
                          <label>Salary</label>
                          <input
                            type="number"
                            className="form-control"
                            name="salary"
                            value={profileData.salary}
                            placeholder="Enter salary in rupee"
                            onChange={handleInputChange}
                          />
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.salary?.[0]}
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
                    <button
                      type="submit"
                      className="site-button m-b30"
                      style={{ fontFamily: "__Inter_Fallback_aaf875" }}
                    >
                      {updateJobLoading ? "Loading..." : "Upload"}
                    </button>
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

export default JobEditSection;
