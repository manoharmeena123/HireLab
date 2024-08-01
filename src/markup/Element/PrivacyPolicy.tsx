"use client";
import React from "react";
import { usePrivacyPolicyQuery } from "@/app/my-resume/store/resume.query";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import Loading from "@/components/Loading";
import parse from "html-react-parser";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import styles from "@/styles/PrivacyPolicy.module.css";
import Link from "next/link";

const PrivacyPolicy = () => {
  const { data: privacyPolicy, isLoading, isError } = usePrivacyPolicyQuery();

  if (isError) {
    return (
      <Alert variant="danger">
        Failed to load privacy policy content. Please try again later.
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
      <div className={styles.privacyPolicy}>
        {privacyPolicy?.data?.image && (
          <div
            className={`dez-bnr-inr overlay-black-middle ${styles.topImage}`}
            style={{
              backgroundImage: `url(${IMAGE_URL + privacyPolicy.data.image})`,
            }}
          >
            <div className="container">
              <div className="dez-bnr-inr-entry">
                <h1 className={styles.bannerTitle}>
                  {privacyPolicy?.data?.title}
                </h1>
                <div className="breadcrumb-row">
                  <ul className="list-inline">
                    <li>
                      <Link href={"/"}>Home</Link>
                    </li>
                    <li>{privacyPolicy?.data?.title}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="bg-light">
          <Row className="justify-content-center">
            <Col md={10}>
              <Card className="border-0">
                <Card.Body className={styles.cardBody}>
                  <Card.Title
                    className={`text-center mb-4 ${styles.cardTitle}`}
                  >
                    {privacyPolicy?.data?.title}
                  </Card.Title>
                  <div className={`mb-4 ${styles.contentSection}`}>
                    {privacyPolicy?.data?.heading
                      ? formatContent(privacyPolicy.data.heading)
                      : null}
                  </div>
                  <div className={styles.contentSection}>
                    {privacyPolicy?.data?.description
                      ? formatContent(privacyPolicy.data.description)
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

export default PrivacyPolicy;
