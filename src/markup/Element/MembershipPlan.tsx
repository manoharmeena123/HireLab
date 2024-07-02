import React from "react";
import Link from "next/link";
import { useGetMembershipQuery } from "@/store/global-store/global.query";
// Images
const bnr7 = require("./../../images/background/plans.png");

const MembershipPlans = () => {
  const { data: membershipData } = useGetMembershipQuery();
  console.log("membershipData", membershipData);
  return (
    <div className="section-content box-sort-in button-example m-t80">
      <div className="pricingtable-row">
        <div className="display-property">
          {membershipData?.data?.map((text, index) => (
            <div
              className="pricingtable-wrapper style2 bg-white member-ship-div"
              style={{
                minHeight: "500px",
                borderRadius: "20px",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                const button = e.currentTarget.querySelector(
                  ".site-button"
                ) as HTMLElement;
                button.style.backgroundColor = "#fff";
                button.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                const button = e.currentTarget.querySelector(
                  ".site-button"
                ) as HTMLElement;
                button.style.backgroundColor = "#2A6310";
                button.style.color = "#fff";
              }}
            >
              <div className="">
                <div className="pricingtable-price">
                  <h4
                    className="font-weight-900 m-t10 m-b0 text-center"
                    style={{
                      fontWeight: "bold",
                      fontSize: "28px",
                      border: "1.5px solid black",
                      borderRadius: "20px",
                      padding: "5px",
                    }}
                  >
                    {text?.title}
                  </h4>
                  <p className="text-center my-2">{text?.description}</p>
                </div>
                <div className="m-t10 price-wrap">
                  <h3
                    className="font-weight-300 m-t10 m-b0"
                    style={{
                      fontSize: "20px",
                      textAlign: "center",
                      fontWeight: "700",
                    }}
                  >
                    Price
                  </h3>
                  <ul className="mb-0">
                    <li
                      style={{
                        color: "black",
                        margin: "5px 0px",
                        fontSize: "18px",
                      }}
                    >
                      <b>{text?.price}/-</b> for 1 month
                    </li>
                    <li
                      style={{
                        color: "black",
                        margin: "5px 0px",
                        fontSize: "18px",
                      }}
                    >
                      <del className="text-red">{text?.discount_price}/-</del>{" "}
                      <b>1799/-</b> for 3 months
                    </li>
                  </ul>
                </div>
                {text.info?.map((e, i) => (
                  <ul
                    style={{ marginTop: "20px" }}
                    key={i}
                    className="mp-cards"
                  >
                    <li
                      style={{
                        color: "black",
                        margin: "0px 0px",
                        fontSize: "18px",
                      }}
                    >
                      {e?.content}
                    </li>
                  </ul>
                ))}

                <div className="text-center">
                  <Link
                    href={"/register"}
                    className="site-button radius-xl white-hover"
                    style={{
                      border: "1px solid white",
                      backgroundColor: "#2A6310",
                    }}
                  >
                    <span
                      className="p-lr30"
                      style={{ fontFamily: "__Inter_Fallback_aaf875" }}
                    >
                      Get Started
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .member-ship-div {
          min-height: 500px;
          border-radius: 20px;
        }
        .member-ship-div:hover {
          background-color: #2a6310 !important;
          color: white !important;
        }
        .member-ship-div:hover .site-button {
          background-color: #fff !important; /* Changes the button background color to white */
          color: #000 !important; /* Changes the button text color to black */
        }
        .member-ship-div:hover div h4 {
          color: white !important;
          border-color: white !important;
        }
        .member-ship-div:hover div ul li {
          color: white !important;
        }
        .white-hover {
          border: 1px solid white !important;
        }
        .member-ship-div:hover div div h3 {
          color: white !important;
        }
        .display-property {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .pagination-bx .pagination {
          width: 300px;
          margin-left: 0px;
        }
        .display-item-center {
          display: flex !important;
          align-item: center;
          justify-content: center;
        }
        @media (max-width: 1042px) {
          .display-property {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 576px) {
          .display-property {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default MembershipPlans;
