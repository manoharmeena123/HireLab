import React from "react";
import Link from "next/link";
const img1 = require("./../../images/city/pic1.jpg");
const img2 = require("./../../images/city/pic2.jpg");
const img3 = require("./../../images/city/pic3.jpg");
const img4 = require("./../../images/city/pic4.jpg");
const img5 = require("./../../images/city/pic5.jpg");
const img6 = require("./../../images/city/pic6.jpg");
const img7 = require("./../../images/city/pic7.jpg");
const img8 = require("./../../images/city/pic8.jpg");

const Featureblog: React.FC = () => {
  return (
    <div
      style={{ backgroundColor: "#F3F3F3" }}
      className="section-full content-inner "
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 section-head text-center">
            <h2 style={{ fontWeight: "600" }} className="m-b5">
              CTC based Jobs
            </h2>
            <h6 className="fw4 m-b0">20+ Featured Cities Added Jobs</h6>
          </div>
        </div>
        <div className="row ctc-jobs-wrap">
          <div
            className="pricingtable-wrapper style2 bg-white member-ship-div"
            style={{
              minHeight: "270px",
              borderRadius: "20px",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              const button = e.currentTarget.querySelector(
                ".site-button"
              ) as HTMLElement;
              button.style.backgroundColor = "#fff";
              button.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              const button = e.currentTarget.querySelector(
                ".site-button"
              ) as HTMLElement;
              button.style.backgroundColor = "#2A6310";
              button.style.color = "#fff";
            }}
          >
            <div className="">
              <div className="pricingtable-price">
                <h4
                  className="font-weight-900 m-t10 m-b0 text-center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "28px",
                    border: "1.5px solid black",
                    borderRadius: "20px",
                    padding: "5px",
                  }}
                >
                  CTC
                </h4>
              </div>
              <ul style={{ marginTop: "40px" }} className="mp-cards">
                <li
                  style={{
                    color: "black",
                    margin: "5px 0px",
                    fontSize: "18px",
                  }}
                >
                  <b>3 - 5 Lpa</b>
                  <br />
                  <p>120 Jobs</p>
                </li>
              </ul>
              <div className="text-center">
                <Link
                  href={"/register"}
                  className="site-button radius-xl white-hover"
                  style={{
                    border: "1px solid white",
                    backgroundColor: "#2A6310",
                  }}
                >
                  <span
                    className="p-lr30"
                    style={{ fontFamily: "__Inter_Fallback_aaf875" }}
                  >
                    Get Started
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div
            className="pricingtable-wrapper style2 bg-white member-ship-div"
            style={{
              minHeight: "270px",
              borderRadius: "20px",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              const button = e.currentTarget.querySelector(
                ".site-button"
              ) as HTMLElement;
              button.style.backgroundColor = "#fff";
              button.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              const button = e.currentTarget.querySelector(
                ".site-button"
              ) as HTMLElement;
              button.style.backgroundColor = "#2A6310";
              button.style.color = "#fff";
            }}
          >
            <div className="">
              <div className="pricingtable-price">
                <h4
                  className="font-weight-900 m-t10 m-b0 text-center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "28px",
                    border: "1.5px solid black",
                    borderRadius: "20px",
                    padding: "5px",
                  }}
                >
                  CTC
                </h4>
              </div>
              <ul style={{ marginTop: "40px" }} className="mp-cards">
                <li
                  style={{
                    color: "black",
                    margin: "5px 0px",
                    fontSize: "18px",
                  }}
                >
                  <b>5 - 10 Lpa</b>
                  <br />
                  <p>110 Jobs</p>
                </li>
              </ul>
              <div className="text-center">
                <Link
                  href={"/register"}
                  className="site-button radius-xl white-hover"
                  style={{
                    border: "1px solid white",
                    backgroundColor: "#2A6310",
                  }}
                >
                  <span
                    className="p-lr30"
                    style={{ fontFamily: "__Inter_Fallback_aaf875" }}
                  >
                    Get Started
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="pricingtable-wrapper style2 bg-white member-ship-div"
            style={{
              minHeight: "270px",
              borderRadius: "20px",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              const button = e.currentTarget.querySelector(
                ".site-button"
              ) as HTMLElement;
              button.style.backgroundColor = "#fff";
              button.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              const button = e.currentTarget.querySelector(
                ".site-button"
              ) as HTMLElement;
              button.style.backgroundColor = "#2A6310";
              button.style.color = "#fff";
            }}
          >
            <div className="">
              <div className="pricingtable-price">
                <h4
                  className="font-weight-900 m-t10 m-b0 text-center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "28px",
                    border: "1.5px solid black",
                    borderRadius: "20px",
                    padding: "5px",
                  }}
                >
                  CTC
                </h4>
              </div>
              <ul style={{ marginTop: "40px" }} className="mp-cards">
                <li
                  style={{
                    color: "black",
                    margin: "5px 0px",
                    fontSize: "18px",
                  }}
                >
                  <b>10 - 15 Lpa</b>
                  <br />
                  <p>120 Jobs</p>
                </li>
              </ul>
              <div className="text-center">
                <Link
                  href={"/register"}
                  className="site-button radius-xl white-hover"
                  style={{
                    border: "1px solid white",
                    backgroundColor: "#2A6310",
                  }}
                >
                  <span
                    className="p-lr30"
                    style={{ fontFamily: "__Inter_Fallback_aaf875" }}
                  >
                    Get Started
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="pricingtable-wrapper style2 bg-white member-ship-div"
            style={{
              minHeight: "270px",
              borderRadius: "20px",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              const button = e.currentTarget.querySelector(
                ".site-button"
              ) as HTMLElement;
              button.style.backgroundColor = "#fff";
              button.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              const button = e.currentTarget.querySelector(
                ".site-button"
              ) as HTMLElement;
              button.style.backgroundColor = "#2A6310";
              button.style.color = "#fff";
            }}
          >
            <div className="">
              <div className="pricingtable-price">
                <h4
                  className="font-weight-900 m-t10 m-b0 text-center"
                  style={{
                    fontWeight: "bold",
                    fontSize: "28px",
                    border: "1.5px solid black",
                    borderRadius: "20px",
                    padding: "5px",
                  }}
                >
                  CTC
                </h4>
              </div>
              <ul style={{ marginTop: "40px" }} className="mp-cards">
                <li
                  style={{
                    color: "black",
                    margin: "5px 0px",
                    fontSize: "18px",
                  }}
                >
                  <b>15 - 25 Lpa</b>
                  <br />
                  <p>96 Jobs</p>
                </li>
              </ul>
              <div className="text-center">
                <Link
                  href={"/register"}
                  className="site-button radius-xl white-hover"
                  style={{
                    border: "1px solid white",
                    backgroundColor: "#2A6310",
                  }}
                >
                  <span
                    className="p-lr30"
                    style={{ fontFamily: "__Inter_Fallback_aaf875" }}
                  >
                    Get Started
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featureblog;
