"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthToken, useLoggedInUser } from "@/hooks";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import profileIcon from "../../images/favicon.png";
import { useLogoutMutation } from "@/app/login/store/login.query";
import { navigateSource } from "@/lib/action";
import Swal from "sweetalert2";
import Loading from "@/components/Loading";

const ProfileDrawer = ({ isOpen, toggleDrawer }: { isOpen: boolean; toggleDrawer: () => void }) => {
  const {push} = useRouter();
  const { user ,isLoading} = useLoggedInUser();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { removeToken } = useAuthToken();

  const handleViewProfile = () => {
    push(user?.user?.role === "job_seeker" ? "/job-seeker" : "/job-poster");
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
        navigateSource("/");
        Swal.fire(
          "Logged out!",
          "You have been logged out successfully.",
          "success"
        );
      } catch (error) {
        console.error("Logout failed:", error);
        Swal.fire(
          "Logout failed",
          "Failed to log out. Please try again.",
          "error"
        );
      }
    }
  };

  const handleViewAndUpdateProfile =()=>{
    push("/profile-section")
  }

  return (
    <> 
    {isLoading && <Loading/>}
    <div className={`profile-drawer ${isOpen ? "open" : ""}`}>
      <button
        type="button"
        className="btn-close text-reset"
        onClick={toggleDrawer}
      >
        &times;
      </button>

      <div className="profile-drawer-header">
        <div className="candidate-detail text-center">
          <div className="candidate-img">
            {user?.user?.image ? (
              <Image
                src={`${IMAGE_URL + user?.user?.image}`}
                alt="profile picture"
                width={100}
                height={100}
                onError={(e: any) => (e.currentTarget.src = profileIcon)}
                className="rounded-circle"
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <Image
                src={profileIcon}
                alt="profile picture"
                width={100}
                height={100}
                className="rounded-circle"
                style={{ borderRadius: "50%" }}
              />
            )}
          </div>
          <div className="candidate-title mt-3">
            <h4>{user?.user?.name || "User Name"}</h4>
          </div>
        </div>
      </div>
      <div className="profile-drawer-body">
        <ul className="list-group">
          <li className="list-group-item" onClick={handleViewAndUpdateProfile} style={{ cursor: "pointer" }}>
            View Profile
          </li>
     
            <li
              className="list-group-item"
              onClick={handleViewProfile}
              style={{ cursor: "pointer" }}
            >
              Edit Profile
            </li>
          <li
            className="list-group-item"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .profile-drawer {
          position: fixed !important;
          top: 0 !important;
          right: 0 !important;
          width: 300px !important;
          height: 100% !important;
          background-color: white !important;
          box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3) !important;
          transform: translateX(100%) !important;
          transition: transform 0.3s ease-in-out !important;
          z-index: 1050 !important;
        }

        .profile-drawer.open {
          transform: translateX(0) !important;
        }

        .profile-drawer-header {
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          align-items: center !important;
          padding: 1rem !important;
          border-bottom: 1px solid #ddd !important;
          margin-top: 2rem !important;
        }

        .candidate-img {
          display: flex !important;
          justify-content: center !important;
        }

        .candidate-title h4 {
          margin-bottom: 0.5rem !important;
          font-size: 1.25rem !important;
          text-align: center !important;
        }

        .list-group-item {
          cursor: pointer !important;
          padding: 10px 15px !important;
        }

        .list-group-item:hover {
          background-color: #f1f1f1 !important;
        }

        .btn-close {
          background: none !important;
          border: none !important;
          font-size: 2rem !important;
          line-height: 1 !important;
          cursor: pointer !important;
          color: black !important;
          position: absolute !important;
          left: 1rem !important;
          top: 1rem !important;
        }
      `}</style>
    </div>
    </>
  );
};

export default ProfileDrawer;
