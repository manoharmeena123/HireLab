import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo2 from "../images/Untitled_picture.png";
import  ProfileDropdown  from "@/app/user-profile/page";
// var bnr3 = require("./../../images/background/bg3.jpg");

export default function Navbar() {
    return(
        <div>
            <header className="site-header mo-left header fullwidth">
          <div className="sticky-header main-bar-wraper navbar-expand-lg">
            <div className="main-bar clearfix">
              <div
                style={{ paddingLeft: "12rem" }}
                className="container-fluid clearfix pr-5"
              >
                <div
                  style={{ paddingRight: "2rem" }}
                  className="logo-header mostion"
                >
                  <Link href={"/"}>
                    <Image src={logo2} className="logo" alt="img" />
                  </Link>
                </div>

                <button
                  className="navbar-toggler collapsed navicon  justify-content-end"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <div className="extra-nav">
                  <div className="extra-cell">
                  {/* {session && session.user.data.name !== null ? (
                    <ProfileDropdown />
                    
                  ) : (
                    <Link href="/login" className="site-button">LOGIN/SIGN UP</Link>
                  )}    */}
                  </div>
                </div>

                <div
                  className="header-nav navbar-collapse collapse myNavbar justify-content-start"
                  id="navbarNavDropdown"
                >
                  <div className="logo-header mostion d-md-block d-lg-none">
                    <Link href={"/"} className="dez-page">
                      <img src={logo2} alt="" />
                    </Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li className="">
                      <Link href="/">Home </Link>
                    </li>
                    <li className="">
                      <Link href="/job-seeker">I'M A Job SEEKER</Link>
                    </li>
                    <li className="">
                      <Link href="/job-poster">I'M A Job Poster</Link>
                    </li>

                    <li className="">
                      <Link href="/">HOW IT'S WORK</Link>
                    </li>

                    <li className="">
                      <Link href="/blogs">BLOG</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
        </div>
    );
}