"use client";
import React from 'react';
import Slider from "react-slick";
import Image from 'next/image';
import { useGetTestimonialsQuery } from '@/store/global-store/global.query';
import { IMAGE_URL } from '@/lib/apiEndPoints';
import { truncateText } from "@/utils/formateDate";
import styles from '@/styles/Owltestimonial.module.css'; // Assuming you are using CSS Modules

const Owltestimonial = () => {
  const { data: testimonialData, isError, isLoading } = useGetTestimonialsQuery();
  console.log('testimonialData', testimonialData);

  const settings = {
    slidesToShow: 3,
    arrows: false,
    infinite: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading testimonials.</div>;

  return (
    <Slider className="blog-carousel-center owl-carousel owl-none" {...settings}>
      {testimonialData?.data?.map((item: any, index: number) => (
        <div className={`item p-3 ${styles.testimonialItem}`} key={index}>
          <div className="testimonial-5">
            <div className={`testimonial-text ${styles.testimonialText}`}>
              <div>
                <p dangerouslySetInnerHTML={{ __html: truncateText(item?.content, 30) }}/>
              </div>
            </div>
            <div className="testimonial-detail clearfix">
              <div className={`testimonial-pic radius shadow ${styles.testimonialPic}`}>
                <Image src={`${IMAGE_URL + item?.image}`} width={100} height={100} alt={item?.name || "Testimonial"} />
              </div>
              <strong style={{ fontWeight: '600' }} className="testimonial-name">
                {item?.name}
              </strong>
              <span className="testimonial-position">{item?.designation}</span>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Owltestimonial;
