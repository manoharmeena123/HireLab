"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "react-bootstrap";
import { useGetMembershipQuery } from "@/store/global-store/global.query";
import Loading from "@/components/Loading";
import { useSaveMemberShipMutation } from "@/app/my-resume/store/resume.query";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import Swal from "sweetalert2";
import Script from 'next/script';

const CartSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: membershipData, isLoading: membershipLoading } =
    useGetMembershipQuery();
    console.log('membershipData', membershipData)
  const planId = searchParams.get("plan");
  const [saveMemberShip] = useSaveMemberShipMutation();
  const { user } = useLoggedInUser();
  const selectedPlan = membershipData?.data?.find(
    (plan) => plan.id.toString() === planId
  );

  const parseHtml = (htmlString: any) => {
    return { __html: htmlString };
  };

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
          const payload = {
            user_id: user.user.id.toString(),
            membership_id: selectedPlan.id.toString(),
          };
  
          try {
            // Create an order ID
            const response = await fetch('/api/order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                amount: Number(selectedPlan?.price) * 100,
                currency: 'INR',
              }),
            });
            const { orderId } = await response.json();
  
            // Start the Razorpay payment
            const options: RazorpayOptions = {
              key: `rzp_test_6Yk0yEiSfOEYXv`,
              amount: Number(selectedPlan?.price) * 100,
              currency: 'INR',
              name: selectedPlan.title,
              description: 'Membership Purchase',
              order_id: orderId,
              handler: async function (response: any) {
                console.log('response', response)
                // Handle payment success
                const data = {
                  orderCreationId: orderId,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                };
                console.log('data', data)
  
                const verifyResponse = await fetch('/api/verify', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                });
  
                const result = await verifyResponse.json();
                console.log('verifyResponse', result);
                if (result.isOk) {
                  await saveMemberShip(payload).unwrap();
                  alert("Payment succeeded");

                  router.push('/dashboard-section');
                } else {
                  alert("Payment verification failed");
                }
              },
              prefill: {
                name: user.user.name,
                email: user.user.email,
              },
              theme: {
                color: '#3399cc',
              },
            };
  
            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function (response: any) {
              alert(response.error.description);
            });
            paymentObject.open();
  
          } catch (error) {
            console.error("Failed to save membership", error);
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
              <div className="col-lg-4 col-md-6 col-sm-12 bg-white z-index2 relative p-a0 content-scroll left-bottom shadow rounded">
                <div className="login-form style-2 p-4">
                  <h3 className="text-center">
                    <strong>Cart</strong>
                  </h3>
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
                      </div>
                    </div>
                  </div>
                  <div className="cart-total-wrap shadow bg-white p-3 mt-3 rounded">
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
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-6 col-sm-12 bg-white z-index2 relative p-a0 content-scroll left-bottom shadow rounded">
                <div className="login-form style-2 p-4">
                  <div className="clearfix"></div>
                  <div className="section-content box-sort-in button-example m-t80">
                    <div className="pricingtable-row">
                      <div className="display-property">
                        {membershipData?.data
                          ?.filter((plan) => plan.id.toString() !== planId)
                          .map((text, index) => (
                            <div
                              key={index}
                              className="pricingtable-wrapper style2 bg-white member-ship-div shadow-sm rounded"
                              onMouseEnter={(e) => {
                                const button = e.currentTarget.querySelector(
                                  ".site-button"
                                ) as HTMLElement;
                                button.style.backgroundColor = "#fff";
                                button.style.color = "#000";

                                const title = e.currentTarget.querySelector(
                                  ".pricingtable-title"
                                ) as HTMLElement;
                                title.style.color = "#000";

                                const description =
                                  e.currentTarget.querySelector(
                                    ".pricingtable-description"
                                  ) as HTMLElement;
                                description.style.color = "#fff";
                              }}
                              onMouseLeave={(e) => {
                                const button = e.currentTarget.querySelector(
                                  ".site-button"
                                ) as HTMLElement;
                                button.style.backgroundColor = "#2A6310";
                                button.style.color = "#fff";

                                const title = e.currentTarget.querySelector(
                                  ".pricingtable-title"
                                ) as HTMLElement;
                                title.style.color = "";

                                const description =
                                  e.currentTarget.querySelector(
                                    ".pricingtable-description"
                                  ) as HTMLElement;
                                description.style.color = "";
                              }}
                            >
                              <div className="pricingtable-inner p-4">
                                <div className="pricingtable-price">
                                  <h4 className="font-weight-900 m-t10 m-b0 text-center pricingtable-title">
                                    {text?.title}
                                  </h4>
                                  <p
                                    className="text-left my-2 pricingtable-description"
                                    dangerouslySetInnerHTML={parseHtml(
                                      text?.description
                                    )}
                                  ></p>
                                </div>
                                <div className="price-info-wrapper mt-auto text-center">
                                  <h3 className="font-weight-300 m-t10 m-b0 price-title">
                                    Price
                                  </h3>
                                  <ul className="price-list list-unstyled">
                                    <li className="price-item">
                                      <b>{text?.monthly_price}</b>
                                    </li>
                                    <li className="price-item">
                                      <del className="text-red">
                                        {text?.quarterly_price}
                                      </del>
                                    </li>
                                  </ul>
                                  <div className="text-center button-wrap">
                                    <button
                                      onClick={() => handleGetStarted(text?.id)}
                                      className="site-button radius-xl white-hover btn-primary"
                                    >
                                      <span className="p-lr30 button-text">
                                        Get Started
                                      </span>
                                    </button>
                                  </div>
                                </div>
                                {text.info?.map((e, i) => (
                                  <ul
                                    key={i}
                                    className="mp-cards list-unstyled mt-3"
                                  >
                                    <li className="mp-card-item">
                                      {e?.content}
                                    </li>
                                  </ul>
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    <style jsx>{`
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
