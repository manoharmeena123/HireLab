"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Modal } from 'react-bootstrap';
import { CustomSession } from "@/app/api/auth/[...nextauth]/authOptions";
import axios from 'axios';
import { CHECK_CREDENTIALS, IMAGE_URL, MANAGE_JOBS } from '@/lib/apiEndPoints';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { toast } from "react-toastify";
interface Job {
  job_title: string;
  job_type: string;
  location: string;
  created_at: string;
}

interface User {
  image?: string;
}

const Loading = () => <div>Loading...</div>;

const CompanyManage: React.FC = () => {
  const { data } = useSession();
  const userSession = data as CustomSession;
  const token = userSession?.user?.data?.token;

  const [company, setCompany] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsResponse = await axios.get(MANAGE_JOBS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(jobsResponse?.data?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.post(CHECK_CREDENTIALS, user, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json', 
          },
        });
        console.log('userResponse', userResponse);
        setUser(userResponse?.data?.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data. Please try again later.');
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);
  

  if (loading) {
    return <Loading />;
  }

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
                          <Image src={`${IMAGE_URL}${user?.image}`} alt="Company Logo" width={300} height={300} />
                          <div className="upload-link" title="update" data-toggle="tooltip" data-placement="right">
                            <input type="file" className="update-flie" />
                            <i className="fa fa-pencil"></i>
                          </div>
                        </div>
                        <div className="candidate-title">
                          <h4 className="m-b5">@COMPANY</h4>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <Link href='/profile'>
                            <div className="nav-link">
                              <i className="fa fa-user-o" aria-hidden="true"></i>
                              <span>Satya Profile</span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link href='/post-job'>
                            <div className="nav-link">
                              <i className="fa fa-file-text-o" aria-hidden="true"></i>
                              <span>Post A job</span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link href='/credit-earned'>
                            <div className="nav-link">
                              <i className="fa fa-heart-o" aria-hidden="true"></i>
                              <span>Credit Earned</span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link href='/manage-job'>
                            <div className="nav-link active">
                              <i className="fa fa-heart-o" aria-hidden="true"></i>
                              <span>Manage Jobs</span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link href='/change-password'>
                            <div className="nav-link">
                              <i className="fa fa-key" aria-hidden="true"></i>
                              <span>Change Password</span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link href='/'>
                            <div className="nav-link">
                              <i className="fa fa-sign-out" aria-hidden="true"></i>
                              <span>Log Out</span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx browse-job clearfix">
                    <div className="job-bx-title  clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">Manage jobs</h5>
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
                    <table className="table-job-bx cv-manager company-manage-job">
                      <thead>
                        <tr>
                          <th className="feature">
                            <div className="custom-control custom-checkbox">
                              <input type="checkbox" id="check12" className="custom-control-input selectAllCheckBox" name="example1" />
                              <label className="custom-control-label" htmlFor="check12"></label>
                            </div>
                          </th>
                          <th>Job Title</th>
                          <th>Location</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.map((job, index) => (
                          <tr key={index}>
                            <td className="feature">
                              <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id={`check${index}`} name="example1" />
                                <label className="custom-control-label" htmlFor={`check${index}`}></label>
                              </div>
                            </td>
                            <td className="job-name">
                              <div className="nav-link">
                                <span>{job.job_title}</span>
                                <ul className="job-post-info">
                                  <li><i className="fa fa-map-marker"></i> {job.location}</li>
                                  <li><i className="fa fa-bookmark-o"></i> {job.job_type}</li>
                                  <li><i className="fa fa-filter"></i> {job.location}</li>
                                </ul>
                              </div>
                            </td>
                            <td className="application text-primary">{job.location}</td>
                            <td className="expired pending">{job.created_at}</td>
                            <td className="job-links">
                              <div className="nav-link" onClick={() => setCompany(true)}>
                                <i className="fa fa-eye"></i>
                              </div>
                              <div className="nav-link">
                                <i className="ti-trash"></i>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="pagination-bx m-t30 float-right">
                      <ul className="pagination">
                        <li className="previous"><Link href="#"><div><i className="ti-arrow-left"></i> Prev</div></Link></li>
                        <li className="active"><Link href="#"><div>1</div></Link></li>
                        <li><Link href="#"><div>2</div></Link></li>
                        <li><Link href="#"><div>3</div></Link></li>
                        <li className="next"><Link href="#"><div>Next <i className="ti-arrow-right"></i></div></Link></li>
                      </ul>
                    </div>

                    <Modal show={company} onHide={() => setCompany(false)} className="modal fade modal-bx-info">
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="logo-img">
                              <img alt="" src={require("./../../images/logo/icon2.png")} />
                            </div>
                            <h5 className="modal-title">Company Name</h5>
                            <button type="button" className="close" onClick={() => setCompany(false)}>
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul>
                              <li><strong>Job Title :</strong><p> Web Developer – PHP, HTML, CSS </p></li>
                              <li><strong>Experience :</strong><p>5 Year 3 Months</p></li>
                              <li><strong>Description :</strong>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since.</p>
                              </li>
                            </ul>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setCompany(false)}>Close</button>
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

export default CompanyManage;
