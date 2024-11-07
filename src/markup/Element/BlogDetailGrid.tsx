"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetBlogsDataQuery, useGetCategoryJobByIdMutation } from "@/store/global-store/global.query";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import { blogformatDate, truncateText } from "@/utils/formateDate";
import Loading from "@/components/Loading";
import parse from "html-react-parser";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "@/markup/Element/Pagination"; // Import the Pagination component
var bnr = require("./../../images/banner/bnr1.jpg");

const BlogDetailGrid = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const queryId = searchParams.get("query");
  const [getCategoryJobById, { data: getCategoryJobsData, isLoading }] = useGetCategoryJobByIdMutation();
  const { data: blogsData, error, isLoading: blogsDataLoading } = useGetBlogsDataQuery("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Adjust items per page as desired

  useEffect(() => {
    if (queryId) {
      getCategoryJobById(queryId as any);
    }
  }, [getCategoryJobById, queryId]);
  
  const viewBlogHandler = (title: string) => {
    const encodedTitle = encodeURIComponent(title).replace(/%20/g, "-");
    push(`/single-blog?query=${encodedTitle}`);
  };

  const blogsToDisplay = queryId ? getCategoryJobsData?.data : blogsData?.data;

  // Calculate pagination details
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = blogsToDisplay?.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = blogsToDisplay?.length || 0;

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {(blogsDataLoading || isLoading) && <Loading />}
      <div className="page-content bg-white">
        <div
          className="dez-bnr-inr overlay-black-middle"
          style={{ backgroundImage: "url(" + bnr.default.src + ")" }}
        >
          <div className="container">
            <div className="dez-bnr-inr-entry">
              <h1 className="text-white">Blog Detailed Grid</h1>
              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link href={"/"}>Home</Link>
                  </li>
                  <li>Blog Detailed Grid</li>
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
                  className="post card-container col-lg-4 col-md-6 col-sm-6"
                  key={index}
                >
                  <div className="blog-post blog-grid blog-style-1">
                    <div className="dez-post-media dez-img-effect radius-sm">
                      <div
                        className="image-wrapper"
                        style={{ marginBottom: "-80px" }}
                        onClick={() => viewBlogHandler(item?.title)}
                      >
                        <Image
                          src={`${IMAGE_URL + item?.image}`}
                          alt={item?.title}
                          width={300}
                          height={200}
                          style={{ height: "70%" }}
                        />
                      </div>
                    </div>
                    <div className="dez-info">
                      <div className="dez-post-meta">
                        <ul className="d-flex align-items-center">
                          <li className="post-date">
                            <i className="fa fa-calendar"></i>
                            {blogformatDate(item?.created_at)}
                          </li>
                        </ul>
                      </div>
                      <div className="dez-post-title">
                        <h5
                          className="post-title font-20"
                          onClick={() => viewBlogHandler(item?.title)}
                        >
                          <Link href={"#"}>{item?.title}</Link>
                        </h5>
                      </div>
                      <div className="dez-post-text">
                        <p>{parse(truncateText(item?.description, 30))}</p>
                      </div>
                      <div className="dez-post-readmore blog-share">
                        <span
                          onClick={() => viewBlogHandler(item?.title)}
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
            {/* Dynamic Pagination */}
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .image-wrapper {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default BlogDetailGrid;
