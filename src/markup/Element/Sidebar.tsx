"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const widgetPost = [
  {
    image: require("../../images/blog/recent-blog/pic1.jpg"),
    title: "11 Tips to Help You Get New Clients Through Cold Calling",
  },
  {
    image: require("../../images/blog/recent-blog/pic1.jpg"),
    title:
      "Do you have a job that the average person doesn’t even know exists?",
  },
  {
    image: require("../../images/blog/recent-blog/pic1.jpg"),
    title: "Using Banner Stands To Increase Trade Show Traffic",
  },
];

const dzPost = [
  { image: require("../../images/gallery/pic2.jpg") },
  { image: require("../../images/gallery/pic1.jpg") },
  { image: require("../../images/gallery/pic5.jpg") },
  { image: require("../../images/gallery/pic7.jpg") },
  { image: require("../../images/gallery/pic8.jpg") },
  { image: require("../../images/gallery/pic9.jpg") },
];

const Sidebar = () => {
  const options = {
    settings: {
      // overlayColor: "#000000",
    },
  };
  return (
    <aside className="side-bar">
      <div className="widget recent-posts-entry">
        <h6 className="widget-title style-1">Recent Posts</h6>
        <div className="widget-post-bx">
          {widgetPost.map((item, index) => (
            <div className="widget-post clearfix" key={index}>
              <div className="dez-post-media">
                <Image src={item.image} width="200" height="143" alt="" />
              </div>
              <div className="dez-post-info">
                <div className="dez-post-header">
                  <h6 className="post-title">{item.title}</h6>
                </div>
                <div className="dez-post-meta">
                  <ul className="d-flex align-items-center">
                    <li className="post-date">
                      <i className="fa fa-calendar"></i>Sep 18, 2017
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
        <ul>
          <li>
            <Link href={"#"}>aciform</Link>
          </li>
          <li>
            <Link href={"#"}>championship</Link>
          </li>
          <li>
            <Link href={"#"}>chastening</Link>
          </li>
          <li>
            <Link href={"#"}>clerkship</Link>
          </li>
          <li>
            <Link href={"#"}>disinclination</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
