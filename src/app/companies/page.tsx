"use client"
import React from 'react';
import PageTitle from '@/markup/Layout/PageTitle'
import Tab2 from '../../markup/Element/Tab2';
var bnr = require('./../../images/banner/bnr1.jpg');

function Companies(){
	return(
		<>
			<div className="page-content bg-white">
				<div className="dez-bnr-inr overlay-black-middle" style={{backgroundImage:"url(" + bnr.default.src + ")"}}>
					<PageTitle motherName="Home" activeName="Companies" />
				</div>
				<div className="content-block">
					<div className="section-full bg-white content-inner">
						<div className="container">
							<Tab2 />
						</div>
					</div>	
				</div>
			</div>
		</>	
	)
}
export default Companies;
