"use client";
import React, { useState } from "react";
import PageTitle from "../PageTitle";
import Link from "next/link";
import Jobfindbox from "../Jobfindbox";
import { Form } from "react-bootstrap";
import Image from "next/image";
import { postBox } from "@/data/dashboard";
var bnr = require("./../../images/banner/bnr1.jpg");

const Dashboard = () => {
  const [subscribe, setSubscribe] = useState(true);
  return (
    <>
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-b50">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-8">
                  <h3 className="text-center">Recent Jobs</h3>
                  <ul className="post-job-bx">
                    {postBox?.map((item, index) => (
                      <li key={index}>
                        <div className="post-bx">
                          <div className="d-flex m-b30">
                            <div className="job-post-company">
                              <Link href={""}>
                                <span>
                                  <Image src={item?.image} alt="image" />
                                </span>
                              </Link>
                            </div>
                            <div className="job-post-info">
                              <h6 style={{ fontWeight: "bold" }}>
                                <Link href={"/job-detail"}>{item.title}</Link>
                              </h6>
                              <ul>
                                <li>
                                  <i className="fa fa-map-marker"></i>
                                  Sacramento, California
                                </li>
                                <li>
                                  <i className="fa fa-usd"></i> Full Time
                                </li>
                                <li>
                                  <i className="fa fa-clock-o"></i> Published 11
                                  months ago
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex">
                            <div className="job-time mr-auto">
                              {/* <Link href ={"#"} className="mr-1"><span>Javascript</span></Link>
															<Link href ={"#"} className="mr-1"><span>CSS</span></Link>
															<Link href ={"#"} className="mr-1"><span>HTML</span></Link>
															<Link href ={"#"}><span>Bootstrap</span></Link> */}
                              <Link href={"#"}>
                                <span>Full time</span>
                              </Link>
                            </div>
                            <div className="salary-bx">
                              <span>$45 Per Hour</span>
                            </div>
                          </div>
                          <label className="like-btn">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-xl-4 col-lg-4">
                  <div
                    className="sticky-top browse-candidates"
                    style={{
                      marginTop: "100px",
                      display: "block",
                      justifyContent: "center",
                    }}
                  >
                    <h3 style={{ fontWeight: "bold", textAlign: "center" }}>
                      Membership Plan
                    </h3>
                    <p className="text-center">You path to Success</p>

                    <div
                      className="membership_class"
                      style={{
                        backgroundColor: subscribe
                          ? "#2A6310"
                          : "rgba(11, 102, 195, 0.60)",
                      }}
                    >
                      <div className="quote-info">
                        <div className="d-flex align-items-center">
                          <h1
                            className="text-white text-center  flex-grow-1"
                            style={{ marginBottom: "15px" }}
                          >
                            Wizard
                          </h1>
                          {subscribe && (
                            <div className="px-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="46"
                                height="46"
                                viewBox="0 0 36 36"
                                fill="none"
                              >
                                <circle cx="18" cy="18" r="18" fill="#31E604" />
                                <path
                                  d="M25.5 11.41L15.5 21.41L10 15.91L11.41 14.5L15.5 18.58L24.09 10L25.5 11.41Z"
                                  fill="#fff"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        <ul className="text-center-li">
                          <li className="">Salary bracket &gt; 30 lacs</li>
                        </ul>

                        <h2
                          className="text-white text-center"
                          style={{ fontFamily: "Lato, sans-serif !important" }}
                        >
                          Price
                        </h2>
                        <li
                          className="text-center"
                          style={{
                            fontFamily: "Lato, sans-serif !important",
                            letterSpacing: "0.05em",
                          }}
                        >
                          699/-for 1 month
                        </li>

                        <li
                          className="text-center"
                          style={{
                            fontFamily: "Lato, sans-serif !important",
                            letterSpacing: "0.05em",
                          }}
                        >
                          1799/-for 3 months
                        </li>
                      </div>
                    </div>
                    <div
                      className="membership_class"
                      style={{
                        backgroundColor: !subscribe
                          ? "#2A6310"
                          : "rgba(11, 102, 195, 0.60)",
                      }}
                    >
                      <div className="quote-info">
                        <div className="d-flex align-items-center">
                          <h1
                            className="text-white text-center  flex-grow-1"
                            style={{ marginBottom: "15px" }}
                          >
                            Wizard
                          </h1>
                          {!subscribe && (
                            <div className="px-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="46"
                                height="46"
                                viewBox="0 0 36 36"
                                fill="none"
                              >
                                <circle cx="18" cy="18" r="18" fill="#31E604" />
                                <path
                                  d="M25.5 11.41L15.5 21.41L10 15.91L11.41 14.5L15.5 18.58L24.09 10L25.5 11.41Z"
                                  fill="#fff"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        <ul className="text-center-li">
                          <li className="">Salary bracket &gt; 30 lacs</li>
                        </ul>

                        <h2
                          className="text-white text-center"
                          style={{ fontFamily: "Lato, sans-serif !important" }}
                        >
                          Price
                        </h2>
                        <li
                          className="text-center"
                          style={{
                            fontFamily: "Lato, sans-serif !important",
                            letterSpacing: "0.05em",
                          }}
                        >
                          699/-for 1 month
                        </li>

                        <li
                          className="text-center"
                          style={{
                            fontFamily: "Lato, sans-serif !important",
                            letterSpacing: "0.05em",
                          }}
                        >
                          1799/-for 3 months
                        </li>
                      </div>
                    </div>
                    <div
                      className="membership_class"
                      style={{
                        backgroundColor: !subscribe
                          ? "#2A6310"
                          : "rgba(11, 102, 195, 0.60)",
                      }}
                    >
                      <div className="quote-info">
                        <div className="d-flex align-items-center">
                          <h1
                            className="text-white text-center  flex-grow-1"
                            style={{ marginBottom: "15px" }}
                          >
                            Wizard
                          </h1>
                          {!subscribe && (
                            <div className="px-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="46"
                                height="46"
                                viewBox="0 0 36 36"
                                fill="none"
                              >
                                <circle cx="18" cy="18" r="18" fill="#31E604" />
                                <path
                                  d="M25.5 11.41L15.5 21.41L10 15.91L11.41 14.5L15.5 18.58L24.09 10L25.5 11.41Z"
                                  fill="#fff"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        <ul className="text-center-li">
                          <li className="">Salary bracket &gt; 30 lacs</li>
                        </ul>

                        <h2
                          className="text-white text-center"
                          style={{ fontFamily: "Lato, sans-serif !important" }}
                        >
                          Price
                        </h2>
                        <li
                          className="text-center"
                          style={{
                            fontFamily: "Lato, sans-serif !important",
                            letterSpacing: "0.05em",
                          }}
                        >
                          699/-for 1 month
                        </li>

                        <li
                          className="text-center"
                          style={{
                            fontFamily: "Lato, sans-serif !important",
                            letterSpacing: "0.05em",
                          }}
                        >
                          1799/-for 3 months
                        </li>
                      </div>
                    </div>
                    <div
                      className="membership_class"
                      style={{
                        backgroundColor: !subscribe
                          ? "#2A6310"
                          : "rgba(11, 102, 195, 0.60)",
                      }}
                    >
                      <div className="quote-info">
                        <div className="d-flex align-items-center">
                          <h1
                            className="text-white text-center  flex-grow-1"
                            style={{ marginBottom: "15px" }}
                          >
                            Wizard
                          </h1>
                          {!subscribe && (
                            <div className="px-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="46"
                                height="46"
                                viewBox="0 0 36 36"
                                fill="none"
                              >
                                <circle cx="18" cy="18" r="18" fill="#31E604" />
                                <path
                                  d="M25.5 11.41L15.5 21.41L10 15.91L11.41 14.5L15.5 18.58L24.09 10L25.5 11.41Z"
                                  fill="#fff"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        <ul className="text-center-li">
                          <li className="">Salary bracket &gt; 30 lacs</li>
                        </ul>

                        <h2
                          className="text-white text-center"
                          style={{ fontFamily: "Lato, sans-serif !important" }}
                        >
                          Price
                        </h2>
                        <li
                          className="text-center"
                          style={{
                            fontFamily: "Lato, sans-serif !important",
                            letterSpacing: "0.05em",
                          }}
                        >
                          699/-for 1 month
                        </li>

                        <li
                          className="text-center"
                          style={{
                            fontFamily: "Lato, sans-serif !important",
                            letterSpacing: "0.05em",
                          }}
                        >
                          1799/-for 3 months
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-6" style={{ marginTop: "30px" }}>
                  <ul className="post-job-bx">
                    <h2>Meet Ups</h2>

                    <li>
                      <div className="post-bx">
                        <div className="d-flex m-b30">
                          <div className="job-post-info">
                            <h5>
                              <Link href="/">Banglore Meetup</Link>
                            </h5>
                            <ul style={{ display: "flex" }}>
                              <li>
                                <i className="fa fa-map-marker"></i>
                                Whitefeild,Banglore 21 March 2023 10:00 Am
                                onwords
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="post-bx">
                        <div className="d-flex m-b30">
                          <div className="job-post-info">
                            <h5>
                              <Link href="/">Banglore Meetup</Link>
                            </h5>
                            <ul style={{ display: "flex" }}>
                              <li>
                                <i className="fa fa-map-marker"></i>
                                Whitefeild,Banglore 21 March 2023 10:00 Am
                                onwords
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <button
                        style={{
                          display: "grid",
                          margin: "0 auto",
                          marginTop: "10px",
                        }}
                        className="btn btn-primary"
                      >
                        Browswe All
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="col-6" style={{ marginTop: "30px" }}>
                  <ul className="post-job-bx">
                    <h2>Discussion Forum</h2>

                    <li>
                      <div className="post-bx" style={{ height: "143px" }}>
                        <div className="d-flex m-b30">
                          <div className="job-post-info">
                            <h5>
                              <Link href="/">
                                Q:Lorem ipsum tell me about your plans
                              </Link>
                            </h5>
                            <ul style={{ display: "flex" }}>
                              <p>Author: testsldeldedledldmldlele</p>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="post-bx" style={{ height: "143px" }}>
                        <div className="d-flex m-b30">
                          <div className="job-post-info">
                            <h5>
                              <Link href="/">
                                Q:Lorem ipsum tell me about your plans
                              </Link>
                            </h5>
                            <ul style={{ display: "flex" }}>
                              <p>Author: testsldeldedledldmldlele</p>
                            </ul>
                          </div>
                        </div>
                        <button
                          style={{
                            display: "grid",
                            margin: "0 auto",
                            marginTop: "42px",
                          }}
                          className="btn btn-primary"
                        >
                          Ask a Question
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .text-center-li {
            display: flex;
            justify-content: center;
            align-item: center;
          }
        `}</style>
      </div>
    </>
  );
};
export default Dashboard;
