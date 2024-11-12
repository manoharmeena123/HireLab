"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthToken, useLoggedInUser } from "@/hooks";
import profileIcon from "../../images/favicon.png";
import { useLogoutMutation } from "@/app/login/store/login.query";
import Swal from "sweetalert2";
import { FaCrown } from "react-icons/fa"; // Placeholder icon
import { IMAGE_URL } from "@/lib/apiEndPoints";

const ProfileDrawer = ({ isOpen, toggleDrawer }: any) => {
  const { push } = useRouter();
  const { user, isLoading } = useLoggedInUser();
  const [logout] = useLogoutMutation();
  const { removeToken } = useAuthToken();
  
  // Explicitly define drawerRef as a reference to an HTMLDivElement
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleViewProfile = () => {
    push("/profile-section");
    toggleDrawer();
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "No, stay logged in",
    });

    if (result.isConfirmed) {
      try {
        await logout().unwrap();
        removeToken();
        Swal.fire("Logged out!", "You have been logged out successfully.", "success");
        push("/");
      } catch (error) {
        Swal.fire("Logout failed", "Failed to log out. Please try again.", "error");
      }
    }
  };

  const handleAccountSetting = () => {
    push("/account-setting");
  };

  const handleClickOutside = (event: MouseEvent) => {
    // Ensure drawerRef is not null before using contains method
    if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
      toggleDrawer();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="profile-popup" ref={drawerRef}>
          <div className="profile-header">
            <Image
              src={user?.user?.image ? `${IMAGE_URL + user?.user?.image}` : profileIcon}
              alt="profile picture"
              width={60}
              height={60}
              className="rounded-circle"
            />
            <h4 className="profile-name">{user?.user?.name || "Not available"}</h4>
            <p className="profile-title">
              {user?.user?.role === "job_seeker" ? "Job Seeker" : "Job Poster"}
            </p>
            <button className="view-profile-btn" onClick={handleViewProfile}>
              View Profile
            </button>
          </div>

          <div className="profile-section">
            <h5 className="section-title">Account</h5>
            <ul className="list-group">
              <li className="list-group-item" onClick={handleAccountSetting}>
                Settings & Privacy
              </li>
            </ul>
          </div>

          <div className="profile-section">
            <h5 className="section-title">Manage</h5>
            <ul className="list-group">
              <li className="list-group-item">Posts & Activity</li>
              <li className="list-group-item">Job Posting Account</li>
              <li className="list-group-item" onClick={handleLogout}>
                Sign Out
              </li>
            </ul>
          </div>
        </div>
      )}

      <style jsx>{`
        .profile-popup {
          position: absolute;
          top: 90%;
          right: 160px;
          width: 280px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 1rem;
          z-index: 1000;
          font-family: Arial, sans-serif;
          border: 1px solid #e0e0e0;
          text-align: left;
        }

        .profile-header {
          text-align: center;
          padding-bottom: 1rem;
          border-bottom: 1px solid #ddd;
        }

        .profile-image {
          border-radius: 50%;
          border: 2px solid #e0e0e0;
        }

        .profile-name {
          margin: 0.5rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: #333;
        }

        .profile-title {
          color: #555;
          font-size: 0.85rem;
          margin: 0.2rem 0 1rem;
          line-height: 1.3;
        }

        .view-profile-btn {
          display: inline-block;
          padding: 0.3rem 1rem;
          font-size: 0.85rem;
          color: #2a6310;
          border: 1px solid #2a6310;
          border-radius: 20px;
          background: white;
          cursor: pointer;
          transition: all 0.3s;
        }

        .view-profile-btn:hover {
           background: linear-gradient(135deg, #2a6310, #6cc047) !important;
          color: white;
        }

        .profile-section {
          margin-top: 0px;
          padding-top: 0px;
        }

        .section-title {
          font-size: 0.9rem;
          color: #333;
          font-weight: 600;
          margin-bottom: 0.5rem;
          margin-top: 0.5rem;
        }

        .list-group {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .list-group-item {
          cursor: pointer;
          padding: 0.6rem 0;
          font-size: 0.85rem;
          color: #555;
          display: flex;
          align-items: center;
          transition: background-color 0.3s;
          border: none;
        }

        .list-group-item:hover {
          background-color: #f5f5f5;
        }
      `}</style>
    </>
  );
};

export default ProfileDrawer;
