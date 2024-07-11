"use client";
import React, { useState } from "react";
import Link from "next/link";
import IndexBanner from "./IndexBanner";
import Jobcategories from "./Jobcategories";
import Featureblog from "./Featureblog";
import RecentJobsection from "./RecentJobsection";
import Owltestimonial from "./Owlblog1";
import LatestDiscussions from "./LatestDiscussions";
import MembershipPlans from './MembershipPlan'
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoginState,
  selectLoginErrors,
} from "@/app/login/store/login.selectors";
import UpComingMeetings from "./UpComingMeetings";

//Images
var bnr7 = require("./../../images/background/plans.png");
var bnr9 = require("./../../images/background/bg-9-new.jpeg");

const Homepage = () => {
  const authState = useSelector(selectLoginState);

  return (
    <div className="page-wraper">
      <IndexBanner />
      <div
        className="page-content"
        style={{
          backgroundColor: "#fff3f3",
          backgroundImage: "url(" + bnr7.default.src + ")",
        }}
      >
        <div className="section-full content-inner-2 overlay-white-middle">
          <div className="container">
            <div className="section-head text-black text-center">
              <h2 style={{ fontWeight: "600" }} className="m-b0">
                Membership Plans
              </h2>
              <p>"Empowering Careers: CTC-BasedTiers,Your Path to Success."</p>
            </div>
            <MembershipPlans/>
          </div>
        </div>
        <div className="section-full content-inner bg-white">
          <UpComingMeetings />
        </div>
        <div className="section-full job-categories content-inner-2 bg-white">
          <LatestDiscussions />
        </div>

        <Featureblog />
        <RecentJobsection />
        <div
          className="section-full p-tb70 overlay-black-dark text-white text-center bg-img-fix"
          style={{ backgroundImage: "url(" + bnr9.default.src + ")" }}
        >
          <div className="container">
            <div className="section-head text-center text-white">
              <h2 style={{ fontWeight: "600" }} className="m-b5">
                Testimonials
              </h2>
              <h5 className="fw4">Few words from candidates</h5>
            </div>
            <Owltestimonial />
          </div>
        </div>
      </div>
      <style jsx>{`
        .member-ship-div {
          min-height: 500px;
          border-radius: 20px;
        }
        .member-ship-div:hover {
          background-color: #2a6310 !important;
          color: white !important;
        }
        .member-ship-div:hover .site-button {
          background-color: #fff !important; /* Changes the button background color to white */
          color: #000 !important; /* Changes the button text color to black */
        }
        .member-ship-div:hover div h4 {
          color: white !important;
          border-color: white !important;
        }
        .member-ship-div:hover div ul li {
          color: white !important;
        }
        .white-hover {
          border: 1px solid white !important;
        }
        .member-ship-div:hover div div h3 {
          color: white !important;
        }
        .display-property {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .pagination-bx .pagination {
          width: 300px;
          margin-left: 0px;
        }
        .display-item-center {
          display: flex !important;
          align-item: center;
          justify-content: center;
        }
        @media (max-width: 1200px) {
          .display-property {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 576px) {
          .display-property {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </div>
  );
};
export default Homepage;
