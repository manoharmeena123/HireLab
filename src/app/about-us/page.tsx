"use client"
import Latestblogowl from '../Owlblog2';
import Link from 'next/link'
import Image from 'next/image';
var bnr1 = require('../../images/banner/bnr1.jpg');
var bnr2 = require('../../images/background/bg4.jpg');

function Aboutus(){
	return(
		<div className="page-wraper">		
			<div className="page-content bg-white">
				<div className="dez-bnr-inr overlay-black-middle" style={{backgroundImage:"url(" + bnr1.default.src + ")"}}>
					<div className="container">
						<div className="dez-bnr-inr-entry">
							<h1 className="text-white">About Us</h1>
							<div className="breadcrumb-row">
								<ul className="list-inline">
									<li><Link href={"#"}>Home</Link></li>
									<li>About Us</li>
								</ul>
							</div>
							
						</div>
					</div>
				</div>
				<div className="content-block">
					<div className="section-full content-inner overlay-white-middle">
						<div className="container">
							<div className="row align-items-center m-b50">
								<div className="col-md-12 col-lg-6 m-b20">
									<h2 className="m-b5">About Us</h2>
									<h3 className="fw4">We create unique experiences</h3>
									<p className="m-b15">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less.</p>
									<p className="m-b15">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less.</p>
									<Link href={"#"} className="site-button">Read More</Link>
								</div>
								<div className="col-md-12 col-lg-6">
									<Image src={require('../../images/our-work/pic1.jpg')} alt=""/>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-4 col-md-4 col-sm-12 m-b30">
									<div className="icon-bx-wraper p-a30 center bg-gray radius-sm">
										<div className="icon-md text-primary m-b20"> <Link href={"#"} className="icon-cell text-primary"><i className="ti-desktop"></i></Link> </div>
										<div className="icon-content">
											<h5 className="dlab-tilte text-uppercase">Elegant / Unique design</h5>
											<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.</p>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-4 col-sm-12 m-b30">
									<div className="icon-bx-wraper p-a30 center bg-gray radius-sm">
										<div className="icon-md text-primary m-b20"> <Link href={"#"} className="icon-cell text-primary"><i className="ti-image"></i></Link> </div>
										<div className="icon-content">
											<h5 className="dlab-tilte text-uppercase">Make it Simple</h5>
											<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.</p>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-4 col-sm-12 m-b30">
									<div className="icon-bx-wraper p-a30 center bg-gray radius-sm">
										<div className="icon-md text-primary m-b20"> <Link href={"#"} className="icon-cell text-primary"><i className="ti-cup"></i></Link> </div>
										<div className="icon-content">
											<h5 className="dlab-tilte text-uppercase">Different Layout Type</h5>
											<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>						
					<div className="section-full content-inner-2 call-to-action overlay-black-dark text-white text-center bg-img-fix" style={{backgroundImage:"url(" + bnr2 + ")"}}>
						<div className="container">
							<div className="row">
								<div className="col-lg-12">
									<h2 className="m-b10">Make a Difference with Your Online Resume!</h2>
									<p className="m-b0">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
									<Link href={"/register-2"} className="site-button m-t20 outline outline-2 radius-xl">Create an Account</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="section-full content-inner-2 overlay-white-middle">
						<div className="container">
							<div className="section-head text-black text-center">
								<h2 className="text-uppercase m-b0">Our Latest Blog</h2>
								<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
							</div>
							<Latestblogowl />
						</div>
					</div>
				</div>
			</div>
		</div>	
	)
	
}
export default Aboutus;