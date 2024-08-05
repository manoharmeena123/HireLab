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
import { useRouter } from "next/navigation";
import MembershipPlans from "./MembershipPlan";
import { Button } from "react-bootstrap";
import { useSearchParams } from "next/navigation";


const CartSection = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
 
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const authState = useSelector(selectLoginState);
  const errors = useSelector(selectLoginErrors);
  const [loading, setLoading] = useState(false);

  const plan = searchParams.get("plan") || "";
  console.log('plan',plan);
  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setAuthState({ [name]: value }));
  };

  return (
    <div className={styles["page-wraper"]}>
      <div className="browse-job login-style3">
        <div className="bg-img-fix">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 bg-white z-index2 relative p-a0 content-scroll left-bottom shadow">
              <div className="login-form style-2">
                <div className="tab-content nav p-b30 tab pt-4">
                  <h3>
                    <strong>Cart</strong>
                  </h3>
                  <div className="cart-content my-3 p-3">
                    <h5>
                      <b>WIZARD</b>
                    </h5>
                    <div className="d-flex flex-column" style={{ gap: "1rem" }}>
                      <div className="cart-input-wrap">
                        <div>
                          <input type="radio" name="month" id="" />
                          <label htmlFor="month" className="mb-0">
                            1 Month
                          </label>
                        </div>
                        <div>
                          <strong>&#8377;699.00/mo</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cart-total-wrap shadow bg-white p-3 mt-3">
                    <div className="cart-total">
                      <div>
                        <strong>1 Item</strong>
                      </div>
                      <div className="d-flex align-items-end">
                        <span className="subtotal">Subtotal:</span>
                        <h6 className="mb-0">
                          <strong>&#8377;699.00/mo</strong>
                        </h6>
                      </div>
                    </div>
                  <hr />
                  <div>
                    <Button className="w-100 checkout-btn" variant=""><i className="fa fa-box"></i>Continue to Checkout</Button>
                  </div>
                  </div> 
                </div>
                
              </div>
            </div>
            <div className="col-lg-9 col-md-6 col-sm-12 bg-white z-index2 relative p-a0 content-scroll  left-bottom shadow">
              <div className="login-form style-2">
                <div className="clearfix"></div>
                <MembershipPlans plan={plan}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
