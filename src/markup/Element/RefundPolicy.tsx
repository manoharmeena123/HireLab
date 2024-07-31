"use client";
import React from "react";
import { useGetRefundPolicyQuery } from "@/store/global-store/global.query";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import Loading from "@/components/Loading";
import parse from "html-react-parser";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import styles from "@/styles/RefundPolicy.module.css";

const RefundPolicy: React.FC = () => {
  const { data: supportData, isLoading, isError } = useGetRefundPolicyQuery();

  if (isError) {
    return (
      <Alert variant="danger">
        Failed to load refund policy. Please try again later.
      </Alert>
    );
  }

  const formatContent = (content: string) => {
    // Replace <p><strong> tags with <h2> for headings
    content = content.replace(
      /<p><strong>(.*?)<\/strong><\/p>/g,
      "<h4>$1</h4>"
    );
    return parse(content);
  };

  return (
    <>
      {isLoading && <Loading />}{" "}
      <Container className={`${styles.container} ${styles.refundPolicy}`}>
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="border-0">
              {supportData?.data?.image && (
                <Card.Img
                  variant="top"
                  src={`${IMAGE_URL + supportData.data.image}`}
                  alt="Refund Policy Image"
                  className={`mb-4 rounded-top ${styles.cardImgTop}`}
                />
              )}
              <Card.Body className={styles.cardBody}>
                <Card.Title className={`text-center mb-4 ${styles.cardTitle}`}>
                  {supportData?.data?.title}
                </Card.Title>
                <div className={`mb-4 ${styles.contentSection}`}>
                  {supportData?.data?.heading
                    ? formatContent(supportData.data.heading)
                    : null}
                </div>
                <div className={styles.contentSection}>
                  {supportData?.data?.description
                    ? formatContent(supportData.data.description)
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

export default RefundPolicy;
