"use client";
import React from "react";
import Link from "next/link";
import { Accordion, Card } from "react-bootstrap";

const Accordsidebar = () => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-5 m-b30">
      <aside id="accordion1" className="sticky-top sidebar-filter bg-white">
        <Accordion defaultActiveKey="0">
          <h6 className="title">
            <i className="fa fa-sliders m-r5"></i> Refined By{" "}
            <Link href={"#"} className="font-12 float-right">
              Reset All
            </Link>
          </h6>

          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h6 className="acod-title">Companies</h6>
            </Accordion.Header>
            <Accordion.Body>
              <div className="acod-body collapse show">
                <div className="acod-content">
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="companies1"
                      type="checkbox"
                      name="checkbox-companies"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="companies1"
                    >
                      Job Mirror Consultancy <span>(50)</span>
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="companies2"
                      type="checkbox"
                      name="checkbox-companies"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="companies2"
                    >
                      Engineering Group <span>(80)</span>
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="companies3"
                      type="checkbox"
                      name="checkbox-companies"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="companies3"
                    >
                      Electric Co. <span>(235)</span>
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="companies4"
                      type="checkbox"
                      name="checkbox-companies"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="companies4"
                    >
                      Telecom industry <span>(568)</span>
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="companies5"
                      type="checkbox"
                      name="checkbox-companies"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="companies5"
                    >
                      Safety/ Health <span>(798)</span>
                    </label>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <h6 className="acod-title">Experience</h6>
            </Accordion.Header>
            <Accordion.Body>
              <div className="acod-body collapse show">
                <div className="acod-content">
                  <div className="custom-control custom-radio">
                    <input
                      className="custom-control-input"
                      id="one-years"
                      type="radio"
                      name="radio-years"
                    />
                    <label className="custom-control-label" htmlFor="one-years">
                      0-1 Years <span>(120)</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      className="custom-control-input"
                      id="two-years"
                      type="radio"
                      name="radio-years"
                    />
                    <label className="custom-control-label" htmlFor="two-years">
                      1-2 Years <span>(300)</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      className="custom-control-input"
                      id="three-years"
                      type="radio"
                      name="radio-years"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="three-years"
                    >
                      2-3 Years <span>(235)</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      className="custom-control-input"
                      id="four-years"
                      type="radio"
                      name="radio-years"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="four-years"
                    >
                      3-4 Years <span>(568)</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      className="custom-control-input"
                      id="five-years"
                      type="radio"
                      name="radio-years"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="five-years"
                    >
                      4-5 Years <span>(798)</span>
                    </label>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h6 className="acod-title">Salary</h6>
            </Accordion.Header>
            <Accordion.Body>
              <div className="acod-body collapse show">
                <div className="acod-content">
                  <div className="custom-control custom-radio">
                    <input
                      className="custom-control-input"
                      id="salary-op1"
                      type="radio"
                      name="radio-currency"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="salary-op1"
                    >
                      0-1 lacs <span>(120)</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      className="custom-control-input"
                      id="salary-op2"
                      type="radio"
                      name="radio-currency"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="salary-op2"
                    >
                      1-2 lacs <span>(300)</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      className="custom-control-input"
                      id="salary-op3"
                      type="radio"
                      name="radio-currency"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="salary-op3"
                    >
                      2-3 lacs <span>(235)</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      className="custom-control-input"
                      id="salary-op4"
                      type="radio"
                      name="radio-currency"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="salary-op4"
                    >
                      3-4 lacs <span>(568)</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      className="custom-control-input"
                      id="salary-op5"
                      type="radio"
                      name="radio-currency"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="salary-op5"
                    >
                      4-5 lacs <span>(798)</span>
                    </label>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <h6 className="acod-title">Job Function</h6>
            </Accordion.Header>
            <Accordion.Body>
              <div className="acod-body collapse show">
                <div className="acod-content">
                  <div className="custom-control custom-radio">
                    <input
                      className="custom-control-input"
                      id="function-services-1"
                      type="radio"
                      name="radio-function"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="function-services-1"
                    >
                      Production Management <span>(120)</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      className="custom-control-input"
                      id="function-services-2"
                      type="radio"
                      name="radio-function"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="function-services-2"
                    >
                      Design Engineering <span>(300)</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      className="custom-control-input"
                      id="function-services-3"
                      type="radio"
                      name="radio-function"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="function-services-3"
                    >
                      Safety/ Health <span>(235)</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      className="custom-control-input"
                      id="function-services-4"
                      type="radio"
                      name="radio-function"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="function-services-4"
                    >
                      Engineering <span>(568)</span>
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      className="custom-control-input"
                      id="function-services-5"
                      type="radio"
                      name="radio-function"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="function-services-5"
                    >
                      Marketing <span>(798)</span>
                    </label>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </aside>
    </div>
  );
};

export default Accordsidebar;
