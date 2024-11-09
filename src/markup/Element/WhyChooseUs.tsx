"use client";
import React from "react";
import styles from "@/styles/WhyChooseUs.module.css";
import { useWhyChooseUsQuery } from '@/store/global-store/global.query';
import Loading from "@/components/Loading";

const WhyChooseUs = () => {
  const { data, isLoading } = useWhyChooseUsQuery({});

  return (
    <>
      {isLoading && <Loading />}
      <section className={styles.whyChooseUsSection}>
        <div className={styles.container}>
          <h2 className={styles.title}>{data?.data?.title}</h2>
          {data?.data?.heading && <h3 className={styles.heading}>{data?.data?.heading}</h3>}
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.data?.description }}
          ></div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
