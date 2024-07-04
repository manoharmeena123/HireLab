"use client";
import React, { useState } from "react";
import Link from "next/link";
import Profilesidebar from "@/markup/Element/Profilesidebar";
import { useRouter } from "next/navigation";
import { useAuthToken } from "../../hooks/useAuthToken";
import Select, { SingleValue } from "react-select";
import { usePostProfileMutation } from "./store/job-seeker.query";
import {
  useGetCollageQuery,
  useGetIndustryQuery,
  useGetDesignationQuery,
} from "@/store/global-store/global.query";
import { WritableProfileFormData } from "./types/index";
import { toast } from "react-toastify";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
interface OptionType {
  value: string; // Display value
  label: string; // Display label
  id: string; // Internal id as a number
}

const JobSeeker: React.FC = () => {
  const { token } = useAuthToken();
  const { user } = useLoggedInUser();
  const router = useRouter();
  const { data: collageData } = useGetCollageQuery();
  const { data: industryData } = useGetIndustryQuery();
  const { data: designationData } = useGetDesignationQuery();
  const [selectedCollege, setSelectedCollege] =
    useState<SingleValue<OptionType>>(null);
  const [selectedIndustry, setSelectedIndustry] =
    useState<SingleValue<OptionType>>(null);
  const [selectedDesignation, setSelectedDesignation] =
    useState<SingleValue<OptionType>>(null);
  const [postProfile] = usePostProfileMutation();

  const [profileForm, setProfileForm] = useState<WritableProfileFormData>({
    name: null,
    email: null,
    mobile_number: null,
    college: null,
    designation: null,
    company_name: null,
    experience: null,
    country: null,
    expected_ctc: null,
    resume: null,
    location: null,
    industry: null,
    image: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setProfileForm((prevForm) => ({
      ...prevForm,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSelectChange = (
    name: string,
    selectedOption: SingleValue<OptionType>
  ) => {
    setProfileForm((prevForm) => ({
      ...prevForm,
      [name]: selectedOption ? String(selectedOption.id) : null, // Convert id to string
    }));
  };

  const handleSelectElementChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfileForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(profileForm).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });
    try {
      await postProfile(formData).unwrap();
      toast.success("Profile Posted Successfully");
    } catch (error) {
      toast.error("Error in Profile");
    }
  };

  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: 38,
      minHeight: 38,
    }),
  };

  const collegeOptions =
    collageData?.data?.map((college) => ({
      value: college.title,
      label: college.title,
      id: college.id.toString(), // Ensure this is the correct id field
    })) || [];

  const industryOptions =
    industryData?.data?.map((industry) => ({
      value: industry.title,
      label: industry.title,
      id: industry.id.toString(), // Ensure this is the correct id field
    })) || [];

  const designationOptions =
    designationData?.data?.map((designation) => ({
      value: designation.title,
      label: designation.title,
      id: designation.id.toString(), // Ensure this is the correct id field
    })) || [];

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
                            placeholder="Enter Your Name"
                            name="name"
                            value={profileForm.name || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Email:</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Your Email"
                            name="email"
                            value={profileForm.email || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Mobile Number:</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Your Mobile Number"
                            name="mobile_number"
                            value={profileForm.mobile_number || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>College:</label>
                          <Select
                            styles={customStyles}
                            value={collegeOptions.find(
                              (option) =>
                                option.id === selectedCollege?.id.toString()
                            )}
                            onChange={(option) =>
                              handleSelectChange("college", option)
                            }
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
                            value={designationOptions.find(
                              (option) =>
                                option.id === selectedDesignation?.id.toString()
                            )}
                            onChange={(option) =>
                              handleSelectChange("designation", option)
                            }
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
                            name="company_name"
                            value={profileForm.company_name || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Year Of Experience:</label>
                          <select
                            className="form-control"
                            name="experience"
                            value={profileForm.experience || ""}
                            onChange={handleSelectElementChange}
                          >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="more than 5">more than 5</option>
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
                            name="expected_ctc"
                            value={profileForm.expected_ctc || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Resume Upload:</label>
                          <input
                            type="file"
                            className="form-control"
                            name="resume"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Location Preference (if any):</label>
                          <input
                            type="text"
                            placeholder="Location"
                            className="form-control"
                            name="location"
                            value={profileForm.location || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Industry:</label>
                          <Select
                            menuPlacement="top"
                            styles={customStyles}
                            value={industryOptions.find(
                              (option) =>
                                option.id === selectedIndustry?.id.toString()
                            )}
                            onChange={(option) =>
                              handleSelectChange("industry", option)
                            }
                            options={industryOptions}
                            placeholder="Industry"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Upload Image:</label>
                          <input
                            type="file"
                            className="form-control"
                            name="image"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Country:</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Country"
                            name="country"
                            value={profileForm.country || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="site-button m-b30">
                      Save Setting
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
