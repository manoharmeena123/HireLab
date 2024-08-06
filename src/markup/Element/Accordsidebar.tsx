"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Accordion } from "react-bootstrap";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

interface Filters {
  experience: string[];
  location: string[];
  education: string[];
  cities: string[];
  jobTitles: string[];
}

interface AccordsidebarProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const Accordsidebar: React.FC<AccordsidebarProps> = ({
  filters,
  setFilters,
}) => {
  const handleFilterChange = (type: keyof Filters, value: string) => {
    const currentValues = filters[type] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setFilters({ ...filters, [type]: newValues });
  };
  const [activeIndex, setActiveIndex] = useState(null);
  const [value, setValue] = useState([30, 60]);
 console.log('value', value)
  const handleClick = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const resetFilters = () => {
    setFilters({
      experience: [],
      location: [],
      education: [],
      cities: [],
      jobTitles: [],
    });
  };

  const cities = [
    "Indore",
    "Delhi",
    "Katni",
    "Surat",
    "Ahmedabad",
    "Gandhinagar",
  ];

  return (
    <div className="col-xl-3 col-lg-4 col-md-5 m-b30">
      <aside id="accordion1" className="sticky-top sidebar-filter bg-white">
        <h6 className="title">
          <i className="fa fa-sliders m-r5"></i> Refined By{" "}
          <Link
            href={"#"}
            className="font-12 float-right"
            onClick={resetFilters}
          >
            Reset All
          </Link>
        </h6>
        <ul className="accordion-list">
          <li
            className={`accordion-item ${activeIndex === 5 ? "active" : ""}`}
            onClick={() => handleClick(5)}
          >
            <h3>CTC Based</h3>
            <div
              className={`answer ${activeIndex === 5 ? "show" : ""} pt-4`}
              style={{ minHeight: "100px" }}
            >
              <RangeSlider value={value} onInput={setValue} />
              <div className="d-flex justify-content-between gap-1 mt-2">
                <span>{value[0]}</span>
                <span>{value[1]}</span>
              </div>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Accordsidebar;
