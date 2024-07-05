import React from 'react';
import Sidebar from '../../markup/Element/Sidebar'
//Images
import Image  from 'next/image';
import Link from 'next/link'
var bnr = require('./../../images/banner/bnr1.jpg');

function singleBlog(){
	return(
		<>
			<div className="page-content bg-white">
				<div className="dez-bnr-inr overlay-black-middle" style={{backgroundImage:"url(" + bnr.default.src + ")" }}>
					<div className="container">
						<div className="dez-bnr-inr-entry">
							<h1 className="text-white">Blog Details</h1>	
							<div className="breadcrumb-row">
								<ul className="list-inline">
									<li><Link href={"#"}>Home</Link></li>
									<li>Blog Details</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="content-area">
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-md-7 m-b10">
								<div className="blog-post blog-single blog-style-1">
									<div className="dez-post-meta">
										<ul className="d-flex align-items-center">
											<li className="post-date"><i className="fa fa-calendar"></i>September 18, 2017</li>
											<li className="post-author"><i className="fa fa-user"></i>By <Link href={"#"}>demongo</Link> </li>
											<li className="post-comment"><i className="fa fa-comments-o"></i><Link href={"#"}>5k</Link> </li>
										</ul>
									</div>
									<div className="dez-post-title">
										<h4 className="post-title m-t0"><Link href={"/blog-details"}>Do you have a job that the average person doesnӴ even know exists?</Link></h4>
									</div>
									<div className="dez-post-media dez-img-effect zoom-slow m-t20"> 
										<Link href={"#"}><img src={require("../../images/blog/default/thum1.jpg") }  alt="" /></Link> 
									</div>
									<div className="dez-post-text">
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy 
											text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum 
											is simply dummy text of the printing and typesetting  printer a galley Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
											Lorem Ipsum has been the industry's standard text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to 
											make a type specimen  It has urvived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
											It was popularised in 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
											publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard text 
											ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen  
											It has urvived not only five centuries, but also the leap into electronic typesetting.</p>
										<blockquote>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Has been the industry's standard text ever since 
											the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimencenturies.</blockquote>
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard text 
											ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen  
											It has urvived not only five centuries, but also the leap into electronic typesetting.</p>
										<h5>Completely Responsive</h5>
										<img className="alignleft blog-side-img" src={require("./../../images/blog/grid/pic4.jpg")} alt="" />
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
											ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only                                 
											five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
											of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
											Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
											has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
											type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
											It was popularised in the 1960s with the releasefive centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
											It was popularised in the 1960s with the release</p>
										<div className="dez-divider bg-gray-dark"></div>
										<Image className="alignright blog-side-img" src={require("../../images/blog/default/thum1.jpg") } alt="" />
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
											ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only                                 
											five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
											of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
											Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
											has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
											type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
											It was popularised in the 1960s with the release</p>
									</div>
									<div className="dez-post-tags clear">
										<div className="post-tags">
											<Link href={"#"}>Child </Link> 
											<Link href={"#"}>Eduction </Link> 
											<Link href={"#"}>Money </Link> 
											<Link href={"#"}>Resturent </Link> 
										</div>
									</div>
									<div className="dez-divider bg-gray-dark op4"><i className="icon-dot c-square"></i></div>
									<div className="share-details-btn">
										<ul>
											<li><h5 className="m-a0">Share Post</h5></li>
											<li><Link href={"#"} className="site-button facebook button-sm"><i className="fa fa-facebook"></i> Facebook</Link></li>
											<li><Link href={"#"} className="site-button google-plus button-sm"><i className="fa fa-google-plus"></i> Google Plus</Link></li>
											<li><Link href={"#"} className="site-button linkedin button-sm"><i className="fa fa-linkedin"></i> Linkedin</Link></li>
											<li><Link href={"#"} className="site-button instagram button-sm"><i className="fa fa-instagram"></i> Instagram</Link></li>
											<li><Link href={"#"} className="site-button twitter button-sm"><i className="fa fa-twitter"></i> Twitter</Link></li>
											<li><Link href={"#"} className="site-button whatsapp button-sm"><i className="fa fa-whatsapp"></i> Whatsapp</Link></li>
										</ul>
									</div>
								</div>
								<div className="clear" id="comment-list">
									<div className="comments-area" id="comments">
										<h2 className="comments-title">8 Comments</h2>
										<div className="clearfix m-b20">
											
											<ol className="comment-list">
												<li className="comment">
													<div className="comment-body">
														<div className="comment-author vcard"> 
															<Image  className="avatar photo" src={require("../../images/testimonials/pic1.jpg")} alt="" /> 	<cite className="fn">Stacy poe</cite> <span className="says">says:</span> 
														</div>
														<div className="comment-meta"> <Link href={"#"}>October 6, 2015 at 7:15 am</Link> </div>
														<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neqnsectetur adipiscing elit. Nam viae neqnsectetur adipiscing elit.
															Nam vitae neque vitae sapien malesuada aliquet. </p>
														<div className="reply"> <Link href={"#"} className="comment-reply-link">Reply</Link> </div>
													</div>
													<ol className="children">
														<li className="comment odd parent">
															<div className="comment-body">
																<div className="comment-author vcard"> <Image  className="avatar photo" src={require("../../images/testimonials/pic2.jpg")} alt="" /> <cite className="fn">Stacy poe</cite> <span className="says">says:</span> </div>
																<div className="comment-meta"> <Link href={"#"}>October 6, 2015 at 7:15 am</Link> </div>
																<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. 
																	In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, 
																	ac elementum ligula blandit ac.</p>
																<div className="reply"> <Link href={"#"} className="comment-reply-link">Reply</Link> </div>
															</div>
															<ol className="children">
																<li className="comment odd parent">
																	<div className="comment-body">
																		<div className="comment-author vcard"> <Image  className="avatar photo" src={require("../../images/testimonials/pic3.jpg")} alt="" /> <cite className="fn">Stacy poe</cite> <span className="says">says:</span> </div>
																		<div className="comment-meta"> <Link href={"#"}>October 6, 2015 at 7:15 am</Link> </div>
																		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. 
																			In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, 
																			ac elementum ligula blandit ac.</p>
																		<div className="reply"> <Link href={"#"} className="comment-reply-link">Reply</Link> </div>
																	</div>
																</li>
															</ol>
															
														</li>
													</ol>
												</li>
												<li className="comment">
													<div className="comment-body">
														<div className="comment-author vcard"> 
														<Image  className="avatar photo" src={require("../../images/testimonials/pic1.jpg")} alt="" /> <cite className="fn">Stacy poe</cite> <span className="says">says:</span> </div>
														<div className="comment-meta"> <Link href={"#"}>October 6, 2015 at 7:15 am</Link> </div>
														<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. 
															In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, 
															ac elementum ligula blandit ac.</p>
														<div className="reply"> <Link href={"#"} className="comment-reply-link">Reply</Link> </div>
													</div>
												</li>
												<li className="comment">
													<div className="comment-body">
														<div className="comment-author vcard"> 
														<Image  className="avatar photo" src={require("../../images/testimonials/pic2.jpg")} alt="" /> <cite className="fn">Stacy poe</cite> <span className="says">says:</span> </div>
														<div className="comment-meta"> <Link href={"#"}>October 6, 2015 at 7:15 am</Link> </div>
														<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. 
															In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, 
															ac elementum ligula blandit ac.</p>
														<div className="reply"> <Link href={"#"} className="comment-reply-link">Reply</Link> </div>
													</div>
												</li>
												<li className="comment">
													<div className="comment-body">
														<div className="comment-author vcard"> 
														<Image  className="avatar photo" src={require("../../images/testimonials/pic3.jpg")} alt="" /> <cite className="fn">Stacy poe</cite> <span className="says">says:</span> </div>
														<div className="comment-meta"> <Link href={"#"}>October 6, 2015 at 7:15 am</Link> </div>
														<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. 
															In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, 
															ac elementum ligula blandit ac.</p>
														<div className="reply"> <Link href={"#"} className="comment-reply-link">Reply</Link> </div>
													</div>
												</li>
											</ol>
										
											<div className="comment-respond" id="respond">
												<h4 className="comment-reply-title" id="reply-title">Leave a Reply <small> <Link href={"#"} style={{display:"none"}} id="cancel-comment-reply-link" rel="nofollow">Cancel reply</Link> </small> </h4>
												<form className="comment-form" id="commentform" method="post" action="http://sedatelab.com/developer/donate/wp-comments-post.php">
													<p className="comment-form-author">
														<label htmlFor="author">Name <span className="required">*</span></label>
														<input type="text" defaultValue="Author" name="Author"  placeholder="Author" id="author" />
													</p>
													<p className="comment-form-email">
														<label htmlFor="email">Email <span className="required">*</span></label>
														<input type="text" defaultValue="email" placeholder="Email" name="email" id="email" />
													</p>
													<p className="comment-form-url">
														<label htmlFor="url">Website</label>
														<input type="text"  defaultValue="url"  placeholder="Website"  name="url" id="url" />
													</p>
													<p className="comment-form-comment">
														<label htmlFor="comment">Comment</label>
														<textarea rows="8" name="comment" placeholder="Comment" id="comment"></textarea>
													</p>
													<p className="form-submit">
														<input type="submit" defaultValue="Post Comment" className="submit site-button" id="submit" name="submit" />
													</p>
												</form>
											</div>
											
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-5 sticky-top">
								<Sidebar />
							</div>
						</div>
					</div>
				</div>
			</div>	
		</>	
	)			
}
export default singleBlog;