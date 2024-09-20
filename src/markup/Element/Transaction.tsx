"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import Image from "next/image";
import {
  useGetDesignationQuery,
  useMyTransactionsQuery,
} from "@/store/global-store/global.query";
import { useLogoutMutation } from "@/app/login/store/login.query";
import { useAuthToken } from "@/hooks/useAuthToken";
import { navigateSource } from "@/lib/action";
import profileIcon from "../../images/favicon.png";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { formaterDate } from "@/utils/formateDate";
import Pagination from "./Pagination"; // Import your Pagination component

const Transaction = () => {
  const router = useRouter();
  const { user, refetch } = useLoggedInUser();
  const { removeToken } = useAuthToken();
  const [company, setCompany] = useState<boolean>(false);
  const { data: designationData } = useGetDesignationQuery(); // Fetch designation data
  const [logout] = useLogoutMutation();
  const [designationOptions, setDesignationOptions] = useState<any[]>([]);
  const [designationLabel, setDesignationLabel] = useState<string>("");
  const { data: transactiondata } = useMyTransactionsQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Number of transactions to display per page

  // Compute total transactions
  const totalItems = transactiondata?.data?.user_points?.length || 0;

  // Get current transactions based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions =
    transactiondata?.data?.user_points?.slice(
      indexOfFirstItem,
      indexOfLastItem
    ) || [];

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Map designation options
    if (designationData?.data) {
      const options = designationData.data.map((designation: any) => ({
        value: designation.title,
        label: designation.title,
        id: designation.id.toString(),
      }));
      setDesignationOptions(options);
    }
  }, [designationData, refetch]);

  useEffect(() => {
    if (user && user.user?.designation_id !== null) {
      // Only proceed if user and designation_id are not null
      const designationId = user.user.designation_id.toString();
      const designation = designationOptions.find(
        (option) => option.id === designationId
      );
      if (designation) {
        setDesignationLabel(designation.label);
      } else {
        setDesignationLabel("Designation not found");
      }
    } else {
      setDesignationLabel("Designation not available");
    }
  }, [user, designationOptions, refetch]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "No, stay logged in",
    });

    if (result.isConfirmed) {
      try {
        await logout().unwrap();
        removeToken();
        navigateSource("/");
        Swal.fire(
          "Logged out!",
          "You have been logged out successfully.",
          "success"
        );
      } catch (error) {
        console.error("Logout failed:", error);
        Swal.fire(
          "Logout failed",
          "Failed to log out. Please try again.",
          "error"
        );
      }
    }
  };

  return (
    <>
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4 m-b30">
                  <div className="sticky-top">
                    <div className="candidate-info">
                      {/* Profile Image */}
                      <div className="candidate-detail text-center">
                        <div className="canditate-des">
                          {user?.user?.image ? (
                            <Image
                              src={`${IMAGE_URL + user?.user?.image}`}
                              alt="profile picture"
                              width={300}
                              height={300}
                              onError={(e) =>
                                (e.currentTarget.src =
                                  "../../images/favicon.png")
                              } // Fallback image
                              style={{ borderRadius: "50%" }}
                            />
                          ) : (
                            <Image
                              src={profileIcon}
                              alt="profile picture"
                              width={300}
                              height={300}
                              onError={(e) =>
                                (e.currentTarget.src =
                                  "../../images/favicon.png")
                              } // Fallback image
                              style={{ borderRadius: "50%" }}
                            />
                          )}
                        </div>
                        <div className="candidate-title">
                          <div className="">
                            <h4 className="m-b5">
                              <Link href={"#"}>
                                {user?.user?.name || "User Name"}
                              </Link>
                            </h4>
                            <p className="m-b0">
                              <Link href={"#"}>
                                {designationLabel || "Not available"}
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Sidebar Links */}
                      <ul>
                        <li>
                          <Link href="/dashboard-section">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link href="/job-posted">
                            <i  className="fa fa-briefcase" aria-hidden="true"></i>
                            Job Posted
                          </Link>
                        </li>
                        <li>
                          <Link href="/profile">
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link href="/my-resume">
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            My Resume
                          </Link>
                        </li>
                        <li>
                          <Link href="/saved-jobs">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            Saved Jobs
                          </Link>
                        </li>
                        <li>
                          <Link href="/applied-job">
                            <i
                              className="fa fa-briefcase"
                              aria-hidden="true"
                            ></i>
                            Applied Jobs
                          </Link>
                        </li>
                        <li>
                          <Link href="/job-alert">
                            <i className="fa fa-bell-o" aria-hidden="true"></i>
                            Job Alerts
                          </Link>
                        </li>
                        <li>
                          <Link href="/cv-manager">
                            <i
                              className="fa fa-id-card-o"
                              aria-hidden="true"
                            ></i>
                            CV Manager
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/switch-plan"
                          >
                            <i className="fa fa-money" aria-hidden="true"></i>
                            Switch Plan
                          </Link>
                        </li>
                        <li>
                          <Link href="/transaction" className="active">
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            <span>Transaction</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="#" onClick={handleLogout}>
                            <i
                              className="fa fa-sign-out"
                              aria-hidden="true"
                            ></i>
                            <span>Log Out</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx browse-job clearfix">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        TRANSACTIONS
                      </h5>
                    </div>
                    <h3>
                      <span style={{ color: "blue" }}>{totalItems}</span>{" "}
                      Transactions
                    </h3>
                    <h6>
                        Your Remainning credit {" "}
                        <span style={{ color: "blue" }}>
                          {user?.user?.membership?.credit || 0}{" "}
                          Credits
                        </span>
                      </h6>
                    <table className="table-job-bx cv-manager company-manage-job">
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTransactions.map((item: any) => (
                          <tr key={item.id}>
                            <td className="job-name">
                              <Link href={"#"}>{item?.notes}</Link>
                            </td>
                            <td
                              className={`application ${
                                item?.type == "debit"
                                  ? "text-red"
                                  : "text-primary"
                              }`}
                            >
                              {item.point}{" "}
                              { item?.type == "debit"? "Debited" : "Credited"}
                            </td>
                            <td
                              className={`application ${
                                item?.type == "debit"
                                  ? "text-red"
                                  : "text-primary"
                              }`}
                            >
                              {item.point}
                            </td>
                            <td className="expired pending">
                              {formaterDate(item.created_at)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Pagination Component */}
                    <Pagination
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                      totalItems={totalItems}
                      onPageChange={handlePageChange}
                    />
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

export default Transaction;
