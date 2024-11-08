"use client";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/app/login/store/login.query";
import { setAuthState, setErrors } from "@/app/login/store/login.slice";
import { selectLoginState, selectLoginErrors } from "@/app/login/store/login.selectors";
import { toast } from "react-toastify";
import styles from "@/styles/LoginDrawer.module.css";
import { navigateSource } from "@/lib/action";
import { useSearchParams, useRouter } from "next/navigation";

const Login = ({onClose, onSwitchToRegister}:any) => {
  const searchParams = useSearchParams();
  const queryTitle = searchParams.get("page");
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const authState = useSelector(selectLoginState);
  const errors = useSelector(selectLoginErrors);

  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const endpoint = queryTitle ? `/send-otp?page=${queryTitle}` : "/send-otp";

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
      const cleanedValue = value.replace(/\D/g, "");
      if (cleanedValue.length <= 10) {
        setMobileNumber(cleanedValue);
        setMobileNumberError(null);
        dispatch(setAuthState({ [name]: cleanedValue }));
      } else {
        setMobileNumberError("Mobile number must be exactly 10 digits.");
      }
    } else {
      dispatch(setAuthState({ [name]: value }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (mobileNumber.length !== 10) {
      setMobileNumberError("Mobile number must be exactly 10 digits.");
      return;
    }
    if (rememberMe) {
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
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className={`${styles["page-wraper"]} ${styles.sidebar}`}>
      <div className={`login-form p-4  ${styles.sidebarContent}`} >
        <h3 className={`form-title mb-1 ${styles["rubik-font"]}`} style={{ fontWeight: "600", color: "#2A6310",  }}>
          Login
        </h3>
        <div className="dez-separator-outer mb-3">
          <div className="dez-separator bg-success"></div>
        </div>
        <p className={`${styles["lato-font"]} mb-3`} style={{ color: "#6c757d", textAlign: "center" }}>Please enter your login details</p>

        <form onSubmit={handleSubmit} className="dez-form">
          <div className={`form-group ${styles["width-form"]} mb-4`}>
            <input
              type="text"
              name="mobile_number"
              value={mobileNumber}
              onChange={handleInputChange}
              className={`form-control ${styles["lato-font"]} p-3`}
              placeholder="📞 +91- Enter your 10-digit mobile number"
              maxLength={10}
              style={{ borderColor: "#2A6310", borderRadius: "5px" }}
            />
            {mobileNumberError && (
              <span className="text-danger mt-1 d-block">{mobileNumberError}</span>
            )}
            {errors?.mobile_number?.[0] && (
              <span className="text-danger mt-1 d-block">{errors?.mobile_number[0]}</span>
            )}
            <div className="form-check mt-2">
              <small className="text-muted">An OTP will be sent to this number</small>
            </div>
          </div>

          <div className="form-group text-center">
            <button
              type="submit"
              className={`btn btn-success btn-block ${styles["lato-font"]}`}
              disabled={isLoading}
              style={{ width: "100%", borderRadius: "5px", padding: "0.75rem",backgroundColor: "#2A6310" }}
            >
              {isLoading ? "Loading..." : "Get OTP"}
            </button>
          </div>

          <div className="text-center mt-4">
            <p className={`${styles["lato-font"]} ${styles["no-wrap"]}`}>
              New here?{" "}
              <Link href="#" onClick={onSwitchToRegister} className="text-success" style={{ fontWeight: "600" }}>
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
