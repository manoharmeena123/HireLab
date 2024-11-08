"use client";
import React from "react";
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
import styles from "@/styles/RegisterDrawer.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterDrawer = ({ onClose, onSwitchToLogin }: any) => {
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const errors = useSelector(selectRegisterErrors);

  // Form validation schema
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
    try {
      const res = await register(values).unwrap();
      if (res.code === 200) {
        localStorage.setItem("registerData", JSON.stringify(res));
        dispatch(saveRegisterData(values));
        toast.success(res?.message, { theme: "colored" });
        navigateSource("/send-otp");
      } else if (res.code === 500) {
        toast.error(res?.message, { theme: "colored" });
      } else if (res.code === 404 && res.data) {
        dispatch(setErrors(res.data.error));
      }
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className={styles["page-wrapper"]}>
      <div className="browse-job">
        <div className="row justify-content-center">
          <div
            className={`col-xl-12 col-lg-12 col-md-12 col-sm-12 bg-white ${styles.card} p-4`}
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
              {() => (
                <Form>
                  <h3
                    className={`${styles["form-title"]} ${styles["rubik-font"]}`}
                    style={{ fontWeight: "600", color: "#2A6310" }}
                  >
                    Sign Up
                  </h3>
                  <div className="dez-separator-outer mb-3">
                    <div className="dez-separator bg-primary style-liner"></div>
                  </div>
                  <p className={styles["lato-font"]}>
                    Enter your personal details below:
                  </p>

                  {/* Name Field */}
                  <div className="form-group">
                    <Field
                      className={`form-control ${styles["lato-font"]}`}
                      name="name"
                      placeholder="Full Name"
                    />
                    <span className="text-danger">
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
                    <span className="text-danger">
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
                    <span className="text-danger">
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
                    <span className="text-danger">
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
                    <label className={styles["lato-font"]}>
                      Select a Role:
                    </label>
                    <div className="d-flex justify-content-around">
                      <label>
                        <Field type="radio" name="role" value="job_seeker" />
                        <span> Job Seeker</span>
                      </label>
                      <label>
                        <Field type="radio" name="role" value="job_poster" />
                        <span> Job Poster</span>
                      </label>
                    </div>
                    <span className="text-danger">
                      <ErrorMessage name="role" />
                      {errors?.role?.[0]}
                    </span>
                  </div>
                  {/* Terms and Conditions Checkbox */}
                  <div className="form-group form-check">
                    <Field
                      type="checkbox"
                      name="terms"
                      className="form-check-input"
                    />
                    <label className={`form-check-label ${styles.termandcondititon}`}>
                      I agree to the{" "}
                      <span className="text-success">Terms of Service</span> and{" "}
                      <span className="text-success">Privacy Policy</span>{" "}
                    </label>
                    <span className="text-danger">
                      <ErrorMessage name="terms" />
                    </span>
                  </div>

                  {/* Register Button */}
                  <div className="form-group text-center">
                    <button
                      type="submit"
                      className={`site-button ${styles["lato-font"]}`}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Create Account"}
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="lato-font">
                      Already registered?{" "}
                      <Link href="#" onClick={onSwitchToLogin}>
                        <span className="text-success">Login</span>
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
  );
};

export default RegisterDrawer;
