"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Accordion } from "react-bootstrap";

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

  const handleClick = (index) => {
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
            className={`accordion-item ${activeIndex === 0 ? "active" : ""}`}
            onClick={() => handleClick(0)}
          >
            <h3>Experience</h3>
            <div className={`answer ${activeIndex === 0 ? "show" : ""}`}>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="fresher"
                  type="checkbox"
                  onChange={() =>
                    handleFilterChange("experience", "Fresher Only")
                  }
                  checked={filters?.experience?.includes("Fresher Only")}
                />
                <label className="custom-control-label" htmlFor="fresher">
                  Fresher Only
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="experience"
                  type="checkbox"
                  onChange={() =>
                    handleFilterChange("experience", "Experience Only")
                  }
                  checked={filters?.experience?.includes("Experience Only")}
                />
                <label className="custom-control-label" htmlFor="experience">
                  Experience Only
                </label>
              </div>
            </div>
          </li>

          <li
            className={`accordion-item ${activeIndex === 1 ? "active" : ""}`}
            onClick={() => handleClick(1)}
          >
            <h3>Location</h3>
            <div className={`answer ${activeIndex === 1 ? "show" : ""}`}>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="workFromHome"
                  type="checkbox"
                  onChange={() =>
                    handleFilterChange("location", "Work From Home")
                  }
                  checked={filters?.location?.includes("Work From Home")}
                />
                <label className="custom-control-label" htmlFor="workFromHome">
                  Work From Home
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="workFromOffice"
                  type="checkbox"
                  onChange={() =>
                    handleFilterChange("location", "Work From Office")
                  }
                  checked={filters?.location?.includes("Work From Office")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="workFromOffice"
                >
                  Work From Office
                </label>
              </div>
            </div>
          </li>

          <li
            className={`accordion-item ${activeIndex === 2 ? "active" : ""}`}
            onClick={() => handleClick(2)}
          >
            <h3>Education</h3>
            <div className={`answer ${activeIndex === 2 ? "show" : ""}`}>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="education10th"
                  type="checkbox"
                  onChange={() => handleFilterChange("education", "10th")}
                  checked={filters?.education?.includes("10th")}
                />
                <label className="custom-control-label" htmlFor="education10th">
                  10th
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="education12th"
                  type="checkbox"
                  onChange={() => handleFilterChange("education", "12th")}
                  checked={filters?.education?.includes("12th")}
                />
                <label className="custom-control-label" htmlFor="education12th">
                  12th
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="educationGraduate"
                  type="checkbox"
                  onChange={() => handleFilterChange("education", "Graduate")}
                  checked={filters?.education?.includes("Graduate")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="educationGraduate"
                >
                  Graduate
                </label>
              </div>
            </div>
          </li>

          <li
            className={`accordion-item ${activeIndex === 3 ? "active" : ""}`}
            onClick={() => handleClick(3)}
          >
            <h3>Cities</h3>
            <div className={`answer ${activeIndex === 3 ? "show" : ""}`}>
              {cities.map((city) => (
                <div className="custom-control custom-checkbox" key={city}>
                  <input
                    className="custom-control-input"
                    id={city}
                    type="checkbox"
                    onChange={() => handleFilterChange("cities", city)}
                    checked={filters?.cities?.includes(city)}
                  />
                  <label className="custom-control-label" htmlFor={city}>
                    {city}
                  </label>
                </div>
              ))}
            </div>
          </li>

          <li
            className={`accordion-item ${activeIndex === 4 ? "active" : ""}`}
            onClick={() => handleClick(4)}
          >
            <h3>Job Titles</h3>
            <div className={`answer ${activeIndex === 4 ? "show" : ""}`}>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="nodejsDeveloper"
                  type="checkbox"
                  onChange={() =>
                    handleFilterChange("jobTitles", "Nodejs Developer")
                  }
                  checked={filters?.jobTitles?.includes("Nodejs Developer")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="nodejsDeveloper"
                >
                  Nodejs Developer
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="reactDeveloper"
                  type="checkbox"
                  onChange={() =>
                    handleFilterChange("jobTitles", "React Developer")
                  }
                  checked={filters?.jobTitles?.includes("React Developer")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="reactDeveloper"
                >
                  React Developer
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  id="laravelDeveloper"
                  type="checkbox"
                  onChange={() =>
                    handleFilterChange("jobTitles", "Laravel Developer")
                  }
                  checked={filters?.jobTitles?.includes("Laravel Developer")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="laravelDeveloper"
                >
                  Laravel Developer
                </label>
              </div>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Accordsidebar;
