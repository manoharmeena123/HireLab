"use client";
import React from "react";
import { usePrivacyPolicyQuery } from "@/app/my-resume/store/resume.query";
import Loading from "@/components/Loading";

const PrivacyPolicy = () => {
  const { data: privacyPolicy, isLoading: privacyPolicyLoading } =
    usePrivacyPolicyQuery();
  console.log("privacyPolicy", privacyPolicy);

  if (!privacyPolicy) return null;

  return (
    <>
      {privacyPolicyLoading && <Loading />}{" "}
      <div className="privacy-policy-section py-5 bg-light">
        <div className="container">
          <div className="section-head text-center mb-5">
            <h1 className="font-weight-bold">{privacyPolicy.data.title}</h1>
          </div>
          <div className="privacy-policy-content bg-white p-5 shadow-sm rounded">
            <div
              className="privacy-policy-heading mb-4"
              dangerouslySetInnerHTML={{ __html: privacyPolicy.data.heading }}
            />
            <div
              className="privacy-policy-description"
              dangerouslySetInnerHTML={{
                __html: privacyPolicy.data.description,
              }}
            />
          </div>
        </div>
        <style jsx>{`
          .privacy-policy-section {
            padding: 60px 0;
            background-color: #f3f4f6;
          }
          .section-head {
            margin-bottom: 40px;
          }
          .section-head h1 {
            font-size: 2.5rem;
            color: #2a6310;
          }
          .privacy-policy-content {
            padding: 40px;
            background: #ffffff;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
          }
          .privacy-policy-heading {
            font-size: 1.25rem;
            color: #333;
          }
          .privacy-policy-description {
            font-size: 1rem;
            color: #555;
          }
          .privacy-policy-description ul {
            padding-left: 20px;
            list-style-type: disc;
            color: #2a6310;
          }
          .privacy-policy-description ul li {
            margin-bottom: 10px;
          }
        `}</style>
      </div>
    </>
  );
};

export default PrivacyPolicy;
