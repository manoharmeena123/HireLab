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

          <div className="pricing-table">
            <table>
              <thead>
                <tr>
                  <th>Features</th>
                  {reorderedPlans().map((plan :any, index :number) => (
                    <th
                      key={index}
                      className={
                        user?.user?.membership?.membership_id === plan.id
                          ? "highlight-column"
                          : ""
                      }
                    >
                      {plan.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Job listing CTC based</td>
                  {reorderedPlans().map((plan :any, index) => (
                    <td
                      key={index}
                      className={
                        user?.user?.membership?.membership_id === plan.id
                          ? "highlight-column"
                          : ""
                      }
                    >
                      {plan.job_listing_CTC_based === "optional" ? "✓" : "×"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Priority Application</td>
                  {reorderedPlans().map((plan :any, index) => (
                    <td
                      key={index}
                      className={
                        user?.user?.membership?.membership_id === plan.id
                          ? "highlight-column"
                          : ""
                      }
                    >
                      {plan.priority_application === "yes" ? "✓" : "×"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Advanced Job Search Filters</td>
                  {reorderedPlans().map((plan :any, index) => (
                    <td
                      key={index}
                      className={
                        user?.user?.membership?.membership_id === plan.id
                          ? "highlight-column"
                          : ""
                      }
                    >
                      {plan.advanced_job_search_filters === "yes" ? "✓" : "×"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Resume & Cover Letter Reviews</td>
                  {reorderedPlans().map((plan :any, index) => (
                    <td
                      key={index}
                      className={
                        user?.user?.membership?.membership_id === plan.id
                          ? "highlight-column"
                          : ""
                      }
                    >
                      {plan.resume_and_cover_letter_reviews === "yes" ? "✓" : "×"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Mock Interviews</td>
                  {reorderedPlans().map((plan :any, index) => (
                    <td
                      key={index}
                      className={
                        user?.user?.membership?.membership_id === plan.id
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
                  {reorderedPlans().map((plan :any, index) => (
                    <td
                      key={index}
                      className={
                        user?.user?.membership?.membership_id === plan.id
                          ? "highlight-column"
                          : ""
                      }
                    >
                      {plan.connect_with_job_poster === "yes" ? "✓" : "×"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>City Meetups & Events</td>
                  {reorderedPlans().map((plan :any, index) => (
                    <td
                      key={index}
                      className={
                        user?.user?.membership?.membership_id === plan.id
                          ? "highlight-column"
                          : ""
                      }
                    >
                      {plan.city_meetups_and_events === "yes" ? "✓" : "×"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Credits for Successful Job Application</td>
                  {reorderedPlans().map((plan :any, index) => (
                    <td
                      key={index}
                      className={
                        user?.user?.membership?.membership_id === plan.id
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
                  {reorderedPlans().map((plan :any, index) => (
                    <td
                      key={index}
                      className={
                        user?.user?.membership?.membership_id === plan.id
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
                  {reorderedPlans().map((plan :any, index) => (
                    <td
                      key={index}
                      className={
                        user?.user?.membership?.membership_id === plan.id
                          ? "highlight-column"
                          : ""
                      }
                    >
                      <button
                        onClick={() => handleGetStarted(plan.id)}
                        className={`${
                          user?.user?.membership?.membership_id === plan.id
                            ? "selected-plan-btn"
                            : "get-started-btn"
                        }`}
                        disabled={user?.user?.membership?.membership_id === plan.id}
                      >
                        {user?.user?.membership?.membership_id === plan.id
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
          background: linear-gradient(135deg, #007bff, #00c6ff);
          color: white;
        }

        .get-started-btn:hover {
          background: linear-gradient(135deg, #00c6ff, #007bff);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .selected-plan-btn {
          background: linear-gradient(135deg, #ffdd33, #ff9900);
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
      `}</style>
    </>
  );
};

export default SwitchPlan;
