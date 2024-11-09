"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import Link from "next/link";
import {
  useGetSingleEventByTitleMutation,
  useBuyPassForEventMutation,
  useGetUpComingEventsQuery,
  useGetPastEventsQuery,
} from "@/store/global-store/global.query";
import {
  useSaveEventMutation,
  useMyEventsQuery,
  useRemoveEventMutation,
} from "@/app/my-resume/store/resume.query";
import { truncateText, formatEventDate } from "@/utils/formateDate";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { toast } from "react-toastify";
import Script from "next/script";

const SingleEvent = () => {
  const { user } = useLoggedInUser();
  const { push } = useRouter();
  const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);
  const [activeButton, setActiveButton] = useState("upcoming");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [processingEventId, setProcessingEventId] = useState<number | null>(
    null
  );
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const events = searchParams.get("event");
  console.log("events", events);

  // Detect the `events` parameter and set the active tab accordingly
  useEffect(() => {
    if (events) {
      setActiveButton(events === "upcoming" ? "upcoming" : "past");
    }
  }, [events]);

  const [removeEvent] = useRemoveEventMutation();
  const [
    getSingleEventByTitle,
    {
      data: singleEventByTitle,
      isLoading: singleEventByTitleLoading,
      isError,
      isSuccess,
      error,
    },
  ] = useGetSingleEventByTitleMutation();
  const [
    buyPassForEvent,
    { isLoading: isBuying, isError: isBuyError, error: buyError },
  ] = useBuyPassForEventMutation();
  const {
    data: upcomingEventsData,
    isLoading: isUpcomingLoading,
    isError: isUpcomingError,
  } = useGetUpComingEventsQuery();
  const {
    data: pastEventsData,
    isLoading: isPastLoading,
    isError: isPastError,
  } = useGetPastEventsQuery();
  const [saveEvent] = useSaveEventMutation();
  const { data: myEventsData, refetch } = useMyEventsQuery();

  useEffect(() => {
    // Fetch the event data when the component mounts
    if (query) {
      getSingleEventByTitle(query);
    }

    // Set the active button based on the `events` parameter
    if (events) {
      setActiveButton(events === "upcoming" ? "upcoming" : "past");
    }
  }, [getSingleEventByTitle, query, events]);

  // Update the selected event when the single event data changes
  useEffect(() => {
    if (singleEventByTitle?.data) {
      setSelectedEvent(singleEventByTitle.data);
    }
  }, [singleEventByTitle]);

  // Update the clicked indexes for saved events
  useEffect(() => {
    if (myEventsData?.data) {
      const savedEventIds = myEventsData.data.map(
        (event: any) => event.event_id
      );
      const indexes = upcomingEventsData?.data?.reduce(
        (acc: number[], event: any, index: number) => {
          if (savedEventIds.includes(event.id)) {
            acc.push(index);
          }
          return acc;
        },
        []
      );
      setClickedIndexes(indexes || []);
    }
  }, [myEventsData, upcomingEventsData]);

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
    setSelectedEvent(null); // Reset selected event when switching tabs
  };

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Handle the click on the save icon
  const handleIconClick = async (event: any, index: number) => {
    if (!user) {
      push("/login");
      return;
    }

    const updatedIndexes = [...clickedIndexes];
    const currentIndex = updatedIndexes.indexOf(index);
    const payload = {
      event_id: event?.id?.toString(),
      user_id: user?.user?.id?.toString(),
    };

    if (currentIndex === -1) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to save this event?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it!",
      });

      if (result.isConfirmed) {
        updatedIndexes.push(index);
        try {
          const res = await saveEvent(payload).unwrap();
          refetch();
          toast.success(res?.message, { theme: "colored" });
        } catch (error: any) {
          toast.error(error?.message, { theme: "colored" });
        }
      }
    } else {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to remove this event?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      });

      if (result.isConfirmed) {
        updatedIndexes.splice(currentIndex, 1);
        try {
          const res = await removeEvent(payload).unwrap();
          refetch();
          toast.success(res.message, { theme: "colored" });
        } catch (error: any) {
          toast.error(error?.message, { theme: "colored" });
        }
      }
    }

    setClickedIndexes(updatedIndexes);
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  const isEventSaved = (eventId: number) => {
    return myEventsData?.data?.some((event: any) => event.event_id === eventId);
  };

  const description = selectedEvent?.description || "";
  const truncatedDescription = truncateText(description, 30);

  const handleBuyPass = async (event: any) => {
    setSelectedEvent(event);
    setProcessingEventId(event.id);

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
      const event_id = event?.id?.toString();
      const amount = event?.amount;

      if (event_id && amount) {
        try {
          // Fetch Razorpay order details from the backend
          const response = await fetch("/api/order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: Number(amount) * 100, // Amount in paise
              currency: "INR",
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to create order. Please try again.");
          }

          const jsonResponse = await response.json();
          const { orderId } = jsonResponse;

          // Create a new Razorpay instance
          const options = {
            key: "rzp_test_6Yk0yEiSfOEYXv", // Replace with your Razorpay key
            amount: Number(amount) * 100, // Amount in paise
            currency: "INR",
            name: event?.title,
            description: "Event Pass Purchase",
            order_id: orderId, // Razorpay Order ID
            handler: async function (response: any) {
              try {
                // Capture payment directly
                const captureRes = await fetch("/api/capture", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    paymentId: response.razorpay_payment_id,
                    amount: Number(amount) * 100, // Amount in paise
                  }),
                });

                if (!captureRes.ok) {
                  throw new Error("Payment capture failed. Please try again.");
                }

                const captureData = await captureRes.json();

                if (
                  captureData.message === "Payment captured successfully" ||
                  captureData.alreadyCaptured
                ) {
                  const payload = {
                    event_id: event_id,
                    amount: captureData.data.amount,
                    id: captureData.data.id,
                    status: captureData.data.status,
                    order_id: captureData.data.order_id,
                    payment_type: captureData.data.method,
                    is_true: true,
                  };

                  await buyPassForEvent(payload).unwrap();
                  Swal.fire(
                    "Purchased!",
                    "Your pass was successfully purchased!",
                    "success"
                  );
                } else {
                  throw new Error("Payment capture failed.");
                }
              } catch (error :any) {
                // Call buyPassForEvent in failure case
                const failedPayload = {
                  event_id: event_id,
                  amount: Number(amount) * 100,
                  id: response.razorpay_payment_id,
                  status: "failed",
                  order_id: response.razorpay_order_id,
                  payment_type: "unknown",
                  is_true: false,
                };

                // Always call the API, even if payment fails
                try {
                  await buyPassForEvent(failedPayload).unwrap();
                } catch (apiError :any) {
                  Swal.fire(
                    "Error",
                    `Failed to update pass in the API: ${apiError.message}`,
                    "error"
                  );
                }

                Swal.fire("Error", `Payment failed: ${error.message}`, "error");
              }
            },
            prefill: {
              name: user?.user?.name, // User's name
              email: user?.user?.email, // User's email
            },
            theme: {
              color: "#2a6310",
            },
          };

          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        } catch (error :any) {
          Swal.fire(
            "Error",
            `Failed to initialize payment: ${error.message}`,
            "error"
          );
        }
      } else {
        Swal.fire("Error", "Event ID or amount is missing.", "error");
      }
    }
    setProcessingEventId(null);
  };

  const mapDescriptionWithIndex = (description: string) => {
    const paragraphs = description.split("</p><p>").map((para, index) => {
      return `<p>${index + 1}. ${para.replace(/<\/?p>/g, "")}</p>`;
    });
    return paragraphs.join("");
  };

  useEffect(() => {
    if (query) {
      // If a query parameter is present, fetch and set the event by title
      getSingleEventByTitle(query);
    } else if (events) {
      // If there's no query parameter, set the default event based on the events type
      if (events === "upcoming" && upcomingEventsData?.data?.length > 0) {
        setSelectedEvent(upcomingEventsData.data[0]);
      } else if (events === "past" && pastEventsData?.data?.length > 0) {
        setSelectedEvent(pastEventsData.data[0]);
      }
    }
  }, [
    getSingleEventByTitle,
    query,
    events,
    upcomingEventsData,
    pastEventsData,
  ]);

  useEffect(() => {
    // Set selectedEvent based on fetched single event when the query is used
    if (singleEventByTitle?.data) {
      setSelectedEvent(singleEventByTitle.data);
    }
  }, [singleEventByTitle]);

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      {(singleEventByTitleLoading || isUpcomingLoading || isPastLoading) && (
        <Loading />
      )}
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
        <div className="meetup-details-wrap py-2 d-flex">
          <div className="events-column col-md-8 d-flex flex-column gap-5 mb-5">
            {activeButton === "upcoming" &&
              upcomingEventsData?.data?.map((event: any, index: number) => (
                <div
                  className={`meetup-card shadow mb-3 ${
                    selectedEvent?.id === event.id ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleEventClick(event)}
                  style={{
                    padding: "1rem",
                    border:
                      selectedEvent?.id === event.id
                        ? "2px solid #2a6310"
                        : "none",
                    backgroundColor:
                      selectedEvent?.id === event.id
                        ? "#f9f9f9"
                        : "transparent",
                  }}
                >
                  <div
                    className="event-chapter-title"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3 onClick={() => handleEventClick(event)}>
                      <Link href={""} style={{ fontWeight: "600" }}>
                        {event.title}
                      </Link>
                    </h3>
                    <svg
                      className="savesvg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 10 13"
                      fill="none"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIconClick(event, index);
                      }}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    >
                      <path
                        d="M0.5 0H9.5V12.5L5 10L0.5 12.5V0Z"
                        fill={isEventSaved(event.id) ? "#2A6310" : "#fff"}
                        stroke="#2A6310"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <i className="fa fa-map-marker"></i>
                        <span>{event.location}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span>{formatEventDate(event.date)}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span>{event.time} Am onwards</span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginTop: "1rem",
                        justifyContent: "center",
                      }}
                    >
                      <Button variant="success">Details</Button>
                      <Button
                        variant="success"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyPass(event);
                        }}
                        disabled={processingEventId === event.id}
                      >
                        {processingEventId === event.id
                          ? "Processing..."
                          : "Buy Pass"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            {activeButton === "past" &&
              pastEventsData?.data?.map((event: any, index: number) => (
                <div
                  className={`meetup-card shadow mb-3 ${
                    selectedEvent?.id === event.id ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleEventClick(event)}
                  style={{
                    padding: "1rem",
                    border:
                      selectedEvent?.id === event.id
                        ? "2px solid #2a6310"
                        : "none",
                    backgroundColor:
                      selectedEvent?.id === event.id
                        ? "#f9f9f9"
                        : "transparent",
                  }}
                >
                  <div
                    className="event-chapter-title"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3 onClick={() => handleEventClick(event)}>
                      <Link href={""} style={{ fontWeight: "600" }}>
                        {event.title}
                      </Link>
                    </h3>
                    <svg
                      className="savesvg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 10 13"
                      fill="none"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIconClick(event, index);
                      }}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    >
                      <path
                        d="M0.5 0H9.5V12.5L5 10L0.5 12.5V0Z"
                        fill={isEventSaved(event.id) ? "#2A6310" : "#fff"}
                        stroke="#2A6310"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <i className="fa fa-map-marker"></i>
                        <span>{event.location}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span>{formatEventDate(event.date)}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span>{event.time} Am onwards</span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginTop: "1rem",
                        justifyContent: "center",
                      }}
                    >
                      <Button variant="success">Details</Button>
                      {/* <Button
                        variant="success"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyPass(event);
                        }}
                        disabled={
                          processingEventId === event.id ||
                          activeButton === "past"
                        }
                      >
                        {processingEventId === event.id
                          ? "Processing..."
                          : "Buy Pass"}
                      </Button> */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="col-md-4 py-2">
            {selectedEvent && (
              <div className="pass-detail-card shadow">
                <div className="pt-4 px-4">
                  <h5>
                    <strong>Pass Details</strong>
                  </h5>
                </div>
                <hr />
                <div className="event-chapter-title  px-4">
                  <h3>{selectedEvent?.title}</h3>
                </div>
                <div>
                  <div className="d-flex jd-header flex-wrap pl-4">
                    <div className="jd-loc-wrap">
                      <i className="fa fa-map-marker"></i>
                      <span>{selectedEvent?.location}</span>
                    </div>
                    <div className="jd-loc-wrap">
                      <span>{selectedEvent?.date}</span>
                    </div>
                    <div className="jd-loc-wrap">
                      <span>{selectedEvent?.time} Am onwards</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="pt-5 px-4">
                    <h6>
                      <strong>Details</strong>
                    </h6>
                    <div
                      className="d-para"
                      dangerouslySetInnerHTML={{
                        __html: showFullDescription
                          ? mapDescriptionWithIndex(description)
                          : truncatedDescription,
                      }}
                    ></div>
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
                  </div>
                </div>
                <div>
                  <div className="pt-5 px-4">
                    <h6>
                      <strong>Amount</strong>
                    </h6>
                    <strong className="price-tag">
                      &#8377; {selectedEvent?.amount}
                    </strong>
                  </div>
                </div>
                <div
                  className="detail-bypass-title-wrap justify-content-center py-3"
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "1rem",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="success"
                    onClick={() => handleBuyPass(selectedEvent)}
                    disabled={processingEventId === selectedEvent?.id}
                  >
                    {processingEventId === selectedEvent?.id
                      ? "Processing..."
                      : "Buy Pass"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleEvent;
