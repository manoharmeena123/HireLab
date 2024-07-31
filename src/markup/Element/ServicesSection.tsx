"use client";

import React from "react";
import { useGetServiceQuery } from "@/store/global-store/global.query";
import Loading from "@/components/Loading";

const ServicesSection: React.FC = () => {
  const { data: getServiceData, isLoading: getServiceLoading } = useGetServiceQuery();
  console.log('getServiceData', getServiceData);

  if (getServiceLoading) {
    return <Loading />;
  }

  return (
    <div className="services-section py-5 bg-light">
      <div className="container">
        {/* <div className="section-head text-center mb-5">
          <h2 className="font-weight-bold" style={{color:"#2a6310"}}>Our Services</h2>
        </div> */}
        <div className="row">
          <div className="col-12">
            {getServiceData?.data?.map((service: any, index: number) => (
              <div key={index}>
                <h4 className="mb-2 text-center" style={{color:"#2a6310", fontWeight:700}}>{service.title}</h4>
                <div className="list-container">
                  <ul className="list-group">
                    {service.description.replace(/<[^>]*>?/gm, '').split('.').map((item :any, i :number) => (
                      item.trim() && <li key={i}  className="service-item p-4 bg-white shadow-sm rounded mb-4">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .services-section {
          padding-top: 60px !important;
          padding-bottom: 60px !important;
        }
        .service-item {
          list-style-type: none;
          transition: transform 0.2s, box-shadow 0.2s;
          text-align: left;
        }
        .service-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .service-item h4 {
          font-size: 20px !important;
          color: #2a6310 !important;
        }
        .list-container {
          padding-left: 0;
        }
        .list-group {
          padding-left: 20px;
        }
        .list-group li {
          font-size: 16px !important;
          color: #333 !important;
          margin-bottom: 8px;
          background: none !important;
        }
        .text-center {
          text-align: center !important;
        }
      `}</style>
    </div>
  );
};

export default ServicesSection;
