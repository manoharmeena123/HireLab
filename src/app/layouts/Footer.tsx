"use client";
import React from "react";
import Link from "next/link";
import { useGetSettingsQuery} from "@/store/global-store/global.query";

const Footer = () => {
  const { data: getSetting } = useGetSettingsQuery();
  const getSafeUrl = (url: string | null | undefined) => {
    return url || "#";
  };
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="widget">
                <div className="d-flex align-items-center">
                  <img
                    src={require("./../../images/hiralablogo.png").default.src}
                    style={{ width: "60px", height: "67px" }}
                    className="m-b15 mr-1"
                    alt=""
                  />
                </div>
                <p className="text-capitalize m-b20 text-white">
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
                           href={getSafeUrl(getSetting?.data?.facebook)}
                      className="site-button white facebook circle "
                    >
                      <i className="fa fa-facebook"></i>
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      href={""}
                      className="site-button white google-plus circle "
                    >
                      <i className="fa fa-google-plus"></i>
                    </Link>
                  </li> */}
                  <li>
                    <Link
                       href={getSafeUrl(getSetting?.data?.linkedin)}
                      className="site-button white linkedin circle "
                    >
                      <i className="fa fa-linkedin"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                     href={getSafeUrl(getSetting?.data?.instagram)}
                      className="site-button white instagram circle "
                    >
                      <i className="fa fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                        href={getSafeUrl(getSetting?.data?.twitter)}
                      className="site-button white twitter circle "
                    >
                      <i className="fa fa-x-twitter"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5 col-md-8 col-sm-8 col-12 d-flex gap-2">
              <div className="widget border-0 w-100">
                <h5 className="m-b30 text-white">Information</h5>
                <ul className="list-2 list-line d-flex flex-column ">
                  <li>
                    <Link href={"/"} className="text-white">Home</Link>
                  </li>
                  <li>
                    <Link href={"/about-us"} className="text-white">About Us</Link>
                  </li>

                  <li>
                    <Link href={"/faq-sections"} className="text-white">FAQs</Link>
                  </li>
                </ul>
              </div>
              <div className="widget border-0 w-100">
                <h5 className="m-b30 text-white">Information</h5>
                <ul className="list-2 list-line d-flex flex-column">
                  <li>
                    <Link href={"/contact-us"} className="text-white">Contact</Link>
                  </li>
                  <li>
                    <Link href={"/privacy-policy"} className="text-white">Privacy</Link>
                  </li>
                  <li>
                    <Link href={"/terms-conditions"} className="text-white">Terms and Conditions</Link>
                  </li>
                  {/* <li>
                    <Link href={"/referral"}>Referral Terms</Link>
                  </li>
                  <li>
                    <Link href={"/supports"}>Support</Link>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-12">
              <div className="widget border-0">
                <h5 className="m-b30 text-white">Information</h5>
                <ul className="list-2 w10 list-line">
                  <li>
                    <Link href={"/grievances"} className="text-white">Grievances</Link>
                  </li>
                  <li>
                    <Link href={"/refund-policy"} className="text-white">Refund Policy</Link>
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
