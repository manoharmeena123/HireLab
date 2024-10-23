"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileDropdown from "@/app/user-profile/page";
import logo2 from "../../images/hiralablogo.png";
import styles from "@/styles/Header.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useAuthToken, useLoggedInUser } from "@/hooks/";

// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const router = useRouter();
  const { user } = useLoggedInUser();
  const { token } = useAuthToken();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  const [menuOpen, setMenuOpen] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  // Function to check if the link is active
  const isActive = (href: any) => {
    return pathname === href;
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleChatClick = () => {
    router.push("/chats");
  };

  const handleNotificationClick = () => {
    router.push("/notifications");
  };

  const handleMeetupAndEventClick = (query: any) => {
    router.push(`/single-event?event=${query}`);
  };
  const renderProfileDropdown = !isLoginPage &&
    !isRegisterPage &&
    token &&
    user?.user?.role && (
      <Link
        href={user.user.role === "job_seeker" ? "/job-seeker" : "/job-poster"}
      >
        <ProfileDropdown />
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

  const handleServiceMouseEnter = () => {
    setShowServiceDropdown(true);
  };

  const handleServiceMouseLeave = () => {
    setShowServiceDropdown(false);
  };
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
                  width={50}
                  height={45}
                  objectFit={"contain"}
                />
              </Link>
            </div>
            <div className="nav-mob">
              {!isLoginPage && !isRegisterPage && token && (
                <div
                  className="mob-view-head"
                  style={{ display: "flex", gap: "1rem" }}
                >
                  <div title="Messages">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      data-supported-dps="24x24"
                      fill="currentColor"
                      className="mn-icon"
                      width="24"
                      height="24"
                      focusable="false"
                    >
                      <path d="M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z"></path>
                    </svg>
                  </div>
                  <div className="Notification">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      data-supported-dps="24x24"
                      fill="currentColor"
                      className="mn-icon"
                      width="24"
                      height="24"
                      focusable="false"
                    >
                      <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z"></path>
                    </svg>
                  </div>
                </div>
              )}

              <button
                className="navbar-toggler collapsed navicon justify-content-end"
                type="button"
                onClick={toggleMenu}
                aria-label="Toggle navigation"
              >
                <FontAwesomeIcon icon={faBars} style={{ fontSize: "1.2rem" }} />
              </button>
            </div>
            {/* messege notification icon */}
            {/* <div
              className="extra-nav"
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              {!isLoginPage && !isRegisterPage && token && 
              <div
                className="extra-cell"
                style={{ display: "flex", gap: "1rem" }}
              >
                <div title="Messages">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  className="mn-icon"
                  width="24"
                  height="24"
                  focusable="false"
                  
                >
                  <path d="M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z"></path>
                </svg>
                </div>
                <div className="Notification">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-supported-dps="24x24"
                  fill="currentColor"
                  className="mn-icon"
                  width="24"
                  height="24"
                  focusable="false"
                >
                  <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z"></path>
                </svg>
                </div>
              </div>
              }
              <div className="extra-cell">
                {renderProfileDropdown}
                {renderLoginRegisterButtons}
              </div>
            </div> */}

            <div
              className={`header-nav navbar-collapse collapse myNavbar justify-content-start head-nav ${
                menuOpen ? "show" : ""
              }`}
              id="navbarNavDropdown"
              // style={{ paddingRight: "2rem" }}
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
                <li
                // className={isActive("/") ? "active" : ""}
                >
                  <Link href="/">Home</Link>
                </li>

                {token ? (
                  <>
                    {user?.user?.role === "job_seeker" && (
                      <>
                        <li
                          className={
                            isActive("/dashboard-section") ? "active" : ""
                          }
                        >
                          <Link href="/dashboard-section">Dashboard</Link>
                        </li>
                        <li className={isActive("/job-seeker") ? "active" : ""}>
                          <Link href="/job-seeker">Profile</Link>
                        </li>{" "}
                      </>
                    )}

                    {user?.user?.role === "job_poster" && (
                      <li className={isActive("/post-job") ? "active" : ""}>
                        <Link href="/post-job">Post Job</Link>
                      </li>
                    )}

                    <li className={isActive("/single-event") ? "active" : ""}>
                      <Link href="/single-event">Meetups and Events</Link>
                    </li>

                    <li
                      className={
                        isActive("/view-all-discussion") ? "active" : ""
                      }
                    >
                      <Link href="/view-all-discussion">Discussion</Link>
                    </li>
                    <li
                      className={`${styles.dropdown}`}
                      onMouseEnter={handleServiceMouseEnter}
                      onMouseLeave={handleServiceMouseLeave}
                    >
                      <Link href="#" className={styles.menuLink}>
                        Services
                      </Link>
                      {showServiceDropdown && (
                        <div className={`dropdown-menu ${styles.dropdownMenu}`}>
                          <div
                            className={`${styles.dropdownColumn} ${styles.columnWithBorder}`}
                          >
                            <h6 className={styles.dropdownTitle}>
                              Meet-ups and Events
                            </h6>
                            <Link
                              href="#"
                              className={styles.dropdownItem}
                              onClick={(e) => {
                                e.preventDefault();
                                handleMeetupAndEventClick("past");
                              }}
                            >
                              Past Meet-ups
                            </Link>
                            <Link
                              href="#"
                              className={styles.dropdownItem}
                              onClick={(e) => {
                                e.preventDefault();
                                handleMeetupAndEventClick("upcoming");
                              }}
                            >
                              Available Pass for Upcoming Meet-ups
                            </Link>
                          </div>

                          <div
                            className={`${styles.dropdownColumn} ${styles.columnWithBorder}`}
                          >
                            <h6 className={styles.dropdownTitle}>
                              Book a Session
                            </h6>
                            <Link href="#" className={styles.dropdownItem}>
                              Mock Interviews
                            </Link>
                            <Link href="#" className={styles.dropdownItem}>
                              Book a Session Form
                            </Link>
                          </div>

                          <div
                            className={`${styles.dropdownColumn} ${styles.columnWithBorder}`}
                          >
                            <h6 className={styles.dropdownTitle}>
                              Resume Reviews
                            </h6>
                            <Link href="#" className={styles.dropdownItem}>
                              Resume Reviews
                            </Link>
                          </div>

                          <div className={styles.dropdownColumn}>
                            <h6 className={styles.dropdownTitle}>
                              More Services
                            </h6>
                            <Link href="/blogs" className={styles.dropdownItem}>
                              Blogs
                            </Link>
                            <Link
                              href="/contact-us"
                              className={styles.dropdownItem}
                            >
                              Contact Us
                            </Link>
                          </div>

                          <div
                            className={`${styles.dropdownColumn} ${styles.promotionalOffer}`}
                          >
                            <h6 className={styles.dropdownTitle}>
                              Why Choose Us
                            </h6>
                            <span className={styles.dropdownItem}>
                              At HireLab, we revolutionize the hiring process
                              for employers and candidates...
                            </span>
                          </div>
                        </div>
                      )}
                    </li>
                  </>
                ) : (
                  <>
                    <li className={isActive("/job-seeker") ? "active" : ""}>
                      <Link href="/job-seeker">I'M A Job SEEKER</Link>
                    </li>

                    <li className={isActive("/job-poster") ? "active" : ""}>
                      <Link href="/job-poster">I'M A Job Poster</Link>
                    </li>

                    <li className={isActive("/services") ? "active" : ""}>
                      <Link href="/services">Services</Link>
                    </li>

                    <li className={isActive("/blogs") ? "active" : ""}>
                      <Link href="/blogs">BLOG</Link>
                    </li>
                  </>
                )}
              </ul>
              <div
                className="extra-nav"
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                {!isLoginPage && !isRegisterPage && token && (
                  <div
                    className="extra-cell web-view-head"
                    style={{ display: "flex", gap: "1rem" }}
                  >
                    <div title="Messages">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        data-supported-dps="24x24"
                        fill="currentColor"
                        className="mn-icon"
                        width="24"
                        height="24"
                        focusable="false"
                        onClick={handleChatClick}
                      >
                        <path d="M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z"></path>
                      </svg>
                    </div>
                    <div className="Notification">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        data-supported-dps="24x24"
                        fill="currentColor"
                        className="mn-icon"
                        width="24"
                        height="24"
                        focusable="false"
                        onClick={handleNotificationClick}
                      >
                        <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z"></path>
                      </svg>
                    </div>
                  </div>
                )}
                <div className="extra-cell">
                  {renderProfileDropdown}
                  {renderLoginRegisterButtons}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
