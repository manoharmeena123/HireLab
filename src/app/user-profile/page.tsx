"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import profilePic from "../../../public/images/pic.png" // Update the path to the profile picture
import { toast } from "react-toastify";
import axios from "axios";
import { LOGOUT_URL } from "@/lib/apiEndPoints";
import { signOut } from "next-auth/react";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";

const ProfileDropdown = ({ sessionUser }: { sessionUser: CustomUser }) => {  
  // console.log('profi;e',sessionUser);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
    
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutUser = () => {
    axios
      .post(
        LOGOUT_URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionUser?.token}`
          },
        }
      )
      .then((res) => {
        const response = res.data;
        if (response?.status === 200) {
          signOut({ callbackUrl: "/login" });
          toast.success("Logged out successfully!", { theme: "colored" });
        }
      })
      .catch((err) => {
        // toast.error("Something went wrong.please try again", {
        //   theme: "colored",
        // });
      });

    signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    
    <div className="profile-dropdown" ref={dropdownRef}>
      <div className="profile-header" onClick={toggleDropdown}>
        <Image src={profilePic} className="profile-image" alt="Profile Image" style={{ width: "41px", height: "41px" }} />
        <span className="profile-name">PROFILE</span>
        <span className="dropdown-arrow">
         
        </span>
      </div>
      {isOpen && (
        <div className="profile-sidebar">
          <div className="profile-details">
            <Image src={profilePic} className="profile-image-large" alt="Profile Image" />
            <h2 className="profile-name-tab">{sessionUser?.user?.data?.name}</h2>
            
          </div>
          <ul className="profile-menu">
            <li>
              <Link href="/dashboard">
                <div className="menu-item">
                  {/* <DashboardIcon className="menu-icon" /> */}
                  <span className="menu-text">Dashboard</span>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              <Link href="/profile">
                <div className="menu-item">
                  {/* <ProfileIcon className="menu-icon" /> */}
                  <span className="menu-text">Profile</span>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              <Link href="/my-resume">
                <div className="menu-item">
                  {/* <ResumeIcon className="menu-icon" /> */}
                  <span className="menu-text">My Resume</span>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              <Link href="/saved-jobs">
                <div className="menu-item">
                  {/* <SavedJobsIcon className="menu-icon" /> */}
                  <span className="menu-text">Saved Jobs</span>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              <Link href="/apply-jobs">
                <div className="menu-item">
                  {/* <AppliedJobsIcon className="menu-icon" /> */}
                  <span className="menu-text">Applied Jobs</span>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              <Link href="/job-alert">
                <div className="menu-item">
                  {/* <JobAlertsIcon className="menu-icon" /> */}
                  <span className="menu-text">Job Alerts</span>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              <Link href="/my-resume">
                <div className="menu-item">
                  {/* <CVManagerIcon className="menu-icon" /> */}
                  <span className="menu-text">CV Manager</span>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              <Link href="/change-password">
                <div className="menu-item">
                  {/* <ChangePasswordIcon className="menu-icon" /> */}
                  <span className="menu-text">Change Password</span>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              {/* <Link href="/logout"> */}
                <div className="menu-item">
                  {/* <LogoutIcon className="menu-icon" /> */}
                  <span onClick={logoutUser} className="menu-text">Logout</span>
                </div>
              {/* </Link> */}
            </li>
          </ul>
        </div>
      )}
      <style jsx>{`
        .profile-dropdown {
          position: relative;
        }
        .profile-header {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .profile-image {
          border-radius: 50%;
          margin-right: 10px;
        }
        .profile-name {
          color: #000;
          font-family: Lato;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 21px; /* 150% */
          text-transform: uppercase;
          margin-right: 10px;
          margin-left: 10px;
        }
        .profile-name-tab {
          margin-top: 19px;
        }
        .dropdown-arrow {
          display: flex;
          align-items: center;
        }
        .profile-sidebar {
          position: absolute;
          top: 100%;
          left: -50px;
          background: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          z-index: 10;
          width: 250px;
          padding: 20px;
        }
        .profile-details {
          text-align: center;
        }
        .profile-image-large {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-bottom: 10px;
        }
        .profile-menu {
          display: block;
          justify-content: center;
          list-style: none;
          margin-top: 26px;
          padding: 0;
          text-align: center;
        }
        .profile-menu li {
          margin-left: 40px;
          padding: 10px 0;
        }
        .menu-item {
          display: flex;
          align-items: center;
          justify-content: start;
          gap: 10px;
          color: #232323 !important;
          font-family: Lato;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 24px; /* 150% */
          text-decoration: none;
        }
        .menu-item:hover {
          background-color: #f0f0f0;
        }
        .profile-menu hr {
          margin: 5px 0;
          border: none;
          border-top: 1px solid #ddd;
          width: 100%;
        }
        .menu-icon {
          width: 24px;
          height: 24px;
        }
      `}</style>
    </div>
  );
};
export default ProfileDropdown;
// ProfileDropdown;