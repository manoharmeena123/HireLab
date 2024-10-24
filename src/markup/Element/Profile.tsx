"use client";
import React, { useState, ChangeEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaClock,
  FaPen,
} from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import Image from "next/image";
import profileIcon from "../../images/favicon.png";

type Employment = {
  position: string;
  company: string;
  period: string;
  description: string;
};

type Education = {
  degree: string;
  institution: string;
  period: string;
};

type Certification = {
  title: string;
  institution: string;
  validity: string;
};

type Language = {
  language: string;
  proficiency: string;
};

type CareerProfile = {
  currentIndustry: string;
  department: string;
  roleCategory: string;
  jobRole: string;
  jobType: string;
  employmentType: string;
};

type PersonalDetails = {
  moreInfo: string;
  personal: string;
  category: string;
  differentlyAbled: string;
  careerBreak: string;
  workPermit: string;
  address: string;
};

type FormData = {
  location: string;
  experience: string;
  salary: string;
  email: string;
  phone: string;
  noticePeriod: string;
  resume: string;
  headline: string;
  summary: string;
  keySkills: string;
  employment: Employment[];
  education: Education[];
  certifications: Certification[];
  careerProfile: CareerProfile;
  personalDetails: PersonalDetails;
  languages: Language[];
};

const ProfilePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [currentEmployment, setCurrentEmployment] = useState<number | null>(
    null
  );
  const [currentEducation, setCurrentEducation] = useState<number | null>(null);
  const [currentCertification, setCurrentCertification] = useState<
    number | null
  >(null);
  const [currentLanguage, setCurrentLanguage] = useState<number | null>(null);

  const [formData, setFormData] = useState<FormData>({
    location: "Mumbai, INDIA",
    experience: "8 Years",
    salary: "₹ 40,00,000",
    email: "saurabh.jaiswal@iiml.org",
    phone: "9555944604",
    noticePeriod: "3 Months",
    resume: "My-Resume.pdf",
    headline: "Enterprise Sales & Strategy | Fintech | PGDM, IIM Lucknow'18",
    summary: `Result-oriented professional with strong expertise in Enterprise Sales & Strategy, 
      New Client Acquisition, Account Management & Media consulting. Having over 9+ years of 
      experience in varied industries including Media Consulting, Healthcare, and Fintech.`,
    keySkills:
      "Business Development Manager, Sales/BD Manager, Corporate Sales, Institutional Sales, B2B Sales, Sales Strategy, Business Growth, Vendor Management, Category Management, Brand Management, Product Sales, Key Account Management, Media Planning",
    employment: [
      {
        position: "Group Manager - Banking Business",
        company: "Loyalty Rewardz Management",
        period: "Aug 2021 to Present (3 years 2 months)",
        description:
          "Achieved 79% growth for rewards and customer engagement program for 5 banks...",
      },
      {
        position: "Business Development Manager North and West India",
        company: "Schulke India",
        period: "Mar 2019 to Aug 2021 (2 years 6 months)",
        description:
          "Led multiple projects and strategic partnerships to grow the business...",
      },
      {
        position: "Management Trainee Program",
        company: "GroupM Media",
        period: "May 2018 to Mar 2019 (11 months)",
        description:
          "Executed the integrated media strategy for 2 national campaigns for Flipkart...",
      },
    ],
    education: [
      {
        degree: "MBA/PGDM Marketing",
        institution: "IIM Lucknow",
        period: "2016-2018 • Full Time",
      },
      {
        degree: "B.Tech/B.E. Bio-Chemistry/Bio-Technology",
        institution: "Amity University",
        period: "2008-2012 • Full Time",
      },
    ],
    certifications: [
      {
        title: "Certified Associate in Project Management",
        institution: "Project Management Institute",
        validity: "Valid from Jan '20",
      },
      {
        title: "Data Visualization & Communication with Tableau",
        institution: "Duke University (Coursera)",
        validity: "Valid from Jan '20",
      },
    ],
    careerProfile: {
      currentIndustry: "IT Services & Consulting",
      department: "Sales & Business Development",
      roleCategory: "BD / Pre Sales",
      jobRole: "Merchant Acquisition - BD / Pre Sales",
      jobType: "contractual, permanent",
      employmentType: "Full Time",
    },
    personalDetails: {
      moreInfo: "Not mentioned",
      personal: "male, Married",
      category: "General",
      differentlyAbled: "No",
      careerBreak: "No",
      workPermit: "Not mentioned",
      address: "126, vijay nagar, kartarpura, jaipur, 302006",
    },
    languages: [
      { language: "English", proficiency: "" },
      { language: "French", proficiency: "" },
      { language: "English Expert", proficiency: "read, write, speak" },
    ],
  });

  const handleShowModal = (
    section: string,
    employmentIndex: number | null = null,
    educationIndex: number | null = null,
    certificationIndex: number | null = null,
    languageIndex: number | null = null
  ) => {
    setEditingSection(section);
    if (employmentIndex !== null) setCurrentEmployment(employmentIndex);
    if (educationIndex !== null) setCurrentEducation(educationIndex);
    if (certificationIndex !== null)
      setCurrentCertification(certificationIndex);
    if (languageIndex !== null) setCurrentLanguage(languageIndex);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmploymentInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedEmployment = [...formData.employment];
    updatedEmployment[index][e.target.name as keyof Employment] =
      e.target.value;
    setFormData({ ...formData, employment: updatedEmployment });
  };

  const handleEducationInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][e.target.name as keyof Education] = e.target.value;
    setFormData({ ...formData, education: updatedEducation });
  };

  const handleCertificationInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index][e.target.name as keyof Certification] =
      e.target.value;
    setFormData({ ...formData, certifications: updatedCertifications });
  };

  const handleLanguageInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedLanguages = [...formData.languages];
    updatedLanguages[index][e.target.name as keyof Language] = e.target.value;
    setFormData({ ...formData, languages: updatedLanguages });
  };

  const handleFormSubmit = () => {
    setShowModal(false);
  };

  const handleAddEmployment = () => {
    setFormData({
      ...formData,
      employment: [
        ...formData.employment,
        {
          position: "",
          company: "",
          period: "",
          description: "",
        },
      ],
    });
    setCurrentEmployment(formData.employment.length);
    handleShowModal("employment");
  };

  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          degree: "",
          institution: "",
          period: "",
        },
      ],
    });
    setCurrentEducation(formData.education.length);
    handleShowModal("education");
  };

  const handleAddCertification = () => {
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        {
          title: "",
          institution: "",
          validity: "",
        },
      ],
    });
    setCurrentCertification(formData.certifications.length);
    handleShowModal("certifications");
  };

  const handleAddLanguage = () => {
    setFormData({
      ...formData,
      languages: [
        ...formData.languages,
        {
          language: "",
          proficiency: "",
        },
      ],
    });
    setCurrentLanguage(formData.languages.length);
    handleShowModal("languages");
  };

  return (
    <div className="container mt-5">
      {/* Profile Header */}
      <div className="card mb-4 shadow-sm border-0 rounded-3">
        <div className="card-body d-flex align-items-center">
          <div className="candidate-img">
            <Image
              src={profileIcon}
              alt="profile picture"
              width={100}
              height={100}
              className="rounded-circle border border-2"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="ms-4 ml-2">
            <h4 className="fw-bold mb-1">Saurabh Jaiswal</h4>
            <p className="mb-2 text-muted">
              Group Manager - Banking Business | Loyalty Rewards Management
            </p>
            <div
              className="progress"
              style={{ height: "5px", backgroundColor: "#e9ecef" }}
            >
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: "100%" }}
              ></div>
            </div>
            <small className="text-muted">Last updated: 25 Jul, 2024</small>
          </div>
        </div>
      </div>

      {/* Basic Details */}
      <div className="card mb-4 shadow-sm border-0 rounded-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Basic details</h5>
          <FaPen
            className="text-muted"
            style={{ cursor: "pointer" }}
            onClick={() => handleShowModal("basicDetails")}
          />
        </div>
        <ul className="list-unstyled px-3 pb-3">
          <li className="d-flex align-items-center mb-2">
            <FaMapMarkerAlt className="me-2 text-muted " />{" "}
            <span className="ml-1"> {formData.location}</span>
          </li>
          <li className="d-flex align-items-center mb-2">
            <FaClock className="me-2 text-muted" />{" "}
            <span className="ml-1">{formData.experience}</span>
          </li>
          <li className="d-flex align-items-center mb-2">
            <FaRupeeSign className="me-2 text-muted" />{" "}
            <span className="ml-1">{formData.salary}</span>
          </li>
          <li className="d-flex align-items-center mb-2">
            <FaEnvelope className="me-2 text-muted" />{" "}
            <span className="ml-1">{formData.email}</span>
          </li>
          <li className="d-flex align-items-center mb-2">
            <FaPhone className="me-2 text-muted" />{" "}
            <span className="ml-1">{formData.phone}</span>
          </li>
          <li className="d-flex align-items-center">
            <FaClock className="me-2 text-muted" />{" "}
            <span className="ml-1">{formData.noticePeriod}</span>
          </li>
        </ul>
      </div>

      {/* Resume */}
      <div className="card mb-4 shadow-sm border-0 rounded-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Resume</h5>
          <a href="#" className="btn btn-link">
            Upload new
          </a>
        </div>
        <div className="px-3 pb-3">{formData.resume}</div>
      </div>

      {/* Resume Headline */}
      <div className="card mb-4 shadow-sm border-0 rounded-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Resume headline</h5>
          <FaPen
            className="text-muted"
            style={{ cursor: "pointer" }}
            onClick={() => handleShowModal("headline")}
          />
        </div>
        <div className="px-3 pb-3">{formData.headline}</div>
      </div>

      {/* Profile Summary */}
      <div className="card mb-4 shadow-sm border-0 rounded-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Profile summary</h5>
          <FaPen
            className="text-muted"
            style={{ cursor: "pointer" }}
            onClick={() => handleShowModal("summary")}
          />
        </div>
        <div className="px-3 pb-3">{formData.summary}</div>
      </div>

      {/* Key Skills */}
      <div className="card mb-4 shadow-sm border-0 rounded-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Key skills</h5>
          <FaPen
            className="text-muted"
            style={{ cursor: "pointer" }}
            onClick={() => handleShowModal("keySkills")}
          />
        </div>
        <div className="px-3 pb-3">{formData.keySkills}</div>
      </div>

   
      {/* Employment */}
      <div className="card mb-4 shadow-sm border-0 rounded-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Employment</h5>
          <a href="#" className="btn btn-link" onClick={handleAddEmployment}>
            Add
          </a>
        </div>
        {formData.employment.map((job, index) => (
          <div key={index} className="px-3 pb-3">
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="fw-bold mb-1">{job.position}</h6>
                <p className="mb-0 text-muted">{job.company}</p>
                <small className="text-muted">{job.period}</small>
                <p>{job.description}</p>
              </div>
              <FaPen
                className="text-muted"
                style={{ cursor: "pointer" }}
                onClick={() => handleShowModal("employment", index)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="card mb-4 shadow-sm border-0 rounded-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Education</h5>
          <a href="#" className="btn btn-link" onClick={handleAddEducation}>
            Add
          </a>
        </div>
        {formData.education.map((education, index) => (
          <div key={index} className="px-3 pb-3">
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="fw-bold mb-1">{education.degree}</h6>
                <p className="mb-0 text-muted">{education.institution}</p>
                <small className="text-muted">{education.period}</small>
              </div>
              <FaPen
                className="text-muted"
                style={{ cursor: "pointer" }}
                onClick={() => handleShowModal("education", null, index)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="card mb-4 shadow-sm border-0 rounded-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Certifications</h5>
          <a href="#" className="btn btn-link" onClick={handleAddCertification}>
            Add
          </a>
        </div>
        {formData.certifications.map((cert, index) => (
          <div key={index} className="px-3 pb-3">
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="fw-bold mb-1">{cert.title}</h6>
                <p className="mb-0 text-muted">{cert.institution}</p>
                <small className="text-muted">{cert.validity}</small>
              </div>
              <FaPen
                className="text-muted"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  handleShowModal("certifications", null, null, index)
                }
              />
            </div>
          </div>
        ))}
      </div>

   {/* Career Profile */}
      <div className="card mb-4 shadow-sm border-0 rounded-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Career Profile</h5>
          <FaPen
            className="text-muted"
            style={{ cursor: "pointer" }}
            onClick={() => handleShowModal("careerProfile")}
          />
        </div>
        <ul className="list-unstyled px-3 pb-3">
          <li className="mb-2">
            <strong>Current Industry:</strong>{" "}
            {formData.careerProfile.currentIndustry}
          </li>
          <li className="mb-2">
            <strong>Department:</strong> {formData.careerProfile.department}
          </li>
          <li className="mb-2">
            <strong>Role Category:</strong>{" "}
            {formData.careerProfile.roleCategory}
          </li>
          <li className="mb-2">
            <strong>Job Role:</strong> {formData.careerProfile.jobRole}
          </li>
          <li className="mb-2">
            <strong>Job Type:</strong> {formData.careerProfile.jobType}
          </li>
          <li className="mb-2">
            <strong>Desired Employment Type:</strong>{" "}
            {formData.careerProfile.employmentType}
          </li>
        </ul>
      </div>


      {/* Personal Details */}
      <div className="card mb-4 shadow-sm border-0 rounded-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Personal Details</h5>
          <FaPen
            className="text-muted"
            style={{ cursor: "pointer" }}
            onClick={() => handleShowModal("personalDetails")}
          />
        </div>
        <ul className="list-unstyled px-3 pb-3">
          <li className="mb-2">
            <strong>More info:</strong> {formData.personalDetails.moreInfo}
          </li>
          <li className="mb-2">
            <strong>Personal:</strong> {formData.personalDetails.personal}
          </li>
          <li className="mb-2">
            <strong>Category:</strong> {formData.personalDetails.category}
          </li>
          <li className="mb-2">
            <strong>Differently abled:</strong>{" "}
            {formData.personalDetails.differentlyAbled}
          </li>
          <li className="mb-2">
            <strong>Career break:</strong>{" "}
            {formData.personalDetails.careerBreak}
          </li>
          <li className="mb-2">
            <strong>Work permit:</strong> {formData.personalDetails.workPermit}
          </li>
          <li className="mb-2">
            <strong>Address:</strong> {formData.personalDetails.address}
          </li>
        </ul>
      </div>
      {/* Languages Section */}
      <div className="card mb-4 shadow-sm border-0 rounded-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Languages</h5>
          <a href="#" className="btn btn-link" onClick={handleAddLanguage}>
            Add
          </a>
        </div>
        {formData.languages.map((lang, index) => (
          <div key={index} className="px-3 pb-3">
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="fw-bold mb-1">{lang.language}</h6>
                <small className="text-muted">{lang.proficiency}</small>
              </div>
              <FaPen
                className="text-muted"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  handleShowModal("languages", null, null, null, index)
                }
              />
            </div>
          </div>
        ))}
      </div>
      {/* Modal for Editing Sections */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {editingSection}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {editingSection === "basicDetails" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Notice Period</Form.Label>
                  <Form.Control
                    type="text"
                    name="noticePeriod"
                    value={formData.noticePeriod}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </>
            )}

            {editingSection === "headline" && (
              <Form.Group className="mb-3">
                <Form.Label>Resume Headline</Form.Label>
                <Form.Control
                  type="text"
                  name="headline"
                  value={formData.headline}
                  onChange={handleInputChange}
                />
              </Form.Group>
            )}

            {editingSection === "summary" && (
              <Form.Group className="mb-3">
                <Form.Label>Profile Summary</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                />
              </Form.Group>
            )}

            {editingSection === "keySkills" && (
              <Form.Group className="mb-3">
                <Form.Label>Key Skills</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="keySkills"
                  value={formData.keySkills}
                  onChange={handleInputChange}
                />
              </Form.Group>
            )}

            {editingSection === "languages" && currentLanguage !== null && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    type="text"
                    name="language"
                    value={formData.languages[currentLanguage!]?.language}
                    onChange={(e) =>
                      handleLanguageInputChange(e, currentLanguage!)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Proficiency</Form.Label>
                  <Form.Control
                    type="text"
                    name="proficiency"
                    value={formData.languages[currentLanguage!]?.proficiency}
                    onChange={(e) =>
                      handleLanguageInputChange(e, currentLanguage!)
                    }
                  />
                </Form.Group>
              </>
            )}

            {editingSection === "employment" && currentEmployment !== null && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    type="text"
                    name="position"
                    value={formData.employment[currentEmployment]?.position}
                    onChange={(e) =>
                      handleEmploymentInputChange(e, currentEmployment)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={formData.employment[currentEmployment]?.company}
                    onChange={(e) =>
                      handleEmploymentInputChange(e, currentEmployment)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Period</Form.Label>
                  <Form.Control
                    type="text"
                    name="period"
                    value={formData.employment[currentEmployment]?.period}
                    onChange={(e) =>
                      handleEmploymentInputChange(e, currentEmployment)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.employment[currentEmployment]?.description}
                    onChange={(e) =>
                      handleEmploymentInputChange(e, currentEmployment)
                    }
                  />
                </Form.Group>
              </>
            )}

            {editingSection === "education" && currentEducation !== null && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Degree</Form.Label>
                  <Form.Control
                    type="text"
                    name="degree"
                    value={formData.education[currentEducation]?.degree}
                    onChange={(e) =>
                      handleEducationInputChange(e, currentEducation)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Institution</Form.Label>
                  <Form.Control
                    type="text"
                    name="institution"
                    value={formData.education[currentEducation]?.institution}
                    onChange={(e) =>
                      handleEducationInputChange(e, currentEducation)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Period</Form.Label>
                  <Form.Control
                    type="text"
                    name="period"
                    value={formData.education[currentEducation]?.period}
                    onChange={(e) =>
                      handleEducationInputChange(e, currentEducation)
                    }
                  />
                </Form.Group>
              </>
            )}

            {editingSection === "certifications" &&
              currentCertification !== null && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={
                        formData.certifications[currentCertification]?.title
                      }
                      onChange={(e) =>
                        handleCertificationInputChange(e, currentCertification)
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Institution</Form.Label>
                    <Form.Control
                      type="text"
                      name="institution"
                      value={
                        formData.certifications[currentCertification]
                          ?.institution
                      }
                      onChange={(e) =>
                        handleCertificationInputChange(e, currentCertification)
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Validity</Form.Label>
                    <Form.Control
                      type="text"
                      name="validity"
                      value={
                        formData.certifications[currentCertification]?.validity
                      }
                      onChange={(e) =>
                        handleCertificationInputChange(e, currentCertification)
                      }
                    />
                  </Form.Group>
                </>
              )}

            {editingSection === "careerProfile" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Current Industry</Form.Label>
                  <Form.Control
                    type="text"
                    name="currentIndustry"
                    value={formData.careerProfile.currentIndustry}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    name="department"
                    value={formData.careerProfile.department}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Role Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="roleCategory"
                    value={formData.careerProfile.roleCategory}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Job Role</Form.Label>
                  <Form.Control
                    type="text"
                    name="jobRole"
                    value={formData.careerProfile.jobRole}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Job Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="jobType"
                    value={formData.careerProfile.jobType}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Employment Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="employmentType"
                    value={formData.careerProfile.employmentType}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </>
            )}

            {editingSection === "personalDetails" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>More Info</Form.Label>
                  <Form.Control
                    type="text"
                    name="moreInfo"
                    value={formData.personalDetails.moreInfo}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Personal</Form.Label>
                  <Form.Control
                    type="text"
                    name="personal"
                    value={formData.personalDetails.personal}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={formData.personalDetails.category}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Differently Abled</Form.Label>
                  <Form.Control
                    type="text"
                    name="differentlyAbled"
                    value={formData.personalDetails.differentlyAbled}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Career Break</Form.Label>
                  <Form.Control
                    type="text"
                    name="careerBreak"
                    value={formData.personalDetails.careerBreak}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Work Permit</Form.Label>
                  <Form.Control
                    type="text"
                    name="workPermit"
                    value={formData.personalDetails.workPermit}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.personalDetails.address}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;
