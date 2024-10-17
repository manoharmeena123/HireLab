"use client";
import React, { useState } from "react"; // Import useState
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "@/app/register/store/register.query";
import {
  setErrors,
  saveRegisterData,
} from "@/app/register/store/register.slice";
import { selectRegisterErrors } from "@/app/register/store/register.selectors";
import { toast } from "react-toastify";
import { navigateSource } from "@/lib/action";
import styles from "@/styles/Register.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const bnr = require("./../../images/background/bg6.jpg");

const RegisterSection = () => {
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const errors = useSelector(selectRegisterErrors);

  // Formik form validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces.")
      .required("Full Name is required"),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required"),
    mobile_number: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits.")
      .required("Mobile number is required"),
    company_name: Yup.string().required("Company name is required."),
    company_website: Yup.string().optional(),
    role: Yup.string().required("Please select a role"),
  });

  const handleSubmit = async (values: any) => {
    const { name, email, mobile_number, company_name, company_website, role } = values;

    try {
      const res = await register({
        name,
        email,
        mobile_number,
        company_name,
        company_website,
        role,
      }).unwrap();

      if (res.code === 200) {
        localStorage.setItem("registerData", JSON.stringify(res));
        dispatch(saveRegisterData(values)); // Save the register data in store
        toast.success(res?.message, { theme: "colored" });
        navigateSource("/send-otp");
      } else if (res.code === 500) {
        toast.error(res?.message, { theme: "colored" });
      } else if (res.code === 404 && res.data) {
        dispatch(setErrors(res.data.error));
      }
    } catch (err: any) {
      console.error("Registration failed:", err);
      toast.error(err?.message);
    }
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
            <div
              className="col-xl-4 col-lg-5 col-md-6 col-sm-12 bg-white z-index2 relative p-a0 content-scroll skew-section left-bottom overflow-hide"
              style={{ overflowY: "auto" }}
            >
              <div className={`login-form style-2 ${styles.card}`}>
                <div className="logo-header text-center p-tb30">
                  <Link href={"./"}>
                    <img src={require("./../../images/logo.png")} alt="" />
                  </Link>
                </div>
                <div className="clearfix"></div>
                <div
                  className="tab-content nav p-b30 tab"
                  style={{ marginBottom: "100px" }}
                >
                  <div
                    id="login"
                    className="tab-pane active"
                    style={{ width: "150%", height: "100vh" }}
                  >
                    <Formik
                      initialValues={{
                        name: "",
                        email: "",
                        mobile_number: "",
                        company_name: "",
                        company_website: "",
                        role: "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ setFieldValue, values }) => (
                        <Form
                          className="dez-form"
                          method="post"
                          style={{ width: "100%", paddingBottom: "30px" }}
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

                          {/* Name Field */}
                          <div className="form-group">
                            <Field
                              className={`form-control ${styles["lato-font"]}`}
                              name="name"
                              placeholder="Full Name"
                            />
                            <span className={`${styles["text-danger"]}`}>
                              <ErrorMessage name="name" />
                              {errors?.name?.[0]}
                            </span>
                          </div>

                          {/* Email Field */}
                          <div className="form-group">
                            <Field
                              className={`form-control ${styles["lato-font"]}`}
                              name="email"
                              placeholder="Email"
                            />
                            <span className={`${styles["text-danger"]}`}>
                              <ErrorMessage name="email" />
                              {errors?.email?.[0]}
                            </span>
                          </div>

                          {/* Mobile Number Field */}
                          <div className="form-group">
                            <Field
                              className={`form-control ${styles["lato-font"]}`}
                              name="mobile_number"
                              placeholder="Mobile Number"
                              type="text"
                            />
                            <span className={`${styles["text-danger"]}`}>
                              <ErrorMessage name="mobile_number" />
                              {errors?.mobile_number?.[0]}
                            </span>
                          </div>

                          {/* Company Name Field */}
                          <div className="form-group">
                            <Field
                              className={`form-control ${styles["lato-font"]}`}
                              name="company_name"
                              placeholder="Company Name"
                            />
                            <span className={`${styles["text-danger"]}`}>
                              <ErrorMessage name="company_name" />
                              {errors?.company_name?.[0]}
                            </span>
                          </div>

                          {/* Company Website Field */}
                          <div className="form-group">
                            <Field
                              className={`form-control ${styles["lato-font"]}`}
                              name="company_website"
                              placeholder="Company Website (optional)"
                            />
                          </div>

                          {/* Role Field - Radio Buttons */}
                          <div className="form-group">
                            <label className={`${styles["lato-font"]}`}>
                              Select a Role:
                            </label>
                            <div className="d-flex justify-content-around">
                              <label>
                                <Field
                                  type="radio"
                                  name="role"
                                  value="job_seeker"
                                />
                                <span> Job Seeker</span>
                              </label>
                              <label>
                                <Field
                                  type="radio"
                                  name="role"
                                  value="job_poster"
                                />
                                <span> Job Poster</span>
                              </label>
                            </div>
                            <span className={`${styles["text-danger"]}`}>
                              <ErrorMessage name="role" />
                              {errors?.role?.[0]}
                            </span>
                          </div>

                          {/* Register Button */}
                          <div className="form-group w-full d-flex justify-content-center">
                            <button
                              type="submit"
                              className={`site-button dz-xs-flex m-r5 text-center ${styles["lato-fonts"]}`}
                              disabled={isLoading}
                            >
                              {isLoading ? "Loading..." : "Create Account"}
                            </button>
                          </div>
                          <div className="form-group">
                            <p
                              className="lato-font text-align-center"
                              style={{ textAlign: "center" }}
                            >
                              Already registered?{" "}
                              <Link href="/login">
                                {" "}
                                <span style={{ color: "blue" }}>Login</span>
                              </Link>
                            </p>
                          </div>
                        </Form>
                      )}
                    </Formik>
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
