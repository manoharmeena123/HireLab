"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  useGetSingleEventByTitleMutation,
  useBuyPassForEventMutation,
} from "@/store/global-store/global.query";
import { truncateText } from "@/utils/formateDate";
import Loading from "@/components/Loading";

const SingleEvent = () => {
  const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);
  const [activeButton, setActiveButton] = useState("upcoming");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [
    getSingleEventByTitle,
    { data: singleEventByTitle, isLoading :singleEventByTitleLoading, isError, isSuccess, error },
  ] = useGetSingleEventByTitleMutation();
  const [
    buyPassForEvent,
    { isLoading: isBuying, isError: isBuyError, error: buyError },
  ] = useBuyPassForEventMutation();

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

  const handleIconClick = (index: any) => {
    const updatedIndexes = [...clickedIndexes];
    const currentIndex = updatedIndexes.indexOf(index);
    if (currentIndex === -1) {
      updatedIndexes.push(index);
    } else {
      updatedIndexes.splice(currentIndex, 1);
    }
    setClickedIndexes(updatedIndexes);
  };
  const description = singleEventByTitle?.data?.description;
  const truncatedDescription = truncateText(description, 30);

  const handleBuyPass = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to buy this pass?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2a6310",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, buy it!",
    });

    if (result.isConfirmed) {
      const event_id = singleEventByTitle?.data?.id.toString();
      const amount = singleEventByTitle?.data?.amount;

      if (event_id && amount) {
        try {
          const res = await buyPassForEvent({ event_id, amount }).unwrap();
          if (res) {
            Swal.fire("Purchased!", res?.message, "success");
          }
        } catch (error: any) {
          Swal.fire(
            "Error",
            `Failed to buy the pass: ${error?.message}`,
            "error"
          );
        }
      } else {
        Swal.fire("Error", "Event ID or amount is missing.", "error");
      }
    }
  };



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
          <div
            className="col-md-8 d-flex flex-column gap-3 pb-4"
            style={{ gap: "3rem" }}
          >
            <div className="meetup-card shadow">
              <div className="event-chapter-title">
                <h3>{singleEventByTitle?.data?.title}</h3>
                <svg
                  className="savesvg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 10 13"
                  fill="none"
                  onClick={() => handleIconClick(singleEventByTitle?.data?.id)}
                >
                  <path
                    d="M0.5 0H9.5V12.5L5 10L0.5 12.5V0Z"
                    fill={
                      clickedIndexes.includes(singleEventByTitle?.data?.id)
                        ? "#2A6310"
                        : "#fff"
                    }
                    stroke="#2A6310"
                  ></path>
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
                  <Button
                    variant="success"
                    onClick={handleBuyPass}
                    disabled={isBuying}
                  >
                    {isBuying ? "Processing..." : "Buy Pass"}
                  </Button>
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
                <h5>
                  <strong>Pass Details</strong>
                </h5>
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
                  <h6>
                    <strong>Details</strong>
                  </h6>
                  <p className="d-para">
                    {showFullDescription ? description : truncatedDescription}
                    <Button
                      variant="link"
                      onClick={handleToggleDescription}
                      style={{
                        color: "#2a6310",
                        padding: "0",
                        textDecoration: "underline",
                      }}
                    >
                      {showFullDescription ? "Read Less" : "Read More"}
                    </Button>
                  </p>
                </div>
              </div>
              <div>
                <div className="pt-5 px-4">
                  <h6>
                    <strong>Amount</strong>
                  </h6>
                  <strong className="price-tag">
                    &#8377; {singleEventByTitle?.data?.amount}
                  </strong>
                </div>
              </div>
              <div className="detail-bypass-title-wrap justify-content-center py-3">
                <Button
                  variant="success"
                  onClick={handleBuyPass}
                  disabled={isBuying}
                >
                  {isBuying ? "Processing..." : "Buy Pass"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleEvent;
