"use client";
import React from "react";
import Link from "next/link";
import PageTitle from "@/markup/Layout/PageTitle";
import Jobfindbox from "@/markup/Element/Jobfindbox";
import {
  useGetJobsQuery,
  useGetSectorQuery,
} from "@/store/global-store/global.query";
var bnr = require("./../../images/banner/bnr1.jpg");
import { formaterDate } from "@/utils/formateDate";
import Loading from "@/components/Loading";
import { redirect, useRouter } from "next/navigation";

const BrowseJobGrid = () => {
  const { push } = useRouter();
  const { data: getAlljobs, isLoading: getAlljobsLoading } = useGetJobsQuery();
  const {
    data: sectorData,
    isError,
    isLoading: sectorLoading,
  } = useGetSectorQuery();

  console.log("getAlljobs", getAlljobs);
  const viewJobHandler = (id: number) => {
    push(`/job-detail?jobId=${id}`);
  };
  return (
    <>
      {getAlljobsLoading || sectorLoading ? (
        <Loading />
      ) : (
        <div className="page-content bg-white">
          <div
            className="dez-bnr-inr overlay-black-middle"
            style={{ backgroundImage: "url(" + bnr + ")" }}
          >
            <PageTitle motherName="Home" activeName="Browse Job Grid" />
          </div>
          <div className="content-block">
            <Jobfindbox />
            <div className="section-full bg-white browse-job p-b50">
              <div className="container">
                <div className="job-bx-title clearfix">
                  <h5 className="font-weight-700 pull-left text-uppercase">
                    {getAlljobs?.data?.length} Jobs Found
                  </h5>
                  <div className="float-right">
                    <div className="form-group">
                      <label htmlFor="sortBy" className="select-title mr-2">
                        Sort by freshness
                      </label>
                      <select id="sortBy" className="form-control">
                        <option value="last2Months">Last 2 Months</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="lastWeeks">Last Weeks</option>
                        <option value="last3Days">Last 3 Days</option>
                      </select>
                    </div>
                  </div>
                </div>

                <ul className="post-job-bx browse-job-grid row">
                  {getAlljobs?.data?.map((item, index) => (
                    <li
                      className="col-lg-4 col-md-6"
                      key={index}
                      onClick={() => viewJobHandler(item?.id)}
                    >
                      <div className="post-bx">
                        <div className="d-flex m-b30">
                          <div className="job-post-info">
                            <h5>
                              <Link href={"/job-detail"}>
                                {" "}
                                {item?.job_title}
                              </Link>
                            </h5>
                            <ul>
                              <li>
                                <i className="fa fa-map-marker"></i>{" "}
                                {item?.address}
                              </li>
                              <li>
                                <i className="fa fa-bookmark-o"></i>{" "}
                                {item?.location?.title}
                              </li>
                              <li>
                                <i className="fa fa-clock-o"></i> Published{" "}
                                {formaterDate(item?.created_at)}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="job-time mr-auhref">
                            <Link href={"#"}>
                              <span>{item?.location?.title} </span>
                            </Link>
                          </div>
                          <div className="salary-bx">
                            <span>42000 - 55000</span>
                          </div>
                        </div>
                        <label className="like-btn">
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="pagination-bx m-t30">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default BrowseJobGrid;
