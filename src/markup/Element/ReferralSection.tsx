"use client";
import React from "react";
import { useGetReferralTermsQuery } from "@/store/global-store/global.query";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import Loading from "@/components/Loading";
import parse from "html-react-parser";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import styles from "@/styles/ReferralTerms.module.css";

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
    // Replace <p><strong> tags with <h2> for headings
    content = content.replace(
      /<p><strong>(.*?)<\/strong><\/p>/g,
      "<h2>$1</h2>"
    );
    return parse(content);
  };

  return (
    <>
      {isLoading && <Loading />}
      <Container className={`${styles.container} ${styles.referralTerms}`}>
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="border-0">
              {referralData?.data?.image && (
                <Card.Img
                  variant="top"
                  src={`${IMAGE_URL + referralData.data.image}`}
                  alt="Referral Terms Image"
                  className={`mb-4 rounded-top ${styles.cardImgTop}`}
                />
              )}
              <Card.Body className={styles.cardBody}>
                <Card.Title className={`text-center mb-4 ${styles.cardTitle}`}>
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
    </>
  );
};

export default ReferralTerms;
