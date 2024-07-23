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

const Profilesidebar = ({ refetch }: any) => {
  const router = useRouter();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { removeToken, token } = useAuthToken();
  const {
    user,
    isLoading: userLoading,
    error: userError,
    refetch: userrefetch,
  } = useLoggedInUser();
  const {
    data: designationData,
    isLoading: designationLoading,
    error: designationError,
  } = useGetDesignationQuery();

  const [designationOptions, setDesignationOptions] = useState<any[]>([]);
  const [designationLabel, setDesignationLabel] = useState<string>("");

  useEffect(() => {
    if (designationData?.data) {
      const options = designationData.data.map((designation: any) => ({
        value: designation.title,
        label: designation.title,
        id: designation.id.toString(),
      }));
      setDesignationOptions(options);
    }
  }, [designationData, refetch]);

  useEffect(() => {
    if (user && user.user?.designation_id !== null) {
      const designationId = user.user.designation_id.toString();
      const designation = designationOptions.find(
        (option) => option.id === designationId
      );
      if (designation) {
        setDesignationLabel(designation.label);
      } else {
        setDesignationLabel("Designation not found");
      }
    } else {
      setDesignationLabel("Designation not available");
    }
  }, [user, designationOptions, refetch]);

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      if (response?.code === 200) {
        removeToken();
        router.push("/");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error: any) {
      toast.error("Logout failed: " + error.message);
    }
  };

  if (userLoading || designationLoading || isLoggingOut) {
    return <Loading />;
  }

  return (
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
                    } // Fallback image
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
                    } // Fallback image
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
                  <Link href={"#"}>{designationLabel || "Not available"}</Link>
                </p>
              </div>
            </div>
          </div>
          <ul>
            <li>
              <Link href="profile" className="active">
                <i className="fa fa-user-o" aria-hidden="true"></i>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link href="my-resume">
                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                <span>My Resume</span>
              </Link>
            </li>
            <li>
              <Link href={"/saved-jobs"}>
                <i className="fa fa-heart-o" aria-hidden="true"></i>
                <span>Saved Jobs</span>
              </Link>
            </li>
            <li>
              <Link href={"/applied-job"}>
                <i className="fa fa-briefcase" aria-hidden="true"></i>
                <span>Applied Jobs</span>
              </Link>
            </li>
            <li>
              <Link href={"/jobs-alerts"}>
                <i className="fa fa-bell-o" aria-hidden="true"></i>
                <span>Job Alerts</span>
              </Link>
            </li>
            <li>
              <Link href={"/jobs-cv-manager"}>
                <i className="fa fa-id-card-o" aria-hidden="true"></i>
                <span>CV Manager</span>
              </Link>
            </li>
            <li>
              <Link href={"./"} onClick={handleLogout}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                <span>Log Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profilesidebar;
