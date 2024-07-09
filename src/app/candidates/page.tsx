"use client"
import React from 'react';
import PageTitle from '@/markup/Layout/PageTitle';
import Link from 'next/link'
import Jobfindbox from '@/markup/Element/Jobfindbox';
import {Form} from 'react-bootstrap';
import Image from 'next/image'

var bnr = require('./../../images/banner/bnr1.jpg');
const postBox = [
	{ image: require('../../images/testimonials/pic1.jpg'), },
	{ image: require('../../images/testimonials/pic2.jpg'), },
	{ image: require('../../images/testimonials/pic3.jpg'), },
	{ image: require('../../images/testimonials/pic1.jpg'), },
	{ image: require('../../images/testimonials/pic2.jpg'), },
	{ image: require('../../images/testimonials/pic3.jpg'), },
]

function Browsecandidates(){
	return(
		<>
			<div className="page-content bg-white">
				<div className="dez-bnr-inr overlay-black-middle" style={{backgroundImage:"url(" + bnr.default.src + ")" }}>
					<PageTitle motherName="Home" activeName="Browse Candidates" />
				</div>
				<Jobfindbox />
				<div className="content-block">
					<div className="section-full bg-white browse-job p-b50">
						<div className="container">
							<div className="row">
								<div className="col-xl-9 col-lg-8">
									<div className="m-b30">
										<input type="text" className="form-control" placeholder="Search freelancer services" />
									</div>
									<ul className="post-job-bx">
										{postBox.map((item,index)=>(
											<li key={index}>
												<div className="post-bx">
													<div className="d-flex m-b30">
														<div className="job-post-company">
															<Link href= {''}><span>
																<Image src={item.image} alt="" />
															</span></Link>
														</div>
														<div className="job-post-info">
															<h4><Link href={"/job-detail"}>Digital Marketing Executive</Link></h4>
															<ul>
																<li><i className="fa fa-map-marker"></i> New York</li>
																<li><i className="fa fa-usd"></i> Full Time</li>
																<li><i className="fa fa-clock-o"></i> Published 11 months ago</li>
															</ul>
														</div> 
													</div>
													<div className="d-flex">
														<div className="job-time mr-auto">
															<Link href ={"#"} className="mr-1"><span>Javascript</span></Link>
															<Link href ={"#"} className="mr-1"><span>CSS</span></Link>
															<Link href ={"#"} className="mr-1"><span>HTML</span></Link>
															<Link href ={"#"}><span>Bootstrap</span></Link>
														</div>
														<div className="salary-bx">
															<span>$45 Per Hour</span>
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
											<li className="previous"><Link href ={'#'}><i className="ti-arrow-left"></i> Prev</Link></li>
											<li className="active"><Link href ={'#'}>1</Link></li>
											<li><Link href ={'#'}>2</Link></li>
											<li><Link href ={'#'}>3</Link></li>
											<li className="next"><Link href ={'#'}>Next <i className="ti-arrow-right"></i></Link></li>
										</ul>
									</div>
								</div>
								<div className="col-xl-3 col-lg-4">
									<div className="sticky-top browse-candidates">
										<div className="clearfix m-b30">
											<h5 className="widget-title font-weight-700 text-uppercase">Keywords</h5>
											<div>
												<input type="text" className="form-control" placeholder="Search" />
											</div>
										</div>
										<div className="clearfix m-b10">
											<h5 className="widget-title font-weight-700 m-t0 text-uppercase">Location</h5>
											<input type="text" className="form-control m-b30" placeholder="Location" />
											<div className="input-group m-b20">
												<input type="text" className="form-control" placeholder="120" />
												<Form.Control as="select"  className="btn dropdown-toggle text-left btn-default">
													<option>Km</option>
													<option>miles</option>
												</Form.Control>
											</div>
										</div>
										<div className="clearfix m-b30">
											<h5 className="widget-title font-weight-700 text-uppercase">Job type</h5>
											<div className="row">
												<div className="col-lg-6 col-md-6 col-sm-6 col-6">
													<div className="product-brand">
														<div className="custom-control custom-checkbox">
															<input type="checkbox" className="custom-control-input" id="check1" name="example1" />
															<label className="custom-control-label" htmlFor="check1">Freelance</label>
														</div>
														<div className="custom-control custom-checkbox">
															<input type="checkbox" className="custom-control-input" id="check2" name="example1" />
															<label className="custom-control-label" htmlFor="check2">Full Time</label>
														</div>
														<div className="custom-control custom-checkbox">
															<input type="checkbox" className="custom-control-input" id="check3" name="example1" />
															<label className="custom-control-label" htmlFor="check3">Internship</label>
														</div>
														<div className="custom-control custom-checkbox">
															<input type="checkbox" className="custom-control-input" id="check4" name="example1" />
															<label className="custom-control-label" htmlFor="check4">Part Time</label>
														</div>
														<div className="custom-control custom-checkbox">
															<input type="checkbox" className="custom-control-input" id="check5" name="example1" />
															<label className="custom-control-label" htmlFor="check5">Temporary</label>
														</div>
													</div>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-6 col-6">
													<div className="product-brand">
														<div className="custom-control custom-checkbox">
															<input type="checkbox" className="custom-control-input" id="check8" name="example1" />
															<label className="custom-control-label" htmlFor="check8">Internship</label>
														</div>
														<div className="custom-control custom-checkbox">
															<input type="checkbox" className="custom-control-input" id="check9" name="example1" />
															<label className="custom-control-label" htmlFor="check9">Part Time</label>
														</div>
														<div className="custom-control custom-checkbox">
															<input type="checkbox" className="custom-control-input" id="check10" name="example1" />
															<label className="custom-control-label" htmlFor="check10">Temporary</label>
														</div>
														<div className="custom-control custom-checkbox">
															<input type="checkbox" className="custom-control-input" id="check6" name="example1" />
															<label className="custom-control-label" htmlFor="check6">Freelance</label>
														</div>
														<div className="custom-control custom-checkbox">
															<input type="checkbox" className="custom-control-input" id="check7" name="example1" />
															<label className="custom-control-label" htmlFor="check7">Full Time</label>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="clearfix .browse-job">
											<h5 className="widget-title font-weight-700 text-uppercase">Category</h5>
											<Form.Control as="select" className="btn dropdown-toggle text-left btn-default">
												<option>Any Category</option>
												<option>Automotive Jobs</option>
												<option>Construction Facilities</option>
												<option>Design, Art & Multimedia</option>
												<option>Food Services</option>
											</Form.Control>
										</div>
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
export default Browsecandidates;
