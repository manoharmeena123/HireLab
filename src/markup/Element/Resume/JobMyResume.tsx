"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ListingSidebar from "@/markup/Element/ListingSidebar";
import BasicDetailsModal from "./BasicDetailsModal";
import ResumeHeadline from "./ResumeHeadline";
import KeySkills from "./KeySkills";
import Employment from "./Employment";
import Education from "./Education";
import ItSkills from "./ItSkills";
import Projects from "./Projects";
import ProfileSummary from "./ProfileSummary";
import Accomplishments from "./Accomplishments";
import DesiredCareerProfile from "./DesiredCareerProfile";
import PersonalDetails from "./PersonalDetails";
import AttachResume from "./AttachResume";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import {
  useResumeProfileDataQuery,
  useGetResumeDataQuery,
} from "@/app/my-resume/store/resume.query";
import { useRouter } from "next/navigation"
import { IMAGE_URL } from "@/lib/apiEndPoints";
const bnr = require("@/images/banner/bnr1.jpg");
const profileIcon = require("@/images/favicon.png");

const JobMyResume: React.FC = () => {
  const router = useRouter();
  const { user } = useLoggedInUser();
  console.log("user", user);
  const [showBasicDetails, setShowBasicDetails] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showKeySkills, setShowKeySkills] = useState(false);
  const [showEmployment, setShowEmployment] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showItSkills, setShowItSkills] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showProfileSummary, setShowProfileSummary] = useState(false);
  const [showAccomplishments, setShowAccomplishments] = useState(false);
  const [showCareerProfile, setShowCareerProfile] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const { data: resumeProfileData } = useResumeProfileDataQuery();
  const { data: resumeData, isLoading } = useGetResumeDataQuery();


  const getProfileStrengthText = (profileStrength :any) => {
    if (profileStrength <= 30) {
      return "Poor";
    } else if (profileStrength <= 70) {
      return "Average";
    } else {
      return "Excellent";
    }
  };
  return (
    <>
      <div className="page-content">
        <div
          className="overlay-black-dark profile-edit p-t50 p-b20"
          style={{ backgroundImage: `url(${bnr.default.src})` }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-7 candidate-info">
                <div className="candidate-detail">
                  <div className="canditate-des text-center">
                    {/* <Image alt="" src={teamImg} /> */}
                    {user?.user?.image ? (
                      <Image
                        src={`${IMAGE_URL + user?.user?.image}`}
                        alt="profile picture"
                        width={100}
                        height={50}
                        onError={(e) =>
                          (e.currentTarget.src = "../../images/favicon.png")
                        } // Fallback image
                        style={{ borderRadius: "50%", height: "100px" }}
                      />
                    ) : (
                      <Image
                        src={profileIcon}
                        alt="profile picture"
                        width={100}
                        height={50}
                        onError={(e) =>
                          (e.currentTarget.src = "../../images/favicon.png")
                        } // Fallback image
                        style={{ borderRadius: "50%", height: "100px" }}
                      />
                    )}
                  </div>
                  <div className="text-white browse-job text-left">
                    <h4 className="m-b0">
                      {user?.user?.name}
                      {/* <Link
                        href=""
                        onClick={() => setShowBasicDetails(true)}
                        className="m-l15 font-16 text-white"
                      >
                        <i className="fa fa-pencil"></i>
                      </Link> */}
                    </h4>
                    {resumeData?.data.map((item: any, index: number) => (
                      <p className="m-b15">
                        {item?.headlines[0]?.description || "Not available"}
                      </p>
                    ))}
                    <ul className="clearfix">
                      <li>
                        <i className="ti-location-pin"></i> {user?.user.address}
                      </li>
                      <li>
                        <i className="ti-mobile"></i> +91{" "}
                        {user?.user?.mobile_number}
                      </li>
                      <li>
                        <i className="ti-briefcase"></i>
                        {user?.user?.experience >= 1
                          ? `Experience: ${user.user.experience} years`
                          : "Fresher"}
                      </li>
                      <li>
                        <i className="ti-email"></i> {user?.user?.email}
                      </li>
                    </ul>
                    <div className="progress-box m-t10">
                      <div className="progress-info">
                      Profile Strength ({getProfileStrengthText(resumeProfileData?.data?.profile_strength)})
                        <span>
                          {resumeProfileData?.data?.profile_strength}%
                        </span>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary"
                          style={{
                            width: `${resumeProfileData?.data?.profile_strength}%`,
                          }}
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-5">
                <Link href="">
                  <div className="pending-info text-white p-a25">
                    <h5>Pending Action</h5>
                    <ul className="list-check secondry">
                      <li>Verify Mobile Number</li>
                      <li>Add Preferred Location</li>
                      <li>Add Resume</li>
                    </ul>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <BasicDetailsModal
            show={showBasicDetails}
            onShow={() => setShowBasicDetails(true)}
            onHide={() => setShowBasicDetails(false)}
          />
        </div>
        <div className="content-block">
          <div className="section-full browse-job content-inner-2">
            <div className="container">
              <div className="row">
                <div className="job-bx-title clearfix">
                  <button
                    onClick={() => router.back()}
                    className="site-button right-arrow button-sm float-right"
                    style={{ fontFamily: "__Inter_Fallback_aaf875" }}
                  >
                    Back
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 m-b30">
                  <ListingSidebar />
                </div>
                <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12">
                  <ResumeHeadline
                    show={showResume}
                    onShow={() => setShowResume(true)}
                    onHide={() => setShowResume(false)}
                  />
                  <KeySkills
                    show={showKeySkills}
                    onShow={() => setShowKeySkills(true)}
                    onHide={() => setShowKeySkills(false)}
                  />
                  <Employment
                    show={showEmployment}
                    onShow={() => setShowEmployment(true)}
                    onHide={() => setShowEmployment(false)}
                  />
                  <Education
                    show={showEducation}
                    onShow={() => setShowEducation(true)}
                    onHide={() => setShowEducation(false)}
                  />
                  <ItSkills
                    show={showItSkills}
                    onShow={() => setShowItSkills(true)}
                    onHide={() => setShowItSkills(false)}
                  />
                  <Projects
                    show={showProjects}
                    onShow={() => setShowProjects(true)}
                    onHide={() => setShowProjects(false)}
                  />
                  <ProfileSummary
                    show={showProfileSummary}
                    onShow={() => setShowProfileSummary(true)}
                    onHide={() => setShowProfileSummary(false)}
                  />
                  {/* <Accomplishments
                    show={showAccomplishments}
                    onShow={() => setShowAccomplishments(true)}
                    onHide={() => setShowAccomplishments(false)}
                  /> */}
                  <DesiredCareerProfile
                    show={showCareerProfile}
                    onShow={() => setShowCareerProfile(true)}
                    onHide={() => setShowCareerProfile(false)}
                  />
                  <PersonalDetails
                    show={showPersonalDetails}
                    onShow={() => setShowPersonalDetails(true)}
                    onHide={() => setShowPersonalDetails(false)}
                  />
                  <AttachResume />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobMyResume;
