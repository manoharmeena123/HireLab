import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useGetEventsQuery,useGetEventTextQuery } from "@/store/global-store/global.query";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";
import {
  useSaveEventMutation,
  useMyEventsQuery,
  useRemoveEventMutation,
} from "@/app/my-resume/store/resume.query";
import { toast } from "react-toastify";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { formatEventDate } from "@/utils/formateDate";
import Swal from "sweetalert2";

const UpComingMeetings = () => {
  const { push } = useRouter();
  const { data: eventsData, isLoading, isError } = useGetEventsQuery();
  const { data :eventText } =useGetEventTextQuery()
  const { user } = useLoggedInUser();
  const [saveEvent] = useSaveEventMutation();
  const { data: myEventData } = useMyEventsQuery();
  const [removeEvent] = useRemoveEventMutation();
  const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  useEffect(() => {
    if (user && myEventData?.data) {
      const savedEventIds = myEventData.data.map((event: any) => event.event_id);
      const indexes = eventsData?.data?.reduce(
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
  }, [myEventData, eventsData, user]);

  const handleIconClick = async (index: number, event: any) => {
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
          await saveEvent(payload).unwrap();
          toast.success("Event saved successfully!", { theme: "colored" });
        } catch (error) {
          toast.error("Failed to save event.", { theme: "colored" });
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
          await removeEvent(payload).unwrap();
          toast.success("Event removed successfully!", { theme: "colored" });
        } catch (error) {
          toast.error("Failed to remove event.", { theme: "colored" });
        }
      }
    }

    setClickedIndexes(updatedIndexes);
  };

  const viewJobHandler = (title: any) => {
    const encodedTitle = encodeURIComponent(title).replace(/%20/g, "-");
    push(`/single-event?query=${encodedTitle}`);
  };

  // Calculate items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = eventsData?.data?.slice(startIndex, startIndex + itemsPerPage) || [];

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="container">
        <div className="row">
          <div className="col-lg-12 section-head text-center">
            <h2 style={{ fontWeight: "600" }} className="m-b5">
              {eventText?.data?.title}
            </h2>
          </div>
        </div>
        <ul className="post-job-bx browse-job-grid row upcoming-m-wrap">
          {isLoading ? (
            <Loading />
          ) : (
            currentItems.map((event: any, index: number) => (
              <li className="col-lg-6 col-md-6" key={index}>
                <div className="post-bx">
                  <div className="d-flex">
                    <div className="job-post-info w-100">
                      <div className="d-flex justify-content-between w-100">
                        <h5 onClick={() => viewJobHandler(event?.title)}>
                          <Link href={"#"} style={{ fontWeight: "600" }}>
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
                            onClick={() => handleIconClick(index, event)}
                          >
                            <path
                              d="M0.5 0H9.5V12.5L5 10L0.5 12.5V0Z"
                              fill={
                                user && clickedIndexes.includes(index)
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
                          flexWrap: "wrap",
                        }}
                      >
                        <li className="mr-4">
                          <i
                            className="fa fa-map-marker"
                            style={{ fontSize: "large", color: "#2A6310" }}
                          ></i>
                          {event.location}
                        </li>
                        <li className="mr-4">{formatEventDate(event?.date)}</li>
                        <li className="mr-4">{event.time} onwards</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
        <div className="d-flex justify-content-center w-100">
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={eventsData?.data?.length || 0}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default UpComingMeetings;
