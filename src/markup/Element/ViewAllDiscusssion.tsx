"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetDiscussionQuery } from "@/store/global-store/global.query";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import { blogformatDate, truncateText } from "@/utils/formateDate";
import Loading from "@/components/Loading";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";
import styles from '@/styles/ViewAllDiscusssion.module.css'
// Images
var bnr = require("./../../images/banner/bnr1.jpg");

const ViewAllDiscusssion = () => {
  const { push } = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Adjust this number as needed

  const viewBlogHandler = (title: string) => {
    const encodedTitle = encodeURIComponent(title).replace(/%20/g, "-");
    push(`/single-discussion?query=${encodedTitle}`);
  };

  const { data: discussionData, isLoading: discussionLoading } = useGetDiscussionQuery();
  const blogsToDisplay = discussionData?.data;

  // Calculate the displayed items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = blogsToDisplay?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {discussionLoading && <Loading />}
      <div className="page-content bg-white">
        <div
          className="dez-bnr-inr overlay-black-middle"
          style={{ backgroundImage: "url(" + bnr.default.src + ")" }}
        >
          <div className="container">
            <div className="dez-bnr-inr-entry">
              <h1 className="text-white">Discussion Grid</h1>
              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link href={"/"}>Home</Link>
                  </li>
                  <li>Discussion Grid</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="content-area">
          <div className="container">
            <div className="dez-blog-grid-3 row" id="masonry">
              {currentBlogs?.map((item: any, index: number) => (
                <div
                  className={`post col-lg-4 col-md-6 col-sm-6 ${styles.cardContainer}`}
                  key={index}
                >
                  <div className={styles.sectionContainer}>
                    <div className="dez-info">
                      <div className="dez-post-meta">
                        <ul className="d-flex align-items-center">
                          <li className="post-date">
                            <i className="fa fa-calendar"></i>
                            {blogformatDate(item?.created_at)}{" "}
                          </li>
                        </ul>
                      </div>
                      <div className="dez-post-title">
                        <h5
                          className="post-title font-20"
                          onClick={() => viewBlogHandler(item?.question)}
                        >
                          <Link href={"#"}>{item?.question.replace(/-/g, " ")}</Link>
                        </h5>
                      </div>
                      <div className="dez-post-text">
                        <p>{parse(truncateText(item?.description, 15))}</p>
                      </div>
                      <div className="dez-post-readmore blog-share">
                        <span
                          onClick={() => viewBlogHandler(item?.question)}
                          style={{
                            color: "#2a6310",
                            padding: "0",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          Read More
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={blogsToDisplay?.length || 0}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .image-wrapper {
          position: relative;
          width: 100%;
          height: 300px; /* Adjust the height as needed */
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default ViewAllDiscusssion;
