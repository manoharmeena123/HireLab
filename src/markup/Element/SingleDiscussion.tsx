"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import bnr from "../../images/banner/bnr1.jpg";
import { blogformatDate, truncateText } from "@/utils/formateDate";
import profileIcon from "../../images/favicon.png";
import { Button, Modal } from "react-bootstrap";
import {
  useGetSingleDiscussionByTitleMutation,
  useCreateCommentMutation,
  useGetCommentForQuetionMutation,
  useDeleteCommentByIdMutation,
  useGetCommentForParentCommentMutation,
  useGetSettingsQuery,
  useUpdateDiscussionCommentMutation,
} from "@/store/global-store/global.query";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import Loading from "@/components/Loading";
import { useLoggedInUser } from "@/hooks/index";
import Sidebar from "../../markup/Element/Sidebar";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faReply } from "@fortawesome/free-solid-svg-icons"; // Import Font Awesome icons
import Swal from "sweetalert2";
import {
  showLoginSidebar as showLogin,
  showSignUpSidebar as showSignUp,
  closeSidebars as close,
} from "@/store/global-store/global.slice"; // Import actions with aliases
import { useDispatch } from 'react-redux';

const SingleBlogSection = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const { user } = useLoggedInUser();
  const router = useRouter();
  const { data: getSetting } = useGetSettingsQuery();
  const [updateDiscussionComment] = useUpdateDiscussionCommentMutation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedBlogId, setExpandedBlogId] = useState<string | null>(null);
  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState<string | null>(null);
  const [currentCommentText, setCurrentCommentText] = useState<string>("");
  const [
    getSingleDiscussionByTitle,
    { data: singleDiscussion, isLoading, isError, isSuccess, error },
  ] = useGetSingleDiscussionByTitleMutation();

  const questionId = singleDiscussion?.data?.id;
  const [
    getCommentForQuetion,
    { data: commentsData, isLoading: commentsLoading },
  ] = useGetCommentForQuetionMutation();

  // console.log('commentsData', commentsData.data[0].is_show)

  const [createComment] = useCreateCommentMutation();
  const [getCommentForParentComment] = useGetCommentForParentCommentMutation();
  const [deleteCommentById] = useDeleteCommentByIdMutation();

  useEffect(() => {
    if (questionId) {
      getCommentForQuetion(questionId);
    }
  }, [questionId, getCommentForQuetion]);

  useEffect(() => {
    if (query) {
      getSingleDiscussionByTitle(query);
    }
  }, [getSingleDiscussionByTitle, query]);

  useEffect(() => {
    if (query && replyToCommentId) {
      getCommentForParentComment({
        questionId: query,
        commentId: replyToCommentId,
      });
    }
  }, [query, replyToCommentId, getCommentForParentComment]);

  const handlePostComment = async (
    event: React.FormEvent<HTMLFormElement>,
    parentCommentId: string | null = null
  ) => {
    event.preventDefault();
    if (!user) {
      dispatch(showLogin());
    } else {
      try {
        const form = event.currentTarget;
        const formData = new FormData(event.currentTarget);
        const commentData = {
          question_id: questionId,
          body: formData.get("comment") as string,
          parent_comment_id: null,
        };
        const res = await createComment(commentData);
        toast.success(res?.data?.message, { theme: "colored" });
        // Refresh comments
        if (res?.data?.code == 200) {
          getCommentForQuetion(questionId);
          form.reset();
        }
      } catch (error: any) {
        toast.error(error?.data?.message, { theme: "colored" });
      }
    }
  };

  const handleReplyPostComment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!user) {
      dispatch(showLogin());
    } else {
      try {
        const form = event.currentTarget;
        const formData = new FormData(event.currentTarget);
        const commentData = {
          question_id: questionId,
          body: formData.get("comment") as string,
          parent_comment_id: replyToCommentId,
        };
        const res = await createComment(commentData);
        toast.success(res?.data?.message, { theme: "colored" });
        // Refresh comments
        if (res?.data?.code == 200) {
          getCommentForQuetion(questionId);
        }
        setShowReplyModal(false);
        setReplyToCommentId(null);
        getCommentForParentComment({
          questionId: questionId,
          commentId: replyToCommentId,
        });
        form.reset();
      } catch (error: any) {
        toast.error(error?.data?.message, { theme: "colored" });
      }
    }
  };

  const handleReply = (commentId: string) => {
    setReplyToCommentId(commentId);
    setShowReplyModal(true);
  };

  const handleDeleteComment = async (id: any) => {
    console.log("commentId", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteCommentById(id);
          if (res?.data?.code === 200) {
            toast.success(res?.data?.message, { theme: "colored" });
            getCommentForQuetion(questionId);
          }
        } catch (error: any) {
          toast.error(error?.data?.message, { theme: "colored" });
        }
      }
    });
  };

  const handleEditComment = (commentId: string, commentText: string) => {
    // Implement edit functionality or open an edit modal
    console.log("Edit comment with ID:", commentId, commentText);
    setCurrentCommentId(commentId);
    setCurrentCommentText(commentText);
    setShowEditModal(true);
  };

  const handleUpdateComment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (currentCommentId && currentCommentText.trim() !== "") {
      try {
        const res = await updateDiscussionComment({
          question_id: questionId,
          id: currentCommentId,
          body: currentCommentText,
        });
        if (res?.data?.code === 200) {
          toast.success(res?.data?.message, { theme: "colored" });
          getCommentForQuetion(questionId);
          setShowEditModal(false);
        }
      } catch (error: any) {
        toast.error(error?.data?.message, { theme: "colored" });
      }
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

  const renderComments = (comments: any[], parentId: string | null = null) => {
    return comments
      .filter((comment) => comment.parent_id === parentId)
      .map((comment) => (
        <li key={comment.id} className="comment">
          <div className="comment-body">
            <div className="comment-author vcard">
              <Image
                className="avatar photo"
                src={
                  comment?.user?.image
                    ? `${IMAGE_URL + comment?.user?.image}`
                    : profileIcon
                }
                alt="Profile Picture"
                width={50}
                height={50}
              />
              <cite className="fn">{comment?.user?.name}</cite>{" "}
              <span className="says">says:</span>
            </div>
            <div className="dez-post-meta">
              {" "}
              <ul className="d-flex align-items-center">
                <li className="post-date">
                  {" "}
                  <i className="fa fa-calendar">{""}</i>
                  {formatDate(comment.created_at)}
                </li>
              </ul>
            </div>

            <p>{comment.body}</p>
            {user?.user && (
              <div className="reply">
                <FontAwesomeIcon
                  icon={faReply}
                  onClick={() => handleReply(comment.id)}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                />
                {comment?.user?.id == user?.user?.id && (
                  <>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() =>
                        handleEditComment(comment.id, comment?.body)
                      }
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDeleteComment(comment.id)}
                      style={{
                        cursor: "pointer",
                        marginLeft: "10px",
                        color: "red",
                      }}
                    />
                  </>
                )}
              </div>
            )}
            <ul className="children">{renderComments(comments, comment.id)}</ul>
          </div>
        </li>
      ));
  };

  const formattedQuestion = singleDiscussion?.data?.question?.replace(
    /-/g,
    " "
  );
  const truncatedDescription = truncateText(
    singleDiscussion?.data?.description || "",
    60
  );
  const description = singleDiscussion?.data?.description;
  const getSafeUrl = (url: string | null | undefined) => {
    return url || "#";
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {(isLoading || commentsLoading) && <Loading />}
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
              <div className="col-lg-12 col-md-8 m-b10">
                <div className="blog-post blog-single blog-style-1">
                  <div className="dez-post-meta">
                    <ul className="d-flex align-items-center">
                      <li className="post-date">
                        <i className="fa fa-calendar"></i>
                        {blogformatDate(new Date().toISOString())}
                      </li>
                    </ul>
                  </div>
                  <div className="dez-post-title">
                    <h4 className="post-title m-t0">{formattedQuestion}</h4>
                  </div>
                  <div className="dez-post-text">
                    <p>
                      {isExpanded
                        ? parse(description || "")
                        : parse(truncatedDescription)}
                      {description && description.split(" ").length > 60 && (
                        <span
                          onClick={toggleDescription}
                          style={{
                            color: "#2a6310",
                            padding: "0",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          {isExpanded ? " Read Less" : " Read More"}
                        </span>
                      )}
                    </p>
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

                <div className="clear" id="comment-list">
                  <div className="comments-area" id="comments">
                    {commentsData?.data[0]?.is_show == 1 && (
                      <>
                        {" "}
                        <h2 className="comments-title">Comments</h2>
                        <div className="clearfix m-b20">
                          <ol className="comment-list">
                            {commentsData?.data[0]?.comments &&
                              renderComments(commentsData?.data[0]?.comments)}
                          </ol>
                          <div className="comment-respond" id="respond">
                            <h4
                              className="comment-reply-title"
                              id="reply-title"
                            >
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
                                onClick={() =>
                                  dispatch(showLogin())
                                }
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
                                {user?.user &&
                                  !(
                                    <>
                                      <p className="comment-form-author">
                                        <label htmlFor="author">
                                          Name{" "}
                                          <span className="required">*</span>
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
                                          Email{" "}
                                          <span className="required">*</span>
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
                                    </>
                                  )}

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
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-4 col-md-5 sticky-top">
                <Sidebar />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Modal show={showReplyModal} onHide={() => setShowReplyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reply to Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="comment-form"
            method="post"
            onSubmit={handleReplyPostComment}
          >
            <p className="comment-form-comment">
              <label htmlFor="comment">Comment</label>
              <textarea
                rows={2}
                name="comment"
                placeholder="Comment"
                id="comment"
                required
              ></textarea>
            </p>
            <p className="form-submit">
              <input
                type="submit"
                value="Post Reply"
                className="submit site-button"
                id="submit"
                name="submit"
              />
            </p>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReplyModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="comment-form"
            method="post"
            onSubmit={handleUpdateComment}
          >
            <p className="comment-form-comment">
              <label htmlFor="comment">Comment</label>
              <textarea
                rows={2}
                name="comment"
                placeholder="Comment"
                id="comment"
                required
                value={currentCommentText}
                onChange={(e) => setCurrentCommentText(e.target.value)}
              ></textarea>
            </p>
            <p className="form-submit">
              <input
                type="submit"
                value="Update Comment"
                className="submit site-button"
                id="submit"
                name="submit"
              />
            </p>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SingleBlogSection;
