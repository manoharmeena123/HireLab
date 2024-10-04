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
import { selectLoginState } from "@/app/login/store/login.selectors";
import { selectRegisterState } from "@/app/register/store/register.selectors";
import { toast } from "react-toastify";
import styles from "@/styles/SendOtp.module.css";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useLoggedInUser } from '@/hooks/useLoggedInUser'
import { VerifyOtp } from "@/app/send-otp/types/index";
import { useSearchParams, useRouter } from "next/navigation";
import { navigateSource } from "@/lib/action";
const bnr = require("./../../images/background/bg6.jpg");

interface RegisterData {
  data :{
    otp :string;
    mobile_number: string;
  }
}
interface LoginData {
  data :{
    otp : string;
    mobile_number: string;
  }

}

const OtpVefication = () => {
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
  const endpoint = queryTitle
  ? `${queryTitle}`
  : (user?.is_profile_completed == 1 ? "/dashboard-section" : "/job-seeker");


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
  const parsedOtp = parsedData?.data?.otp.toString().length;
  const parsedOtps = parsedDatas?.data?.otp.toString().length;
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
        const loggedInUser = await fetchUser();
        console.log('loggedInUser', loggedInUser)
        if (loggedInUser) {
          navigateSource(endpoint);
        }
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
                          value={parsedData?.data?.otp || parsedDatas?.data?.otp || otp}
                          onChange={handleInputChange}
                          className={`form-control ${styles["lato-font"]} mb-2`}
                          placeholder="Enter OTP"
                          maxLength={6} // Additional safeguard
                        />
                        {/* Error message for invalid OTP input */}
                        {otpError && (
                          <span className="text-red-500 text-danger">
                            {otpError}
                          </span>
                        )}
                        {/* Error from server validation */}
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
