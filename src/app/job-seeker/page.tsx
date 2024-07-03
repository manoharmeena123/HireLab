"use client";
import React, { useState } from "react";
import Link from "next/link";
import Profilesidebar from "../Profilesidebar";
import { useRouter } from "next/navigation";
import useAuthToken from "./../../hooks/useAuthToken";
import Select, { SingleValue } from "react-select";
import {
  useGetCollageQuery,
  useGetIndustryQuery,
  useGetDesignationQuery,
} from "@/store/global-store/global.query";

interface OptionType {
  value: string;
  label: string;
}

const JobSeeker: React.FC = () => {
  const { token, user } = useAuthToken();
  const router = useRouter();
  const { data: collageData } = useGetCollageQuery();
  const { data: industryData } = useGetIndustryQuery();
  const { data: designationData } = useGetDesignationQuery();
  const [selectedCollege, setSelectedCollege] = useState<SingleValue<OptionType>>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<SingleValue<OptionType>>(null);
  const [selectedDesignation, setSelectedDesignation] = useState<SingleValue<OptionType>>(null);

  const handleCollegeChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedCollege(selectedOption);
  };

  const handleIndustryChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedIndustry(selectedOption);
  };

  const handleDesignationChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedDesignation(selectedOption);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: 38,
      minHeight: 38,
    }),
  };

  const collegeOptions = collageData?.data?.map((college) => ({
    value: college.title,
    label: college.title,
  }));

  const industryOptions = industryData?.data?.map((industry) => ({
    value: industry.title,
    label: industry.title,
  }));

  const designationOptions = designationData?.data?.map((designation) => ({
    value: designation.title,
    label: designation.title,
  }));

  return (
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
                          <Select
                            styles={customStyles}
                            value={selectedCollege}
                            onChange={handleCollegeChange}
                            options={collegeOptions}
                            placeholder="Select College"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Current Designation:</label>
                          <Select
                            styles={customStyles}
                            value={selectedDesignation}
                            onChange={handleDesignationChange}
                            options={designationOptions}
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
                          <Select
                             menuPlacement="top"
                            styles={customStyles}
                            value={selectedIndustry}
                            onChange={handleIndustryChange}
                            options={industryOptions}
                            placeholder="Select Industry"
                          />
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
  );
};

export default JobSeeker;
