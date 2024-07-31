"use client";
import React from "react";
import { useTermsAndConditionQuery } from "@/app/my-resume/store/resume.query";
import Loading from "@/components/Loading";

const TermsAndCondition: React.FC = () => {
  const { data: termsAndCondition, isLoading: termsAndConditionLoading } =
    useTermsAndConditionQuery();
  console.log("termsAndCondition", termsAndCondition);

  if (!termsAndCondition) return null;

  const { title, heading, description } = termsAndCondition.data;

  // Function to dynamically create sections with appropriate tags
  const createSectionsFromDescription = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const sections :any = [];

    doc.body.childNodes.forEach((node : any, index : any) => {
      if (node.nodeType === 1) { // Element node
        if (node.tagName === "P" && node.querySelector("strong")) {
          sections.push(
            <h3 key={index} className="mt-4">
              {node.textContent}
            </h3>
          );
        } else if (node.tagName === "UL" || node.tagName === "OL") {
          sections.push(
            <div key={index} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
          );
        } else if (node.tagName === "LI" && node.querySelector("strong")) {
          sections.push(
            <div key={index} className="mb-2">
              <strong>{node.textContent}</strong>
            </div>
          );
        } else {
          sections.push(
            <p key={index} dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
          );
        }
      }
    });

    return sections;
  };

  return (
    <>
      {termsAndConditionLoading && <Loading />}
      <div className="terms-conditions-section py-5 bg-light">
        <div className="container">
          <div className="section-head text-center mb-5">
            <h1 className="font-weight-bold">{title}</h1>
          </div>
          <div className="terms-conditions-content bg-white p-5 shadow-sm rounded">
            <div
              className="terms-conditions-heading mb-4"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
            <div className="terms-conditions-description">
              {createSectionsFromDescription(description)}
            </div>
          </div>
        </div>
        <style jsx>{`
          .terms-conditions-section {
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
          .terms-conditions-content {
            padding: 40px;
            background: #ffffff;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
          }
          .terms-conditions-heading,
          .terms-conditions-description {
            margin-bottom: 20px;
          }
          .terms-conditions-description ul,
          .terms-conditions-description ol {
            padding-left: 20px;
            list-style-type: disc;
            color: #2a6310;
          }
          .terms-conditions-description ul li,
          .terms-conditions-description ol li {
            margin-bottom: 10px;
          }
          .terms-conditions-description ol {
            list-style-type: decimal;
          }
          .terms-conditions-description ul ul,
          .terms-conditions-description ol ul {
            list-style-type: circle;
            padding-left: 20px;
          }
          .terms-conditions-description a {
            color: #0056b3;
            text-decoration: underline;
          }
          .terms-conditions-description a:hover {
            color: #004494;
          }
        `}</style>
      </div>
    </>
  );
};

export default TermsAndCondition;
