"use client";
import React, { useEffect, useCallback } from "react";
import Link from "next/link";
import { Form } from "react-bootstrap";

const bnr1 = require("./../../images/main-slider/slide2.jpg");

const IndexBanner: React.FC = () => {
  const handleFocus = useCallback((event: FocusEvent) => {
    const target = event.target as HTMLInputElement;
    target.parentElement?.parentElement?.classList.add("focused");
  }, []);

  const handleBlur = useCallback((event: FocusEvent) => {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;
    if (inputValue === "") {
      target.parentElement?.parentElement?.classList.remove("filled");
      target.parentElement?.parentElement?.classList.remove("focused");
    } else {
      target.parentElement?.parentElement?.classList.add("filled");
    }
  }, []);

  useEffect(() => {
    const inputSelector = document.querySelectorAll("input, textarea");

    inputSelector.forEach((input) => {
      input.addEventListener("focus", handleFocus as EventListener);
      input.addEventListener("blur", handleBlur as EventListener);
    });

    // Cleanup event listeners on component unmount
    return () => {
      inputSelector.forEach((input) => {
        input.removeEventListener("focus", handleFocus as EventListener);
        input.removeEventListener("blur", handleBlur as EventListener);
      });
    };
  }, [handleFocus, handleBlur]);

  return (
    <div
      className="dez-bnr-inr dez-bnr-inr-md"
      style={{ backgroundImage: `url(${bnr1.default.src})` }}
    >
      <div className="container">
        <div className="dez-bnr-inr-entry align-m">
          <div className="find-job-bx">
            <Link href="/browse-job" className="site-button button-sm" style={{ backgroundColor:"#2A6310"}}>
              Find Jobs, Employment & Career Opportunities
            </Link>
            <h2>
              Search Between More Than <br />{" "}
              <span  style={{color:"#2A6310"}}>50,000</span> Open Jobs.
            </h2>
            <form className="dezPlaceAni">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="form-group">
                    <label>Job Title, Keywords, or Phrase</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fa fa-search"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="form-group">
                    <label>City, State or ZIP</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fa fa-map-marker"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mt-2">
                  <div className="form-group">
                    <Form.Control as="select" className="select-btn">
                      <option>Select Sector</option>
                      <option>Construction</option>
                      <option>Coordinator</option>
                      <option>Employer</option>
                      <option>Financial Career</option>
                      <option>Information Technology</option>
                      <option>Marketing</option>
                      <option>Quality check</option>
                      <option>Real Estate</option>
                      <option>Sales</option>
                      <option>Supporting</option>
                      <option>Teaching</option>
                    </Form.Control>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <button
                    type="submit"
                    style={{
                      fontFamily:
                        "apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                    }}
                    className="site-button btn-block"
                  >
                    Find Job
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexBanner;
