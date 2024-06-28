// src/app/send-otp/Register2.tsx
"use client";
import React, { ChangeEvent, FormEvent,useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useVerifyOtpMutation } from "../send-otp/store/send-otp.query";
import {
  selectVerifyOtpState,
  selectVerifyOtpErrors,
} from "@/app/send-otp/store/send-otp.selectors";
import {
  setVerifyOtpState,
  setVerifyOtpErrors,
} from "@/app/send-otp/store/send-otp.slice";
import { selectLoginState } from "@/app/login/store/login.selectors";
import { selectRegisterState } from "@/app/register/store/register.selectors";
import { toast } from "react-toastify";
import styles from "./styles/SendOtp.module.css";
import useAuthToken from "@/hooks/useAuthToken";
import { VerifyOtp } from "./types";
import { signIn } from "next-auth/react";
import Env from "@/lib/Env";
const bnr = require("./../../images/background/bg6.jpg");


interface RegisterData {
  mobile_number: string;
}

const OtpVefication = () => {
  const dispatch = useDispatch();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const verifyOtpState = useSelector(selectVerifyOtpState);
  const errors = useSelector(selectVerifyOtpErrors);
  const { saveToken } = useAuthToken();
  const loginState = useSelector(selectLoginState);
  const registerState = useSelector(selectRegisterState);
  // Local state to store the parsed data
  const [parsedData, setParsedData] = useState<RegisterData | null>(null);
 // Parse localStorage data
 useEffect(() => {
  const data = localStorage.getItem('registerData');
  if (data) {
    try {
      const parsedData = JSON.parse(data);
      setParsedData(parsedData);
      console.log('Parsed Data:', parsedData?.mobile_number);
    } catch (error) {
      console.error('Error parsing register data from localStorage', error);
    }
  }
}, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setVerifyOtpState({ [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = {
      ...verifyOtpState,
      mobile_number: loginState?.mobile_number || parsedData?.mobile_number,
    };
    console.log("payload", payload);
    try {
      const res = await verifyOtp(payload as VerifyOtp).unwrap();
      if (res?.code === 200 && res?.data) {
        toast.success("Otp verified successFull", { theme: "colored" });

        if (res?.data?.token) {
          saveToken(res.data.token, res.data);
        }
        await signIn("credentials", {
          otp: { ...verifyOtpState },
          mobile_number:
            loginState?.mobile_number || parsedData?.mobile_number,
          redirect: true,
          callbackUrl: `${Env.APP_URL}` || "http://localhost:3000",
        });
        // Handle success logic here
      } else if (res.code === 401) {
        toast.error("Invalid OTP!", { theme: "colored" });
      } else if (res.code === 404 && res.data?.error) {
        dispatch(
          setVerifyOtpErrors({
            otp: res.data.error.otp || [],
            mobile_number: res.data.error.mobile_number || [],
          })
        );
      }
    } catch (err) {
      console.error("Verify OTP failed:", err);
      toast.error("Verify OTP failed. Please try again.");
    }
  };

  return (
    <div className="page-wraper">
      <div className="browse-job login-style3">
        <div
          className="bg-img-fix"
          style={{
            backgroundImage: `url(${bnr.default.src})`,
            height: "100vh",
            width: "100vw",
          }}
        >
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 bg-white z-index2 relative p-a0 content-scroll skew-section left-bottom">
              <div className="login-form style-2" style={{ width: "100%" }}>
                <div className="logo-header text-center p-tb30">
                  <Link href={"./"}>
                    <img
                      src={require("./../../images/Hire Labs_Final logo.png")}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="clearfix"></div>
                <div className="tab-content nav p-b30 tab">
                  <div id="login" className="tab-pane active ">
                    <form
                      className={`dez-form p-b30 ${styles["rubik-font"]}`}
                      onSubmit={handleSubmit}
                    >
                      <div>
                        {/* <div className="mb-3">
                          <img
                            src="./../../images/Hire Labs_Final logo.png"
                            alt="Logo 1"
                          />
                        </div> */}
                      </div>
                      <h3
                        style={{ fontWeight: "600" }}
                        className="form-title m-t0"
                      >
                        Verify OTP
                      </h3>
                      <div className="dez-separator-outer m-b5">
                        <div className="dez-separator bg-primary style-liner"></div>
                      </div>
                      <p className={styles["lato-font"]}>Enter your OTP</p>
                      <div
                        className={`form-group w-full ${styles["width-form"]}`}
                        style={{ marginTop: "13px" }}
                      >
                        <input
                          type="number"
                          name="otp"
                          onChange={handleInputChange}
                          className={`form-control ${styles["lato-font"]}`}
                          placeholder="Enter OTP"
                        />
                        <span className="text-red-500 text-danger">
                          {errors?.otp?.[0]}
                        </span>
                      </div>
                      <div
                        className={`form-group text-center ${styles["otp-button-center"]}`}
                      >
                        <button
                          type="submit"
                          className={`site-button button-md text-white ${styles["lato-fonts"]}`}
                          disabled={isLoading}
                        >
                          {isLoading ? "Verifying..." : "Verify OTP"}
                        </button>
                      </div>
                      <div className={styles["account-button-center"]}>
                        <Link
                          href="/login"
                          className="site-button button-md btn-block text-white"
                        >
                          <p className={`lato-font p-0 m-0`}>Back to Login</p>
                        </Link>
                      </div>
                    </form>
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

export default OtpVefication;
