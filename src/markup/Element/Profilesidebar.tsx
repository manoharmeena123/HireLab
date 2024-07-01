import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
function Profilesidebar(){
return(
		<div className="col-xl-3 col-lg-4 m-b30">
			<div className="sticky-top">
				<div className="candidate-info">
					<div className="candidate-detail text-center">
						<div className="canditate-des">
							<Link href={''}>
								<Image alt="" src={require('./../../images/team/pic1.jpg')} />
							</Link>
							<div className="upload-link" title="update" data-toggle="tooltip" data-placement="right">
								<input type="file" className="update-flie" />
								<i className="fa fa-camera"></i>
							</div>
						</div>
						<div className="candidate-title">
							<div className="">
								<h4 className="m-b5"><Link to={"#"}>David Matin</Link></h4>
								<p  className="m-b0"><Link to={"#"}>Web developer</Link></p>
							</div>
						</div>
					</div>
					<ul>
						<li><Link href='profile' className="active">
							<i className="fa fa-user-o" aria-hidden="true"></i> 
							<span>Profile</span></Link></li>

						<li><Link href='my-resume'>
							<i className="fa fa-file-text-o" aria-hidden="true"></i> 
							<span>My Resume</span></Link></li>

						<li><Link href={"/jobs-saved-jobs"}>
							<i className="fa fa-heart-o" aria-hidden="true"></i> 
							<span>Saved Jobs</span></Link></li>

						<li><Link href={"/jobs-applied-job"}>
							<i className="fa fa-briefcase" aria-hidden="true"></i> 
							<span>Applied Jobs</span></Link></li>

						<li><Link href={"/jobs-alerts"}>
							<i className="fa fa-bell-o" aria-hidden="true"></i> 
							<span>Job Alerts</span></Link></li>

							<li><Link href={"/jobs-cv-manager"}>
							<i className="fa fa-id-card-o" aria-hidden="true"></i> 
							<span>CV Manager</span></Link></li>

						<li><Link href={"/jobs-change-password"}>
							<i className="fa fa-key" aria-hidden="true"></i> 
							<span>Change Password</span></Link></li>
							
						<li><Link href={"./"}>
							<i className="fa fa-sign-out" aria-hidden="true"></i> 
							<span>Log Out</span></Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
export default Profilesidebar;