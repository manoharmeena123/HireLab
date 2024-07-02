"use client";
import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import Link from "next/link";
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
import styles from "./styles/PostJob.module.css";

interface JobData {
  company_name?: string;
  job_title?: string;
  experience?: string;
  job_type?: string;
  location?: string;
  address?: string;
  compensation?: string;
  additional_perk?: string[];
  joining_fee?: string;
  candidate_requirement?: string;
  maximum_education?: string;
  total_experience?: string | number;
  job_description?: string;
  [key: string]: any;
}

interface ModalPopupProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  onSubmit: (data: JobData) => void;
  selectedJob?: JobData;
}

const ModalPopup: React.FC<ModalPopupProps> = ({
  show,
  handleClose,
  title,
  onSubmit,
  selectedJob,
}) => {
  const [jobDatas, setJobDatas] = useState<JobData>(selectedJob || {});
  const { id = null, ...jobData } = selectedJob || {};

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJobDatas((prevData) => ({ ...prevData, [name]: value }));
    dispatch(setPostJobData({ [name]: value }));
  };

  // useEffect(()=>{

  // }.[])

  const dispatch = useDispatch();

  const errors = useSelector(selectPostJobErrors);
  const [postJob, { isLoading }] = usePostJobMutation();

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

  // Updated handleToggleSelect function to correctly dispatch the selected index for job_type
  const handleToggleSelect = (
    index: number,
    field: string,
    setSelectedState:
      | React.Dispatch<React.SetStateAction<number | null>>
      | React.Dispatch<React.SetStateAction<number[]>>,
    selectedState: number | null | number[],
    isMultiSelect = false
  ) => {
    console.log('index ', field ,index);
    
    let valueToDispatch: string | number | null;
  
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
      valueToDispatch = newSelected.join(",");
    } else {
      valueToDispatch = index === selectedState ? null : index;
      console.log('valueToDispatch', valueToDispatch);
      (setSelectedState as React.Dispatch<React.SetStateAction<number | null>>)(
        valueToDispatch
      );
      valueToDispatch = valueToDispatch !== null ? valueToDispatch.toString() : "";
    }
  
    // Update the jobDatas state
    setJobDatas((prevData) => ({ ...prevData, [field]: valueToDispatch }));
    
    // Dispatch the updated state to Redux
    dispatch(setPostJobData({ [field]: valueToDispatch }));
  };
  

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setJobDatas({ ...jobData, [event.target.name]: event.target.value });
  //   dispatch(setPostJobData({ [name]: value }));
  // };


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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {Object.keys(jobData).length > 0 && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const editedData = { ...jobDatas, id };
              onSubmit(editedData);
            }}
          >
            {Object.entries(jobData).map(([key, value]) => (
              <div key={key} className="form-group">
                <label htmlFor={key}>{key.toUpperCase()}</label>
                <input
                  type="text"
                  className="form-control"
                  id={key}
                  name={key}
                  defaultValue={value}
                  onChange={handleInputChange}
                />
              </div>
            ))}
            <input type="hidden" name="id" value={id} />
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        )} */}
        <div className="col-xl-9 col-lg-8 m-b30">
          <div className="job-bx submit-resume">
            <form
              method="post"
              onSubmit={(event) => {
                event.preventDefault();
                const editedData = { ...jobDatas, id };
                onSubmit(editedData);
              }}
              // className={styles.customScrollbar}
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
                            // value={jobData.company_name || ""}
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
                            className="job-time d-flex gap-3 mr-auto"
                            style={{ gap: "1rem", marginBottom: "26px" }}
                          >
                            {["Full Time", "Part Time", "Contract"].map(
                              (text, index) => (
                                <span
                                  key={index}
                                  style={spanStyles(
                                    isJobTypeHovered[index],
                                    selectedJobType === index + 1
                                  )}
                                  onMouseEnter={() =>
                                    handleMouseEnter(index, setIsJobTypeHovered)
                                  }
                                  onMouseLeave={() =>
                                    handleMouseLeave(index, setIsJobTypeHovered)
                                  }
                                  onClick={() =>
                                    // Changed: Calling handleToggleSelect with index + 1 for job_type
                                    handleToggleSelect(
                                      index + 1,
                                      "job_type",
                                      setSelectedJobType,
                                      selectedJobType
                                    )
                                  }
                                >
                                  {text}
                                </span>
                              )
                            )}
                          </div>

                          <span className="text-red-500 text-danger">
                            {errors?.job_type?.[0]}
                          </span>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="check1"
                              name="job_type"
                              onChange={(e) => handleInputChange(e as any)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="check1"
                            >
                              This is night shift job
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Location</label>
                          <div
                            className="job-time d-flex gap-3 mr-auto"
                            style={{ gap: "1rem" }}
                          >
                            {[
                              "Work From Office",
                              "Work From Home",
                              "Both Full Time & Part Time",
                            ].map((text, index) => (
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
                                {text}
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
                            {["Fixed Only", "Fixed + Incentive"].map(
                              (text, index) => (
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
                                  {text}
                                </span>
                              )
                            )}
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
                            {[
                              "Flexible Working Hour",
                              "Weekly Pay",
                              "Laptop",
                              "Travel Allowance (TA)",
                              "Annual Bonus",
                            ].map((text, index) => (
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
                                {text.replace(" +", "")}
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
                            {["10th", "12th", "Graduate"].map((text, index) => (
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
                                {text}
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
                Upload
              </button>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalPopup;
