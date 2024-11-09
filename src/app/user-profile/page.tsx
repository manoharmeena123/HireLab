"use client";
import React from "react";
import Image from "next/image";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import profileIcon from "../../images/favicon.png";
import { IMAGE_URL } from "@/lib/apiEndPoints";

export const ProfileDropdown = ({
  toggleDrawer,
}: {
  toggleDrawer: () => void;
}) => {
  const { user } = useLoggedInUser();

  return (
    <div className="profile-dropdown" onClick={toggleDrawer}>
      <div className="profile-header">
        {user?.user?.image ? (
          <Image
            src={`${IMAGE_URL + user.user.image}`}
            className="profile-image"
            alt="Profile Image"
            width={41}
            height={41}
            // onError={(e) => {
            //   e.currentTarget.src = profileIcon;
            // }}
            style={{ borderRadius: "3rem", objectFit: "cover" }}
          />
        ) : (
          <Image
            src={profileIcon}
            alt="Profile Picture"
            width={41}
            height={41}
            className="profile-image"
            style={{ borderRadius: "3rem" }}
          />
        )}
        <span className="profile-name">{user?.user?.name || "Guest"}</span>
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
          font-weight: 600;
          line-height: 21px;
          text-transform: uppercase;
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default ProfileDropdown;
