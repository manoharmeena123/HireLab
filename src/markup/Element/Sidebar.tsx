"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useGetCategoryJobsQuery,
  useGetRecentBlogsQuery,
} from "@/store/global-store/global.query";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import { blogformatsDate } from "@/utils/formateDate";

const Sidebar = () => {
  const router = useRouter();
  const { data: categoryJobData } = useGetCategoryJobsQuery();
  const { data: recentBlogData } = useGetRecentBlogsQuery();

  const viewJobHandler = (id: number) => {
    router.push(`/category-jobs?query=${id}`);
  };

  const viewBlogHandler = (title: string) => {
    const encodedTitle = encodeURIComponent(title).replace(/%20/g, "-");
    router.push(`/single-blog?query=${encodedTitle}`);
  };

  return (
    <aside className="side-bar">
      <div className="widget recent-posts-entry">
        <h6 className="widget-title style-1">Recent Blogs</h6>
        <div className="widget-post-bx">
          {recentBlogData?.data?.map((item: any, index: number) => (
            <div className="widget-post clearfix" key={index}>
              <div className="dez-post-media">
                <Image
                  src={`${IMAGE_URL + item.image}`}
                  width="200"
                  height="143"
                  alt={item.title}
                />
              </div>
              <div className="dez-post-info">
                <div className="dez-post-header">
                  <h6 className="post-title" onClick={() => viewBlogHandler(item.title)}>
                    <Link href="#" >
                      {item.title}
                    </Link>
                  </h6>
                </div>
                <div className="dez-post-meta">
                  <ul className="d-flex align-items-center">
                    <li className="post-date">
                      <i className="fa fa-calendar"></i>
                      {blogformatsDate(item.created_at)}
                    </li>
                    <li className="post-comment"></li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="widget widget_archive">
        <h6 className="widget-title style-1">Categories List</h6>
        {categoryJobData?.data?.map((item: any, index: number) => (
          <ul key={index}>
            <li onClick={() => viewJobHandler(item.id)}>
              <Link href="#">{item.title}</Link>
            </li>
          </ul>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
