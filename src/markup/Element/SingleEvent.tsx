"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "react-bootstrap";
import { useGetSingleEventByTitleMutation } from "@/store/global-store/global.query";
import { truncateText } from '@/utils/formateDate';

const SingleEvent = () => {
  const [activeButton, setActiveButton] = useState("upcoming");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [getSingleEventByTitle, { data: singleEventByTitle, isLoading, isError, isSuccess, error }] = useGetSingleEventByTitleMutation();

  useEffect(() => {
    if (query) {
      getSingleEventByTitle(query);
    }
  }, [getSingleEventByTitle, query]);

  const handleButtonClick = (buttonType: any) => {
    setActiveButton(buttonType);
  };

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const description = singleEventByTitle?.data?.description;
  const truncatedDescription = truncateText(description, 30);

  return (
    <>
      <div className="single-event-wrap bg-white">
        <div className="upcoming-past-title-wrap py-3 px-1">
          <Button
            className={activeButton === "upcoming" ? "active" : "shadow"}
            onClick={() => handleButtonClick("upcoming")}
            variant=""
          >
            Upcoming Meetups
          </Button>
          <Button
            className={activeButton === "past" ? "active" : "shadow"}
            onClick={() => handleButtonClick("past")}
            variant=""
          >
            Past Meetups
          </Button>
        </div>
        <hr />
        <div className="meetup-details-wrap py-2">
          <div className="col-md-8 d-flex flex-column gap-3 pb-4" style={{ gap: "3rem" }}>
            <div className="meetup-card shadow">
              <div className="event-chapter-title">
                <h3>{singleEventByTitle?.data?.title}</h3>
                <svg className="savesvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 13" fill="none">
                  <path d="M0.5 0H9.5V12.5L5 10L0.5 12.5V0Z" fill="#fff" stroke="#2A6310"></path>
                </svg>
              </div>
              <div>
                <div className="d-flex jd-header flex-wrap">
                  <div className="jd-loc-wrap">
                    <i className="fa fa-map-marker"></i>
                    <span>{singleEventByTitle?.data?.location}</span>
                  </div>
                  <div className="jd-loc-wrap">
                    <span>{singleEventByTitle?.data?.date}</span>
                  </div>
                  <div className="jd-loc-wrap">
                    <span>{singleEventByTitle?.data?.time} Am onwards</span>
                  </div>
                </div>
                <div className="detail-bypass-title-wrap py-3">
                  <Button variant="success">Details</Button>
                  <Button variant="success">Buy Pass</Button>
                </div>
              </div>
            </div>
            <div className="loadmore-btn justify-content-center py-3 d-flex">
              <Button variant="success">Load More</Button>
            </div>
          </div>
          <div className="col-md-4 py-2">
            <div className="pass-detail-card shadow">
              <div className="pt-4 px-4">
                <h5><strong>Pass Details</strong></h5>
              </div>
              <hr />
              <div className="event-chapter-title  px-4">
                <h3>{singleEventByTitle?.data?.title}</h3>
              </div>
              <div>
                <div className="d-flex jd-header flex-wrap pl-4">
                  <div className="jd-loc-wrap">
                    <i className="fa fa-map-marker"></i>
                    <span>{singleEventByTitle?.data?.location}</span>
                  </div>
                  <div className="jd-loc-wrap">
                    <span>{singleEventByTitle?.data?.date}</span>
                  </div>
                  <div className="jd-loc-wrap">
                    <span>{singleEventByTitle?.data?.time} Am onwards</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="pt-5 px-4">
                  <h6><strong>Details</strong></h6>
                  <p className="d-para">
                    {showFullDescription ? description : truncatedDescription}
                    <Button
                      variant="link"
                      onClick={handleToggleDescription}
                      style={{ color: "#2a6310", padding: "0", textDecoration: "underline" }}
                    >
                      {showFullDescription ? "Read Less" : "Read More"}
                    </Button>
                  </p>
                </div>
              </div>
              <div>
                <div className="pt-5 px-4">
                  <h6><strong>Amount</strong></h6>
                  <strong className="price-tag">&#8377; {singleEventByTitle?.data?.amount}</strong>
                </div>
              </div>
              <div className="detail-bypass-title-wrap justify-content-center py-3">
                <Button variant="success">Buy Pass</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleEvent;
