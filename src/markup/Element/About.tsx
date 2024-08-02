"use client";
import React from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useAboutUsFaqQuery } from "@/app/my-resume/store/resume.query";
import Loading from "@/components/Loading";
import parse from "html-react-parser";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import styles from "@/styles/AboutUs.module.css";
import Link from "next/link";

const Aboutus = () => {
  const { data: aboutData, isLoading, isError } = useAboutUsFaqQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Alert variant="danger">
        Failed to load about us content. Please try again later.
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
    <div className={styles.aboutus}>
      {aboutData?.data?.image && (
        <div
          className={`dez-bnr-inr overlay-black-middle ${styles.topImage}`}
          style={{
            backgroundImage: `url(${IMAGE_URL + aboutData.data.image})`,
          }}
        >
          <div className="container">
            <div className="dez-bnr-inr-entry">
              <h1 className={styles.bannerTitle}>{aboutData?.data?.title}</h1>
              <div className="breadcrumb-row">
                <ul className="list-inline">
                  <li>
                    <Link href={"/"}>Home</Link>
                  </li>
                  <li>{aboutData?.data?.title}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="py-1 bg-light">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="border-0">
              <Card.Body className={styles.cardBody}>
                <Card.Title className={`text-center mb-4 ${styles.cardTitle}`}>
                  {aboutData?.data?.title}
                </Card.Title>
                <div className={`mb-4 ${styles.contentSection}`}>
                  {aboutData?.data?.heading
                    ? formatContent(aboutData.data.heading)
                    : null}
                </div>
                <div className={styles.contentSection}>
                  {aboutData?.data?.description
                    ? formatContent(aboutData.data.description)
                    : null}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Aboutus;
