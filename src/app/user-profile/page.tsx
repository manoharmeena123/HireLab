"use client";
import React from "react";
import Image from "next/image";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const ProfileDropdown = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const { user } = useLoggedInUser();

  return (
    <div className="profile-dropdown" onClick={toggleDrawer}>
      <div className="profile-header">
        {user?.user?.image ? (
          <Image
            src={`http://thinkdream.in/hirelab/public/images/${user?.user?.image}`}
            className="profile-image"
            alt="Profile Image"
            width={41}
            height={41}
            objectFit="cover"
            style={{ borderRadius: "3rem" }}
          />
        ) : (
          <FontAwesomeIcon icon={faUser} style={{ fontSize: "1.2rem" }} />
        )}
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
      `}</style>
    </div>
  );
};

export default ProfileDropdown;
