"use client";
import React from "react";
import styles from "@/styles/WhyChooseUs.module.css";
import {
  FaPaintBrush,
  FaLightbulb,
  FaHeadset,
  FaChartLine,
  FaBullhorn,
  FaDollarSign,
  FaShieldAlt,
  FaRocket,
} from "react-icons/fa";
import { useWhyChooseUsQuery } from "@/store/global-store/global.query";
import Loading from "@/components/Loading";
import Image from "next/image";
import { IMAGE_URL } from "@/lib/apiEndPoints";

const WhyChooseUs = () => {
  const { data: whyChooseUsData, isLoading: whyChooseUsDataLoading } =
    useWhyChooseUsQuery({});

  return (
    <section className={styles.whyChooseUsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Why Choose Us</h2>
        <p className={styles.subtitle}>
          We offer the best features and services in the industry.
        </p>
        <div className={styles.featuresGrid}>
          {whyChooseUsData?.data?.map((feature: any, index: any) => (
            <div className={styles.featureCard} key={index}>
              <div className={styles.iconWrapper}>
                {/* {feature?.icon} */}
                <Image
                  src={`${IMAGE_URL + feature.image}`}
                  className="profile-image"
                  alt="Profile Image"
                  width={41}
                  height={41}
                  style={{ borderRadius: "3rem", objectFit: "cover" }}
                />
              </div>
              <h3 className={styles.featureTitle}>{feature?.name}</h3>
              <p className={styles.featureDescription}>{feature?.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
