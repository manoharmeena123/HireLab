"use client";
// src/components/JobSeekerSection.tsx
import React, { useState, useEffect } from "react";
import Profilesidebar from "@/markup/Element/Profilesidebar";
import { useRouter } from "next/navigation";
import { useAuthToken } from "../../hooks/useAuthToken";
import Select, { SingleValue } from "react-select";
import { usePostProfileMutation } from "@/app/job-seeker/store/job-seeker.query";
import {
  useGetCollageQuery,
  useGetSectorQuery,
  useGetDesignationQuery,
  useGetCtcDataQuery,
} from "@/store/global-store/global.query";
import { WritableProfileFormData } from "@/app/job-seeker/types/index";
import { toast } from "react-toastify";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import Loading from "@/components/Loading";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import Image from "next/image";
import { Modal, Button } from "react-bootstrap"; // Importing modal from react-bootstrap
import { navigateSource } from "@/lib/action";

interface OptionType {
  value: string;
  label: string;
  id: string;
}

const JobSeekerSection = () => {
  const { token } = useAuthToken();
  const { user, refetch } = useLoggedInUser();
  const router = useRouter();
  const { data: collageData, isLoading: collageDataLoading } = useGetCollageQuery();
  const { data: getSectorData, isLoading: getSectorDataLoading } = useGetSectorQuery();
  const { data: designationData, isLoading: designationDataLoading } = useGetDesignationQuery();
  const { data: getCtcData, isLoading: getCtcDataLoading } = useGetCtcDataQuery();

   const [isProfileComplete, setIsProfileComplete] = useState(false); 

  const [selectedCollege, setSelectedCollege] = useState<SingleValue<OptionType> | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<SingleValue<OptionType> | null>(null);
  const [selectedDesignation, setSelectedDesignation] = useState<SingleValue<OptionType> | null>(null);
  const [selectedCtc, setSelectedCtc] = useState<SingleValue<OptionType> | null>(null);

  const [postProfile] = usePostProfileMutation();
  const [resumeName, setResumeName] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
   const [saveLoading, setSaveLoading] = useState(false)
  const [profileForm, setProfileForm] = useState<WritableProfileFormData>({
    name: "",
    email: "" || null,
    mobile_number: "",
    college: "",
    designation: "",
    company_name: "",
    experience: "",
    country: "",
    expected_ctc: "",
    resume: null,
    location: "",
    industry: "",
    image: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  // Options State
  const [collegeOptions, setCollegeOptions] = useState<OptionType[]>([]);
  const [getSectorDataOptions, setGetSectorDataOptions] = useState<OptionType[]>([]);
  const [designationOptions, setDesignationOptions] = useState<OptionType[]>([]);
  const [ctcOptions, setCtcOptions] = useState<OptionType[]>([]);

  // Fetch and set options
  useEffect(() => {
    if (collageData?.data) {
      const options: OptionType[] = collageData.data.map((college: any) => ({
        value: college.title,
        label: college.title,
        id: college.id.toString(),
      }));
      setCollegeOptions(options);
    }

    if (getSectorData?.data) {
      const options: OptionType[] = getSectorData.data.map((industry: any) => ({
        value: industry.name,
        label: industry.name,
        id: industry.id.toString(),
      }));
      setGetSectorDataOptions(options);
    }

    if (designationData?.data) {
      const options: OptionType[] = designationData.data.map((designation: any) => ({
        value: designation.title,
        label: designation.title,
        id: designation.id.toString(),
      }));
      setDesignationOptions(options);
    }

    if (getCtcData?.data) {
      const options: OptionType[] = getCtcData.data.map((ctc: any) => ({
        value: ctc.title,
        label: ctc.title,
        id: ctc.id.toString(),
      }));
      setCtcOptions(options);
    }
  }, [collageData, getSectorData, designationData, getCtcData]);

  // Set user data to form and check profile completeness
  useEffect(() => {
    if (user && collageData && getSectorData && designationData && getCtcData) {
      setProfileForm({
        name: user.user.name || "",
        email: user.user.email || "",
        mobile_number: user.user.mobile_number || "",
        college: user.user.college_id?.toString() || "",
        designation: user.user.designation_id?.toString() || "",
        company_name: user.user.company_name || "",
        experience: user.user.experience || "",
        country: user.user.country || "",
        expected_ctc: user.user.expected_ctc || "",
        resume: user.user.resume || null,
        location: user.user.location || "",
        industry: user.user.industry_id?.toString() || "",
        image: user.user.image || null,
      });

      setSelectedCollege(collegeOptions.find((option) => option.id === user.user.college_id?.toString()) || null);
      setSelectedIndustry(getSectorDataOptions.find((option) => option.id === user.user.industry_id?.toString()) || null);
      setSelectedDesignation(designationOptions.find((option) => option.id === user.user.designation_id?.toString()) || null);
      setSelectedCtc(ctcOptions.find((option) => option.id === user.user.expected_ctc?.toString()) || null);

      if (user.user.resume) setResumeName(user.user.resume);
      if (user.user.image) {
        setImageName(user.user.image);
        setImagePreviewUrl(`${IMAGE_URL}/${user.user.image}`);
      }

      // Check if profile is complete
      const isProfileComplete = checkProfileCompletion(user.user, {
        college: user.user.college_id?.toString(),
        designation: user.user.designation_id?.toString(),
        industry: user.user.industry_id?.toString(),
        expected_ctc: user.user.expected_ctc?.toString(),
      });
      setIsProfileComplete(isProfileComplete); 
      if (!isProfileComplete) {
        setShowModal(true);
      }
    }
  }, [user, collageData, getSectorDataOptions, designationOptions, ctcOptions]);

  // Function to check profile completeness
  const checkProfileCompletion = (userData: any, additionalFields: any) => {
    const requiredFields = [
      "name",
      "email",
      "mobile_number",
      "college",
      "designation",
      "company_name",
      "experience",
      "country",
      "expected_ctc",
      "location",
      "industry",
      "image",
    ];

    for (const field of requiredFields) {
      const value = field in additionalFields ? additionalFields[field] : userData[field];
      if (!value || value === "" || value === null || value === undefined) {
        return false;
      }
    }
    return true;
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      if (name === "resume") {
        setProfileForm((prevForm) => ({ ...prevForm, resume: file }));
        setResumeName(file.name);
      } else if (name === "image") {
        setProfileForm((prevForm) => ({ ...prevForm, image: file }));
        setImageName(file.name);
        setImagePreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setProfileForm((prevForm) => ({ ...prevForm, [name]: value }));
      // Clear validation error for the field
      setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, selectedOption: SingleValue<OptionType> | null) => {
    setProfileForm((prevForm) => ({
      ...prevForm,
      [name]: selectedOption ? selectedOption.id : "",
    }));
    if (name === "college") setSelectedCollege(selectedOption);
    if (name === "industry") setSelectedIndustry(selectedOption);
    if (name === "designation") setSelectedDesignation(selectedOption);
    if (name === "expected_ctc") setSelectedCtc(selectedOption);
    // Clear validation error for the field
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Validate form before submission
const validateForm = () => {
  const errors: { [key: string]: string } = {};

  // Validate Name
  if (!profileForm.name?.trim()) {
    errors.name = "Name is required.";
  }

  // Validate Email
  if (!profileForm.email?.trim()) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(profileForm.email)) {
    errors.email = "Email is invalid.";
  }

  // Validate Mobile Number
  const mobileNumber = profileForm.mobile_number?.toString().trim() || "";
  if (!mobileNumber) {
    errors.mobile_number = "Mobile number is required.";
  } else if (!/^\d{10}$/.test(mobileNumber)) {
    errors.mobile_number = "Mobile number must be exactly 10 digits.";
  }

  // Validate College
  if (!profileForm.college?.trim()) {
    errors.college = "College is required.";
  }

  // Validate Designation
  if (!profileForm.designation?.trim()) {
    errors.designation = "Designation is required.";
  }

  // Validate Company Name
  if (!profileForm.company_name?.trim()) {
    errors.company_name = "Company name is required.";
  }

  // Validate Experience
  const experience = profileForm.experience?.toString().trim() || "";
  if (!experience) {
    errors.experience = "Experience is required.";
  } else if (isNaN(Number(experience)) || Number(experience) < 0) {
    errors.experience = "Experience must be a positive number.";
  }

  // Validate Country
  if (!profileForm.country?.trim()) {
    errors.country = "Country is required.";
  }

  // Validate Expected CTC
  if (!profileForm.expected_ctc?.trim()) {
    errors.expected_ctc = "Expected CTC is required.";
  }

  // Validate Location
  if (!profileForm.location?.trim()) {
    errors.location = "Location is required.";
  }

  // Validate Industry
  if (!profileForm.industry?.trim()) {
    errors.industry = "Industry is required.";
  }

  // Validate Image
  if (!profileForm.image) {
    errors.image = "Profile image is required.";
  }

  setValidationErrors(errors);

  return Object.keys(errors).length === 0;
};


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill the all input fields.");
      return;
    }

    const formData = new FormData();

    Object.entries(profileForm).forEach(([key, value]) => {
      if (value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (key === "resume" && typeof value === "string" && resumeName === value) {
          // Do not append existing resume URL if it is not a new file
        } else if (key === "image" && typeof value === "string" && imageName === value) {
          // Do not append existing image URL if it is not a new file
        } else {
          formData.append(key, value as string);
        }
      }
    });

    try {
      setSaveLoading(true)
      const res = await postProfile(formData).unwrap();
      toast.success(res?.message);
      refetch();
      setShowModal(false); // Close modal after successful submission
      navigateSource("/dashboard-section")
      setSaveLoading(false)
    } catch (error: any) {
      console.log("error", error);
      toast.error(error.message || "Failed to save profile.");
    }
  };

  // Custom styles for react-select
  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: 38,
      minHeight: 38,
    }),
  };

  // Generate URLs for resume and image previews
  const resumeUrl: any =
    profileForm.resume && profileForm.resume instanceof File
      ? URL.createObjectURL(profileForm.resume)
      : profileForm.resume || "";
  const imageUrl =
    profileForm.image && profileForm.image instanceof File
      ? URL.createObjectURL(profileForm.image)
      : `${IMAGE_URL}/${profileForm.image}` || "";

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (resumeUrl && profileForm.resume instanceof File) URL.revokeObjectURL(resumeUrl);
      if (imagePreviewUrl && profileForm.image instanceof File) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [resumeUrl, imagePreviewUrl]);

  return (
    <>
      {(collageDataLoading || getSectorDataLoading || designationDataLoading || getCtcDataLoading) && <Loading />}
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
              {/* Pass isProfileComplete as prop to Profilesidebar */}
              <Profilesidebar refetch={refetch} isProfileComplete={isProfileComplete} />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx job-profile">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">Basic Information</h5>
                      <button
                        onClick={() => router.back()}
                        className="site-button right-arrow button-sm float-right"
                        style={{ fontFamily: "__Inter_Fallback_aaf875" }}
                      >
                        Back
                      </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="row m-b30">
                        {/* Name */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Your Name:</label>
                            <input
                              type="text"
                              className={`form-control ${validationErrors.name ? "is-invalid" : ""}`}
                              placeholder="Enter Your Name"
                              name="name"
                              value={profileForm.name || ""}
                              onChange={handleInputChange}
                            />
                            {validationErrors.name && <div className="invalid-feedback">{validationErrors.name}</div>}
                          </div>
                        </div>
                        {/* Email */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Email:</label>
                            <input
                              type="email"
                              className={`form-control ${validationErrors.email ? "is-invalid" : ""}`}
                              placeholder="Enter Your Email"
                              name="email"
                              value={profileForm.email || ""}
                              onChange={handleInputChange}
                              readOnly={true}
                            />
                            {validationErrors.email && <div className="invalid-feedback">{validationErrors.email}</div>}
                          </div>
                        </div>
                        {/* Mobile Number */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Mobile Number:</label>
                            <input
                              type="number"
                              className={`form-control ${validationErrors.mobile_number ? "is-invalid" : ""}`}
                              placeholder="Enter Your Mobile Number"
                              name="mobile_number"
                              value={profileForm.mobile_number || ""}
                              onChange={handleInputChange}
                              maxLength={10} // Limit input length to 10 digits
                              readOnly={true}
                            />
                            {validationErrors.mobile_number && <div className="invalid-feedback">{validationErrors.mobile_number}</div>}
                          </div>
                        </div>
                        {/* College */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>College:</label>
                            <Select
                              styles={customStyles}
                              value={selectedCollege}
                              onChange={(option) => handleSelectChange("college", option)}
                              options={collegeOptions}
                              placeholder="Select College"
                            />
                            {validationErrors.college && <div className="text-danger">{validationErrors.college}</div>}
                          </div>
                        </div>
                        {/* Designation */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Current Designation:</label>
                            <Select
                              styles={customStyles}
                              value={selectedDesignation}
                              onChange={(option) => handleSelectChange("designation", option)}
                              options={designationOptions}
                              placeholder="Select Designation"
                            />
                            {validationErrors.designation && <div className="text-danger">{validationErrors.designation}</div>}
                          </div>
                        </div>
                        {/* Company Name */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Company Name:</label>
                            <input
                              type="text"
                              className={`form-control ${validationErrors.company_name ? "is-invalid" : ""}`}
                              placeholder="Enter Company Name"
                              name="company_name"
                              value={profileForm.company_name || ""}
                              onChange={handleInputChange}
                            />
                            {validationErrors.company_name && <div className="invalid-feedback">{validationErrors.company_name}</div>}
                          </div>
                        </div>
                        {/* Experience */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Experience:</label>
                            <input
                              type="number"
                              className={`form-control ${validationErrors.experience ? "is-invalid" : ""}`}
                              placeholder="Enter Experience"
                              name="experience"
                              value={profileForm.experience || ""}
                              onChange={handleInputChange}
                            />
                            {validationErrors.experience && <div className="invalid-feedback">{validationErrors.experience}</div>}
                          </div>
                        </div>
                        {/* Country */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Country:</label>
                            <input
                              type="text"
                              className={`form-control ${validationErrors.country ? "is-invalid" : ""}`}
                              placeholder="Enter Country"
                              name="country"
                              value={profileForm.country || ""}
                              onChange={handleInputChange}
                            />
                            {validationErrors.country && <div className="invalid-feedback">{validationErrors.country}</div>}
                          </div>
                        </div>
                        {/* Expected CTC */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Expected CTC:</label>
                            <Select
                              styles={customStyles}
                              value={selectedCtc}
                              onChange={(option) => handleSelectChange("expected_ctc", option)}
                              options={ctcOptions}
                              placeholder="Select Expected CTC"
                            />
                            {validationErrors.expected_ctc && <div className="text-danger">{validationErrors.expected_ctc}</div>}
                          </div>
                        </div>
                        {/* Location */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Location:</label>
                            <input
                              type="text"
                              className={`form-control ${validationErrors.location ? "is-invalid" : ""}`}
                              placeholder="Enter Location"
                              name="location"
                              value={profileForm.location || ""}
                              onChange={handleInputChange}
                            />
                            {validationErrors.location && <div className="invalid-feedback">{validationErrors.location}</div>}
                          </div>
                        </div>
                        {/* Industry */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Industry:</label>
                            <Select
                              styles={customStyles}
                              value={selectedIndustry}
                              onChange={(option) => handleSelectChange("industry", option)}
                              options={getSectorDataOptions}
                              placeholder="Select Industry"
                            />
                            {validationErrors.industry && <div className="text-danger">{validationErrors.industry}</div>}
                          </div>
                        </div>
                        {/* Upload Resume */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Upload Resume:</label>
                            <input
                              type="file"
                              className="form-control"
                              name="resume"
                              onChange={handleInputChange}
                            />
                            {resumeName && (
                              <div className="mt-2">
                                <span>{resumeName}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Upload Image */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Upload Image:</label>
                            <input
                              type="file"
                              className="form-control"
                              name="image"
                              onChange={handleInputChange}
                            />
                            {imagePreviewUrl ? (
                              <div className="mt-2">
                                <Image
                                  src={imagePreviewUrl}
                                  alt="Profile"
                                  className="img-thumbnail"
                                  width={100}
                                  height={100}
                                  style={{ width: "35%" }}
                                />
                              </div>
                            ) : imageName ? (
                              <div className="mt-2">
                                <Image
                                  src={`${IMAGE_URL}/${imageName}`}
                                  alt="Profile"
                                  className="img-thumbnail"
                                  width={100}
                                  height={100}
                                  style={{ width: "35%" }}
                                />
                              </div>
                            ) : (
                              <div className="mt-2">
                                <span>No image uploaded</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="site-button">{saveLoading ? "Loading" :"Save Changes"}</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      <Modal show={showModal} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Complete Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please complete your profile details before proceeding further.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>Okay</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JobSeekerSection;
