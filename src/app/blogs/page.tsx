"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageTitle from '../../markup/Layout/PageTitle';
import Sidebar from '../../markup/Element/Sidebar';
import { useGetBlogsDataQuery } from '@/store/global-store/global.query';
import { formatBlogData } from '@/utils/blogFormatter'; // Import the formatter function
import { Blog } from '@/types/blog'; // Import the Blog interface
import bnr from './../../images/banner/bnr1.jpg';

const Blogs = () => {
  const { data: blogs, error, isLoading } = useGetBlogsDataQuery('');
  console.log('blogs', blogs)
  // Format the data using formatBlogData if it exists
  const formattedBlogs: Blog[] = blogs ? formatBlogData(blogs.data) : [];

  if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="page-content bg-white">
        <div
          className="dez-bnr-inr overlay-black-middle"
          style={{ backgroundImage: `url(${bnr.src})` }}
        >
          <PageTitle motherName="Home" activeName="Blog Detailed Grid Sidebar" />
        </div>
        <div className="content-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-7 col-sm-12">
                <div id="masonry" className="dez-blog-grid-3 row">
                  {formattedBlogs.map((blog) => (
                    <div
                      className="post card-container col-lg-6 col-md-6 col-sm-6"
                      key={blog.id} // Assuming each blog has a unique ID
                    >
                      <div className="blog-post blog-grid blog-style-1">
                        <div className="dez-post-media dez-img-effect radius-sm">
                          <Link href={`/blog-details/${blog.id}`}>
                            {/* <Image src={blog?.image} alt={blog.title} /> */}
                          </Link>
                        </div>
                        <div className="dez-info">
                          <div className="dez-post-meta">
                            <ul className="d-flex align-items-center">
                              <li className="post-date">
                                <i className="fa fa-calendar"></i>
                                {new Date(blog.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </li>
                              <li className="post-comment">
                                <i className="fa fa-comments-o"></i>
                                <Link href="#">
                                  <span>{blog.description}</span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="dez-post-title">
                            <h5 className="post-title font-20">
                              <Link href={`/blog-details/${blog.id}`}>
                                {blog.title}
                              </Link>
                            </h5>
                          </div>
                          <div className="dez-post-text">
                            {/* <p>{blog.excerpt}</p> */}
                          </div>
                          <div className="dez-post-readmore blog-share">
                            <Link
                              href={`/blog-details/${blog.id}`}
                              title="READ MORE"
                              rel="bookmark"
                              className="site-button-link"
                            >
                              <span className="fw6">READ MORE</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pagination-bx clearfix text-center">
                  <ul className="pagination">
                    <li className="previous">
                      <Link href="#">
                        <i className="ti-arrow-left"></i> Prev
                      </Link>
                    </li>
                    <li className="active">
                      <Link href="#">1</Link>
                    </li>
                    <li>
                      <Link href="#">2</Link>
                    </li>
                    <li>
                      <Link href="#">3</Link>
                    </li>
                    <li className="next">
                      <Link href="#">
                        Next <i className="ti-arrow-right"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-5 col-sm-12 sticky-top">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
