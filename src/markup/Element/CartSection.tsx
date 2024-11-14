"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "react-bootstrap";
import { useGetMembershipQuery } from "@/store/global-store/global.query";
import Loading from "@/components/Loading";
import { useSaveMemberShipMutation } from "@/app/my-resume/store/resume.query";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import Swal from "sweetalert2";
import Script from "next/script";

const CartSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: membershipData, isLoading: membershipLoading } =
    useGetMembershipQuery();
  console.log("membershipData", membershipData);
  const planId = searchParams.get("plan");
  const [saveMemberShip] = useSaveMemberShipMutation();
  const { user } = useLoggedInUser();
  const selectedPlan = membershipData?.data?.find(
    (plan) => plan.id.toString() === planId
  );
  const reorderedPlans = () => {
    if (!membershipData?.data) return [];
    const userMembershipId = user?.user?.membership?.membership_id;
    const selectedPlan = membershipData.data.find(
      (plan) => plan.id === userMembershipId
    );
    const otherPlans = membershipData.data.filter(
      (plan) => plan.id !== userMembershipId
    );
    return selectedPlan ? [selectedPlan, ...otherPlans] : membershipData.data;
  };
  // const parseHtml = (htmlString: any) => {
  //   return { __html: htmlString };
  // };

  const handleGetStarted = async (membershipId: any) => {
    console.log("membershipId", membershipId);
    router.push(`/cart?plan=${membershipId}`);
  };

  const handleContinueToCheckout = async () => {
    if (user?.user?.id && selectedPlan) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to proceed to checkout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, proceed!",
        cancelButtonText: "No, cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // Create an order by calling the backend order API
            const response = await fetch("/api/order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                amount: Number(selectedPlan?.price) * 100, // Amount in paise
                currency: "INR",
              }),
            });

            const { orderId } = await response.json();

            // Setup Razorpay payment options
            const options: RazorpayOptions = {
              key: "rzp_test_6Yk0yEiSfOEYXv", // Replace with your Razorpay test key
              amount: Number(selectedPlan?.price) * 100, // Amount in paise
              currency: "INR", // Currency
              name: selectedPlan.title,
              description: "Membership Purchase",
              order_id: orderId, // Order ID from the backend
              handler: async (response: any) => {
                // Capture payment and save membership
                const paymentData = {
                  paymentId: response.razorpay_payment_id,
                  amount: Number(selectedPlan?.price) * 100,
                  currency: "INR",
                };

                const captureResponse = await fetch("/api/capture", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(paymentData),
                });

                const captureResult = await captureResponse.json();

                if (
                  captureResult.message === "Payment captured successfully" ||
                  captureResult.alreadyCaptured
                ) {
                  const payload = {
                    user_id: user.user.id.toString(),
                    membership_id: selectedPlan.id.toString(),
                    amount: captureResult.data.amount,
                    id: captureResult.data.id,
                    status: captureResult.data.status,
                    order_id: captureResult.data.order_id,
                    payment_type: captureResult.data.method,
                    is_true: true,
                  };

                  const res: any = await saveMemberShip(payload).unwrap();

                  if (res?.code === 200) {
                    Swal.fire("Success", res.message, "success");
                    router.push("/dashboard-section"); // Navigate to dashboard
                  } else if (res?.code === 401) {
                    Swal.fire("Error", res.message, "error");
                  } else {
                    Swal.fire(
                      "Error",
                      "Unexpected success response. Please check!",
                      "error"
                    );
                  }
                } else {
                  // Handle failed membership saving
                  const failedPayload = {
                    user_id: user.user.id.toString(),
                    membership_id: selectedPlan.id.toString(),
                    amount: captureResult.data.amount,
                    id: captureResult.data.id,
                    status: captureResult.data.status,
                    order_id: captureResult.data.order_id,
                    payment_type: captureResult.data.method,
                    is_true: false,
                  };

                  const res: any = await saveMemberShip(failedPayload).unwrap();

                  if (res?.code === 200) {
                    Swal.fire("Error", res.message, "error");
                  } else if (res?.code === 401) {
                    Swal.fire("Error", res.message, "error");
                  } else {
                    Swal.fire(
                      "Error",
                      "Payment capture failed. Please try again.",
                      "error"
                    );
                  }
                }
              },
              prefill: {
                name: user.user.name,
                email: user.user.email,
              },
              theme: {
                color: "#3399cc",
              },
            };

            // Open Razorpay checkout
            const paymentObject = new window.Razorpay(options);
            paymentObject.on("payment.failed", (response: any) => {
              Swal.fire("Error", response.error.description, "error");
            });
            paymentObject.open();
          } catch (error) {
            console.error("Error in processing payment:", error);
            Swal.fire(
              "Error",
              "Failed to initiate payment. Please try again.",
              "error"
            );
          }
        }
      });
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      {membershipLoading && <Loading />}
      <div>
        <div className="browse-job login-style3">
          <div className="bg-img-fix">
            <div className="row">
              <div className="col-lg-3 col-md-12 col-sm-12 bg-white z-index2 relative p-a0 content-scroll left-bottom shadow rounded">
                <div className="login-form style-2 p-4">
                  <h4 className="text-center">
                  Cart
                  </h4>
                  <div className="cart-content my-3 p-3 bg-light rounded shadow-sm">
                    <h5>
                      <b>{selectedPlan?.title}</b>
                    </h5>
                    <div className="d-flex flex-column" style={{ gap: "1rem" }}>
                      <div className="cart-input-wrap">
                        <div>
                          <input
                            type="radio"
                            name="month"
                            id="month"
                            defaultChecked
                          />
                          <label htmlFor="month" className="mb-0 ms-2">
                            1 Month
                          </label>
                        </div>
                        <div>
                          <strong>
                            &#8377;{selectedPlan?.monthly_price}/months
                          </strong>
                        </div>
                        <hr />
                      </div>
                      <div>
                        <Button
                          className="w-100 checkout-btn"
                          variant=""
                          onClick={handleContinueToCheckout}
                        >
                          <i className="fa fa-box"></i> Continue to Checkout
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* <div className="cart-total-wrap shadow bg-white p-3 mt-3 rounded">
                    <div className="cart-total d-flex justify-content-between">
                      <strong>1 Item</strong>
                      <div className="align-items-end">
                        <h6 className="mb-0">
                          <strong>
                            &#8377;{selectedPlan?.monthly_price}/month
                          </strong>
                        </h6>
                        <div>
                          <strong>
                            {" "}
                            Subtotal: &#8377;
                            {selectedPlan?.monthly_price.split("-")[1].trim()}
                          </strong>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <Button
                        className="w-100 checkout-btn"
                        variant=""
                        onClick={handleContinueToCheckout}
                      >
                        <i className="fa fa-box"></i> Continue to Checkout
                      </Button>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-9 col-md-12 col-sm-12 bg-white z-index2 relative p-a0 content-scroll left-bottom shadow rounded">
                <div className="login-form style-2 p-4">
                  <div className="clearfix"></div>
                  <div className="section-content box-sort-in button-example m-t80">
                    <div className="pricingtable-row">
                      <div className="pricing-table">
                        <table>
                          <thead>
                            <tr>
                              <th>Features</th>
                              {reorderedPlans().map(
                                (plan: any, index: number) => (
                                  <th
                                    key={index}
                                    className={
                                      user?.user?.membership?.membership_id ===
                                      plan.id
                                        ? "highlight-column"
                                        : ""
                                    }
                                  >
                                    {plan.title}
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Job listing CTC based</td>
                              {reorderedPlans().map((plan: any, index) => (
                                <td
                                  key={index}
                                  className={
                                    user?.user?.membership?.membership_id ===
                                    plan.id
                                      ? "highlight-column"
                                      : ""
                                  }
                                >
                                  {plan.job_listing_CTC_based === "optional"
                                    ? "✓"
                                    : "×"}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Priority Application</td>
                              {reorderedPlans().map((plan: any, index) => (
                                <td
                                  key={index}
                                  className={
                                    user?.user?.membership?.membership_id ===
                                    plan.id
                                      ? "highlight-column"
                                      : ""
                                  }
                                >
                                  {plan.priority_application === "yes"
                                    ? "✓"
                                    : "×"}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Advanced Job Search Filters</td>
                              {reorderedPlans().map((plan: any, index) => (
                                <td
                                  key={index}
                                  className={
                                    user?.user?.membership?.membership_id ===
                                    plan.id
                                      ? "highlight-column"
                                      : ""
                                  }
                                >
                                  {plan.advanced_job_search_filters === "yes"
                                    ? "✓"
                                    : "×"}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Resume & Cover Letter Reviews</td>
                              {reorderedPlans().map((plan: any, index) => (
                                <td
                                  key={index}
                                  className={
                                    user?.user?.membership?.membership_id ===
                                    plan.id
                                      ? "highlight-column"
                                      : ""
                                  }
                                >
                                  {plan.resume_and_cover_letter_reviews ===
                                  "yes"
                                    ? "✓"
                                    : "×"}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Mock Interviews</td>
                              {reorderedPlans().map((plan: any, index) => (
                                <td
                                  key={index}
                                  className={
                                    user?.user?.membership?.membership_id ===
                                    plan.id
                                      ? "highlight-column"
                                      : ""
                                  }
                                >
                                  {plan.mock_interviews === "yes" ? "✓" : "×"}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Connect with Job Poster</td>
                              {reorderedPlans().map((plan: any, index) => (
                                <td
                                  key={index}
                                  className={
                                    user?.user?.membership?.membership_id ===
                                    plan.id
                                      ? "highlight-column"
                                      : ""
                                  }
                                >
                                  {plan.connect_with_job_poster === "yes"
                                    ? "✓"
                                    : "×"}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>City Meetups & Events</td>
                              {reorderedPlans().map((plan: any, index) => (
                                <td
                                  key={index}
                                  className={
                                    user?.user?.membership?.membership_id ===
                                    plan.id
                                      ? "highlight-column"
                                      : ""
                                  }
                                >
                                  {plan.city_meetups_and_events === "yes"
                                    ? "✓"
                                    : "×"}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Credits for Successful Job Application</td>
                              {reorderedPlans().map((plan: any, index) => (
                                <td
                                  key={index}
                                  className={
                                    user?.user?.membership?.membership_id ===
                                    plan.id
                                      ? "highlight-column"
                                      : ""
                                  }
                                >
                                  {plan.credit}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td>Price (Monthly)</td>
                              {reorderedPlans().map((plan: any, index) => (
                                <td
                                  key={index}
                                  className={
                                    user?.user?.membership?.membership_id ===
                                    plan.id
                                      ? "highlight-column"
                                      : ""
                                  }
                                >
                                  {plan.monthly_price}
                                </td>
                              ))}
                            </tr>
                            {/* New Row for the Buttons */}
                            <tr>
                              <td></td>
                              {reorderedPlans().map((plan: any, index) => (
                                <td
                                  key={index}
                                  className={
                                    user?.user?.membership?.membership_id ===
                                    plan.id
                                      ? "highlight-column"
                                      : ""
                                  }
                                >
                                  <button
                                    onClick={() => handleGetStarted(plan.id)}
                                    className={`${
                                      user?.user?.membership?.membership_id ===
                                      plan.id
                                        ? "selected-plan-btn"
                                        : "get-started-btn"
                                    }`}
                                    disabled={
                                      user?.user?.membership?.membership_id ===
                                      plan.id
                                    }
                                  >
                                    {user?.user?.membership?.membership_id ===
                                    plan.id
                                      ? "Selected Plan"
                                      : "Get Started"}
                                  </button>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <style jsx>{`
                      .pricing-table {
                        margin-top: 20px;
                        width: 100%;
                        text-align: center;
                        border-collapse: separate;
                        border-spacing: 0 10px;
                      }

                      table {
                        width: 100%;
                        border-collapse: collapse;
                      }

                      th,
                      td {
                        border: 1px solid #ddd;
                        padding: 12px;
                        font-size: 16px;
                      }

                      th {
                        background-color: #f2f2f2;
                        font-weight: bold;
                      }

                      td {
                        text-align: center;
                        padding: 15px;
                      }

                      .highlight-column {
                        background-color: #e7f9e7;
                        font-weight: bold;
                      }

                      .get-started-btn,
                      .selected-plan-btn {
                        padding: 12px 28px;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        display: inline-block;
                        border: none;
                      }

                      .get-started-btn {
                        background: linear-gradient(
                          135deg,
                          #2a6310,
                          #6cc047
                        ) !important;
                        color: white;
                      }

                      .get-started-btn:hover {
                        background: linear-gradient(
                          135deg,
                          #57cc21,
                          #223918
                        ) !important;
                        transform: translateY(-2px);
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                      }

                      .selected-plan-btn {
                        background: linear-gradient(
                          135deg,
                          #57cc21,
                          #223918
                        ) !important;
                        color: white;
                        cursor: not-allowed;
                        opacity: 0.8;
                      }

                      .selected-plan-btn:disabled {
                        cursor: not-allowed;
                      }

                      @media (max-width: 768px) {
                        table,
                        th,
                        td {
                          font-size: 14px;
                        }

                        .get-started-btn,
                        .selected-plan-btn {
                          width: 80%;
                          margin: 10px auto;
                        }
                      }
                      .member-ship-div {
                        min-height: 500px;
                        border-radius: 20px;
                        padding: 20px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        transition: background-color 0.3s, color 0.3s;
                        margin: 20px;
                        display: flex;
                        flex-direction: column;
                      }
                      .member-ship-div:hover {
                        background-color: #2a6310 !important;
                        color: white !important;
                      }
                      .member-ship-div:hover .site-button {
                        background-color: #fff !important;
                        color: #000 !important;
                      }
                      .member-ship-div:hover .pricingtable-title {
                        color: #000 !important;
                      }
                      .member-ship-div:hover .pricingtable-description {
                        color: #fff !important;
                      }
                      .member-ship-div:hover .price-title,
                      .member-ship-div:hover .price-item,
                      .member-ship-div:hover .mp-card-item {
                        color: white !important;
                      }
                      .pricingtable-wrapper.style2 .pricingtable-price {
                        padding: 10px;
                      }
                      .pricingtable-inner {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        height: 100%;
                      }
                      .pricingtable-title {
                        font-weight: bold;
                        font-size: 28px;
                        border: 1.5px solid black;
                        border-radius: 20px;
                        padding: 5px;
                        text-align: center;
                        margin-bottom: 15px;
                      }
                      .pricingtable-description {
                        text-align: center;
                        margin-bottom: 20px;
                      }
                      .price-info-wrapper {
                        margin-top: auto;
                        text-align: center;
                      }
                      .price-title {
                        font-size: 20px;
                        font-weight: 700;
                      }
                      .price-list {
                        list-style: none;
                        padding: 0;
                      }
                      .price-item {
                        color: black;
                        margin: 5px 0;
                        font-size: 18px;
                      }
                      .button-wrap {
                        text-align: center;
                      }
                      .display-property {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 20px;
                      }
                      .site-button {
                        border: 1px solid white;
                        background-color: #2a6310;
                        padding: 10px 30px;
                        border-radius: 30px;
                        color: white;
                        transition: background-color 0.3s, color 0.3s;
                      }
                      .button-text {
                        font-family: "__Inter_Fallback_aaf875";
                      }
                      @media (max-width: 1200px) {
                        .display-property {
                          grid-template-columns: repeat(2, 1fr);
                        }
                      }
                      @media (max-width: 576px) {
                        .display-property {
                          grid-template-columns: 1fr;
                          overflow-x: scroll;
                          padding-left: 1rem;
                        }
                        .member-ship-div {
                          min-width: 350px;
                          min-height: auto;
                        }
                        .display-property {
                          display: flex;
                        }
                      }
                    `}</style>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSection;
