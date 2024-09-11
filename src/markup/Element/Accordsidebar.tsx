"use client";
import React, { useState } from "react";
import Link from "next/link";
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
  ctcRange: [number, number]; // Pass initial range from Browsejobfilterlist
  setCtcRange: (range: [number, number]) => void; // Function to update the CTC range in Browsejobfilterlist
}

const Accordsidebar: React.FC<AccordsidebarProps> = ({
  filters,
  setFilters,
  ctcRange,
  setCtcRange,
}) => {
  const handleFilterChange = (type: keyof Filters, value: string) => {
    const currentValues = filters[type] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setFilters({ ...filters, [type]: newValues });
  };

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
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
    setCtcRange([10, 50]); // Reset the CTC range to the full range
  };

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
              <RangeSlider
                value={ctcRange}
                onInput={setCtcRange}
                min={10}
                max={50}
              />
              <div className="d-flex justify-content-between gap-1 mt-2">
                <span>{ctcRange[0]} Lac</span>
                <span>{ctcRange[1]} Lac</span>
              </div>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Accordsidebar;
