"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useAuthToken } from "@/hooks/useAuthToken";

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  // const router = useRouter();
  const { user,refetch } = useLoggedInUser();
  // const { token } = useAuthToken();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <div className="profile-header" onClick={toggleDropdown}>
        <Image
          src={`http://thinkdream.in/hirelab/public/images/${user?.user?.image}`}
          className="profile-image"
          alt="Profile Image"
          width={41}
          height={41}
          objectFit="cover"
          style={{ borderRadius:"3rem" }}
        />
        <span className="profile-name">{user?.user?.name}</span>
      </div>

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
