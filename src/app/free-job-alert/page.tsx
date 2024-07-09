"use client";
import Link from "next/link";
import React from "react";
import { Form } from "react-bootstrap";
import PageTitle from "@/markup/Layout/PageTitle";

var bnr = require("./../../images/banner/bnr1.jpg");
var bnr2 = require("./../../images/background/bg3.jpg");

const Freejobalerts = () => {
  return (
    <>
      <div className="page-content">
        <div
          className="dez-bnr-inr overlay-black-middle"
          style={{ backgroundImage: "url(" + bnr.default.src + ")" }}
        >
          <PageTitle activeName="Free Job Alerts" motherName="Home" />
        </div>
        <div className="content-block">
          <div className="section-full browse-job content-inner-2">
            <div className="container">
              <div className="job-bx bg-white">
                <div className="row">
                  <div className="col-lg-8">
                    <form className="job-alert-bx">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Keywords</label>
                            <input
                              className="form-control"
                              placeholder="Skills, Designations, Roles, Companies"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Location</label>
                            <input
                              className="form-control"
                              placeholder="Enter the cities you want to work in"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Work Experience</label>
                            <Form.Control
                              as="select"
                              className="btn dropdown-toggle text-left btn-default"
                            >
                              <option>0 years</option>
                              <option>1 years</option>
                              <option>2 years</option>
                              <option>5 years</option>
                              <option>4 years</option>
                              <option>5 years</option>
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Expected Salary</label>
                            <Form.Control
                              as="select"
                              className="btn dropdown-toggle text-left btn-default"
                            >
                              <option>0 lakh</option>
                              <option>1 lakh</option>
                              <option>2 lakh</option>
                              <option>5 lakh</option>
                              <option>4 lakh</option>
                              <option>5 lakh</option>
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Industry</label>
                            <input
                              className="form-control"
                              placeholder="Type or Select the desired industry"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Job Category</label>
                            <input
                              className="form-control"
                              placeholder="Type or Select the desired category"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Role</label>
                            <input
                              className="form-control"
                              placeholder="Type or Select the desired role"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Name your Job Alert</label>
                            <input
                              className="form-control"
                              placeholder="Enter a name that will help you recognize this Job Alert"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="job-alert-check"
                                name="job-alert-check"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="job-alert-check"
                              >
                                Also send me jobs closely related to my search
                                terms{" "}
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12 text-center">
                          <button className="site-button">
                            Create Job Alert
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-4 bg-gray">
                    <div className="p-a25">
                      <h6>Why should you create a job alert</h6>
                      <ul className="list-check primary">
                        <li>Get relevant jobs directly in your inbox</li>
                        <li>Stay updated with latest opportunities</li>
                        <li>Be the first one to apply</li>
                        <li>Create up to 5 personalized job alerts</li>
                      </ul>
                      <div className="dez-divider bg-gray-dark"></div>
                      <h6 className="font-14">Why info@example.com</h6>
                      <p className="m-b10">
                        <strong className="text-black m-r10">800,000+ </strong>{" "}
                        Jobs
                      </p>
                      <p className="m-b10">
                        <strong className="text-black m-r10">100,000+</strong>{" "}
                        CV searches daily
                      </p>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry has been the industry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade lead-form-modal"
          id="car-details"
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="modal-body row m-a0 clearfix">
                <div
                  className="col-lg-6 col-md-6 overlay-primary-dark d-flex p-a0"
                  style={{
                    backgroundImage: "url(" + bnr2 + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="form-info text-white align-self-center">
                    <h3 className="m-b15">Login To You Now</h3>
                    <p className="m-b15">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry has been the industry.
                    </p>
                    <ul className="list-inline m-a0">
                      <li>
                        <Link href={"#"} className="m-r10 text-white">
                          <i className="fa fa-facebook"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href={"#"} className="m-r10 text-white">
                          <i className="fa fa-google-plus"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href={"#"} className="m-r10 text-white">
                          <i className="fa fa-linkedin"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href={"#"} className="m-r10 text-white">
                          <i className="fa fa-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href={"#"} className="m-r10 text-white">
                          <i className="fa fa-twitter"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 p-a0">
                  <div className="lead-form browse-job text-left">
                    <form>
                      <h3 className="m-t0">Personal Details</h3>
                      <div className="form-group">
                        <input className="form-control" placeholder="Name" />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Mobile Number"
                        />
                      </div>
                      <div className="clearfix">
                        <button
                          type="button"
                          className="btn-primary site-button btn-block"
                        >
                          Submit{" "}
                        </button>
                      </div>
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
export default Freejobalerts;
