"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { LOGIN_URL } from "@/lib/apiEndPoints";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
var bnr = require("./../../images/background/bg6.jpg");

function Login() {
  
  const [loading,setLoading] = useState<boolean>(false);
  const [authState, setAuthState] = useState({
    email: "",
    mobile_number: "",
  });
  const [errors, setErrors] = useState({
    email: [],
    mobile_number: [],
  });
  const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      axios
      .post(LOGIN_URL, authState, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        const response = res.data;
        setLoading(false);
        if (response?.code == 200) {
          
          signIn("credentials", {
            email: authState.email,
            mobile_number: authState.mobile_number,
            redirect: true,
            callbackUrl: "/",
          });
          
        } else if (response?.code == 401) {
          toast.error("user not found!", { theme: "colored" });
        }else if (response?.code == 404) {
          console.log(response?.data);
          setLoading(false);
          setErrors(response?.data?.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        // setErrors(err?.response?.data?.errors);
      });
  }
  return (
    <div className="page-wraper">
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
                <div className="logo-header text-center p-tb30">
                  <Link href={"./"}>
                    <img src={require("./../../images/logo.png")} alt="" />
                  </Link>
                </div>
                <div className="clearfix"></div>
                <div className="tab-content nav p-b30 tab">
                <form className="dez-form p-b30 mx-2" method="post" onSubmit={handleSubmit}>
                  <div id="login" className="tab-pane active">
                    
                      <div className="width-main-div">
                        <div>
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
                        </div>
                        <h3
                          className="form-title m-t0 rubik-font"
                          style={{ fontWeight: "600" }}
                        >
                          Login
                        </h3>
                        <div className="dez-separator-outer m-b5">
                          <div className="dez-separator bg-primary style-liner"></div>
                        </div>
                        <p className="lato-font">Enter your login details</p>
                        <div className="form-group width-form">
                          <input
                            className="form-control w-full lato-font"
                            placeholder="User Name/Email"
                            name="email"
                            onChange={(e) =>
                              setAuthState({ ...authState, email: e.target.value })
                            }
                          />
                          <span className="text-red-500 text-danger">{errors?.email?.[0]}</span>
                        </div>
                        <div className="form-group width-form">
                          <input
                            type="number"
                            name="mobile_number"
                            onChange={(e) =>
                              setAuthState({ ...authState, mobile_number: e.target.value })
                            }
                            className="form-control w-full lato-font"
                            placeholder="Mobile Number"
                          />
                          <span className="text-red-500 text-danger">{errors?.mobile_number?.[0]}</span>
                        </div>
                      </div>
                      <div
                        className="form-group text-right otp-button-center"
                        style={{ marginTop: "49px" }}
                      >
                        {/* <Link
                          href="/send-otp"
                          className="site-button button-md text-white lato-font"
                        >
                          <p className="lato-font p-0 m-0">Send OTP</p>
                        </Link> */}
                        <button type="submit" className="site-button button-md text-white lato-font">Send OTP</button>
                      </div>
                      <div className="text-center bottom">
                        <Link
                          href="/register"
                          className="site-button button-md btn-block text-white margin-left lato-font"
                          style={{
                            marginLeft: "30%",
                            fontWeight: "400",
                            marginTop: "32px",
                          }}
                        >
                          <p className="lato-font p-0 m-0">Create Account</p>
                        </Link>
                      </div>
                    
                  </div>
                </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .width-form {
          width: 180%;
        }
        .otp-button-center {
          margin-left: 50%;
        }
        .account-button-center {
          margin-left: 30%;
        }
        .rubik-font {
          font-family: "Rubik", sans-serif !important;
        }
        .lato-font {
          font-family: "Lato", sans-serif !important;
          letter-spacing: 0.03em;
        }
      `}</style>
    </div>
  );
}

export default Login;
