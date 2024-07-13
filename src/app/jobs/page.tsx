"use client"
import React from 'react';
import Link from 'next/link'
import Image from 'next/image';

import JobSearchform from '@/markup/Element/JobSearchform';

var bnr = require('./../../images/banner/bnr1.jpg');

const cityBox = [
	
	{image : require("../../images/city/pic1.jpg"), title : 'Iraq',},
	{image : require("../../images/city/pic1.jpg"), title : 'Argentina',},
	{image : require("../../images/city/pic1.jpg"), title : 'Indonesia',},
	{image : require("../../images/city/pic1.jpg"), title : 'Gambia',},
	{image : require("../../images/city/pic1.jpg"), title : 'India',},
	{image : require("../../images/city/pic1.jpg"), title : 'Thailand',},
	{image : require("../../images/city/pic1.jpg"), title : 'Banjul',},
	{image : require("../../images/city/pic1.jpg"), title : 'Spain',},
] 
const companyLogo= [
	{ image: require('../../images/logo/logo1.jpg'),},
	{ image: require('../../images/logo/logo2.jpg'),},
	{ image: require('../../images/logo/logo2.jpg'),},
	{ image: require('../../images/logo/logo4.jpg'),},
	{ image: require('../../images/logo/logo5.jpg'),},
	{ image: require('../../images/logo/logo6.jpg'),},
	{ image: require('../../images/logo/logo7.jpg'),},
	{ image: require('../../images/logo/logo8.jpg'),},
	{ image: require('../../images/logo/logo9.jpg'),},
	{ image: require('../../images/logo/logo10.jpg'),},
]

function Categoryalljob(){
	return(
		<>
			
			<div className="page-content">
				<div className="dez-bnr-inr jobs-category overlay-black-middle" style={{backgroundImage:"url(" + bnr.default.src + ")"}}>
					<div className="container">
						<div className="dez-bnr-inr-entry">
							<JobSearchform />
							<div className="category-jobs-info">
								<div className="nav">
									<ul>
										<li className="active"><Link href={"/category-all-jobs"}>All Jobs</Link></li>
										<li><Link href ='/'>Jobs by Company</Link></li>
										<li><Link href ='/'>Jobs by Category</Link></li>
										<li><Link href ='/'>Jobs by Location</Link></li>
										<li><Link href ='/'>Jobs by Designation</Link></li>
										<li><Link href ='/'>Jobs by Skill</Link></li>
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
											<h6 className="text-uppercase">Browse Jobs by Locations
											<Link href ={"#"} className="float-right font-12 text-primary">View All</Link></h6>
										</div>
										<div className="row">
											{cityBox.map((item,index) => (
												<div className="col-lg-3 col-sm-6 col-md-6 m-b30" key={index}>
													<Link href ={"#"}>
														<div className="city-bx align-items-end d-flex" style={{backgroundImage: `url(${item.image.default.src})`}}>
															<div className="city-info">
																<h5>{item.title}</h5>
															</div>
														</div>
													</Link>
												</div>
											))}	
											
										</div>   
									</div>    
								</div>
								<div className="col-lg-6 m-b30">
									<div className="job-bx bg-white">
										<div className="job-bx-title clearfix">
											<h6 className="text-uppercase">Browse Jobs by Industries
											<Link href ={"#"} className="float-right font-12 text-primary">View All</Link></h6>
										</div>
										<div className="row">
											<div className="col-lg-6 col-sm-6">
												<ul className="category-list">
													<li><Link href ={"#"}>Android Jobs</Link></li>
													<li><Link href ={"#"}>WordPress Jobs</Link></li>
													<li><Link href ={"#"}>eCommerce Jobs</Link></li>
													<li><Link href ={"#"}>Design Jobs</Link></li>
													<li><Link href ={"#"}>Mobile Jobs</Link></li>
													<li><Link href ={"#"}>MySQL Jobs</Link></li>
													<li><Link href ={"#"}>SEO Jobs</Link></li>
												</ul>
											</div>    
											<div className="col-lg-6 col-sm-6">
												<ul className="category-list">
													<li><Link href ={"#"}>Website Design</Link></li>
													<li><Link href ={"#"}>Web Development</Link></li>
													<li><Link href ={"#"}>Web Design</Link></li>
													<li><Link href ={"#"}>Programming Jobs</Link></li>
													<li><Link href ={"#"}>JavaScript Jobs</Link></li>
													<li><Link href ={"#"}>Developer Jobs</Link></li>
													<li><Link href ={"#"}>Software Jobs</Link></li>
												</ul>
											</div>     
										</div>    
									</div>    
								</div>
								<div className="col-lg-6 m-b30">
									<div className="job-bx bg-white">
										<div className="job-bx-title clearfix">
											<h6 className="text-uppercase">Browse Jobs by Functional Areas
											<Link href ={"#"} className="float-right font-12 text-primary">View All</Link></h6>
										</div>
										<div className="row">
											<div className="col-lg-6 col-sm-6">
												<ul className="category-list">
													<li><Link href ={"#"}>Email Marketing</Link></li>
													<li><Link href ={"#"}>Lead Generation</Link></li>
													<li><Link href ={"#"}>Public Relations</Link></li>
													<li><Link href ={"#"}>Telemarketing Jobs</Link></li>
													<li><Link href ={"#"}>Display Advertising</Link></li>
													<li><Link href ={"#"}>Marketing Strategy</Link></li>
													<li><Link href ={"#"}>Search Engine Marketing</Link></li>
												</ul>
											</div>    
											<div className="col-lg-6 col-sm-6">
												<ul className="category-list">
													<li><Link href ={"#"}>Other - Sales & Marketing</Link></li>
													<li><Link href ={"#"}>Display Advertising</Link></li>
													<li><Link href ={"#"}>Market & Customer</Link></li>
													<li><Link href ={"#"}>Search Engine Optimization</Link></li>
													<li><Link href ={"#"}>Social Media Marketing</Link></li>
													<li><Link href ={"#"}>Search Engine Marketing</Link></li>
													<li><Link href ={"#"}>Marketing Strategy</Link></li>
												</ul>
											</div>
										</div>   
									</div>    
								</div>
								<div className="col-lg-12 m-b30">
									<div className="job-bx clearfix bg-white">
										<div className="job-bx-title clearfix">
											<h6 className="text-uppercase">Browse Jobs by Companies
											<Link href ={"#"} className="float-right font-12 text-primary">View All</Link></h6>
										</div>
										<ul className="company-logo-wg clearfix">
											{companyLogo.map((item,index)=>(
												<li className="brand-logo" key={index}>
													<Link href ={"#"}><Image src={item.image} alt="" /></Link>
												</li>
											))}
										</ul>
									</div>
								</div>
								<div className="col-lg-6 m-b30">
									<div className="job-bx bg-white">
										<div className="job-bx-title clearfix">
											<h6 className="text-uppercase">Browse Jobs by Designations
											<Link href ={"#"} className="float-right font-12 text-primary">View All</Link></h6>
										</div>
										<div className="row">
											<div className="col-lg-6 col-sm-6">
												<ul className="category-list">
													<li><Link href ={"#"}>Email Marketing</Link></li>
													<li><Link href ={"#"} >Lead Generation</Link></li>
													<li><Link href ={"#"}>Public Relations</Link></li>
													<li><Link href ={"#"}>Telemarketing Jobs</Link></li>
													<li><Link href ={"#"}>Display Advertising</Link></li>
													<li><Link href ={"#"}>Marketing Strategy</Link></li>
													<li><Link href ={"#"}>Search Engine Marketing</Link></li>
												</ul>
											</div>    
											<div className="col-lg-6 col-sm-6">
												<ul className="category-list">
													<li><Link href ={"#"}>Other - Sales & Marketing</Link></li>
													<li><Link href ={"#"}>Display Advertising</Link></li>
													<li><Link href ={"#"}>Market & Customer</Link></li>
													<li><Link href ={"#"}>Search Engine Optimization</Link></li>
													<li><Link href ={"#"}>Social Media Marketing</Link></li>
													<li><Link href ={"#"}>Search Engine Marketing</Link></li>
													<li><Link href ={"#"}>Marketing Strategy</Link></li>
												</ul>
											</div>  									
										</div>    
									</div>    
								</div>
								<div className="col-lg-6 m-b30">
									<div className="job-bx bg-white">
										<div className="job-bx-title clearfix">
											<h6 className="text-uppercase">Browse Jobs by Skills
											<Link href ={"#"} className="float-right font-12 text-primary">View All</Link></h6>
										</div>
										<div className="row">
											<div className="col-lg-6 col-sm-6">
												<ul className="category-list">
													<li><Link href ={"#"}>Android Jobs</Link></li>
													<li><Link href ={"#"}>WordPress Jobs</Link></li>
													<li><Link href ={"#"}>eCommerce Jobs</Link></li>
													<li><Link href ={"#"}>Design Jobs</Link></li>
													<li><Link href ={"#"}>Mobile Jobs</Link></li>
													<li><Link href ={"#"}>MySQL Jobs</Link></li>
													<li><Link href ={"#"}>SEO Jobs</Link></li>
												</ul>
											</div>    
											<div className="col-lg-6 col-sm-6">
												<ul className="category-list">
													<li><Link href ={"#"}>Website Design Jobs</Link></li>
													<li><Link href ={"#"}>Web Development Jobs</Link></li>
													<li><Link href ={"#"}>Web Design Jobs</Link></li>
													<li><Link href ={"#"}>Programming Jobs</Link></li>
													<li><Link href ={"#"}>JavaScript Jobs</Link></li>
													<li><Link href ={"#"}>Developer Jobs</Link></li>
													<li><Link href ={"#"}>Software Jobs</Link></li>
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
	)
}
export default Categoryalljob;