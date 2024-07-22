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

const bnr = require("@/images/banner/bnr1.jpg");
const teamImg = require("@/images/team/pic1.jpg");

const JobMyResume: React.FC = () => {
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
                    <Link href="/">
                      <Image alt="" src={teamImg} />
                    </Link>
                    <div
                      className="upload-link"
                      title="update"
                      data-toggle="tooltip"
                      data-placement="right"
                    >
                      <input type="file" className="update-flie" />
                      <i className="fa fa-camera"></i>
                    </div>
                  </div>
                  <div className="text-white browse-job text-left">
                    <h4 className="m-b0">
                      John Doe
                      <Link
                        href=""
                        onClick={() => setShowBasicDetails(true)}
                        className="m-l15 font-16 text-white"
                      >
                        <i className="fa fa-pencil"></i>
                      </Link>
                    </h4>
                    <p className="m-b15">
                      Freelance Senior PHP Developer at various agencies
                    </p>
                    <ul className="clearfix">
                      <li>
                        <i className="ti-location-pin"></i> Sacramento,
                        California
                      </li>
                      <li>
                        <i className="ti-mobile"></i> +1 123 456 7890
                      </li>
                      <li>
                        <i className="ti-briefcase"></i> Fresher
                      </li>
                      <li>
                        <i className="ti-email"></i> info@example.com
                      </li>
                    </ul>
                    <div className="progress-box m-t10">
                      <div className="progress-info">
                        Profile Strength (Average)<span>70%</span>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: "80%" }}
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
                  <Accomplishments
                    show={showAccomplishments}
                    onShow={() => setShowAccomplishments(true)}
                    onHide={() => setShowAccomplishments(false)}
                  />
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
