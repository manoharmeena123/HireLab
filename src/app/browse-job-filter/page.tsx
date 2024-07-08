"use client"
import React from 'react';
import Link from 'next/link';

import PageTitle from '@/markup/Layout/PageTitle';
import Jobfindbox from '@/markup/Element/Jobfindbox';
import Accordsidebar from '@/markup/Element/Accordsidebar';

//Images
import logo from './../../images/logo/icon1.png';
var bnr = require('./../../images/banner/bnr1.jpg');

const postBox = [
	{ image: logo},{ image: logo},{ image: logo},
	{ image: logo},{ image: logo},{ image: logo},
]

function Browsejobfilterlist(){
	return(
		<>
			<div className="page-content bg-white">
				<div className="dez-bnr-inr overlay-black-middle" style={{backgroundImage:"url(" + bnr + ")" }}>
					<PageTitle motherName="Home" activeName="Browse Job Filter Grid" />
				</div>
				<Jobfindbox />
				<div className="content-block">
					<div className="section-full browse-job p-b50">
						<div className="container">
							<div className="row">
								<Accordsidebar />
								<div className="col-xl-9 col-lg-8 col-md-7">
									<div className="job-bx-title clearfix">
										<h5 className="font-weight-700 pull-left text-uppercase">2269 Jobs Found</h5>
										<div className="float-right">
											<span className="select-title">Sort by freshness</span>
											<select className="custom-btn">
												<option>Last 2 Months</option>
												<option>Last Months</option>
												<option>Last Weeks</option>
												<option>Last 3 Days</option>
											</select>
											<div className="float-right p-tb5 p-r10">
												<Link href={"/browse-job-filter-list"} className="p-lr5"><i className="fa fa-th-list"></i></Link>
												<Link href={"/browse-job-filter-grid"} className="p-lr5"><i className="fa fa-th"></i></Link>
											</div>
										</div>
									</div>
									<ul className="post-job-bx">
										{postBox.map((item,index)=>(
											<li key={index}>
												<div className="post-bx">
													<div className="d-flex m-b30">
														<div className="job-post-info">
															<h4><Link href={"/job-detail"}>Digital Marketing Executive</Link></h4>
															<ul>
																<li><i className="fa fa-map-marker"></i> Sacramento, California</li>
																<li><i className="fa fa-bookmark-o"></i> Full Time</li>
																<li><i className="fa fa-clock-o"></i> Published 11 months ago</li>
															</ul>
														</div>
													</div>
													<div className="d-flex">
														<div className="job-time mr-auto">
															<Link href={"#"}><span>Full Time</span></Link>
														</div>
														<div className="salary-bx">
															<span>$1200 - $ 2500</span>
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
									<div className="pagination-bx float-right m-t30">
										<ul className="pagination">
											<li className="previous"><Link href={"#"}><i className="ti-arrow-left"></i> Prev</Link></li>
											<li className="active"><Link href={"#"}>1</Link></li>
											<li><Link href={"#"}>2</Link></li>
											<li><Link href={"#"}>3</Link></li>
											<li className="next"><Link href={"#"}>Next <i className="ti-arrow-right"></i></Link></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Browsejobfilterlist;