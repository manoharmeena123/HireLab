"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Form } from "react-bootstrap";
import Select, { MultiValue } from "react-select";
import Image from "next/image";
import { IMAGE_URL } from "@/lib/apiEndPoints";
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
import {
  useGetLocationsQuery,
  useGetEducationsQuery,
  useGetTagsQuery,
  useGetJobTypeQuery,
  useGetCompensationsQuery,
  useGetAdditionalPerkQuery,
} from "@/store/global-store/global.query";
import styles from "./styles/PostJob.module.css"; // Assuming you have a CSS module file
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useGetDesignationQuery } from "@/store/global-store/global.query";

const Componypostjobs = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const profileData = useSelector(selectPostJobState);
  const [selectedTags, setSelectedTags] = useState<
    MultiValue<{ value: string; label: string }>
  >([]);
  const errors = useSelector(selectPostJobErrors);
  const { user, refetch } = useLoggedInUser();

  // queries
  const [postJob, { isLoading }] = usePostJobMutation();
  const { data: educationData } = useGetEducationsQuery();
  const { data: locationData } = useGetLocationsQuery();
  const { data: tagsData } = useGetTagsQuery();
  const { data: jobtTypeData } = useGetJobTypeQuery();
  const { data: compensationData } = useGetCompensationsQuery();
  const { data: additionalPerkData } = useGetAdditionalPerkQuery();

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(setPostJobData({ [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await postJob(profileData).unwrap();
      if (response.code === 200) {
        toast.success("Post Job successfully!", { theme: "colored" });
        router.push("/manage-job");
      } else if (response.code === 401) {
        toast.error(response.message, { theme: "colored" });
      } else if (response.code === 404) {
        dispatch(setPostJobErrors(response.errors));
      } else {
        console.error("Unexpected error format:", response);
      }
    } catch (err) {
      console.error("Error posting job:", err);
    }
  };

  const handleTagChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>
  ) => {
    setSelectedTags(selectedOptions);
    const tagValues = selectedOptions.map((option) => option.value).join(",");
    dispatch(setPostJobData({ tags: tagValues }));
  };

  const tagOptions = tagsData?.data?.map((tag) => ({
    value: tag.id.toString(), // Ensure tag value is a string
    label: tag.title,
  }));

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

  const { data: designationData } = useGetDesignationQuery(); // Fetch designation data

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
                            {designationLabel || "Not available"}
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
                        <Link href="/">
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
                      Post A Job
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
                          <Form.Control
                            as="select"
                            name="experience"
                            onChange={(e) => handleInputChange(e as any)}
                            className="custom-select"
                          >
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
                                    index,
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
                            <Select
                              isMulti
                              options={tagOptions}
                              value={selectedTags}
                              onChange={handleTagChange}
                              placeholder="Select tags"
                            />
                          </div>
                        </div>
                        <span className="text-red-500 text-danger">
                          {errors?.tags?.[0]}
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
                          <label>Candidate Requirement</label>
                          <input
                            type="text"
                            className="form-control"
                            name="candidate_requirement"
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
                          <label>Salary</label>
                          <input
                            type="number"
                            className="form-control"
                            name="salary"
                            placeholder="Salary"
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
                          <textarea
                            className="form-control"
                            name="job_description"
                            placeholder="Job Description"
                            onChange={handleInputChange}
                          ></textarea>
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
                      {isLoading ? "Loading..." : "Upload"}
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

export default Componypostjobs;
