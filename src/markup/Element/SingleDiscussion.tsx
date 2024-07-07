"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "../../markup/Element/Sidebar";
import Image from "next/image";
import Link from "next/link";
import bnr from "../../images/banner/bnr1.jpg";
import { useGetSingleDiscussionByTitleMutation } from "@/store/global-store/global.query";

const SingleDiscussion = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [
    getSingleDiscussionByTitle,
    { data: singleDiscussion, isLoading, isError, isSuccess, error },
  ] = useGetSingleDiscussionByTitleMutation();

  useEffect(() => {
    if (query) {
      getSingleDiscussionByTitle(query);
    }
  }, [getSingleDiscussionByTitle, query]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess && singleDiscussion) {
    const { created_at, question, description, user, likes, comments, views } =
      singleDiscussion.data;
    return (
      <>
        <div className="page-content bg-white">
          <div
            className="dez-bnr-inr overlay-black-middle"
            style={{ backgroundImage: `url(${bnr.src})` }}
          >
            <div className="container">
              <div className="dez-bnr-inr-entry">
                <h1 className="text-white">Discussion Details</h1>
                <div className="breadcrumb-row">
                  <ul className="list-inline">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>Discussion Details</li>
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
                        <li className="post-date">
                          <i className="fa fa-calendar"></i>
                          {created_at}
                        </li>
                        <li className="post-author">
                          <i className="fa fa-user"></i>
                          {user?.name}
                        </li>
                      </ul>
                    </div>
                    <div className="dez-post-title">
                      <h4 className="post-title m-t0">{question}</h4>
                    </div>
                    <div className="dez-post-media dez-img-effect zoom-slow m-t20">
                      <Image
                        src={bnr.src}
                        alt={question}
                        width={600}
                        height={400}
                      />
                    </div>
                    <div className="dez-post-text">
                      <p>{description}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="d-flex align-items-center">
                        <span className="mr-3">❤️ {likes}</span>
                        <span className="mr-3">💬 {comments}</span>
                        <span>👀 {views}</span>
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
    );
  }
  return null;
};

export default SingleDiscussion;
