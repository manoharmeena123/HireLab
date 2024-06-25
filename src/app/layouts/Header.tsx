"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileDropdown from "@/app/user-profile/page";
import logo2 from "../../images/Untitled_picture.png";
import styles from "@/styles/Header.module.css";
import useAuthToken from '@/hooks/useAuthToken';

const Header: React.FC = () => {
  const { token, user } = useAuthToken();

  return (
    <header className="site-header mo-left header fullwidth">
      <div className="sticky-header main-bar-wraper navbar-expand-lg">
        <div className="main-bar clearfix">
          <div className={`container-fluid ${styles.containerFluid} pr-5`}>
            <div className={`logo-header mostion ${styles.logoHeader}`}>
              <Link href="/">
                <Image src={logo2} className="logo" alt="img" />
              </Link>
            </div>

            <button
              className="navbar-toggler collapsed navicon justify-content-end"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
            </button>
            <div className="extra-nav">
              <div className="extra-cell">
                {token ? (
                  <ProfileDropdown sessionUser={user} />
                ) : (
                  <Link href="/login" className="site-button">
                    LOGIN/SIGN UP
                  </Link>
                )}
              </div>
            </div>

            <div
              className="header-nav navbar-collapse collapse myNavbar justify-content-start"
              id="navbarNavDropdown"
            >
              <div className="logo-header mostion d-md-block d-lg-none">
                <Link href="/">
                  <Image src={logo2} className="logo" alt="img" />
                </Link>
              </div>
              <ul className="nav navbar-nav">
                <li className="">
                  <Link href="/">Home</Link>
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
  );
};

export default Header;
