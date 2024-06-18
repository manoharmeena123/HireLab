'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Profilesidebar from "../Profilesidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from 'react'

const JobSeeker = () => {
	const router = useRouter();
	const { data: session, status } = useSession();

	useEffect(() => {
		// Redirect to login page if no session exists and user is authenticated
		if (!session) {
		  router.push('/login');
		}
	  }, [session, status, router]);
	
  return (
    <>
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Profilesidebar />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx job-profile">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Basic Information
                      </h5>
                      <Link
                        href={"/"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <form>
                      <div className="row m-b30">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Your Name:</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Alexander Weir"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Email:</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Web Designer"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Mobile Number:</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="12323232342"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>College:</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="32 Year"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Current Designation:</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="write about Designation"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Current Company:</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="company"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Year Of Experience:</label>
                            <select className="form-control">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>more then 5</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Expected CTC:</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="2500$"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Resume Upload:</label>
                            <input type="file" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Location Preference(if any):</label>
                            <input
                              type="text"
                              placeholder="Banglore"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>

                      <button className="site-button m-b30">Submit Form</button>
                    </form>
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
export default JobSeeker;
