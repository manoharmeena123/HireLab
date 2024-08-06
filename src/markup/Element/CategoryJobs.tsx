"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import Footer from "./../Layout/Footer";
import Jobsearchform from "./../Element/JobSearchform";
import { useGetCategoryJobByIdMutation } from "@/store/global-store/global.query";
import { useSearchParams, useRouter } from "next/navigation";
var bnr = require("@/images/banner/bnr1.jpg");

const listBox1 = [
  { image: require("@/images/logo/logo17.png"), title: "Directi Jobs" },
  {
    image: require("@/images/logo/logo18.png"),
    title: "Data Entry Jobs",
  },
  {
    image: require("@/images/logo/logo19.png"),
    title: "Philips Software Centre Jobs",
  },
  {
    image: require("@/images/logo/logo20.png"),
    title: "Foton Motors Jobs",
  },
  { image: require("@/images/logo/logo21.png"), title: "Bank Jobs" },
];
const listBox2 = [
  {
    image: require("@/images/logo/logo21.png"),
    title: "Samsung Software Jobs",
  },
  {
    image: require("@/images/logo/logo20.png"),
    title: "24/7 Customer Jobs",
  },
  {
    image: require("@/images/logo/logo19.png"),
    title: "Samsung Software Jobs",
  },
  { image: require("@/images/logo/logo18.png"), title: "Directi Jobs" },
  {
    image: require("@/images/logo/logo17.png"),
    title: "Foton Motors Jobs",
  },
];
const listBox3 = [
  { image: require("@/images/logo/logo18.png"), title: "Directi Jobs" },
  {
    image: require("@/images/logo/logo17.png"),
    title: "Data Entry Jobs",
  },
  {
    image: require("@/images/logo/logo20.png"),
    title: "Philips Software Centre Jobs",
  },
  {
    image: require("@/images/logo/logo21.png"),
    title: "24/7 Customer Jobs",
  },
  { image: require("@/images/logo/logo19.png"), title: "Bank Job" },
];
const CategoryJobs =() => {
  const searchParams = useSearchParams();
  const queryId = searchParams.get("query");
  const [getCategoryJobById, { data: getCategoryJobsData, isLoading }] = useGetCategoryJobByIdMutation();
  useEffect(() => {
    if (queryId) {
      getCategoryJobById(queryId as any);
    }
  }, [getCategoryJobById, queryId]);
  console.log('getCategoryJobsData', getCategoryJobsData)
  return (
    <>
      <div className="page-content">
        <div
          className="dez-bnr-inr jobs-category overlay-black-middle"
          style={{ backgroundImage: "url(" + bnr + ")" }}
        >
          <div className="container">
            <div className="dez-bnr-inr-entry">
              <Jobsearchform />
              <div className="category-jobs-info">
                <div className="nav">
                  <ul>
                    <li>
                      <Link href={"/category-all-jobs"}>All Jobs</Link>
                    </li>
                    <li>
                      <Link href={"/category-company-jobs"}>Jobs by Company</Link>
                    </li>
                    <li className="active">
                      <Link href={"/category-jobs"}>Jobs by Category</Link>
                    </li>
                    <li>
                      <Link href={"/category-location-jobs"}>
                        Jobs by Location
                      </Link>
                    </li>
                    <li>
                      <Link href={"/category-designations-jobs"}>
                        Jobs by Designation
                      </Link>
                    </li>
                    <li>
                      <Link href={"/category-skill-jobs"}>Jobs by Skill</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-block">
          <div className="section-full content-inner jobs-category-bx">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 m-b30">
                  <div className="job-bx bg-white">
                    <div className="job-bx-title clearfix">
                      <h6 className="text-uppercase">
                        Browse Jobs by Functional Area / Department
                        <Link
                          href={""}
                          className="float-right font-12 text-primary"
                        >
                          View All
                        </Link>
                      </h6>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-sm-12">
                        <ul className="category-list category-bx">
                          {listBox1.map((item, index) => (
                            <li key={index}>
                              <Link href={""}>
                                <div className="logo">
                                  <img src={item.image} alt="" />
                                </div>
                                <span>{item.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-lg-4 col-sm-12">
                        <ul className="category-list category-bx">
                          {listBox2.map((item, index) => (
                            <li key={index}>
                              <Link href={""}>
                                <div className="logo">
                                  <img src={item.image} alt="" />
                                </div>
                                <span>{item.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-lg-4 col-sm-12">
                        <ul className="category-list category-bx">
                          {listBox3.map((item, index) => (
                            <li key={index}>
                              <Link href={""}>
                                <div className="logo">
                                  <img src={item.image} alt="" />
                                </div>
                                <span>{item.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 m-b30">
                  <div className="job-bx bg-white">
                    <div className="job-bx-title clearfix">
                      <h6 className="text-uppercase">
                        Browse Jobs by Industry / Sector
                        <Link
                          href={""}
                          className="float-right font-12 text-primary"
                        >
                          View All
                        </Link>
                      </h6>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-sm-6">
                        <ul className="category-list">
                          <li>
                            <Link href={""}>Email Marketing</Link>
                          </li>
                          <li>
                            <Link href={""}>Lead Generation</Link>
                          </li>
                          <li>
                            <Link href={""}>Public Relations</Link>
                          </li>
                          <li>
                            <Link href={""}>Telemarketing Jobs</Link>
                          </li>
                          <li>
                            <Link href={""}>Display Advertising</Link>
                          </li>
                          <li>
                            <Link href={""}>Marketing Strategy</Link>
                          </li>
                          <li>
                            <Link href={""}>Search Engine Marketing</Link>
                          </li>
                          <li>
                            <Link href={""}>Other - Sales & Marketing</Link>
                          </li>
                          <li>
                            <Link href={""}>Display Advertising</Link>
                          </li>
                          <li>
                            <Link href={""}>Market & Customer</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <ul className="category-list">
                          <li>
                            <Link href={""}>Marketing Strategy</Link>
                          </li>
                          <li>
                            <Link href={""}>Email Marketing</Link>
                          </li>
                          <li>
                            <Link href={""}>Lead Generation</Link>
                          </li>
                          <li>
                            <Link href={""}>Public Relations</Link>
                          </li>
                          <li>
                            <Link href={""}>Telemarketing Jobs</Link>
                          </li>
                          <li>
                            <Link href={""}>Display Advertising</Link>
                          </li>
                          <li>
                            <Link href={""}>Marketing Strategy</Link>
                          </li>
                          <li>
                            <Link href={""}>Search Engine Marketing</Link>
                          </li>
                          <li>
                            <Link href={""}>Other - Sales & Marketing</Link>
                          </li>
                          <li>
                            <Link href={""}>Display Advertising</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <ul className="category-list">
                          <li>
                            <Link href={""}>Email Marketing</Link>
                          </li>
                          <li>
                            <Link href={""}>Lead Generation</Link>
                          </li>
                          <li>
                            <Link href={""}>Public Relations</Link>
                          </li>
                          <li>
                            <Link href={""}>Telemarketing Jobs</Link>
                          </li>
                          <li>
                            <Link href={""}>Display Advertising</Link>
                          </li>
                          <li>
                            <Link href={""}>Marketing Strategy</Link>
                          </li>
                          <li>
                            <Link href={""}>Search Engine Marketing</Link>
                          </li>
                          <li>
                            <Link href={""}>Other - Sales & Marketing</Link>
                          </li>
                          <li>
                            <Link href={""}>Display Advertising</Link>
                          </li>
                          <li>
                            <Link href={""}>Market & Customer</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-3 col-sm-6">
                        <ul className="category-list">
                          <li>
                            <Link href={""}>Search Engine Marketing</Link>
                          </li>
                          <li>
                            <Link href={""}>Marketing Strategy</Link>
                          </li>
                          <li>
                            <Link href={""}>Email Marketing</Link>
                          </li>
                          <li>
                            <Link href={""}>Lead Generation</Link>
                          </li>
                          <li>
                            <Link href={""}>Public Relations</Link>
                          </li>
                          <li>
                            <Link href={""}>Telemarketing Jobs</Link>
                          </li>
                          <li>
                            <Link href={""}>Display Advertising</Link>
                          </li>
                          <li>
                            <Link href={""}>Marketing Strategy</Link>
                          </li>
                          <li>
                            <Link href={""}>Search Engine Marketing</Link>
                          </li>
                          <li>
                            <Link href={""}>Other - Sales & Marketing</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CategoryJobs;
