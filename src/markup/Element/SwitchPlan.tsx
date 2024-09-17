"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useGetMembershipQuery } from "@/store/global-store/global.query";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import Loading from "@/components/Loading";

const SwitchPlan = () => {
  const { data: membershipData, isLoading } = useGetMembershipQuery();
  const { user } = useLoggedInUser();
  const router = useRouter();

  // Helper function to reorder plans based on user's membership
  const reorderedPlans = () => {
    if (!membershipData?.data) return [];
    const userMembershipId = user?.user?.membership?.membership_id;

    // Put the selected membership first and others after it
    const selectedPlan = membershipData.data.find(
      (plan) => plan.id === userMembershipId
    );
    const otherPlans = membershipData.data.filter(
      (plan) => plan.id !== userMembershipId
    );

    return selectedPlan ? [selectedPlan, ...otherPlans] : membershipData.data;
  };

  const parseHtml = (htmlString: any) => {
    return { __html: htmlString };
  };

  const handleGetStarted = async (membershipId: any) => {
    router.push(`/cart?plan=${membershipId}`);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="section-full content-inner-2 overlay-white-middle">
        <div className="container">
          <div className="section-head text-black text-center">
            <h2 style={{ fontWeight: "600" }} className="m-b0">
              Membership Plans
            </h2>
            <p>"Empowering Careers: CTC-Based Tiers, Your Path to Success."</p>
          </div>
          <div className="section-content box-sort-in button-example m-t80">
            <div className="pricingtable-row">
              <div className="display-property">
                {reorderedPlans()?.map((text, index) => (
                  <div
                    key={index}
                    className={`pricingtable-wrapper style2 bg-white member-ship-div ${
                      user?.user?.membership?.membership_id === text.id
                        ? "selected-plan"
                        : ""
                    }`}
                    onMouseEnter={(e) => {
                      const button =
                        e.currentTarget.querySelector<HTMLButtonElement>(
                          ".site-button"
                        );
                      const title = e.currentTarget.querySelector(
                        ".pricingtable-title"
                      ) as HTMLElement;
                      const description = e.currentTarget.querySelector(
                        ".pricingtable-description"
                      ) as HTMLElement;

                      if (button) {
                        button.style.backgroundColor = "#fff";
                        button.style.color = "#000";
                      }
                      if (title) title.style.color = "#000";
                      if (description) description.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      const button =
                        e.currentTarget.querySelector<HTMLButtonElement>(
                          ".site-button"
                        );
                      const title = e.currentTarget.querySelector(
                        ".pricingtable-title"
                      ) as HTMLElement;
                      const description = e.currentTarget.querySelector(
                        ".pricingtable-description"
                      ) as HTMLElement;

                      if (button) {
                        button.style.backgroundColor = "#2A6310";
                        button.style.color = "#fff";
                      }
                      if (title) title.style.color = "";
                      if (description) description.style.color = "";
                    }}
                  >
                    <div className="pricingtable-inner">
                      <div className="pricingtable-price">
                        <h4 className="font-weight-900 m-t10 m-b0 text-center pricingtable-title">
                          {text?.title}
                        </h4>
                        <p
                          className="text-left my-2 pricingtable-description"
                          dangerouslySetInnerHTML={parseHtml(text?.description)}
                        ></p>
                      </div>
                      <div className="price-info-wrapper">
                        <h3 className="font-weight-300 m-t10 m-b0 price-title">
                          Price
                        </h3>
                        <ul className="price-list">
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
                          {user?.user ? (
                            <button
                              onClick={() => handleGetStarted(text?.id)}
                              className="site-button radius-xl white-hover"
                            >
                              <span className="p-lr30 button-text">
                                {user?.user?.membership?.membership_id ===
                                text.id
                                  ? "Selected Plan"
                                  : "Get Started"}
                              </span>
                            </button>
                          ) : (
                            <button
                              className="site-button radius-xl white-hover"
                              onClick={() => router.push(`/login?page=/`)}
                            >
                              <span className="p-lr30 button-text">
                                Login to Get Started
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                      {text.info?.map((e, i) => (
                        <ul key={i} className="mp-cards">
                          <li className="mp-card-item">{e?.content}</li>
                        </ul>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
          .selected-plan {
            border: 2px solid #2a6310;
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
            grid-template-columns: repeat(3, 1fr);
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
              overflow-x: scroll;
              padding-left: 1rem;
              display: flex;
            }
          }
          @media (max-width: 576px) {
            .member-ship-div {
              min-width: 350px;
              min-height: auto;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default SwitchPlan;
