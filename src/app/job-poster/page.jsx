"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Form } from "react-bootstrap";
import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { useRouter } from 'next/navigation';

const Companyprofile = () => {
  // const router = useRouter();
  // const { data: session, status } = useSession();

//  console.log('session', session,status)
  const [profileData, setProfileData] = useState({
    company_name: "",
    email: "",
    website: "",
    founded_date: "",
    category: "",
    country: "",
    description: "",
    phone: "",
    city: "",
    zip: "",
    address: "",
    facebook: "",
    twitter: "",
    google: "",
    linkedin: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(profileData);
  }

  // useEffect(() => {
  //   // Redirect to login page if no session exists and user is authenticated
  //   if (!session) {
  //     router.push('/login');
  //   }
  // }, [session, status, router]);

  
  return (
    <>
      ss
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
                              src={require("../../images/logo/icon3.jpg")}
                              alt="Company Logo"
                            />
                          </Link>
                          {/* <div
                            className="upload-link"
                            title="update"
                            data-toggle="tooltip"
                            data-placement="right"
                          >
                            <input type="file" className="update-flie" />
                            <i className="fa fa-pencil"></i>
                          </div> */}
                        </div>
                        <div className="candidate-title">
                          <h4 className="m-b5">
                            <Link href={"#"}>@COMPANY</Link>
                          </h4>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <Link href="/profile" className="active">
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Satya Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/post-job">
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
                        SATYA'S Profile
                      </h5>
                      <Link
                        href={"/company-profile"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <form method="post" onSubmit={handleSubmit}>
                      <div className="row m-b30">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Company Name</label>
                            <input
                              type="text"
                              name="company_name"
                              className="form-control"
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  company_name: e.target.value,
                                })
                              }
                              placeholder="Enter Company Name"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Your Email</label>
                            <input
                              type="email"
                              name="email"
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  email: e.target.value,
                                })
                              }
                              className="form-control"
                              placeholder="info@gmail.com"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Website</label>
                            <input
                              type="text"
                              name="website"
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  website: e.target.value,
                                })
                              }
                              className="form-control"
                              placeholder="Website Link"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Founded Date </label>
                            <input
                              type="text"
                              name="founded_date"
                              className="form-control"
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  founded_date: e.target.value,
                                })
                              }
                              placeholder="17/12/2018"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Category</label>
                            <Form.Control
                              as="select"
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  category: e.target.value,
                                })
                              }
                              name="category"
                              className="custom-select"
                            >
                              <option>Web Designer</option>
                              <option>Web Developer</option>
                            </Form.Control>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Description:</label>
                            <textarea
                              className="form-control"
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  description: e.target.value,
                                })
                              }
                              name="description"
                              rows="4"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Contact Information
                        </h5>
                      </div>
                      <div className="row m-b30">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Phone</label>
                            <input
                              type="text"
                              name="phone"
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  phone: e.target.value,
                                })
                              }
                              className="form-control"
                              placeholder="+1 123 456 7890"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Country</label>
                            <input
                              type="text"
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  country: e.target.value,
                                })
                              }
                              name="country"
                              className="form-control"
                              placeholder="India"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>City</label>
                            <input
                              type="text"
                              name="city"
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  city: e.target.value,
                                })
                              }
                              className="form-control"
                              placeholder="Delhi"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Zip</label>
                            <input
                              type="text"
                              name="zip"
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  zip: e.target.value,
                                })
                              }
                              className="form-control"
                              placeholder="504030"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              name="address"
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  address: e.target.value,
                                })
                              }
                              className="form-control"
                              placeholder="New York City"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Map
                        </h5>
                      </div>
                      <div className="row m-b30">
                        {/* <div className="col-lg-12 col-md-12">
                          <GoogleMaps
                            apiKey={"AIzaSyBPDjB2qkV4Yxn9h0tGSk2X5uH6NKmssXw"}
                            style={{ height: "250px", width: "100%", border: "0" }}
                            zoom={6}
                            center={{ lat: 37.4224764, lng: -122.0842499 }}
                            markers={{ lat: 37.4224764, lng: -122.0842499 }} // optional
                          />
                        </div> */}
                      </div>
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Social link
                        </h5>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Facebook</label>
                            <input
                              type="text"
                              name="facebook"
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  facebook: e.target.value,
                                })
                              }
                              className="form-control"
                              placeholder="https://www.facebook.com/"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Twitter</label>
                            <input
                              type="text"
                              name="twitter"
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  twitter: e.target.value,
                                })
                              }
                              className="form-control"
                              placeholder="https://www.twitter.com/"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Google</label>
                            <input
                              type="text"
                              name="google"
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  google: e.target.value,
                                })
                              }
                              className="form-control"
                              placeholder="https://www.google.com/"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Linkedin</label>
                            <input
                              type="text"
                              name="linkedin"
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  linkedin: e.target.value,
                                })
                              }
                              className="form-control"
                              placeholder="https://www.linkedin.com/"
                            />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="site-button m-b30">
                        Update Setting
                      </button>
                    </form>
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

export default Companyprofile;
