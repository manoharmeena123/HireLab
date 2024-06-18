"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Form } from "react-bootstrap";
import Image from "next/image";
import { CHECK_CREDENTIALS, IMAGE_URL, JOB_POST_URL } from "@/lib/apiEndPoints";
import { navigateSource } from "@/lib/action";
import axios from "axios";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { toast } from "react-toastify";

var teamImg = require("../../images/team/pic1.jpg");

function Componypostjobs() {
  const { data } = useSession();
	const userSession = data as CustomSession;
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);
  const [isHovered6, setIsHovered6] = useState(false);
  const [isHovered7, setIsHovered7] = useState(false);
  const [isHovered8, setIsHovered8] = useState(false);
  const [isHovered, setIsHovered] = useState(Array(15).fill(false));
  const [isSelected, setIsSelected] = useState(Array(15).fill(false));

  const handleMouseEnter = (index) => {
    const newHoverState = [...isHovered];
    newHoverState[index] = true;
    setIsHovered(newHoverState);
  };

  const handleMouseLeave = (index) => {
    const newHoverState = [...isHovered];
    newHoverState[index] = false;
    setIsHovered(newHoverState);
  };

  const handleToggleSelect = (index) => {
    const newSelectState = [...isSelected];
    newSelectState[index] = !newSelectState[index];
    setIsSelected(newSelectState);
  };

  const spanStyles = (isHovered, isSelected) => ({
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
    cursor: "pointer"
  });

  const plusStyle = {
    fontSize: "1.5em",
    color: "#646464",
    background: "none",
    width: "14px",
    height: "21px",
    fontWeight: "bold",
  };

  
  const [user,setUser] = useState({});
  
  const [errors, setErrors] = useState({
    company_name: [],
    job_title: [],
    job_type: [],
    experience: [],
    location : [],
    address: [],
    compensation: [],
    additonal_perk : [],
    joining_fee : [],
    candidate_requirement : [],
    maximum_education : [],
    total_experience : [],
    job_description : [],
  });
  const [profileData,setProfileData] = useState({
    company_name: "",
    job_title: "",
    job_type: "",
    experience: "",
    location : "",
    address: "",
    compensation: "",
    additonal_perk : "",
    joining_fee : "",
    candidate_requirement : "",
    maximum_education : "",
    total_experience : "",
    job_description : "",
  });
  const [loading,setLoading] = useState(false);
  
  useEffect(()=>{
    axios.post(CHECK_CREDENTIALS,{
      headers: {
        Authorization:`Bearer ${userSession?.user?.data?.token}`,
      }
    }).then((data) => {
      setUser(data.data.user);
      });
  },[]); 
  //alert(profileData.location);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(profileData);
    axios
    .post(JOB_POST_URL, profileData, {
      headers: {
        Authorization:`Bearer ${userSession.user.data.token}`,
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
      }else if (response?.code == 404) {
        
        setLoading(false);
        setErrors(response?.data?.error);
      }
    })
    .catch((err) => {
      setLoading(false);
      // setErrors(err?.response?.data?.errors);
    });
  }

  return (
    <>
      {/* <h1>{JSON.stringify(data.user.data.name)}</h1> */}
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
                        style={{fontFamily:'__Inter_Fallback_aaf875'}}
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

                                <span
                                  name="job_type"
                                  onChange={(e) =>
                                    setProfileData({ ...profileData, job_type: e.target.value })
                                  } 
                                  style={spanStyles(isHovered1)}
                                  onMouseEnter={() => setIsHovered1(true)}
                                  onMouseLeave={() => setIsHovered1(false)}
                                >
                                  Full Time
                                </span>
                              
                                <span
                                name="job_type"
                                onChange={(e) =>
                                  setProfileData({ ...profileData, job_type: e.target.value })
                                } 
                                  style={spanStyles(isHovered2)}
                                  onMouseEnter={() => setIsHovered2(true)}
                                  onMouseLeave={() => setIsHovered2(false)}
                                >
                                  Part Time
                                </span>
                              
                                <span
                                  name="job_type"
                                  onChange={(e) =>
                                    setProfileData({ ...profileData, job_type: e.target.value })
                                  } 
                                  style={spanStyles(isHovered3)}
                                  onMouseEnter={() => setIsHovered3(true)}
                                  onMouseLeave={() => setIsHovered3(false)}
                                >
                                  Contract
                                </span>
                                <span className="text-red-500 text-danger">{errors?.job_type?.[0]}</span>
                            </div>

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
                              
                                <span
                                name="location"
                                onClick={(e) =>
                                  setProfileData({ ...profileData, location: e.target.innerText })
                                } 
                                  style={spanStyles(isHovered4)}
                                  onMouseEnter={() => setIsHovered4(true)}
                                  onMouseLeave={() => setIsHovered4(false)}
                                >
                                  Work From Office
                                </span>
                              
                              
                                <span
                                name="location"
                                onClick={(e) =>
                                  setProfileData({ ...profileData, location: e.target.innerText })
                                } 
                                  style={spanStyles(isHovered5)}
                                  onMouseEnter={() => setIsHovered5(true)}
                                  onMouseLeave={() => setIsHovered5(false)}
                                >
                                  Work From Home
                                </span>
                              
                                <span
                                name="location"
                                onClick={(e) =>
                                  setProfileData({ ...profileData, location: e.target.innerText })
                                } 
                                  style={spanStyles(isHovered6)}
                                  onMouseEnter={() => setIsHovered6(true)}
                                  onMouseLeave={() => setIsHovered6(false)}
                                >
                                  Both Full Time & Part Time
                                </span>
                              
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

                                <span
                                name="compensation"
                                onChange={(e) =>
                                  setProfileData({ ...profileData, compensation: e.target.innerText })
                                } 
                                  style={spanStyles(isHovered7)}
                                  onMouseEnter={() => setIsHovered7(true)}
                                  onMouseLeave={() => setIsHovered7(false)}
                                >
                                  Fixed Only
                                </span>
                              
                                <span
                                name="compensation"
                                onChange={(e) =>
                                  setProfileData({ ...profileData, compensation: e.target.innerText })
                                } 
                                  style={spanStyles(isHovered8)}
                                  onMouseEnter={() => setIsHovered8(true)}
                                  onMouseLeave={() => setIsHovered8(false)}
                                >
                                  Fixed + Incentive
                                </span>
                              
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
                                  name='additonal_perk'
                                  onClick={(e) =>
                                    setProfileData({ ...profileData, additonal_perk : e.target.innerText })
                                  } 
                                    style={spanStyles(isHovered[index])}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
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
                                  name='joining_fee'
                                  onChange={(e) =>
                                    setProfileData({ ...profileData, joining_fee : e.target.innerText })
                                  } 
                                    style={spanStyles(isHovered[index + 5])}
                                    onMouseEnter={() =>
                                      handleMouseEnter(index + 5)
                                    }
                                    onMouseLeave={() =>
                                      handleMouseLeave(index + 5)
                                    }
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
                            <input type="text" 
                            className="form-control"
                            name="candidate_requirement"
                            placeholder="Requirement"
                            onChange={(e) =>
                              setProfileData({ ...profileData, candidate_requirement : e.target.value })
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
                                      name='maximum_education'
                                      onChange={(e) =>
                                        setProfileData({ ...profileData, maximum_education : e.target.innerText })
                                      } 
                                      style={spanStyles(isHovered[index + 7])}
                                      onMouseEnter={() =>
                                        handleMouseEnter(index + 7)
                                      }
                                      onMouseLeave={() =>
                                        handleMouseLeave(index + 7)
                                      }
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
                                    name='total_experience'
                                    onChange={(e) =>
                                      setProfileData({ ...profileData, total_experience : e.target.innerText })
                                    } 
                                      style={spanStyles(isHovered[index + 10])}
                                      onMouseEnter={() =>
                                        handleMouseEnter(index + 10)
                                      }
                                      onMouseLeave={() =>
                                        handleMouseLeave(index + 10)
                                      }
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
                                      setProfileData({ ...profileData, job_description : e.target.value })
                                    } ></textarea>
                          </div>
                        </div>
                        <span className="text-red-500 text-danger">{errors?.job_description?.[0]}</span>
                      </div>
                      <button type="submit" className="site-button m-b30" style={{fontFamily:'__Inter_Fallback_aaf875'}}>
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
