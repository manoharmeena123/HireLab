"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import bnr from "../../images/banner/bnr1.jpg";
import {
  useGetSingleDiscussionByTitleMutation,
  useCreateCommentMutation,
  useGetCommentForQuetionMutation,
  useDeleteCommentByIdMutation,
  useGetCommentForParentCommentMutation
} from "@/store/global-store/global.query";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import Loading from "@/components/Loading";
import { faComment, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import { useLoggedInUser } from '@/hooks/index';

interface Comment {
  userId: string;
  comId: string;
  fullName: string;
  userProfile: string;
  text: string;
  avatarUrl: string;
  replies: Comment[];
}

const SingleDiscussion = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const { user } = useLoggedInUser();

  const [
    getSingleDiscussionByTitle,
    { data: singleDiscussion, isLoading, isError, isSuccess, error },
  ] = useGetSingleDiscussionByTitleMutation();

  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentByIdMutation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [getCommentsForQuestion, { data: commentsData }] =
    useGetCommentForQuetionMutation();
    console.log('commentsData', commentsData)

  useEffect(() => {
    if (query) {
      getSingleDiscussionByTitle(query);
    }
  }, [getSingleDiscussionByTitle, query]);

  useEffect(() => {
    if (singleDiscussion && singleDiscussion.data) {
      const questionId = singleDiscussion.data.id.toString();
      getCommentsForQuestion(questionId);
    }
  }, [singleDiscussion, getCommentsForQuestion]);

  useEffect(() => {
    if (commentsData && commentsData.data) {
      const formatComments = (comments: any[]): any[] => {
        return comments.map((comment) => ({
          userId: comment?.user?.id,
          comId: comment?.id?.toString(),
          fullName: comment?.user?.name,
          userProfile: `${IMAGE_URL + comment?.user?.image}`,
          text: comment?.body,
          avatarUrl: `${IMAGE_URL + comment?.user?.image}`,
          replies: formatComments(comment?.comments|| []), // Recursively format replies
        }));
      };
      const formattedComments = formatComments(commentsData?.data.map((item: any) => item.comments).flat());
      console.log('formattedComments', formattedComments)
      setComments(formattedComments);
    }
  }, [commentsData]);

  const handleCommentSubmit = async (data: any) => {
    const { text, comId: parentId } = data;
    const question_id = singleDiscussion?.data?.id?.toString();
    const payload = {
      question_id,
      body: text,
      parent_comment_id: parentId || null,
    };

    try {
      const res = await createComment(payload).unwrap();

      const newComment = {
        userId: user?.user.id,
        comId: res.id.toString(),
        fullName: user?.user.name,
        userProfile: `${IMAGE_URL + user?.user?.image}`,
        text: text,
        avatarUrl: `${IMAGE_URL + user?.user?.image}`,
        replies: [],
      };

      if (parentId) {
        const updatedComments = comments.map((comment) => {
          if (comment.comId === parentId) {
            return {
              ...comment,
              replies: [...comment.replies, newComment],
            };
          }
          return comment;
        });
        setComments(updatedComments);
      } else {
        setComments([...comments, newComment]);
      }
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  const handleDeleteComment = async (commentId: any) => {
    const { comIdToDelete, parentOfDeleteId } = commentId;
    console.log('commentId', commentId);
    try {
      await deleteComment(comIdToDelete).unwrap();
      const deleteReplies: any = (replies: Comment[], commentId: string) => {
        return replies
          .filter((reply) => reply.comId !== commentId)
          .map((reply) => ({
            ...reply,
            replies: deleteReplies(reply.replies, commentId),
          }));
      };

      const updatedComments = comments
        .filter((comment) => comment.comId !== commentId)
        .map((comment) => ({
          ...comment,
          replies: deleteReplies(comment.replies, commentId),
        }));

      setComments(updatedComments);
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess && singleDiscussion) {
    const { question, description } = singleDiscussion.data;
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
                  <h2>{question}</h2>
                  <p>{description}</p>
                  <div className="blog-post blog-single blog-style-1">
                    <CommentSection
                      currentUser={{
                        currentUserId: `${user?.user.id}`,
                        currentUserImg: `${IMAGE_URL + user?.user?.image}`,
                        currentUserProfile: `${IMAGE_URL + user?.user?.image}`,
                        currentUserFullName: `${user?.user.name}`,
                      }}
                      logIn={{
                        loginLink: "/login",
                        signupLink: "/signup",
                      }}
                      commentData={comments}
                      onSubmitAction={handleCommentSubmit}
                      currentData={(data: any) => {
                        console.log("current data", data);
                      }}
                      onDeleteAction={(commentId: string) =>
                        handleDeleteComment(commentId)
                      }
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
