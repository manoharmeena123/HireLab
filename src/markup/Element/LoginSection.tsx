"use client";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/app/login/store/login.query";
import { setAuthState, setErrors } from "@/app/login/store/login.slice";
import {
  selectLoginState,
  selectLoginErrors,
} from "@/app/login/store/login.selectors";
import { toast } from "react-toastify";
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

  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState<string | null>(
    null
  );
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const endpoint = queryTitle ? `/send-otp?page=${queryTitle}` : "/send-otp";

  // On component mount, check if "Remember Me" was previously selected
  useEffect(() => {
    const rememberedMobile = localStorage.getItem("rememberedMobile");
    const rememberMeChecked = localStorage.getItem("rememberMe") === "true";
    if (rememberedMobile && rememberMeChecked) {
      setMobileNumber(rememberedMobile);
      dispatch(setAuthState({ mobile_number: rememberedMobile }));
      setRememberMe(true);
    }
  }, [dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "mobile_number") {
      // Allow only numbers and limit to 10 digits
      const cleanedValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      if (cleanedValue.length <= 10) {
        setMobileNumber(cleanedValue);
        setMobileNumberError(null); // Clear error if input is valid
        dispatch(setAuthState({ [name]: cleanedValue }));
      } else {
        setMobileNumberError("Mobile number must be exactly 10 digits.");
      }
    } else {
      dispatch(setAuthState({ [name]: value }));
    }
  };

  const handleRememberMeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setRememberMe(checked);
    if (!checked) {
      // If "Remember Me" is unchecked, remove the mobile number from localStorage
      localStorage.removeItem("rememberedMobile");
      localStorage.removeItem("rememberMe");
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Validate mobile number before submission
    if (mobileNumber.length !== 10) {
      setMobileNumberError("Mobile number must be exactly 10 digits.");
      return;
    }

    if (rememberMe) {
      // Save mobile number to localStorage if "Remember Me" is checked
      localStorage.setItem("rememberedMobile", mobileNumber);
      localStorage.setItem("rememberMe", "true");
    }

    setLoading(true);
    try {
      const res = await login(authState).unwrap();
      localStorage.setItem("logindata", JSON.stringify(res));
      setLoading(false);
      if (res.code === 200 && res?.data) {
        toast.success(res?.message, { theme: "colored" });
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
                            type="text"
                            name="mobile_number"
                            value={mobileNumber}
                            onChange={handleInputChange}
                            className={`form-control w-full ${styles["lato-font"]}`}
                            placeholder="+91- Enter your 10 digit mobile number"
                            maxLength={10} // Limit input length to 10 characters
                          />
                          {/* Display error if the mobile number is invalid */}
                          {mobileNumberError && (
                            <span className="text-red-500 text-danger">
                              {mobileNumberError}
                            </span>
                          )}
                          <span className="text-red-500 text-danger">
                            {errors?.mobile_number?.[0]}
                          </span>
                          <div className={`row ${styles["div-style"]}`}>
                            <div className="form-check mt-1">
                              {/* <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                              /> */}
                              <span>
                                You will receive an OTP on this number
                              </span>
                              {/* <label
                                className="form-check-label"
                                htmlFor="rememberMe"
                              >
                                Remember Me
                              </label> */}
                            </div>
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
                          {isLoading ? "Loading..." : "Get OTP"}
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
