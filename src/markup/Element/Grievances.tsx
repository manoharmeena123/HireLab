"use client";
import React from "react";
import { useGetGrievancesQuery } from "@/store/global-store/global.query";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import Loading from "@/components/Loading";
import parse from "html-react-parser";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import styles from "@/styles/Grievances.module.css";
import Link from "next/link";

const Grievances = () => {
  const { data: grievancesData, isLoading, isError } = useGetGrievancesQuery();

  if (isError) {
    return (
      <Alert variant="danger">
        Failed to load grievances content. Please try again later.
      </Alert>
    );
  }

  const formatContent = (content: string) => {
    // Replace <p><strong> tags with <h4> for headings
    content = content.replace(
      /<p><strong>(.*?)<\/strong><\/p>/g,
      "<h4>$1</h4>"
    );
    return parse(content);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className={styles.grievances}>
        {grievancesData?.data?.image && (
          <div
            className={`dez-bnr-inr overlay-black-middle ${styles.topImage}`}
            style={{
              backgroundImage: `url(${IMAGE_URL + grievancesData.data.image})`,
            }}
          >
            <div className="container ">
              <div className="dez-bnr-inr-entry">
                <h1 className={styles.bannerTitle}>
                  {grievancesData?.data?.title}
                </h1>
                <div className="breadcrumb-row">
                  <ul className="list-inline">
                    <li>
                      <Link href={"/"}>Home</Link>
                    </li>
                    <li>{grievancesData?.data?.title}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="container py-5 bg-light">
          <Row className="justify-content-center">
            <Col md={10}>
              <Card className="border-0">
                <Card.Body className={styles.cardBody}>
                  <Card.Title
                    className={`text-center mb-4 ${styles.cardTitle}`}
                  >
                    {grievancesData?.data?.title}
                  </Card.Title>
                  <div className={`mb-4 ${styles.contentSection}`}>
                    {grievancesData?.data?.heading
                      ? formatContent(grievancesData.data.heading)
                      : null}
                  </div>
                  <div className={styles.contentSection}>
                    {grievancesData?.data?.description
                      ? formatContent(grievancesData.data.description)
                      : null}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
export default Grievances;
