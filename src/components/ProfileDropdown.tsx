// src/components/ProfileDropdown.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import profilePic from "../../../public/images/pic.png"; // Ensure this path is correct
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import useAuthToken from "@/hooks/useAuthToken";
import styles from '@/styles/ProfileDropdown.module.css';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { removeToken } = useAuthToken();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    removeToken();
    signOut({ callbackUrl: "/login" });
    toast.success("Logged out successfully!", { theme: "colored" });
  };

  return (
    <div className={styles["profile-dropdown"]} ref={dropdownRef}>
      <div className={styles["profile-header"]} onClick={toggleDropdown}>
        <Image
          src={profilePic}
          className={styles["profile-image"]}
          alt="Profile Image"
          style={{ width: "41px", height: "41px" }}
        />
        <span className={styles["profile-name"]}>PROFILE</span>
        <span className={styles["dropdown-arrow"]}></span>
      </div>
      {isOpen && (
        <div className={styles["profile-sidebar"]}>
          <div className={styles["profile-details"]}>
            <Image
              src={profilePic}
              className={styles["profile-image-large"]}
              alt="Profile Image"
            />
            <h2 className={styles["profile-name-tab"]}>User Name</h2>
          </div>
          <ul className={styles["profile-menu"]}>
            <li>
              <Link href="/dashboard">
                <div className={styles["menu-item"]}>
                  <span className={styles["menu-text"]}>Dashboard</span>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              <Link href="/profile">
                <div className={styles["menu-item"]}>
                  <span className={styles["menu-text"]}>Profile</span>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              <Link href="/my-resume">
                <div className={styles["menu-item"]}>
                  <span className={styles["menu-text"]}>My Resume</span>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              <Link href="/saved-jobs">
                <div className={styles["menu-item"]}>
                  <span className={styles["menu-text"]}>Saved Jobs</span>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              <Link href="/apply-jobs">
                <div className={styles["menu-item"]}>
                  <span className={styles["menu-text"]}>Applied Jobs</span>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              <Link href="/job-alert">
                <div className={styles["menu-item"]}>
                  <span className={styles["menu-text"]}>Job Alerts</span>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              <Link href="/my-resume">
                <div className={styles["menu-item"]}>
                  <span className={styles["menu-text"]}>CV Manager</span>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              <Link href="/change-password">
                <div className={styles["menu-item"]}>
                  <span className={styles["menu-text"]}>Change Password</span>
                </div>
              </Link>
              <hr />
            </li>
            <li>
              <div className={styles["menu-item"]} onClick={logoutUser}>
                <span className={styles["menu-text"]}>Logout</span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
