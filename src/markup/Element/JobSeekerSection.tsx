"use client";
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
  useGetProfileDataQuery
} from "@/store/global-store/global.query";
import { WritableProfileFormData } from "@/app/job-seeker/types/index";
import { toast } from "react-toastify";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import Loading from "@/components/Loading";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import Image from "next/image";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { experienceOptions, jobTitleOptions } from "@/data/indexSearch";

interface OptionType {
  value: string;
  label: string;
  id: string;
}

const JobSeekerSection = () => {
  const { token } = useAuthToken();
  const { user, refetch } = useLoggedInUser();
  const router = useRouter();
  const { data: collageData, isLoading: collageDataLoading } =
    useGetCollageQuery();
  const { data: getSectorData, isLoading: getSectorDataLoading } =
    useGetSectorQuery();
  const { data: designationData, isLoading: designationDataLoading } =
    useGetDesignationQuery();
  const { data: getCtcData, isLoading: getCtcDataLoading } =
    useGetCtcDataQuery();
 const {data : getProfileData , isLoading :getProfileDataLoading } = useGetProfileDataQuery()
 console.log('getProfileData', getProfileData)
  const [selectedIndustry, setSelectedIndustry] =
    useState<SingleValue<OptionType> | null>(null);
  const [selectedDesignation, setSelectedDesignation] =
    useState<SingleValue<OptionType> | null>(null);
  const [selectedCtc, setSelectedCtc] =
    useState<SingleValue<OptionType> | null>(null);
  const [selectedSector, setSelectedSector] =
    useState<SingleValue<OptionType>>(null);

  const [postProfile] = usePostProfileMutation();
  const [resumeName, setResumeName] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const [profileForm, setProfileForm] = useState<any>({
    name: "",
    email: "",
    mobile_number: "",
    designation: "",
    company_name: "",
    experience: "",
    yearOfExperience: "",
    country: "",
    expected_ctc: "",
    current_ctc: "", // added as per payload
    resume: null, // For Resume Upload
    sector: "",
    location: "",
    industry_id: "", // added as per payload
    image: null,
    current_city: "",
    permanent_address: "",
    linkedin_profile: "",
    gender: "",
    availability_to_join: "",
    date_of_birth: "", // renamed from dob to match your payload
    highest_qualification: "",
    degree: "",
    institute: "",
    year_of_graduation: "",
    additional_certifications: "",
    key_skills: "",
    languages_known: "",
    preferred_job_locations: "",
    willing_to_relocate: "",
    willing_to_work_remotely: "",
    website: "", // added as per payload
    work_experiences: [ // updated structure to hold array of work experiences
        {
            job_title: "",
            company_name: "",
            start_date: "",
            end_date: "",
            key_responsibilities: "",
        },
    ],
});

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  // Predefined options for Availability to Join
  const availabilityOptions = [
    { value: "Immediate", label: "Immediate" },
    { value: "1 week", label: "1 Week" },
    { value: "1 month", label: "1 Month" },
    { value: "2 months", label: "2 Months" },
    { value: "3 months", label: "3 Months" },
  ];

  // Designation options
  const [designationOptions, setDesignationOptions] = useState<OptionType[]>(
    []
  );
  const [ctcOptions, setCtcOptions] = useState<OptionType[]>([]);

  // Generate years for Year of Graduation
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, index) => currentYear - index);

  const sectorOptions: OptionType[] =
    getSectorData?.data?.map((sector) => ({
      value: sector.name,
      label: sector.name,
      id: sector.id.toString(),
    })) || [];

  const handleSectorSelectChange = (option: any) => {
    setSelectedSector(option);
  };

  useEffect(() => {
    if (designationData?.data) {
      const options: OptionType[] = designationData.data.map(
        (designation: any) => ({
          value: designation.title,
          label: designation.title,
          id: designation.id.toString(),
        })
      );
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
  }, [designationData, getCtcData]);

  const handleInputChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      if (name === "resume") {
        setProfileForm((prevForm: any) => ({ ...prevForm, resume: file }));
        setResumeName(file.name);
      } else if (name === "image") {
        setProfileForm((prevForm: any) => ({ ...prevForm, image: file }));
        setImageName(file.name);
        setImagePreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setProfileForm((prevForm: any) => ({ ...prevForm, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, selectedOption: any) => {
    setProfileForm((prevForm: any) => ({
      ...prevForm,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    const requiredFields = [
      "name",
      "email",
      "mobile_number",
      "current_city",
      "gender",
      "date_of_birth",
      "highest_qualification",
      "degree",
      "institute",
      "year_of_graduation",
      "resume",
      "key_skills",
      "preferred_job_locations",
      "willing_to_relocate",
      "sector",
      "yearOfExperience",
    ];

    requiredFields.forEach((field) => {
      if (!profileForm[field]) {
        errors[field] = `${field.replace("_", " ")} is required.`;
      }
    });

    // Validate start and end dates for work experiences
    workExperiences.forEach((experience, index) => {
      const startDate = new Date(experience.start_date);
      const endDate = new Date(experience.end_date);

      if (experience.start_date && experience.end_date && startDate > endDate) {
        errors[
          `workExperiences_${index}_date`
        ] = `Start date should be earlier than end date for Job ${index + 1}.`;
      }
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Dynamic Work Experience Management
  const [workExperiences, setWorkExperiences] = useState([
    {
      job_title: "",
      company_name: "",
      start_date: "",
      end_date: "",
      key_responsibilities: "",
    },
  ]);

  // Define allowed keys for work experience fields
  type WorkExperienceField =
    | "job_title"
    | "company_name"
    | "start_date"
    | "end_date"
    | "key_responsibilities";

  const handleWorkExperienceChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Ensure `name` is typed as a specific work experience field
    const fieldName = name as WorkExperienceField;

    const updatedExperiences = [...workExperiences];
    updatedExperiences[index][fieldName] = value;
    setWorkExperiences(updatedExperiences);
  };

  // Add new experience
  const addExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      {
        job_title: "",
        company_name: "",
        start_date: "",
        end_date: "",
        key_responsibilities: "",
      },
    ]);
  };

  // Remove experience
  const removeExperience = (index: number) => {
    const updatedExperiences = workExperiences.filter((_, i) => i !== index);
    setWorkExperiences(updatedExperiences);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   toast.error("Please fill all mandatory fields.");
    //   return;
    // }
console.log('profileForm', profileForm)
    const formData = new FormData();
    Object.entries(profileForm).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });

    // Append dynamic work experiences
    // Append each work experience individually as an array item
    workExperiences.forEach((exp, index) => {
      formData.append(`work_experiences[${index}][job_title]`, exp.job_title);
      formData.append(`work_experiences[${index}][company_name]`, exp.company_name);
      formData.append(`work_experiences[${index}][start_date]`, exp.start_date);
      formData.append(`work_experiences[${index}][end_date]`, exp.end_date);
      formData.append(`work_experiences[${index}][key_responsibilities]`, exp.key_responsibilities);
  });
    console.log("formData", formData);
    try {
      setSaveLoading(true);
      const res = await postProfile(formData).unwrap();
      toast.success(res?.message);
      refetch();
      setSaveLoading(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to save profile.");
    }
  };
  // Qualification options array
  const qualificationOptions = [
    { value: "High School", label: "High School" },
    { value: "Diploma", label: "Diploma" },
    { value: "Bachelor's Degree", label: "Bachelor's Degree" },
    { value: "Master's Degree", label: "Master's Degree" },
    { value: "PhD", label: "PhD" },
    { value: "Other", label: "Other" },
  ];

  // Degree/Program options array
  const degreeOptions = [
    { value: "B.Sc", label: "B.Sc" },
    { value: "B.Tech", label: "B.Tech" },
    { value: "B.A", label: "B.A" },
    { value: "B.Com", label: "B.Com" },
    { value: "M.Sc", label: "M.Sc" },
    { value: "M.Tech", label: "M.Tech" },
    { value: "M.A", label: "M.A" },
    { value: "MBA", label: "MBA" },
    { value: "PhD", label: "PhD" },
    { value: "Other", label: "Other" },
  ];
  return (
    <>
      {(collageDataLoading ||
        getSectorDataLoading ||
        designationDataLoading ||
        getCtcDataLoading) && <Loading />}
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Profilesidebar
                  refetch={refetch}
                />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx job-profile">
                    {/* Personal Information Section */}
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Personal Information
                      </h5>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="row m-b30">
                        {/* Full Name */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Full Name:</label>
                            <input
                              type="text"
                              className={`form-control ${
                                validationErrors.name ? "is-invalid" : ""
                              }`}
                              placeholder="First Name, Middle Name, Last Name"
                              name="name"
                              value={profileForm.name || ""}
                              onChange={handleInputChange}
                            />
                            {validationErrors.name && (
                              <div className="invalid-feedback">
                                {validationErrors.name}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Date of Birth */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Date of Birth:</label>
                            <input
                              type="date"
                              className={`form-control ${
                                validationErrors.date_of_birth
                                  ? "is-invalid"
                                  : ""
                              }`}
                              name="date_of_birth"
                              value={profileForm.date_of_birth || ""}
                              onChange={handleInputChange}
                            />
                            {validationErrors.date_of_birth && (
                              <div className="invalid-feedback">
                                {validationErrors.date_of_birth}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Gender */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Gender:</label>
                            <select
                              className={`form-control ${
                                validationErrors.gender ? "is-invalid" : ""
                              }`}
                              name="gender"
                              value={profileForm.gender || ""}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                            {validationErrors.gender && (
                              <div className="invalid-feedback">
                                {validationErrors.gender}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Mobile Number */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Mobile Number:</label>
                            <input
                              type="tel"
                              pattern="^\d{10}$"
                              maxLength={10}
                              className={`form-control ${
                                validationErrors.mobile_number
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Enter Your Mobile Number"
                              name="mobile_number"
                              value={profileForm.mobile_number || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,10}$/.test(value)) {
                                  handleInputChange(e);
                                }
                              }}
                            />
                            {validationErrors.mobile_number && (
                              <div className="invalid-feedback">
                                {validationErrors.mobile_number}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Email Address */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Email Address:</label>
                            <input
                              type="email"
                              className={`form-control ${
                                validationErrors.email ? "is-invalid" : ""
                              }`}
                              placeholder="Enter Your Email Address"
                              name="email"
                              value={profileForm.email || ""}
                              onChange={handleInputChange}
                            />
                            {validationErrors.email && (
                              <div className="invalid-feedback">
                                {validationErrors.email}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Current City */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Current City:</label>
                            <input
                              type="text"
                              className={`form-control ${
                                validationErrors.current_city
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Enter Your Current City"
                              name="current_city"
                              value={profileForm.current_city || ""}
                              onChange={handleInputChange}
                            />
                            {validationErrors.current_city && (
                              <div className="invalid-feedback">
                                {validationErrors.current_city}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Permanent Address */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Permanent Address:</label>
                            <input
                              type="text"
                              className={`form-control ${
                                validationErrors.permanent_address
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Enter Your Permanent Address"
                              name="permanent_address"
                              value={profileForm.permanent_address || ""}
                              onChange={handleInputChange}
                            />
                            {validationErrors.permanent_address && (
                              <div className="invalid-feedback">
                                {validationErrors.permanent_address}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* LinkedIn Profile */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>LinkedIn Profile:</label>
                            <input
                              type="url"
                              className={`form-control ${
                                validationErrors.linkedin_profile
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Enter LinkedIn Profile URL"
                              name="linkedin_profile"
                              value={profileForm.linkedin_profile || ""}
                              onChange={handleInputChange}
                            />
                            {validationErrors.linkedin_profile && (
                              <div className="invalid-feedback">
                                {validationErrors.linkedin_profile}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Profile Picture */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Upload Profile Picture:</label>
                            <input
                              type="file"
                              className="form-control"
                              name="image"
                              onChange={handleInputChange}
                            />
                            {imagePreviewUrl ? (
                              <Image
                                src={imagePreviewUrl}
                                alt="Profile"
                                className="img-thumbnail"
                                width={100}
                                height={100}
                                style={{ width: "35%" }}
                              />
                            ) : imageName ? (
                              <Image
                                src={`${IMAGE_URL}/${imageName}`}
                                alt="Profile"
                                className="img-thumbnail"
                                width={100}
                                height={100}
                                style={{ width: "35%" }}
                              />
                            ) : (
                              <div className="mt-2">
                                <span>No image uploaded</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Professional Information Section */}
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Professional Information
                        </h5>
                      </div>
                      <div className="row m-b30">
                        {/* Current Job Title */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Current Job Title:</label>
                            <Select
                              value={designationOptions.find(
                                (option) =>
                                  option.value === profileForm.designation
                              )}
                              onChange={(option) =>
                                handleSelectChange("designation", option)
                              }
                              options={designationOptions}
                              placeholder="Select Job Title"
                            />
                            {validationErrors.designation && (
                              <span className="text-red-500 text-danger">
                                {validationErrors.designation}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Company Name */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Company Name:</label>
                            <input
                              type="text"
                              className={`form-control ${
                                validationErrors.job_1_company
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Enter Company Name"
                              name="job_1_company"
                              value={profileForm.job_1_company || ""}
                              onChange={handleInputChange}
                            />
                            {validationErrors.job_1_company && (
                              <div className="invalid-feedback">
                                {validationErrors.job_1_company}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Current CTC */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Current CTC (Fixed + Variable):</label>
                            <Select
                              value={ctcOptions.find(
                                (option) =>
                                  option.value === profileForm.current_ctc
                              )}
                              onChange={(option) =>
                                handleSelectChange("current_ctc", option)
                              }
                              options={ctcOptions}
                              placeholder="Select Current CTC"
                            />
                            {validationErrors.current_ctc && (
                              <span className="text-red-500 text-danger">
                                {validationErrors.current_ctc}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Expected CTC */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Expected CTC:</label>
                            <Select
                              value={ctcOptions.find(
                                (option) =>
                                  option.value === profileForm.expected_ctc
                              )}
                              onChange={(option) =>
                                handleSelectChange("expected_ctc", option)
                              }
                              options={ctcOptions}
                              placeholder="Select Expected CTC"
                            />
                            {validationErrors.expected_ctc && (
                              <span className="text-red-500 text-danger">
                                {validationErrors.expected_ctc}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Industry */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Industry:</label>
                            <Select
                              value={selectedSector}
                              onChange={handleSectorSelectChange}
                              options={sectorOptions}
                              placeholder="Select Industry"
                            />
                            {validationErrors.sector && (
                              <span className="text-red-500 text-danger">
                                {validationErrors.sector}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Availability to Join */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Availability to Join:</label>
                            <select
                              className="form-control"
                              name="availability_to_join"
                              value={profileForm.availability_to_join}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Availability</option>
                              {availabilityOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {/* Year of Experience */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Year of Experience:</label>
                            <Select
                              value={experienceOptions.find(
                                (option) =>
                                  option.value === profileForm.yearOfExperience
                              )}
                              onChange={(option) =>
                                handleSelectChange("yearOfExperience", option)
                              }
                              options={experienceOptions}
                              placeholder="Select Year of Experience"
                            />
                            {validationErrors.yearOfExperience && (
                              <span className="text-red-500 text-danger">
                                {validationErrors.yearOfExperience}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Education Details Section */}
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Education Details
                        </h5>
                      </div>
                      <div className="row m-b30">
                        {/* Highest Qualification */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Highest Qualification:</label>
                            <Select
                              value={qualificationOptions.find(
                                (option) =>
                                  option.value ===
                                  profileForm.highest_qualification
                              )}
                              onChange={(option) =>
                                handleSelectChange(
                                  "highest_qualification",
                                  option
                                )
                              }
                              options={qualificationOptions}
                              placeholder="Select Highest Qualification"
                            />
                            {validationErrors.highest_qualification && (
                              <div className="invalid-feedback">
                                {validationErrors.highest_qualification}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Degree/Program */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Degree/Program:</label>
                            <Select
                              value={degreeOptions.find(
                                (option) => option.value === profileForm.degree
                              )}
                              onChange={(option) =>
                                handleSelectChange("degree", option)
                              }
                              options={degreeOptions}
                              placeholder="Select Degree/Program"
                            />
                            {validationErrors.degree && (
                              <div className="invalid-feedback">
                                {validationErrors.degree}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Institute Name */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Institute/University Name:</label>
                            <input
                              type="text"
                              className={`form-control ${
                                validationErrors.institute ? "is-invalid" : ""
                              }`}
                              placeholder="Enter Institute Name"
                              name="institute"
                              value={profileForm.institute || ""}
                              onChange={handleInputChange}
                            />
                            {validationErrors.institute && (
                              <div className="invalid-feedback">
                                {validationErrors.institute}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Year of Graduation */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Year of Graduation:</label>
                            <select
                              className="form-control"
                              name="year_of_graduation"
                              value={profileForm.year_of_graduation}
                              onChange={handleInputChange}
                            >
                              <option value="">
                                Select Year of Graduation
                              </option>
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                            {validationErrors.year_of_graduation && (
                              <div className="invalid-feedback">
                                {validationErrors.year_of_graduation}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Additional Certifications/Courses (Non-Mandatory) */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>
                              Additional Certifications/Courses (Optional):
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Additional Certifications or Courses"
                              name="additional_certifications"
                              value={
                                profileForm.additional_certifications || ""
                              }
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      {/* Work Experience Section */}
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Work Experience
                        </h5>
                      </div>
                      {/* // Updated work experience fields in the return section */}
                      {workExperiences.map((experience, index) => (
                        <div className="row m-b30" key={index}>
                          {/* Job Title */}
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>Job Title:</label>
                              <input
                                type="text"
                                className="form-control"
                                name="job_title"
                                placeholder="Enter Job Title"
                                value={experience.job_title}
                                onChange={(e) =>
                                  handleWorkExperienceChange(index, e)
                                }
                              />
                            </div>
                          </div>

                          {/* Company Name */}
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>Company Name:</label>
                              <input
                                type="text"
                                className="form-control"
                                name="company_name"
                                placeholder="Enter Company Name"
                                value={experience.company_name}
                                onChange={(e) =>
                                  handleWorkExperienceChange(index, e)
                                }
                              />
                            </div>
                          </div>

                          {/* Start Date */}
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>Start Date:</label>
                              <input
                                type="date"
                                className={`form-control ${
                                  validationErrors[
                                    `workExperiences_${index}_date`
                                  ]
                                    ? "is-invalid"
                                    : ""
                                }`}
                                name="start_date"
                                value={experience.start_date}
                                onChange={(e) =>
                                  handleWorkExperienceChange(index, e)
                                }
                              />
                            </div>
                          </div>

                          {/* End Date */}
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>End Date:</label>
                              <input
                                type="date"
                                className={`form-control ${
                                  validationErrors[
                                    `workExperiences_${index}_date`
                                  ]
                                    ? "is-invalid"
                                    : ""
                                }`}
                                name="end_date"
                                value={experience.end_date}
                                onChange={(e) =>
                                  handleWorkExperienceChange(index, e)
                                }
                              />
                              {validationErrors[
                                `workExperiences_${index}_date`
                              ] && (
                                <div className="invalid-feedback">
                                  {
                                    validationErrors[
                                      `workExperiences_${index}_date`
                                    ]
                                  }
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Key Responsibilities */}
                          <div className="col-lg-12 col-md-12">
                            <div className="form-group">
                              <label>Key Responsibilities:</label>
                              <CKEditor
                                editor={ClassicEditor}
                                data={experience.key_responsibilities || ""}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  handleWorkExperienceChange(index, {
                                    target: {
                                      name: "key_responsibilities",
                                      value: data,
                                    },
                                  });
                                }}
                              />
                            </div>
                          </div>

                          {/* Remove Experience Button */}
                          {index > 0 && (
                            <div className="col-lg-12 col-md-12">
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeExperience(index)}
                              >
                                Remove Job {index + 1}
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                      {/* Add New Experience Button */}
                      <div className="col-lg-12 col-md-12">
                        <button
                          type="button"
                          className="btn btn-secondary d-flex justify-content-end"
                          style={{
                            backgroundColor: "#2A6310",
                            color: "#fff",
                          }}
                          onClick={addExperience}
                        >
                          Add Another Job
                        </button>
                      </div>
                      {/* Resume Upload Section */}
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Resume Upload
                        </h5>
                      </div>
                      <div className="row m-b30">
                        {/* Upload Resume */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Upload Resume:</label>
                            <input
                              type="file"
                              className="form-control"
                              name="resume"
                              onChange={handleInputChange}
                              accept=".pdf,.docx"
                            />
                            {resumeName && (
                              <div className="mt-2">
                                <span>{resumeName}</span>
                              </div>
                            )}
                            {validationErrors.resume && (
                              <div className="invalid-feedback">
                                {validationErrors.resume}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Skills Section */}
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Skills
                        </h5>
                      </div>
                      <div className="row m-b30">
                        {/* Key Skills */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Key Skills</label>
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
                              {/* {errors?.tags?.[0]} */}
                            </span>
                          </div>
                        </div>

                        {/* Languages Known */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Languages Known:</label>
                            <input
                              type="text"
                              className={`form-control ${
                                validationErrors.languages_known
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Enter Languages"
                              name="languages_known"
                              value={profileForm.languages_known || ""}
                              onChange={handleInputChange}
                            />
                            {validationErrors.languages_known && (
                              <div className="invalid-feedback">
                                {validationErrors.languages_known}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Other Details Section */}
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Other Details
                        </h5>
                      </div>
                      <div className="row m-b30">
                        {/* Preferred Job Locations */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Preferred Job Locations:</label>
                            <input
                              type="text"
                              className={`form-control ${
                                validationErrors.preferred_job_locations
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Enter Preferred Job Locations"
                              name="preferred_job_locations"
                              value={profileForm.preferred_job_locations || ""}
                              onChange={handleInputChange}
                            />
                            {validationErrors.preferred_job_locations && (
                              <div className="invalid-feedback">
                                {validationErrors.preferred_job_locations}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Willing to Relocate */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Willing to Relocate:</label>
                            <Select
                              value={[
                                { value: "Yes", label: "Yes" },
                                { value: "No", label: "No" },
                              ].find(
                                (option) =>
                                  option.value ===
                                  profileForm.willing_to_relocate
                              )}
                              onChange={(option) =>
                                handleSelectChange(
                                  "willing_to_relocate",
                                  option
                                )
                              }
                              options={[
                                { value: "Yes", label: "Yes" },
                                { value: "No", label: "No" },
                              ]}
                              placeholder="Select Yes/No"
                            />
                            {validationErrors.willing_to_relocate && (
                              <span className="text-red-500 text-danger">
                                {validationErrors.willing_to_relocate}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Willing to Work Remotely */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Willing to Work Remotely:</label>
                            <Select
                              value={[
                                { value: "Yes", label: "Yes" },
                                { value: "No", label: "No" },
                              ].find(
                                (option) =>
                                  option.value ===
                                  profileForm.willing_to_work_remotely
                              )}
                              onChange={(option) =>
                                handleSelectChange(
                                  "willing_to_work_remotely",
                                  option
                                )
                              }
                              options={[
                                { value: "Yes", label: "Yes" },
                                { value: "No", label: "No" },
                              ]}
                              placeholder="Select Yes/No"
                            />
                          </div>
                        </div>

                        {/* Portfolio or Website */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Portfolio or Website (Optional):</label>
                            <input
                              type="url"
                              className="form-control"
                              placeholder="Enter Portfolio URL"
                              name="portfolio"
                              value={profileForm.portfolio || ""}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="site-button">
                        {saveLoading ? "Saving..." : "Save Changes"}
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

export default JobSeekerSection;
