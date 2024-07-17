"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "../../markup/Element/Sidebar";
import Image from "next/image";
import Link from "next/link";
import bnr from "../../images/banner/bnr1.jpg";
import {
  useGetSingleDiscussionByTitleMutation,
  useCreateCommentMutation,
} from "@/store/global-store/global.query";
import Loading from "@/components/Loading";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";

const SingleDiscussion = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [
    getSingleDiscussionByTitle,
    { data: singleDiscussion, isLoading, isError, isSuccess, error },
  ] = useGetSingleDiscussionByTitleMutation();
  const data = [
    {
      userId: "02b",
      comId: "017",
      fullName: "Lily",
      userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
      text: "I think you have a point🤔",
      avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
      replies: [],
    },
  ];
  useEffect(() => {
    if (query) {
      getSingleDiscussionByTitle(query);
    }
  }, [getSingleDiscussionByTitle, query]);

  if (isLoading) {
    return <Loading />;
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
                <div className="col-lg-9 col-md-8 m-b10">
                  <h2>MBA Dual Specialization at GJIMT Mohali</h2>
                  <div className="blog-post blog-single blog-style-1">
                    <CommentSection
                      currentUser={{
                        currentUserId: "01a",
                        currentUserImg:
                          "https://ui-avatars.com/api/name=Riya&background=random",
                        currentUserProfile:
                          "https://www.linkedin.com/in/riya-negi-8879631a9/",
                        currentUserFullName: "Riya Negi",
                      }}
                      logIn={{
                        loginLink: "http://localhost:3001/",
                        signupLink: "http://localhost:3001/",
                      }}
                      commentData={data}
                      onSubmitAction={(data: {
                        userId: string;
                        comId: string;
                        avatarUrl: string;
                        userProfile?: string;
                        fullName: string;
                        text: string;
                        replies: any;
                        commentId: string;
                      }) => console.log("check submit, ", data)}
                      currentData={(data: any) => {
                        console.log("curent data", data);
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 sticky-top">
                  <div className="suggested-topics-wrap shadow p-3">
                    <div>
                      <h5>Suggested Topics</h5>
                      <hr />
                    </div>
                    <div>
                      <div className="sugg-comment-topic">
                        <h6>How To Study in the Top College</h6>
                        <div className="sugg-topic-card-detail">
                          <div className="d-flex disc-date-suggest">
                            <div className="">
                              <span className="badge-category-bg"></span>
                              <span>MBA</span>
                            </div>
                            <div>
                              <span>Oct '23</span>
                            </div>
                          </div>
                          <div className="disc-date-suggest">
                            <span>12</span>
                            <FontAwesomeIcon icon={faComment} />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="sugg-comment-topic">
                        <h6>How To Study in the Top College</h6>
                        <div className="sugg-topic-card-detail">
                          <div className="d-flex disc-date-suggest">
                            <div className="">
                              <span className="badge-category-bg"></span>
                              <span>MBA</span>
                            </div>
                            <div>
                              <span>Oct '23</span>
                            </div>
                          </div>
                          <div className="disc-date-suggest">
                            <span>12</span>
                            <FontAwesomeIcon icon={faComment} />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="sugg-comment-topic">
                        <h6>How To Study in the Top College</h6>
                        <div className="sugg-topic-card-detail">
                          <div className="d-flex disc-date-suggest">
                            <div className="">
                              <span className="badge-category-bg"></span>
                              <span>MBA</span>
                            </div>
                            <div>
                              <span>Oct '23</span>
                            </div>
                          </div>
                          <div className="disc-date-suggest">
                            <span>12</span>
                            <FontAwesomeIcon icon={faComment} />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="sugg-comment-topic">
                        <h6>How To Study in the Top College</h6>
                        <div className="sugg-topic-card-detail">
                          <div className="d-flex disc-date-suggest">
                            <div className="">
                              <span className="badge-category-bg"></span>
                              <span>MBA</span>
                            </div>
                            <div>
                              <span>Oct '23</span>
                            </div>
                          </div>
                          <div className="disc-date-suggest">
                            <span>12</span>
                            <FontAwesomeIcon icon={faComment} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-5">
                      <p className="suggested-topics-message">
                        <b>Want to read more? Browse other topics in </b>
                        <Link
                          className="badge-wrapper bullet d-inline-block"
                          href="/c/mba/373"
                        >
                          <div className="">
                            <span className="badge-category-bg"></span>
                            <span>MBA</span>
                          </div>
                        </Link>{" "}
                        or{" "}
                        <Link href="/latest" style={{ color: "blue" }}>
                          view latest topics
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
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
