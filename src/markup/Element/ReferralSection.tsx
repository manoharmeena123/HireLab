"use client";
import React from "react";
import { useGetReferralTermsQuery } from "@/store/global-store/global.query";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import Loading from "@/components/Loading";
import parse from "html-react-parser";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import styles from "@/styles/ReferralTerms.module.css";
import Link from "next/link";

const ReferralTerms = () => {
  const { data: referralData, isLoading, isError } = useGetReferralTermsQuery();
  console.log("referralData", referralData);

  if (isError) {
    return (
      <Alert variant="danger">
        Failed to load referral terms. Please try again later.
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
      {isLoading && <Loading />}{" "}
      <div className={styles.referralTerms}>
        {referralData?.data?.image && (
          <div
            className={`dez-bnr-inr overlay-black-middle ${styles.topImage}`}
            style={{
              backgroundImage: `url(${IMAGE_URL + referralData.data.image})`,
            }}
          >
            <div className="container">
              <div className="dez-bnr-inr-entry">
                <h1 className={styles.bannerTitle}>
                  {referralData?.data?.title}
                </h1>
                <div className="breadcrumb-row">
                  <ul className="list-inline">
                    <li>
                      <Link href={"/"}>Home</Link>
                    </li>
                    <li>{referralData?.data?.title}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        <Container className={styles.container}>
          <Row className="justify-content-center">
            <Col md={10}>
              <Card className="border-0">
                <Card.Body className={styles.cardBody}>
                  <Card.Title
                    className={`text-center mb-4 ${styles.cardTitle}`}
                  >
                    {referralData?.data?.title}
                  </Card.Title>
                  <div className={`mb-4 ${styles.contentSection}`}>
                    {referralData?.data?.heading
                      ? formatContent(referralData.data.heading)
                      : null}
                  </div>
                  <div className={styles.contentSection}>
                    {referralData?.data?.description
                      ? formatContent(referralData.data.description)
                      : null}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ReferralTerms;
