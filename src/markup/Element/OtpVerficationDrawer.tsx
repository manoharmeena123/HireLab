"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useVerifyOtpMutation } from "@/app/send-otp/store/send-otp.query";
import {
  selectVerifyOtpState,
  selectVerifyOtpErrors,
} from "@/app/send-otp/store/send-otp.selectors";
import {
  setVerifyOtpState,
  setVerifyOtpErrors,
} from "@/app/send-otp/store/send-otp.slice";
import { toast } from "react-toastify";
import styles from "@/styles/OtpVerficationDrawer.module.css";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { VerifyOtp } from "@/app/send-otp/types/index";
import { useSearchParams } from "next/navigation";
import { navigateSource } from "@/lib/action";
import { selectLoginState } from "@/app/login/store/login.selectors";
import { selectRegisterState } from "@/app/register/store/register.selectors";
import {
  showLoginSidebar as showLogin,
  showSignUpSidebar as showSignUp,
  closeSidebars as close,
} from "@/store/global-store/global.slice"; // Import actions with aliases
interface RegisterData {
  data: {
    otp: string;
    mobile_number: string;
  };
}

interface LoginData {
  data: {
    otp: string;
    mobile_number: string;
  };
}

const OtpVerificationDrawer = ({ onClose }: any) => {
    const searchParams = useSearchParams();
    const queryTitle = searchParams.get("page");
    const dispatch = useDispatch();
    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
    const verifyOtpState = useSelector(selectVerifyOtpState);
    const errors = useSelector(selectVerifyOtpErrors);
    const { saveToken } = useAuthToken();
    const loginState = useSelector(selectLoginState);
    const registerState = useSelector(selectRegisterState);
    const { user,fetchUser } = useLoggedInUser();
    // Local state to store the parsed data
    const [parsedData, setParsedData] = useState<RegisterData | null>(null);
    const [parsedDatas, setParsedDatas] = useState<LoginData | null>(null);
     console.log('parsedDatas', parsedDatas)
    // State to store OTP input and manage length
    const [otp, setOtp] = useState<string>("");
    const [otpError, setOtpError] = useState<string | null>(null);
    console.log('firstuser', user)
    // Parse localStorage data
    useEffect(() => {
      const data = localStorage.getItem("registerData");
      const logindata = localStorage.getItem("logindata");
      if (logindata) {
        const parsedDatas = JSON.parse(logindata);
        setParsedDatas(parsedDatas);
      }
      if (data) {
        try {
          const parsedData = JSON.parse(data);
          console.log('parsedData', parsedData)
  
          setParsedData(parsedData);
          console.log("Parsed Data:", parsedData?.data?.mobile_number);
        } catch (error) {
          console.error("Error parsing register data from localStorage", error);
        }
      }
    }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Restrict OTP input to 6 digits
    if (value.length <= 6) {
      setOtp(value);
      dispatch(setVerifyOtpState({ [name]: value }));
      setOtpError(null); // Clear any error when input is valid
    } else {
      setOtpError("OTP cannot be more than 6 digits.");
    }
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

  // Validate OTP length for both user input (otp) and parsedData
  const parsedOtp = parsedData?.data?.otp?.toString().length;
  const parsedOtps = parsedDatas?.data?.otp?.toString().length;
  console.log('parsedOtps', parsedOtps)
  if ((otp.length !== 6 && !parsedOtp && !parsedDatas) || (parsedOtp && parsedOtp !== 6 && !parsedDatas && !otp) || (parsedOtps && parsedOtps !== 6 && !parsedData && !otp)) {
    setOtpError("OTP must be exactly 6 digits.");
    return;
  }
    const payload = {
      ...verifyOtpState,
      mobile_number:
        loginState?.mobile_number ||
        parsedData?.data?.mobile_number ||
        parsedDatas?.data?.mobile_number,
        otp :parsedData?.data?.otp || parsedDatas?.data?.otp
 
    };

    // console.log("payload", payload);
    try {
      const res = await verifyOtp(payload as VerifyOtp).unwrap();
      if (res?.code === 200 && res?.data) {
        toast.success(res?.message, { theme: "colored" });

        if (res?.data?.token) {
          saveToken(res.data.token, res.data);
        }
         // Remove registerData from localStorage
        localStorage.removeItem("registerData");
        localStorage.removeItem("logindata");
        const loggedInUser :any = await fetchUser();
        // console.log('loggedInUser', loggedInUser)
        // const endpoint = queryTitle
        // ? `${queryTitle}`
        // : (loggedInUser?.user?.role === "job_poster" ? "/job-poster-dashboard" : "/dashboard-section");
      
        // if (loggedInUser) {
        //   navigateSource(endpoint);
        // }
        dispatch(close());
        onClose()
        window.location.reload();
      } else if (res.code === 401) {
        toast.error(res?.message, { theme: "colored" });
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
    <div className={`${styles["page-wraper"]} ${styles["sidebar"]}`}>
      <div className={`login-form p-4 ${styles.sidebarContent}`}>
        <h3
          className={`form-title mb-1 ${styles["rubik-font"]}`}
          style={{ fontWeight: "600", color: "#2A6310" }}
        >
          Verify OTP
        </h3>
        <div className="dez-separator-outer mb-3">
          <div className="dez-separator bg-success"></div>
        </div>
        <p
          className={`${styles["lato-font"]} mb-3`}
          style={{ color: "#6c757d" }}
        >
          Please enter your OTP
        </p>

        <form onSubmit={handleSubmit} className="dez-form">
          <div className={`form-group ${styles["width-form"]} mb-4`}>
            <input
              type="number"
              name="otp"
              value={parsedData?.data?.otp || parsedDatas?.data?.otp || otp}
              onChange={handleInputChange}
              className={`form-control ${styles["lato-font"]} p-3`}
              placeholder="Enter your 6-digit OTP"
              maxLength={6}
              style={{ borderColor: "#2A6310", borderRadius: "5px" }}
            />
            {otpError && (
              <span className="text-danger mt-1 d-block">{otpError}</span>
            )}
            <span className="text-danger mt-1 d-block">{errors?.otp?.[0]}</span>
          </div>

          <div className="form-group text-center">
            <button
              type="submit"
              className={`btn btn-success btn-block ${styles["lato-font"]}`}
              disabled={isLoading}
              style={{ width: "100%", borderRadius: "15px", padding: "0.75rem",backgroundColor: "#2A6310" }}
            >
              {isLoading ? "Loading..." : "Verify OTP"}
            </button>
          </div>

          <div className="text-center mt-4">
            <p className={`${styles["lato-font"]} ${styles["no-wrap"]}`}>
              Back to{" "}
              <Link
                href="#"
                onClick={() => onClose()} // This will trigger the parent component's `onClose` to close the OTP drawer and show the Login form
                className="text-success"
                style={{ fontWeight: "600" }}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpVerificationDrawer;
