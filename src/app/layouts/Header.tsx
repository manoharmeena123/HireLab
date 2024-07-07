"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileDropdown from "@/app/user-profile/page";
import logo2 from "../../images/Hire Labs_Final logo.png";
import styles from "@/styles/Header.module.css";
import { usePathname } from "next/navigation";
import { useAuthToken } from "@/hooks/useAuthToken";

// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { token, user } = useAuthToken();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const renderProfileDropdown = !isLoginPage && !isRegisterPage && token && (
    <Link href="/job-seeker">
      <ProfileDropdown sessionUser={user} />
    </Link>
  );

  const renderLoginRegisterButtons = !isLoginPage &&
    !isRegisterPage &&
    !token && (
      <>
        <Link
          href="/login"
          className="site-button"
          style={{ backgroundColor: "#2A6310" }}
        >
          LOGIN
        </Link>
        <Link
          href="/register"
          className="site-button"
          style={{ backgroundColor: "#2A6310" }}
        >
          REGISTER
        </Link>
      </>
    );

  return (
    <header className="site-header mo-left header fullwidth">
      <div className="sticky-header main-bar-wraper navbar-expand-lg">
        <div className="main-bar clearfix">
          <div className={`container-fluid ${styles.containerFluid} pr-5`}>
            <div className={`logo-header mostion ${styles.logoHeader}`}>
              <Link href="/">
                <Image
                  src={logo2}
                  className="logo"
                  alt="img"
                  fill
                  style={{ objectFit: "contain", fontSize: "1.5rem" }}
                />
              </Link>
            </div>
            <button
              className="navbar-toggler collapsed navicon justify-content-end"
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <FontAwesomeIcon icon={faBars} style={{ fontSize: "1.2rem" }} />
            </button>
            <div className="extra-nav">
              <div className="extra-cell">
                {renderProfileDropdown}
                {renderLoginRegisterButtons}
              </div>
            </div>
            <div
              className={`header-nav navbar-collapse collapse myNavbar justify-content-start ${
                menuOpen ? "show" : ""
              }`}
              id="navbarNavDropdown"
              style={{ paddingRight: "2rem" }}
            >
              {menuOpen && (
                <div className={`logo-header mostion ${styles.logo}`}>
                  <Link href="/">
                    <Image
                      src={logo2}
                      className="logo"
                      alt="img"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </Link>
                </div>
              )}
              {menuOpen && (
                <button
                  className="close-btn d-block"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: "#333",
                    marginLeft: "10px",
                    position: "absolute",
                    top: "6%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                  }}
                  onClick={toggleMenu}
                  aria-label="Close navigation"
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ fontSize: "1.5rem" }}
                  />
                </button>
              )}
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
