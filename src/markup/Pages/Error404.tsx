import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';

var bnr = require('./../../images/banner/bnr1.jpg');

function Error404(){
	return(
		<div className="page-wraper">
			<Header />
			<div className="page-content">
				<div className="dez-bnr-inr overlay-black-middle" style={{backgroundImage:"url(" + bnr + ")"}}>
					<PageTitle  motherName="Home" activeName="Error 404" />
				</div>
				<div className="section-full content-inner-3 bg-white">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 col-md-12 col-sm-12 error-page text-center">
								<h2 className="dz_error text-secondry">404</h2>
								<h3>OOPS!</h3>
								<h4 className="text-primary">Page Not Found</h4>
								<Link to={"./"} className="site-button">Back To Home</Link>
							</div>
						</div>
					</div>
				</div>
			</div>	
			<Footer />
		</div>
	)
}
export default Error404;