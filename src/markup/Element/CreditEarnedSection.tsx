"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import Image from "next/image";
import {
  useGetDesignationQuery,
  useMyTransactionsQuery,
} from "@/store/global-store/global.query";
import { useLogoutMutation } from "@/app/login/store/login.query";
import { useAuthToken } from "@/hooks/useAuthToken";
import { navigateSource } from "@/lib/action";
import Swal from "sweetalert2";
import { formaterDate } from "@/utils/formateDate"; // Reusing formaterDate function
import Pagination from "./Pagination"; // Existing Pagination Component

const CreditEarned = () => {
  const router = useRouter();
  const { user, refetch } = useLoggedInUser();
  const { removeToken } = useAuthToken();
  const { data: designationData } = useGetDesignationQuery(); // Fetch designation data
  const { data: transactionData } = useMyTransactionsQuery(); // Fetch transactions data from API
  const [logout] = useLogoutMutation();
  const [designationOptions, setDesignationOptions] = useState<any[]>([]);
  const [designationLabel, setDesignationLabel] = useState<string>("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Number of items per page

  // Calculate pagination data
  const totalItems = transactionData?.data?.user_points?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Paginated transactions
  const paginatedTransactions = transactionData?.data?.user_points?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  // Handle page change in the pagination component
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
                    <div className="candidate-info company-info">
                      <div className="candidate-detail text-center">
                        <div className="canditate-des">
                          <Link href={"#"}>
                            <Image
                              src={`http://thinkdream.in/hirelab/public/images/${user?.user?.image}`}
                              alt="Company Logo"
                              width={300}
                              height={300}
                            />
                          </Link>
                        </div>
                        <div className="candidate-title">
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
                      <ul>
                        <li>
                          <Link href="/manage-job">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <span>Dashboard</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/job-poster">
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Profile</span>
                          </Link>
                        </li>

                        <li>
                          <Link href="/post-job">
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            <span>Post A job</span>
                          </Link>
                        </li>

                        <li>
                          <Link className="active" href="/credit-earned">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <span>Credit Earned</span>
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
                        CREDIT EARNED
                      </h5>
                      <div className="float-right">
                        <button
                          onClick={() => router.back()}
                          className="site-button right-arrow button-sm float-right"
                          style={{ fontFamily: "__Inter_Fallback_aaf875" }}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3>
                        Wallet{" "}
                        <span style={{ color: "blue" }}>
                          {transactionData?.data?.user_points.length || 0}{" "}
                          Credits
                        </span>
                      </h3>
                      <h6>
                        Your Remainning credit {" "}
                        <span style={{ color: "blue" }}>
                          {user?.user?.membership?.credit || 0}{" "}
                          Credits
                        </span>
                      </h6>
                    </div>
                    <table className="table-job-bx cv-manager company-manage-job">
                      <thead>
                        <tr>
                          <th className="feature">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                id="check12"
                                className="custom-control-input selectAllCheckBox"
                                name="example1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="check12"
                              ></label>
                            </div>
                          </th>
                          <th>Description</th>
                          <th>Credit</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedTransactions?.map((item: any) => (
                          <tr key={item.id}>
                            <td className="feature">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={`check${item.id}`}
                                  name="example1"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={`check${item.id}`}
                                ></label>
                              </div>
                            </td>
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
                              {item.type == "debit" ? "Debited" : "Credits"}
                            </td>
                            <td
                              className={`application ${
                                item?.type == "debit" 
                                  ? "text-red"
                                  : "text-primary"
                              }`}
                            >
                              {item.type == "debit"? "Debited" : "Credited"}
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

export default CreditEarned;
