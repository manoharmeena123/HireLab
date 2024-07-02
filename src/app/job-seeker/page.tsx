"use client";
import React, { useState } from "react";
import Link from "next/link";
import Profilesidebar from "../Profilesidebar";
import { useRouter } from "next/navigation";
import useAuthToken from "./../../hooks/useAuthToken";
import {
  useGetCollageQuery,
  useGetIndustryQuery,
} from "@/store/global-store/global.query";

const JobSeeker = () => {
  const { token, user } = useAuthToken();
  const router = useRouter();
  const { data: collageData } = useGetCollageQuery();
  const { data: industryData } = useGetIndustryQuery();
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const handleCollegeChange = (e: any) => {
    setSelectedCollege(e.target.value);
  };
  const handleIndusrtyChange = (e: any) => {
    setSelectedIndustry(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Profilesidebar />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx job-profile">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Basic Information
                      </h5>
                      <Link
                        href={"/"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="row m-b30">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Your Name:</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Alexander Weir"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Email:</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Web Designer"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Mobile Number:</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="12323232342"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>College:</label>
                            <select
                              className="form-control"
                              value={selectedCollege}
                              onChange={handleCollegeChange}
                            >
                              <option value="" disabled selected>
                                Select College
                              </option>
                              {collageData &&
                                collageData?.data?.map(
                                  (college: any, index: number) => (
                                    <option key={index} value={college.title}>
                                      {college.title}
                                    </option>
                                  )
                                )}
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Current Designation:</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Current Designation"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Current Company:</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Company"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Year Of Experience:</label>
                            <select className="form-control">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>more than 5</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Expected CTC:</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="2500$"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Resume Upload:</label>
                            <input type="file" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Location Preference (if any):</label>
                            <input
                              type="text"
                              placeholder="Location"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Industry:</label>
                            <select
                              className="form-control"
                              value={selectedIndustry}
                              onChange={handleIndusrtyChange}
                            >
                              <option value="" disabled selected>
                                Select Industry
                              </option>
                              {industryData &&
                                industryData?.data?.map(
                                  (industry: any, index: number) => (
                                    <option key={index} value={industry?.title}>
                                      {industry?.title}
                                    </option>
                                  )
                                )}
                            </select>
                          </div>
                        </div>
                      </div>

                      <button type="submit" className="site-button m-b30">
                        Submit Form
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

export default JobSeeker;
