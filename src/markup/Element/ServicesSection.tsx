"use client"

import React from "react";
import { useGetServiceQuery } from "@/store/global-store/global.query";
import Loading from "@/components/Loading";

const ServicesSection: React.FC = () => {
  const { data: getServiceData, isLoading: getServiceLoading } = useGetServiceQuery();
  console.log('getServiceData', getServiceData);

  const networkingEvents = [
    "Discover local networking events and industry meetups.",
    "Connect face-to-face with professionals and employers.",
    "Participate in workshops, seminars, and panel discussions.",
    "Stay updated on career development and industry trends.",
    "Build valuable relationships in your industry.",
    "Access exclusive networking opportunities and industry insights.",
    "Join themed meetups focused on specific career interests.",
    "Register easily and get event updates directly."
  ];

  if (getServiceLoading) {
    return <Loading />;
  }

  return (
    <div className="services-section py-5 bg-light">
      <div className="container">
        <div className="section-head text-center mb-5">
          <h2 className="font-weight-bold">Our Services</h2>
        </div>
        <div className="row">
          {getServiceData?.data?.map((service: any, index: number) => (
            <div key={index} className="col-12 mb-4">
              <details className="service-item p-4 bg-white shadow-sm rounded">
                <summary className="h3 mb-2">{service.title}</summary>
                <div dangerouslySetInnerHTML={{ __html: service.description }} />
              </details>
            </div>
          ))}
        </div>
        <div className="section-head text-center mt-5 mb-5">
          <h2 className="font-weight-bold">Meetups and Networking Events</h2>
        </div>
        <div className="row">
          {networkingEvents.map((event, index) => (
            <div key={index} className="col-12 mb-4">
              <details className="networking-event-item p-4 bg-white shadow-sm rounded">
                <summary className="h4 mb-2">{event.split(".")[0]}</summary>
                <p>{event}</p>
              </details>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .service-item, .networking-event-item {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .service-item:hover, .networking-event-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        summary {
          cursor: pointer;
        }
        summary::marker {
          color: #2A6310;
        }
      `}</style>
    </div>
  );
};

export default ServicesSection;
