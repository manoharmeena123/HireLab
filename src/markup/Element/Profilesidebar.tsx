"use client";
// src/components/Profilesidebar.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLogoutMutation } from "@/app/login/store/login.query";
import { navigateSource } from "@/lib/action";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useGetDesignationQuery } from "@/store/global-store/global.query";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useAuthToken } from "@/hooks/useAuthToken";
import profileIcon from "../../images/favicon.png";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap"; // Importing modal from react-bootstrap

const Profilesidebar = ({
  refetch,
  isProfileComplete,
}: {
  refetch: any;
  isProfileComplete: boolean;
}) => {
  const router = useRouter();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { removeToken } = useAuthToken();
  const { user, isLoading: userLoading } = useLoggedInUser();
  const { data: designationData, isLoading: designationLoading } =
    useGetDesignationQuery();

  const [designationLabel, setDesignationLabel] = useState<string>("");
  const [showModal, setShowModal] = useState(false); // Modal control for incomplete profile

  useEffect(() => {
    if (user && designationData?.data) {
      const designation = designationData.data.find(
        (d: any) => d.id.toString() === user?.user?.designation_id?.toString()
      );
      setDesignationLabel(designation?.title || "Designation not found");
    }
  }, [user, designationData]);

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

  const handleNavigation = (e: any, url: string) => {
    if (!isProfileComplete) {
      e.preventDefault(); // Prevent navigation
      setShowModal(true); // Show modal if profile is incomplete
    }
  };

  if (userLoading || designationLoading || isLoggingOut) {
    return <Loading />;
  }

  return (
    <>
      <div className="col-xl-3 col-lg-4 m-b30">
        <div className="sticky-top">
          <div className="candidate-info">
            <div className="candidate-detail text-center">
              <div className="canditate-des">
                {user?.user?.image ? (
                  <Image
                    src={`${IMAGE_URL + user?.user?.image}`}
                    alt="profile picture"
                    width={300}
                    height={300}
                    onError={(e) =>
                      (e.currentTarget.src = "../../images/favicon.png")
                    }
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <Image
                    src={profileIcon}
                    alt="profile picture"
                    width={300}
                    height={300}
                    onError={(e) =>
                      (e.currentTarget.src = "../../images/favicon.png")
                    }
                    style={{ borderRadius: "50%" }}
                  />
                )}
              </div>
              <div className="candidate-title">
                <div className="">
                  <h4 className="m-b5">
                    <Link href={"#"}>{user?.user?.name || "User Name"}</Link>
                  </h4>
                  <p className="m-b0">
                    <Link href={"#"}>
                      {designationLabel || "Not available"}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <ul>
              <li>
                <Link
                  href="/dashboard-section"
                  onClick={(e) => handleNavigation(e, "/dashboard-section")}
                >
                  <i className="fa fa-heart-o" aria-hidden="true"></i>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  onClick={(e) => handleNavigation(e, "/profile")}
                  className="active"
                >
                  <i className="fa fa-user-o" aria-hidden="true"></i>
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/my-resume"
                  onClick={(e) => handleNavigation(e, "/my-resume")}
                >
                  <i className="fa fa-file-text-o" aria-hidden="true"></i>
                  My Resume
                </Link>
              </li>
              <li>
                <Link
                  href="/saved-jobs"
                  onClick={(e) => handleNavigation(e, "/saved-jobs")}
                >
                  <i className="fa fa-heart-o" aria-hidden="true"></i>
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/applied-job"
                  onClick={(e) => handleNavigation(e, "/applied-job")}
                >
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  Applied Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/job-alert"
                  onClick={(e) => handleNavigation(e, "/job-alert")}
                >
                  <i className="fa fa-bell-o" aria-hidden="true"></i>
                  Job Alerts
                </Link>
              </li>
              <li>
                <Link
                  href="/cv-manager"
                  onClick={(e) => handleNavigation(e, "/cv-manager")}
                >
                  <i className="fa fa-id-card-o" aria-hidden="true"></i>
                  CV Manager
                </Link>
              </li>
              <li>
                <Link
                  href="/transaction"
                  onClick={(e) => handleNavigation(e, "/transaction")}
                >
                  <i className="fa fa-file-text-o" aria-hidden="true"></i>
                  Transaction
                </Link>
              </li>
              <li>
                <Link href="#" onClick={handleLogout}>
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal Popup for Incomplete Profile */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Complete Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please complete your profile details before proceeding.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profilesidebar;
