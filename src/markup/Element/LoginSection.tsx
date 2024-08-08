"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Env from "@/lib/Env";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/app/login/store/login.query";
import { setAuthState, setErrors } from "@/app/login/store/login.slice";
import {
  selectLoginState,
  selectLoginErrors,
} from "@/app/login/store/login.selectors";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useAuthToken } from "@/hooks/useAuthToken";
import styles from "@/styles/Login.module.css";
import { navigateSource } from "@/lib/action";
import { useSearchParams, useRouter } from "next/navigation";

const bnr = require("./../../images/background/bg6.jpg");

const Login = () => {
  const searchParams = useSearchParams();
  const queryTitle = searchParams.get("page");
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const authState = useSelector(selectLoginState);
  const errors = useSelector(selectLoginErrors);
  const [loading, setLoading] = useState(false);

  const endpoint = queryTitle ? `/send-otp?page=${queryTitle}` : '/send-otp';

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await login(authState).unwrap();
      localStorage.setItem('logindata', JSON.stringify(authState));
      setLoading(false);
      if (res.code === 200 && res?.data) {
        console.log("res", res);
        toast.success(res?.message, { theme: "colored" });
        // Redirect to /send-otp page
          // navigateSource(endpoint)
          navigateSource(endpoint);
      } else if (res.code === 401) {
        toast.error("User not found!", { theme: "colored" });
      } else if (res.code === 404 && res.data?.error) {
        dispatch(setErrors(res.data.error));
      }
    } catch (err) {
      setLoading(false);
      console.error("Login failed:", err);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setAuthState({ [name]: value }));
  };

  return (
    <div className={styles["page-wraper"]}>
      <div className="browse-job login-style3">
        <div
          className="bg-img-fix"
          style={{
            backgroundImage: `url(${bnr.default.src})`,
            height: "100vh",
          }}
        >
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 bg-white z-index2 relative p-a0 content-scroll skew-section left-bottom">
              <div className="login-form style-2" style={{ width: "50%" }}>
                <div className="clearfix"></div>
                <div className="tab-content nav p-b30 tab">
                  <form
                    className="dez-form p-b30 mx-2"
                    method="post"
                    onSubmit={handleSubmit}
                  >
                    <div id="login" className="tab-pane active">
                      <div className="width-main-div">
                        {/* <div>
                          <div className="mb-3">
                            <img
                              src="/images/logo1__2_-removebg-preview.png"
                              alt="Logo 1"
                            />
                            <img
                              src="/images/logo2__2_-removebg-preview.png"
                              alt="Logo 2"
                            />
                          </div>
                        </div> */}
                        {/* <h3
                          className={`form-title m-t0 ${styles["rubik-font"]}`}
                          style={{ fontWeight: "700"}}
                        >
                          <span style={{color:'#2a6310' }}>Welcome</span> Back!
                        </h3> */}
                        <h3
                          className={`form-title m-t0 ${styles["rubik-font"]}`}
                          style={{ fontWeight: "600" }}
                        >
                          Login
                        </h3>
                        <div className="dez-separator-outer m-b5">
                          <div className="dez-separator bg-primary style-liner"></div>
                        </div>
                        <p className={styles["lato-font"]}>
                          Enter your login details
                        </p>
                        <div className={`form-group ${styles["width-form"]}`}>
                          <input
                            type="number"
                            name="mobile_number"
                            onChange={handleInputChange}
                            className={`form-control w-full ${styles["lato-font"]}`}
                            placeholder="Mobile Number"
                          />
                          <span className="text-red-500 text-danger">
                            {errors?.mobile_number?.[0]}
                          </span>
                          <div className={`row ${styles["div-style"]}`}>
                            <div className="form-check mt-3">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="rememberMe"
                              >
                                Remember Me
                              </label>
                            </div>
                            {/* <div className={styles["forget-div"]}>
                              <Link
                                href="/forgot-password"
                                className={styles["forgot-password-link"]}
                              >
                                Forgot Password?
                              </Link>
                            </div> */}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`form-group text-right ${styles["otp-button-center"]}`}
                      >
                        <button
                          type="submit"
                          className={`site-button button-md text-white ${styles["lato-font"]}`}
                          disabled={isLoading}
                          style={{ width: "100%" }}
                        >
                          {isLoading ? "Loading..." : "Send OTP"}
                        </button>
                      </div>
                      <div className={`${styles["create-div"]}`}>
                        <p
                          className={`${styles["lato-font"]} ${styles["no-wrap"]}`}
                        >
                          If you are new on our platform?{" "}
                          <Link
                            href="/register"
                            className={styles["forgot-password-link"]}
                          >
                            Create Account
                          </Link>
                        </p>
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
  );
};

export default Login;
