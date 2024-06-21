"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Form } from "react-bootstrap";
import Image from "next/image";
import { CHECK_CREDENTIALS, IMAGE_URL, JOB_POST_URL } from "@/lib/apiEndPoints";
import { navigateSource } from "@/lib/action";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
var teamImg = require("../../images/team/pic1.jpg");

const Componypostjobs: React.FC = () => {
  // const { data ,status} = useSession();
  // const userSession = data as CustomSession;
  const [isHovered, setIsHovered] = useState(Array(15).fill(false));

  const router = useRouter();

	// useEffect(() => {
	// 	// Redirect to login page if no session exists and user is authenticated
	// 	if (!data) {
	// 	  router.push('/login');
	// 	}
	//   }, [data, status, router]);
  
  const [selectedIndexes, setSelectedIndexes] = useState({
    job_type: null,
    location: null,
    compensation: null,
    joining_fee: null,
    maximum_education: null,
    total_experience: null,
  });
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({
    company_name: [],
    job_title: [],
    job_type: [],
    experience: [],
    location: [],
    address: [],
    compensation: [],
    additonal_perk: [],
    joining_fee: [],
    candidate_requirement: [],
    maximum_education: [],
    total_experience: [],
    job_description: [],
  });
  const [profileData, setProfileData] = useState({
    company_name: "",
    job_title: "",
    job_type: "",
    experience: "",
    location: "",
    address: "",
    compensation: "",
    additonal_perk: "",
    joining_fee: "",
    candidate_requirement: "",
    maximum_education: "",
    total_experience: "",
    job_description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleMouseEnter = (index: number) => {
    const newHoverState = [...isHovered];
    newHoverState[index] = true;
    setIsHovered(newHoverState);
  };

  const handleMouseLeave = (index: number) => {
    const newHoverState = [...isHovered];
    newHoverState[index] = false;
    setIsHovered(newHoverState);
  };

  const handleToggleSelect = (index: number, field: string, value: string) => {
    setSelectedIndexes({ ...selectedIndexes, [field]: index });
    setProfileData({ ...profileData, [field]: value });
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
    border: `1px solid ${isHovered || isSelected ? "#0B66C3" : "#000"}`,
    color: isHovered || isSelected ? "#0B66C3" : "#000",
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

  useEffect(() => {
    axios
      .post(CHECK_CREDENTIALS, {}, {
        headers: {
          // Authorization: `Bearer ${userSession?.user?.data?.token}`,
        },
      })
      .then((data) => {
        setUser(data.data.user);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(JOB_POST_URL, profileData, {
        headers: {
          // Authorization: `Bearer ${userSession.user.data.token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        const response = res.data;
        setLoading(false);

        if (response?.code == 200) {
          navigateSource('/manage-job');
          toast.success("Post Job successfully!", {
            theme: "colored",
          });
        } else if (response?.code == 401) {
          toast.error(response?.message, { theme: "colored" });
        } else if (response?.code == 404) {
          setErrors(response?.data?.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error('Error posting job', err.response ? err.response.data : err.message);
      });
  };

  return (
    <>
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
                            <Image src={`${IMAGE_URL}${user?.image}`} alt="Company Logo" width={300} height={300} />
                          </Link>
                          <div
                            className="upload-link"
                            title="update"
                            data-toggle="tooltip"
                            data-placement="right"
                          >
                            <input type="file" className="update-flie" />
                            <i className="fa fa-pencil"></i>
                          </div>
                        </div>
                        <div className="candidate-title">
                          <h4 className="m-b5">
                            <Link href={"#"}>@COMPANY</Link>
                          </h4>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <Link href="/profile">
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Satya Profile</span>
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
                          <Link href="/change-password">
                            <i className="fa fa-key" aria-hidden="true"></i>
                            <span>Change Password</span>
                          </Link>
                        </li>

                        <li>
                          <Link href="/">
                            <i
                              className="fa fa-sign-out"
                              aria-hidden="true"
                            ></i>
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
                        style={{ fontFamily: '__Inter_Fallback_aaf875' }}
                      >
                        Back
                      </Link>
                    </div>

                    <form
                      method="post"
                      onSubmit={handleSubmit}
                      className="custom-scrollbar"
                      style={{
                        overflowX: "scroll",
                        overflowY: "scroll",
                        height: "700px",
                      }}
                    >
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Company you are hiring for</label>
                            <input
                              type="text"
                              className="form-control"
                              name="company_name"
                              onChange={(e) =>
                                setProfileData({ ...profileData, company_name: e.target.value })
                              }
                              placeholder="Enter Company Name"
                            />
                          </div>
                          <span className="text-red-500 text-danger">{errors?.company_name?.[0]}</span>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Job Title / Designation</label>
                            <input
                              type="text"
                              name="job_title"
                              onChange={(e) =>
                                setProfileData({ ...profileData, job_title: e.target.value })
                              }
                              placeholder="Enter a job title"
                              className="form-control tags_input"
                            />
                            <span className="text-red-500 text-danger">{errors?.job_title?.[0]}</span>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Experience</label>
                            <Form.Control
                              as="select"
                              name="experience"
                              onChange={(e) =>
                                setProfileData({ ...profileData, experience: e.target.value })
                              }
                              custom
                              className="custom-select"
                            >
                              <option>1 Years</option>
                              <option>2 Years</option>
                              <option>3 Years</option>
                              <option>4 Years</option>
                              <option>5 Years</option>
                            </Form.Control>
                          </div>
                          <span className="text-red-500 text-danger">{errors?.experience?.[0]}</span>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <div
                              className="job-time d-flex gap-3 mr-auto"
                              style={{ gap: "1rem", marginBottom: "26px" }}
                            >
                              {["Full Time", "Part Time", "Contract"].map((text, index) => (
                                <span
                                  key={index}
                                  style={spanStyles(isHovered[index], selectedIndexes.job_type === index)}
                                  onMouseEnter={() => handleMouseEnter(index)}
                                  onMouseLeave={() => handleMouseLeave(index)}
                                  onClick={() => handleToggleSelect(index, "job_type", text)}
                                >
                                  {text}
                                </span>
                              ))}
                            </div>
                            <span className="text-red-500 text-danger">{errors?.job_type?.[0]}</span>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="check1"
                                name="job_type"
                                onChange={(e) =>
                                  setProfileData({ ...profileData, job_type: e.target.innerText })
                                }
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
                              {["Work From Office", "Work From Home", "Both Full Time & Part Time"].map(
                                (text, index) => (
                                  <span
                                    key={index + 3}
                                    style={spanStyles(isHovered[index + 3], selectedIndexes.location === index + 3)}
                                    onMouseEnter={() => handleMouseEnter(index + 3)}
                                    onMouseLeave={() => handleMouseLeave(index + 3)}
                                    onClick={() => handleToggleSelect(index + 3, "location", text)}
                                  >
                                    {text}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                          <span className="text-red-500 text-danger">{errors?.location?.[0]}</span>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Office Address/Landmark</label>
                            <input
                              type="text"
                              name="address"
                              onChange={(e) =>
                                setProfileData({ ...profileData, address: e.target.value })
                              }
                              placeholder="Enter a address"
                              className="form-control tags_input"
                            />
                          </div>
                          <span className="text-red-500 text-danger">{errors?.address?.[0]}</span>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Compensation</label>
                            <div
                              className="job-time d-flex gap-3 mr-auto"
                              style={{ gap: "1rem" }}
                            >
                              {["Fixed Only", "Fixed + Incentive"].map((text, index) => (
                                <span
                                  key={index + 6}
                                  style={spanStyles(isHovered[index + 6], selectedIndexes.compensation === index + 6)}
                                  onMouseEnter={() => handleMouseEnter(index + 6)}
                                  onMouseLeave={() => handleMouseLeave(index + 6)}
                                  onClick={() => handleToggleSelect(index + 6, "compensation", text)}
                                >
                                  {text}
                                </span>
                              ))}
                            </div>
                            <span className="text-red-500 text-danger">{errors?.compensation?.[0]}</span>
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
                                "Flexible Working Hour ",
                                "Weekly Pay ",
                                "Laptop  ",
                                "Travel Allowance (TA) ",
                                "Annual Bonus ",
                              ].map((text, index) => (
                                <span
                                  key={index + 8}
                                  style={spanStyles(isHovered[index + 8], selectedIndexes.additonal_perk === index + 8)}
                                  onMouseEnter={() => handleMouseEnter(index + 8)}
                                  onMouseLeave={() => handleMouseLeave(index + 8)}
                                  onClick={() => handleToggleSelect(index + 8, "additonal_perk", text)}
                                >
                                  {text.replace(" +", "")}
                                  <span style={plusStyle}>+</span>
                                </span>
                              ))}
                            </div>
                            <span className="text-red-500 text-danger">{errors?.additonal_perk?.[0]}</span>
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
                                  key={index + 13}
                                  style={spanStyles(isHovered[index + 13], selectedIndexes.joining_fee === index + 13)}
                                  onMouseEnter={() => handleMouseEnter(index + 13)}
                                  onMouseLeave={() => handleMouseLeave(index + 13)}
                                  onClick={() => handleToggleSelect(index + 13, "joining_fee", text)}
                                >
                                  {text}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className="text-red-500 text-danger">{errors?.joining_fee?.[0]}</span>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Candidate Requirement</label>
                            <p>Requirement</p>
                            <input
                              type="text"
                              className="form-control"
                              name="candidate_requirement"
                              placeholder="Requirement"
                              onChange={(e) =>
                                setProfileData({ ...profileData, candidate_requirement: e.target.value })
                              }
                            />
                          </div>
                          <span className="text-red-500 text-danger">{errors?.candidate_requirement?.[0]}</span>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Maximum Education</label>
                            <div
                              className="job-time d-flex gap-3 mr-auto"
                              style={{ gap: "1rem" }}
                            >
                              {["10th", "12th", "Graduate"].map(
                                (text, index) => (
                                  <span
                                    key={index + 15}
                                    style={spanStyles(isHovered[index + 15], selectedIndexes.maximum_education === index + 15)}
                                    onMouseEnter={() => handleMouseEnter(index + 15)}
                                    onMouseLeave={() => handleMouseLeave(index + 15)}
                                    onClick={() => handleToggleSelect(index + 15, "maximum_education", text)}
                                  >
                                    {text}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                          <span className="text-red-500 text-danger">{errors?.maximum_education?.[0]}</span>
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
                                    key={index + 18}
                                    style={spanStyles(isHovered[index + 18], selectedIndexes.total_experience === index + 18)}
                                    onMouseEnter={() => handleMouseEnter(index + 18)}
                                    onMouseLeave={() => handleMouseLeave(index + 18)}
                                    onClick={() => handleToggleSelect(index + 18, "total_experience", text)}
                                  >
                                    {text}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                          <span className="text-red-500 text-danger">{errors?.total_experience?.[0]}</span>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Job Description</label>
                            <textarea className="form-control" name='job_description' placeholder="Job Description"
                              onChange={(e) =>
                                setProfileData({ ...profileData, job_description: e.target.value })
                              } ></textarea>
                          </div>
                        </div>
                        <span className="text-red-500 text-danger">{errors?.job_description?.[0]}</span>
                      </div>
                      <button type="submit" className="site-button m-b30" style={{ fontFamily: '__Inter_Fallback_aaf875' }}>
                        Upload
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
            background-color: #0b66c3; /* Blue color */
            border-radius: 10px;
            border: 3px solid #ffffff;
          }
          /* Firefox scrollbar */
          .custom-scrollbar {
            scrollbar-width: auto;
            scrollbar-color: #0b66c3 #f1f1f1;
          }
        `}</style>
      </div>
    </>
  );
}

export default Componypostjobs;
