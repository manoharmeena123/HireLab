"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CHANGE_PASSWORD_URL,
  CHECK_CREDENTIALS,
  IMAGE_URL,
} from "@/lib/apiEndPoints";
import { navigateSource } from "@/lib/action";
import axios from "axios";
import "react-toastify/ReactToastify.min.css";

import { ToastContainer, toast } from "react-toastify";
import { useAuthToken } from "@/hooks/useAuthToken";

function Changepasswordpage() {
  const { token } = useAuthToken();
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({
    old_password: "",
    password: [],
    confirm_password: [],
  });
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });
  //   useEffect(()=>{
  //     axios.post(CHECK_CREDENTIALS,{
  // 		headers: {
  // 			Authorization:`Bearer ${userSession?.user?.data?.token}`,
  // 		  }
  //     }).then((data) => {
  //       setUser(data.data.user);
  //       });
  //   },[]);
  //   useEffect(() => {
  //     if (userSession?.user?.data?.token) {
  //       axios
  //         .get(CHECK_CREDENTIALS, {
  //           headers: {
  //             Authorization: `Bearer ${userSession.user.data.token}`,
  //           },
  //         })
  //         .then((data) => {
  //           setUser(data.data.user);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching data", error);
  //         });
  //     }
  //   }, [userSession]);
  const [loading, setLoading] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
  }

  //console.log(CHANGE_PASSWORD_URL);
  //   const handleSubmit = (event) => {
  //     event.preventDefault();

  //     axios
  //       .post(CHANGE_PASSWORD_URL, passwordData, {
  //         headers: {
  //           Authorization: `Bearer ${userSession?.user.data.token}`,
  //           Accept: "application/json",
  //         },
  //       })
  //       .then((res) => {
  //         const response = res.data;
  //         setLoading(false);
  //         console.log(response);
  //         if (response?.code == 200) {
  //           navigateSource("/manage-job");
  //           <ToastContainer />;
  //           toast.success("Change Password Updated successfully!", {
  //             theme: "colored",
  //           });
  //         } else if (response?.code == 401) {
  //           toast.error(response?.message, { theme: "colored" });
  //         } else if (response?.code == 404) {
  //           // setLoading(false);
  //           toast.warning("Danger", { autoClose: 10000 });
  //           setErrors(response?.data?.error);
  //         }
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         // setErrors(err?.response?.data?.errors);
  //       });
  //   };
  return (
    <>
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4 m-b30">
                  <div className="sticky-top">
                    <div className="candidate-info">
                      <div className="candidate-detail text-center">
                        <div className="canditate-des">
                          <Link href={"#"}>
                            <Image
                              src={`${IMAGE_URL}${user}`}
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
                              <Link href={"#"}>{}</Link>
                            </h4>
                            {/* <p className="m-b0"><Link href={"#"}>Web developer</Link></p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx job-profile">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Change Password
                      </h5>
                      <Link
                        href={"/jobs-cv-manager"}
                        className="site-button right-arrow button-sm float-right"
                        style={{ fontFamily: "__Inter_Fallback_aaf875" }}
                      >
                        Back
                      </Link>
                    </div>
                    <form method="post" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Old Password</label>
                            <input
                              type="password"
                              name="old_password"
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  old_password: e.target.value,
                                })
                              }
                              className="form-control"
                              placeholder="Old Password"
                            />
                          </div>
                          <span className="text-red-500 text-danger">
                            {errors?.old_password?.[0]}
                          </span>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>New Password </label>
                            <input
                              type="text"
                              name="password"
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  password: e.target.value,
                                })
                              }
                              className="form-control"
                              placeholder="New Password"
                            />
                            <span className="text-red-500 text-danger">
                              {errors?.password?.[0]}
                            </span>
                          </div>
                          <div className="col-lg-12">
                            <div
                              className="form-group"
                              style={{ marginLeft: "-16px" }}
                            >
                              <label>Confirm New Password</label>
                              <input
                                type="text"
                                name="password_confirmation"
                                onChange={(e) =>
                                  setPasswordData({
                                    ...passwordData,
                                    password_confirmation: e.target.value,
                                  })
                                }
                                className="form-control"
                                placeholder="Confirm New Password"
                              />
                              <span className="text-red-500 text-danger">
                                {/* {errors} */}
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <button
                              className="site-button"
                              style={{
                                marginLeft: "-16px",
                                fontFamily: "__Inter_Fallback_aaf875",
                              }}
                            >
                              Update Password
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Changepasswordpage;
