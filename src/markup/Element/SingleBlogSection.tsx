"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../markup/Element/Sidebar";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetBlogsDataByIdMutation, useGetSettingsQuery } from "@/store/global-store/global.query";
import { blogformatDate, truncateText } from "@/utils/formateDate";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import Loading from "@/components/Loading";
var bnr = require("./../../images/banner/bnr1.jpg");
import profileIcon from "../../images/favicon.png";

const SingleBlogSection = () => {
  const { data: getSetting } = useGetSettingsQuery();
  const { user } = useLoggedInUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryTitle = searchParams.get("query");
  const encodedTitle = encodeURIComponent(queryTitle as any).replace(
    /%20/g,
    "+"
  );
  const [
    getBlogsDataById,
    { data: getSingleBlogData, isLoading: getSingleBlogDataLoading },
  ] = useGetBlogsDataByIdMutation();
  const [expandedBlogId, setExpandedBlogId] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (encodedTitle) {
      getBlogsDataById(encodedTitle);
    }
  }, [getBlogsDataById, encodedTitle]);

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  const handleReadMore = (blogId: string) => {
    setExpandedBlogId(blogId);
  };

  const handleReadLess = () => {
    setExpandedBlogId(null);
  };

  const handlePostComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      router.push("/login");
    } else {
      const formData = new FormData(event.currentTarget);
      const commentData = {
        id: comments.length + 1,
        name: user?.user.name,
        email: user?.user.email,
        website: user?.user?.website || "",
        comment: formData.get("comment"),
        date: new Date().toISOString(),
        image: user?.user.image,
      };
      const updatedComments = [...comments, commentData];
      setComments(updatedComments);
      localStorage.setItem("comments", JSON.stringify(updatedComments));
      event.currentTarget.reset();
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getSafeUrl = (url: string | null | undefined) => {
    return url || "#";
  };

  return (
    <>
      {getSingleBlogDataLoading && <Loading />}
      <div className="page-content bg-white">
        <div
          className="dez-bnr-inr overlay-black-middle"
          style={{ backgroundImage: "url(" + bnr.default.src + ")" }}
        >
          <div className="container">
            <div className="dez-bnr-inr-entry">
              <h1 className="text-white">Blog Details</h1>
              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link href={"/"}>Home</Link>
                  </li>
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
                {getSingleBlogData?.data?.map((item, index) => (
                  <div
                    key={index}
                    className="blog-post blog-single blog-style-1"
                  >
                    <div className="dez-post-meta">
                      <ul className="d-flex align-items-center">
                        <li className="post-date">
                          <i className="fa fa-calendar"></i>
                          {blogformatDate(item?.created_at)}
                        </li>{" "}
                        <li
                          className="post-author"
                          style={{ paddingLeft: "10px" }}
                        >
                          <i className="fa fa-user"></i>By{" "}
                          <Link href={"#"}>demongo</Link>{" "}
                        </li>
                        <li
                          className="post-comment"
                          style={{ paddingLeft: "10px" }}
                        >
                          <i className="fa fa-comments-o"></i>
                          <Link href={"#"}>5k</Link>{" "}
                        </li>
                      </ul>
                    </div>
                    <div className="dez-post-title">
                      <h4 className="post-title m-t0">
                        <Link href={"/blog-details"}>{item?.title}</Link>
                      </h4>
                    </div>
                    <div className="dez-post-media dez-img-effect zoom-slow m-t20">
                      <Link href={"#"}>
                        <Image
                          src={`${IMAGE_URL + item?.image}`}
                          objectFit="contain"
                          width={600}
                          height={400}
                          alt="Blog Image"
                        />
                      </Link>
                    </div>

                    <div className="dez-post-text">
                      <p>
                        {expandedBlogId === item.id.toString()
                          ? item?.description
                          : truncateText(item?.description, 60)}
                      </p>
                      {expandedBlogId === item.id.toString() ? (
                        <Link
                          href="#"
                          onClick={handleReadLess}
                          className="site-button-link"
                        >
                          <span className="fw6">Read Less</span>
                        </Link>
                      ) : (
                        <Link
                          href="#"
                          onClick={() => handleReadMore(item.id.toString())}
                          className="site-button-link"
                        >
                          <span className="fw6">Read More</span>
                        </Link>
                      )}
                    </div>
                    <div className="dez-post-tags clear">
                      <div className="post-tags">
                        <Link href={"#"}>Child </Link>
                        <Link href={"#"}>Eduction </Link>
                        <Link href={"#"}>Money </Link>
                        <Link href={"#"}>Resturent </Link>
                      </div>
                    </div>
                    <div className="dez-divider bg-gray-dark op4">
                      <i className="icon-dot c-square"></i>
                    </div>
                    <div className="share-details-btn">
                      <ul>
                        <li>
                          <h5 className="m-a0">Share Post</h5>
                        </li>
                        <li>
                          <Link
                            href={getSafeUrl(getSetting?.data?.facebook)}
                            className="site-button facebook button-sm"
                          >
                            <i className="fa fa-facebook"></i> Facebook
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={getSafeUrl(getSetting?.data?.twitter)}
                            className="site-button google-plus button-sm"
                          >
                            <i className="fa fa-twitter"></i> Twitter
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={getSafeUrl(getSetting?.data?.linkedin)}
                            className="site-button linkedin button-sm"
                          >
                            <i className="fa fa-linkedin"></i> Linkedin
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={getSafeUrl(getSetting?.data?.instagram)}
                            className="site-button instagram button-sm"
                          >
                            <i className="fa fa-instagram"></i> Instagram
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}

                <div className="clear" id="comment-list">
                  <div className="comments-area" id="comments">
                    <h2 className="comments-title">Comments</h2>
                    <div className="clearfix m-b20">
                      <ol className="comment-list">
                        {comments.map((comment, index) => (
                          <li key={index} className="comment">
                            <div className="comment-body">
                              <div className="comment-author vcard">
                                <Image
                                  className="avatar photo"
                                  src={
                                    comment.image
                                      ? `${IMAGE_URL + comment.image}`
                                      : profileIcon
                                  }
                                  alt="Profile Picture"
                                  width={50}
                                  height={50}
                                />
                                <cite className="fn">{comment.name}</cite>{" "}
                                <span className="says">says:</span>
                              </div>
                              <div className="comment-meta">
                                <Link href={"#"}>
                                  {formatDate(comment.date)}
                                </Link>{" "}
                              </div>
                              <p>{comment.comment}</p>
                              <div className="reply">
                                <Link href={"#"} className="comment-reply-link">
                                  Reply
                                </Link>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ol>
                      <div className="comment-respond" id="respond">
                        <h4 className="comment-reply-title" id="reply-title">
                          Leave a Reply{" "}
                          <small>
                            {" "}
                            <Link
                              href={"#"}
                              style={{ display: "none" }}
                              id="cancel-comment-reply-link"
                              rel="nofollow"
                            >
                              Cancel reply
                            </Link>{" "}
                          </small>{" "}
                        </h4>
                        {!user ? (
                          <button
                            className="site-button"
                            onClick={() => router.push("/login")}
                          >
                            Login to post comment
                          </button>
                        ) : (
                          <form
                            className="comment-form"
                            id="commentform"
                            method="post"
                            onSubmit={handlePostComment}
                          >
                            <p className="comment-form-author">
                              <label htmlFor="author">
                                Name <span className="required">*</span>
                              </label>
                              <input
                                type="text"
                                name="author"
                                placeholder="Author"
                                id="author"
                                required
                                value={user?.user.name}
                                readOnly
                              />
                            </p>
                            <p className="comment-form-email">
                              <label htmlFor="email">
                                Email <span className="required">*</span>
                              </label>
                              <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                id="email"
                                required
                                value={user?.user.email}
                                readOnly
                                style={{ padding: "7px 53px" }}
                              />
                            </p>
                            <p className="comment-form-url">
                              <label htmlFor="url">Website</label>
                              <input
                                type="url"
                                name="url"
                                placeholder="Website"
                                id="url"
                                value={user?.user?.website || ""}
                                readOnly
                                style={{ padding: "7px 53px" }}
                              />
                            </p>
                            <p className="comment-form-comment">
                              <label htmlFor="comment">Comment</label>
                              <textarea
                                rows={8}
                                name="comment"
                                placeholder="Comment"
                                id="comment"
                                required
                              ></textarea>
                            </p>
                            <p className="form-submit">
                              <input
                                type="submit"
                                value="Post Comment"
                                className="submit site-button"
                                id="submit"
                                name="submit"
                              />
                            </p>
                          </form>
                        )}
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
  );
};

export default SingleBlogSection;
