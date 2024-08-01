"use client";
import React from "react";
import RecentJobsection from "@/markup/Element/RecentJobsection";
var teamImg = require("../../images/team/pic1.jpg");
import { useRouter } from "next/navigation";

const JobAlert = () => {
  const router = useRouter();
  return (
    <>
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <button
                    onClick={() => router.back()}
                    className="site-button right-arrow button-sm float-left"
                    style={{ fontFamily: "__Inter_Fallback_aaf875" }}
                  >
                    Back
                  </button>
                </div>
                <div className="col-xl-12 col-lg-12 m-b30">
                  <RecentJobsection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobAlert;
