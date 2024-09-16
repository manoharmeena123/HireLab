"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "@/app/register/store/register.query";
import {
  setAuthState,
  setErrors,
  saveRegisterData,
} from "@/app/register/store/register.slice";
import {
  selectRegisterState,
  selectRegisterErrors,
} from "@/app/register/store/register.selectors";
import { toast } from "react-toastify";
import { navigateSource } from "@/lib/action";
import styles from "@/styles/Register.module.css";
import { RootState } from "@/store";

const bnr = require("./../../images/background/bg6.jpg");

const RegisterSection = () => {
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const authState = useSelector(selectRegisterState);
  const errors = useSelector(selectRegisterErrors);

  // Local state for validation errors
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    mobile_number: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      mobile_number: "",
    };

    // Validate name (only letters)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(authState.name)) {
      newErrors.name = "Name can only contain letters and spaces.";
      isValid = false;
    }

    // Validate email (basic email validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authState.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Validate mobile number (only 10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(authState.mobile_number)) {
      newErrors.mobile_number = "Mobile number must be exactly 10 digits.";
      isValid = false;
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Validate the form before submitting
    if (!validateForm()) {
      return;
    }

    try {
      const res = await register(authState).unwrap();
      if (res.code === 200) {
        localStorage.setItem("registerData", JSON.stringify(authState));
        dispatch(saveRegisterData(authState)); // Save the register data in store
        toast.success(res?.message, { theme: "colored" });
        navigateSource("/send-otp");
      }else if(res.code == 500 ){
        toast.success(res?.message, { theme: "colored" });
      } else if (res.code === 404 && res.data) {
        dispatch(setErrors(res.data.error));
      }
    } catch (err: any) {
      console.error("Registration failed:", err);
      toast.error(err?.message);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setAuthState({ [name]: value }));

    // Clear validation errors when typing
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <div className={styles["page-wraper"]}>
      <div className="browse-job login-style3">
        <div
          className={styles["bg-img-fix"]}
          style={{
            backgroundImage: `url(${bnr.default.src})`,
            height: "100vh",
          }}
        >
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 bg-white z-index2 relative p-a0 content-scroll skew-section left-bottom overflow-hide">
              <div className="login-form style-2" style={{ width: "100%" }}>
                <div className="logo-header text-center p-tb30">
                  <Link href={"./"}>
                    <img src={require("./../../images/logo.png")} alt="" />
                  </Link>
                </div>
                <div className="clearfix"></div>
                <div className="tab-content nav p-b30 tab">
                  <div
                    id="login"
                    className="tab-pane active"
                    style={{ marginBottom: "50px" }}
                  >
                    <form
                      className="dez-form p-b30"
                      method="post"
                      onSubmit={handleSubmit}
                      style={{ width: "100%" }}
                    >
                      <h3
                        className={`${styles["form-title"]} ${styles["rubik-font"]}`}
                      >
                        Sign Up
                      </h3>
                      <div className="dez-separator-outer m-b5">
                        <div className="dez-separator bg-primary style-liner"></div>
                      </div>
                      <p className={styles["lato-fonts"]}>
                        Enter your Personal details below:
                      </p>
                      <div className="form-group">
                        <input
                          className={`form-control w-full ${styles["lato-font"]}`}
                          placeholder="Full Name"
                          name="name"
                          onChange={handleInputChange}
                        />
                        <span className={`${styles["text-danger"]}`}>
                          {validationErrors.name || errors?.name?.[0]}
                        </span>
                      </div>
                      <div className="form-group">
                        <input
                          className={`form-control w-full ${styles["lato-font"]}`}
                          placeholder="Email"
                          name="email"
                          onChange={handleInputChange}
                        />
                        <span className={`${styles["text-danger"]}`}>
                          {validationErrors.email || errors?.email?.[0]}
                        </span>
                      </div>
                      <div className="form-group">
                        <input
                          className={`form-control w-full ${styles["lato-font"]}`}
                          type="number"
                          name="mobile_number"
                          onChange={handleInputChange}
                          placeholder="Mobile Number"
                        />
                        <span className={`${styles["text-danger"]}`}>
                          {validationErrors.mobile_number || errors?.mobile_number?.[0]}
                        </span>
                      </div>
                      <div className="form-group w-full d-flex justify-content-center">
                        <button
                          type="submit"
                          className={`site-button dz-xs-flex m-r5 text-center ${styles["lato-fonts"]}`}
                          disabled={isLoading}
                        >
                          {isLoading ? "Loading..." : "Register"}
                        </button>
                      </div>
                      <div className={`${styles["create-div"]}`}>
                        <p
                          className={`${styles["lato-font"]} ${styles["no-wrap"]}`}
                        >
                          If you already have an account?{" "}
                          <Link
                            href="/login"
                            className={styles["forgot-password-link"]}
                          >
                            Login
                          </Link>
                        </p>
                      </div>
                    </form>
                    <div className="text-center bottom"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSection;
