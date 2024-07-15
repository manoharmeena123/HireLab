import React, { useState } from "react";
import Link from "next/link";
import { useGetEventsQuery } from "@/store/global-store/global.query";
import { Event } from "@/types/blog";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

const UpComingMeetings = () => {
  const { push } = useRouter();
  const { data: eventsData, isLoading, isError } = useGetEventsQuery();

  const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);

  const handleIconClick = (index: number) => {
    const updatedIndexes = [...clickedIndexes];
    const currentIndex = updatedIndexes.indexOf(index);
    if (currentIndex === -1) {
      updatedIndexes.push(index);
    } else {
      updatedIndexes.splice(currentIndex, 1);
    }
    setClickedIndexes(updatedIndexes);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data...</p>;
  }

  const viewJobHandler = (title: any) => {
    const encodedTitle = encodeURIComponent(title).replace(/%20/g, '+');
    push(`/single-event?query=${encodedTitle}`);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 section-head text-center">
          <h2 style={{ fontWeight: "600" }} className="m-b5">
            Upcoming Meetups
          </h2>
        </div>
      </div>
      <ul className="post-job-bx browse-job-grid row">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {eventsData &&
              eventsData?.data?.map((event: Event, index: number) => (
                <li className="col-lg-6 col-md-6" key={index}>
                  <div className="post-bx">
                    <div className="d-flex">
                      <div className="job-post-info w-100">
                        <div className="d-flex justify-content-between w-100">
                          <h5 onClick={() => viewJobHandler(event?.title)}>
                            <Link
                              href={""}
                              style={{ fontWeight: "600" }}
                            >
                              {event.title}
                            </Link>
                          </h5>
                          <div className="d-flex justify-content-end">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 10 13"
                              fill="none"
                              style={{
                                fontSize: "16px",
                                fontWeight: 400,
                                marginLeft: "8px",
                                cursor: "pointer",
                                width: "20px",
                                height: "20px",
                              }}
                              onClick={() => handleIconClick(index)}
                            >
                              <path
                                d="M0.5 0H9.5V12.5L5 10L0.5 12.5V0Z"
                                fill={
                                  clickedIndexes.includes(index)
                                    ? "#2A6310"
                                    : "#fff"
                                }
                                stroke="#2A6310"
                              />
                            </svg>
                          </div>
                        </div>
                        <ul
                          style={{
                            display: "flex",
                            marginTop: "20px",
                            color: "#2A6310 !important",
                            flexWrap:'wrap'
                          }}
                        >
                          <li className="mr-4">
                            <i
                              className="fa fa-map-marker"
                              style={{ fontSize: "large", color: "#2A6310" }}
                            ></i>
                            {event.location}
                          </li>
                          <li className="mr-4">{event.date}</li>
                          <li className="mr-4">{event.time}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            {eventsData &&
              eventsData?.data?.map((event: Event, index: number) => (
                <li className="col-lg-6 col-md-6" key={index}>
                  <div className="post-bx">
                    <div className="d-flex">
                      <div className="job-post-info w-100">
                        <div className="d-flex justify-content-between w-100">
                          <h5>
                            <Link
                              href={`/single-event?query=${event.title}`}
                              style={{ fontWeight: "600" }}
                            >
                              {event.title}
                            </Link>
                          </h5>
                          <div className="d-flex justify-content-end">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 10 13"
                              fill="none"
                              style={{
                                fontSize: "16px",
                                fontWeight: 400,
                                marginLeft: "8px",
                                cursor: "pointer",
                                width: "20px",
                                height: "20px",
                              }}
                              onClick={() => handleIconClick(index)}
                            >
                              <path
                                d="M0.5 0H9.5V12.5L5 10L0.5 12.5V0Z"
                                fill={
                                  clickedIndexes.includes(index)
                                    ? "#2A6310"
                                    : "#fff"
                                }
                                stroke="#2A6310"
                              />
                            </svg>
                          </div>
                        </div>
                        <ul
                          style={{
                            display: "flex",
                            marginTop: "20px",
                            color: "#2A6310 !important",
                            flexWrap:'wrap'
                          }}
                        >
                          <li className="mr-4">
                            <i
                              className="fa fa-map-marker"
                              style={{ fontSize: "large", color: "#2A6310" }}
                            ></i>
                            {event.location}
                          </li>
                          <li className="mr-4">{event.date}</li>
                          <li className="mr-4">{event.time}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default UpComingMeetings;
