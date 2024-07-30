"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="widget">
                <div className="d-flex align-items-center">
                  <img
                    src={
                      require("./../../images/hiralablogo.png")
                        .default.src
                    }
                    style={{ width: "60px", height: "67px" }}
                    className="m-b15 mr-1"
                    alt=""
                  />
				  
                </div>
                <p className="text-capitalize m-b20">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry has been the industry's standard dummy
                  text ever since the.
                </p>
                <div className="subscribe-form m-b20">
                  <form
                    className="dzSubscribe"
                    action="script/mailchamp.php"
                    method="post"
                  >
                    <div className="dzSubscribeMsg"></div>
                    <div className="input-group">
                      <input
                        name="dzEmail"
                        required
                        className="form-control"
                        placeholder="Your Email Address"
                        type="email"
                      />
                      <span className="input-group-btn">
                        <button
                          name="submit"
                          value="Submit"
                          type="submit"
                          className="site-button radius-xl"
                        >
                          Subscribe
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
                <ul className="list-inline m-a0">
                  <li>
                    <Link
                      href={""}
                      className="site-button white facebook circle "
                    >
                      <i className="fa fa-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={""}
                      className="site-button white google-plus circle "
                    >
                      <i className="fa fa-google-plus"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={""}
                      className="site-button white linkedin circle "
                    >
                      <i className="fa fa-linkedin"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={""}
                      className="site-button white instagram circle "
                    >
                      <i className="fa fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={""}
                      className="site-button white twitter circle "
                    >
                      <i className="fa fa-twitter"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5 col-md-8 col-sm-8 col-12 d-flex gap-2">
              <div className="widget border-0 w-100">
                <h5 className="m-b30 text-white">Pages</h5>
                <ul className="list-2 list-line d-flex flex-column">
                  <li>
                    <Link href={"/"}>Home</Link>
                  </li>
                  <li>
                    <Link href={"/about-us"}>About Us</Link>
                  </li>
                  <li>
                  <Link href={"/contact-us"}>Contact Us</Link>
                  </li>
                  <li>
                  <Link href={"/job-seeker-faq"}>Job Seeker FAQ</Link>
                  </li>
                  <li>
                  <Link href={"/monthly-meetup-faq"}>Monthly Meetup FAQ</Link>
                  </li>
                  <li>
                  <Link href={"/general-question-faq"}>General Question FAQ</Link>
                  </li>
                  <li>
                  <Link href={"/about-us-faq"}>About Us FAQ</Link>
                  </li>
                </ul>
              </div>
              <div className="widget border-0 w-100">
                <h5 className="m-b30 text-white">Information</h5>
                <ul className="list-2 list-line d-flex flex-column">
                  <li>
                    <Link href={""}>Privacy & Securty</Link>
                  </li>
                  <li>
                    <Link href={""}>Terms of Serice</Link>
                  </li>
                  <li>
                    <Link href={""}>Referral Terms</Link>
                  </li>
                  <li>
                    <Link href={""}>Support</Link>
                  </li>
                  <li>
                    <Link href={"/refund-policy"}>Refund Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-12">
              <div className="widget border-0">
                <h5 className="m-b30 text-white">Find Jobs</h5>
                <ul className="list-2 w10 list-line">
                  <li>
                    <Link href={""}>US Jobs</Link>
                  </li>
                  <li>
                    <Link href={""}>Canada Jobs</Link>
                  </li>
                  <li>
                    <Link href={""}>UK Jobs</Link>
                  </li>
                  <li>
                    <Link href={""}>Emplois en Fnce</Link>
                  </li>
                  <li>
                    <Link href={""}>Jobs in Deuts</Link>
                  </li>
                  <li>
                    <Link href={""}>Vacatures China</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <span>
                {" "}
                © Copyright by{" "}
                <i className="fa fa-heart m-lr5 text-red heart"></i>
                <Link href={""}>HireLab </Link> All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
