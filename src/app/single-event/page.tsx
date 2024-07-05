"use client";
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '../../markup/Element/Sidebar';
import Image from 'next/image';
import Link from 'next/link';
var bnr = require('./../../images/banner/bnr1.jpg');
import { useGetSingleEventByTitleMutation } from '@/store/global-store/global.query';

const SingleEvent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  console.log('searchParams', searchParams.get("query"));

  const [getSingleEventByTitle, { data: singleEventData, isLoading, isError, isSuccess, error }] = useGetSingleEventByTitleMutation();

  useEffect(() => {
    if (query) {
      getSingleEventByTitle(query as string);
    }
  }, [getSingleEventByTitle, query]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess && singleEventData) {
    const { date, title, description, location, time } = singleEventData.data;
    return (
      <>
        <div className="page-content bg-white">
          <div className="dez-bnr-inr overlay-black-middle" style={{ backgroundImage: `url(${bnr.default.src})` }}>
            <div className="container">
              <div className="dez-bnr-inr-entry">
                <h1 className="text-white">Event Details</h1>
                <div className="breadcrumb-row">
                  <ul className="list-inline">
                    <li><Link href="/">Home</Link></li>
                    <li>Event Details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="content-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-7 m-b10">
                  <div className="blog-post blog-single blog-style-1">
                    <div className="dez-post-meta">
                      <ul className="d-flex align-items-center">
                        <li className="post-date"><i className="fa fa-calendar"></i>{date}</li>
                        <li className="post-location"><i className="fa fa-map-marker"></i>{location}</li>
                        <li className="post-time"><i className="fa fa-clock-o"></i>{time}</li>
                      </ul>
                    </div>
                    <div className="dez-post-title">
                      <h4 className="post-title m-t0"><Link href="/event-details">{title}</Link></h4>
                    </div>
                    <div className="dez-post-media dez-img-effect zoom-slow m-t20">
                      <Link href="#"><Image src={bnr.default.src} alt={title} width={600} height={400} /></Link>
                    </div>
                    <div className="dez-post-text">
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-5 sticky-top">
                  <Sidebar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return <div>Error fetching event details: {error.message}</div>;
  }

  return null;
};

export default SingleEvent;
