"use client";
import React from "react";
import { useGetServiceQuery } from "@/store/global-store/global.query";
import Loading from "@/components/Loading";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import styles from "@/styles/ReferralTerms.module.css";
import { Alert } from "react-bootstrap";

const ServicesSection: React.FC = () => {
  const { data: getServiceData, isLoading: getServiceLoading, isError } = useGetServiceQuery();

  if (isError) {
    return (
      <Alert variant="danger">
        Failed to load services. Please try again later.
      </Alert>
    );
  }

  return (
    <>
      {getServiceLoading && <Loading />}{" "}
      <div className={styles.servicesSection}>
        {getServiceData?.data?.[0]?.image && (
          <div
            className={`dez-bnr-inr overlay-black-middle ${styles.topImage}`}
            style={{
              backgroundImage: `url(${IMAGE_URL + getServiceData.data[0].image})`,
            }}
          >
            <div className="container">
              <div className="dez-bnr-inr-entry">
                <h1 className={styles.bannerTitle}>Our Services</h1>
              </div>
            </div>
          </div>
        )}
        <div className="container py-5 bg-light">
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
      </div>
      <style jsx>{`
        .servicesSection {
          padding-top: 60px !important;
          padding-bottom: 60px !important;
        }
        .topImage {
          background-size: cover;
          background-position: center;
          padding: 100px 0;
          text-align: center;
        }
        .bannerTitle {
          color: #fff !important;
          font-size: 3rem !important;
          font-weight: 700 !important;
        }
        .service-item {
          list-style-type: disc !important; /* Ensure bullet points are displayed */
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
          list-style-position: inside; /* Ensure bullet points are inside the padding */
        }
        .list-group li {
          font-size: 16px !important;
          color: #333 !important;
          margin-bottom: 8px;
          background: none !important;
          list-style-type: disc !important; /* Ensure bullet points are displayed */
        }
        .text-center {
          text-align: center !important;
        }
        @media (max-width: 768px) {
          .bannerTitle {
            font-size: 2rem !important;
          }
          .service-item h4 {
            font-size: 18px !important;
          }
          .list-group li {
            font-size: 14px !important;
          }
        }
      `}</style>
    </>
  );
};

export default ServicesSection;
