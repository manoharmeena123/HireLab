// src/components/Profilesidebar.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLogoutMutation } from "@/app/login/store/login.query";
import { useAuthToken } from "@/hooks/useAuthToken";
import { navigateSource } from "@/lib/action";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useGetDesignationQuery } from "@/store/global-store/global.query";

const Profilesidebar = ({ refetch }: any) => {
  const [logout] = useLogoutMutation();
  const { removeToken } = useAuthToken();
  const { user } = useLoggedInUser();
  const { data: designationData } = useGetDesignationQuery(); // Fetch designation data

  const [designationOptions, setDesignationOptions] = useState<any[]>([]);
  const [designationLabel, setDesignationLabel] = useState<string>("");

  useEffect(() => {
    // Map designation options
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
      // Only proceed if user and designation_id are not null
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
      await logout().unwrap();
      removeToken();
      navigateSource("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="col-xl-3 col-lg-4 m-b30">
      <div className="sticky-top">
        <div className="candidate-info">
          <div className="candidate-detail text-center">
            <div className="canditate-des">
              <Link href={"#"}>
                <Image
                  src={`https://thinkdream.in/hirelab-api/public/images/${user?.user?.image}`}
                  alt="Company Logo"
                  width={300}
                  height={300}
                />
              </Link>
              <div
                className="upload-link"
                title="update"
                data-toggle="tooltip"
                data-placement="right"
              >
                <input type="file" className="update-flie" />
                <i className="fa fa-camera"></i>
              </div>
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

            {/* <li>
              <Link href={"/jobs-change-password"}>
                <i className="fa fa-key" aria-hidden="true"></i>
                <span>Change Password</span>
              </Link>
            </li> */}
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
