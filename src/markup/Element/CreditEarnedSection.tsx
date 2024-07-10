"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import Image from "next/image";
import { useGetDesignationQuery } from "@/store/global-store/global.query";
import { useLogoutMutation } from "@/app/login/store/login.query";
import { useAuthToken } from "@/hooks/useAuthToken";
import { navigateSource } from "@/lib/action";

const CreditEarned = () => {
  const { user, refetch } = useLoggedInUser();
  const { removeToken } = useAuthToken();
  const [company, setCompany] = useState<boolean>(false);
  const { data: designationData } = useGetDesignationQuery(); // Fetch designation data
  const [logout] = useLogoutMutation();
  const [designationOptions, setDesignationOptions] = useState<any[]>([]);
  const [designationLabel, setDesignationLabel] = useState<string>("");

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
    try {
      await logout().unwrap();
      removeToken();
      navigateSource("/");
    } catch (error) {
      console.error("Logout failed:", error);
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
                          <Link href="/job-poster">
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>{user?.user?.name} Profile</span>
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
                          <Link href="/manage-job">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <span>Manage Jobs</span>
                          </Link>
                        </li>

                        <li>
                          <Link href="/" onClick={handleLogout}>
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
                    <div className="job-bx-title  clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        CREDIT EARNED
                      </h5>
                      <div className="float-right">
                        <span className="select-title">Sort by freshness</span>
                        <select className="custom-btn">
                          <option>All</option>
                          <option>None</option>
                          <option>Read</option>
                          <option>Unread</option>
                          <option>Starred</option>
                          <option>Unstarred</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <h3>
                        Wallet{" "}
                        <span style={{ color: "blue" }}>6700 Credits</span>
                      </h3>
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
                          <th>Job Title</th>
                          <th>Credit Earned</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="feature">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="check1"
                                name="example1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="check1"
                              ></label>
                            </div>
                          </td>
                          <td className="job-name">
                            <Link href={"#"}>Social Media Expert</Link>
                            <ul className="job-post-info">
                              <li>
                                <i className="fa fa-map-marker"></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className="fa fa-bookmark-o"></i> Full Time
                              </li>
                              <li>
                                <i className="fa fa-filter"></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className="application text-primary">
                            (5) Applications
                          </td>
                          <td className="expired pending">Pending </td>
                          <td className="job-links">
                            <Link href={"#"} onClick={() => setCompany(true)}>
                              <i className="fa fa-eye"></i>
                            </Link>
                            <Link href={"#"}>
                              <i className="ti-trash"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="feature">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="check2"
                                name="example1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="check2"
                              ></label>
                            </div>
                          </td>
                          <td className="job-name">
                            <Link href={"#"}>Web Designer</Link>
                            <ul className="job-post-info">
                              <li>
                                <i className="fa fa-map-marker"></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className="fa fa-bookmark-o"></i> Full Time
                              </li>
                              <li>
                                <i className="fa fa-filter"></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className="application text-primary">
                            (8) Applications
                          </td>
                          <td className="expired text-red">Expired</td>
                          <td className="job-links">
                            <Link href={"#"} onClick={() => setCompany(true)}>
                              <i className="fa fa-eye"></i>
                            </Link>
                            <Link href={"#"}>
                              <i className="ti-trash"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="feature">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="check3"
                                name="example1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="check3"
                              ></label>
                            </div>
                          </td>
                          <td className="job-name">
                            <Link href={"#"}>Finance Accountant</Link>
                            <ul className="job-post-info">
                              <li>
                                <i className="fa fa-map-marker"></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className="fa fa-bookmark-o"></i> Full Time
                              </li>
                              <li>
                                <i className="fa fa-filter"></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className="application text-primary">
                            (9) Applications
                          </td>
                          <td className="expired pending">Pending </td>
                          <td className="job-links">
                            <Link href={"#"} onClick={() => setCompany(true)}>
                              <i className="fa fa-eye"></i>
                            </Link>
                            <Link href={"#"}>
                              <i className="ti-trash"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="feature">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="check4"
                                name="example1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="check4"
                              ></label>
                            </div>
                          </td>
                          <td className="job-name">
                            <Link href={"#"}>Social Media Expert</Link>
                            <ul className="job-post-info">
                              <li>
                                <i className="fa fa-map-marker"></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className="fa fa-bookmark-o"></i> Full Time
                              </li>
                              <li>
                                <i className="fa fa-filter"></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className="application text-primary">
                            (7) Applications
                          </td>
                          <td className="expired success">Active </td>
                          <td className="job-links">
                            <Link href={"#"} onClick={() => setCompany(true)}>
                              <i className="fa fa-eye"></i>
                            </Link>
                            <Link href={"#"}>
                              <i className="ti-trash"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="feature">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="check5"
                                name="example1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="check5"
                              ></label>
                            </div>
                          </td>
                          <td className="job-name">
                            <Link href={"#"}>Web Designer</Link>
                            <ul className="job-post-info">
                              <li>
                                <i className="fa fa-map-marker"></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className="fa fa-bookmark-o"></i> Full Time
                              </li>
                              <li>
                                <i className="fa fa-filter"></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className="application text-primary">
                            (6) Applications
                          </td>
                          <td className="expired pending">Pending </td>
                          <td className="job-links">
                            <Link href={"#"} onClick={() => setCompany(true)}>
                              <i className="fa fa-eye"></i>
                            </Link>
                            <Link href={"#"}>
                              <i className="ti-trash"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="feature">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="check6"
                                name="example1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="check6"
                              ></label>
                            </div>
                          </td>
                          <td className="job-name">
                            <Link href={"#"}>Finance Accountant</Link>
                            <ul className="job-post-info">
                              <li>
                                <i className="fa fa-map-marker"></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className="fa fa-bookmark-o"></i> Full Time
                              </li>
                              <li>
                                <i className="fa fa-filter"></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className="application text-primary">
                            (3) Applications
                          </td>
                          <td className="expired text-red">Expired</td>
                          <td className="job-links">
                            <Link href={"#"} onClick={() => setCompany(true)}>
                              <i className="fa fa-eye"></i>
                            </Link>
                            <Link href={"#"}>
                              <i className="ti-trash"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="feature">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="check7"
                                name="example1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="check7"
                              ></label>
                            </div>
                          </td>
                          <td className="job-name">
                            <Link href={"#"}>Social Media Expert</Link>
                            <ul className="job-post-info">
                              <li>
                                <i className="fa fa-map-marker"></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className="fa fa-bookmark-o"></i> Full Time
                              </li>
                              <li>
                                <i className="fa fa-filter"></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className="application text-primary">
                            (2) Applications
                          </td>
                          <td className="expired success">Active </td>
                          <td className="job-links">
                            <Link href={"#"} onClick={() => setCompany(true)}>
                              <i className="fa fa-eye"></i>
                            </Link>
                            <Link href={"#"}>
                              <i className="ti-trash"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="feature">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="check8"
                                name="example1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="check8"
                              ></label>
                            </div>
                          </td>
                          <td className="job-name">
                            <Link href={"#"}>Web Designer</Link>
                            <ul className="job-post-info">
                              <li>
                                <i className="fa fa-map-marker"></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className="fa fa-bookmark-o"></i> Full Time
                              </li>
                              <li>
                                <i className="fa fa-filter"></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className="application text-primary">
                            (4) Applications
                          </td>
                          <td className="expired success">Active </td>
                          <td className="job-links">
                            <Link href={"#"} onClick={() => setCompany(true)}>
                              <i className="fa fa-eye"></i>
                            </Link>
                            <Link href={"#"}>
                              <i className="ti-trash"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="feature">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="check9"
                                name="example1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="check9"
                              ></label>
                            </div>
                          </td>
                          <td className="job-name">
                            <Link href={"#"}>Finance Accountant</Link>
                            <ul className="job-post-info">
                              <li>
                                <i className="fa fa-map-marker"></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className="fa fa-bookmark-o"></i> Full Time
                              </li>
                              <li>
                                <i className="fa fa-filter"></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className="application text-primary">
                            (1) Applications
                          </td>
                          <td className="expired text-red">Expired</td>
                          <td className="job-links">
                            <Link href={"#"} onClick={() => setCompany(true)}>
                              <i className="fa fa-eye"></i>
                            </Link>
                            <Link href={"#"}>
                              <i className="ti-trash"></i>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="feature">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="check10"
                                name="example1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="check10"
                              ></label>
                            </div>
                          </td>
                          <td className="job-name">
                            <Link href={"#"}>Web Designer</Link>
                            <ul className="job-post-info">
                              <li>
                                <i className="fa fa-map-marker"></i> Sacramento,
                                California
                              </li>
                              <li>
                                <i className="fa fa-bookmark-o"></i> Full Time
                              </li>
                              <li>
                                <i className="fa fa-filter"></i> Web Designer
                              </li>
                            </ul>
                          </td>
                          <td className="application text-primary">
                            (1) Applications
                          </td>
                          <td className="expired success">Active </td>
                          <td className="job-links">
                            <Link href={"#"} onClick={() => setCompany(true)}>
                              <i className="fa fa-eye"></i>
                            </Link>
                            <Link href={"#"}>
                              <i className="ti-trash"></i>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="pagination-bx m-t30 float-right">
                      <ul className="pagination">
                        <li className="previous">
                          <Link href={"#"}>
                            <i className="ti-arrow-left"></i> Prev
                          </Link>
                        </li>
                        <li className="active">
                          <Link href={"#"}>1</Link>
                        </li>
                        <li>
                          <Link href={"#"}>2</Link>
                        </li>
                        <li>
                          <Link href={"#"}>3</Link>
                        </li>
                        <li className="next">
                          <Link href={"#"}>
                            Next <i className="ti-arrow-right"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <Modal
                      show={company}
                      onHide={setCompany}
                      className="modal fade modal-bx-info"
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="logo-img">
                              <img
                                alt=""
                                src={require("./../../images/logo/icon2.png")}
                              />
                            </div>
                            <h5 className="modal-title">Company Name</h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setCompany(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul>
                              <li>
                                <strong>Job Title :</strong>
                                <p> Web Developer – PHP, HTML, CSS </p>
                              </li>
                              <li>
                                <strong>Experience :</strong>
                                <p>5 Year 3 Months</p>
                              </li>
                              <li>
                                <strong>Deseription :</strong>
                                <p>
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry has been the
                                  industry's standard dummy text ever since.
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setCompany(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
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
