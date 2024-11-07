import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetBannerQuery } from "@/store/global-store/global.query";
import Loading from "@/components/Loading";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import Select from "react-select"; // For dynamic search
import cityData from "@/data/in.json"; // Import your JSON data
import { experienceOptions, jobTitleOptions } from "@/data/indexSearch";
const bnr1 = require("./../../images/main-slider/slide2.jpg");

interface City {
  city: string;
  country: string;
}

interface Filters {
  job_title: string;
  experience: { value: string; label: string } | null;
  location: string;
}

const IndexBanner: React.FC = () => {
  const { push } = useRouter();
  const { data: bannerData, isLoading: isBannerLoading } = useGetBannerQuery();

  const [filters, setFilters] = useState<Filters>({
    job_title: "",
    experience: null,
    location: "",
  });

  // Handle input changes for search inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Handle changes for experience dropdown
  const handleExperienceChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      experience: selectedOption,
    }));
  };

  // Dynamic filtering of city data
  const loadCitySuggestions = (inputValue: string) => {
    return cityData
      .filter((city) =>
        city.city.toLowerCase().includes(inputValue.toLowerCase())
      ).slice(0, 5) // Limit to 5 suggestions
      .map((city) => city.city);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      job_title: filters.job_title || "",
      experience: filters.experience?.value || "",
      location: filters.location || "",
    }).toString();
    try {
      if (filters.job_title || filters.experience || filters.location) {
        push(`/browse-job-filter?${queryParams}`);
      } else {
        push(`/browse-jobs-grid`);
      }
    } catch (error) {
      toast.error("Error filtering jobs.");
      console.error("Error filtering jobs:", error);
    }
  };

  if (isBannerLoading) {
    return <Loading />;
  }

  // Safely ensure that bannerData.heading and description are strings before using replace
  const heading =
    typeof bannerData?.data?.heading === "string"
      ? bannerData.data.heading.replace(/<p/g, '<p style="margin-bottom: 0"')
      : "";
  const description =
    typeof bannerData?.data?.description === "string"
      ? bannerData.data.description.replace(
          /<p/g,
          '<p style="margin-bottom: 0"'
        )
      : "";

  // Custom styles for uniform input fields and select
  const styles = {
    formContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#fff",
      padding: "10px 30px",
      borderRadius: "50px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
      maxWidth: "900px",
      margin: "30px auto",
      gap: "15px",
      border: "1px solid #E0E0E0",
    },
    inputField: {
      flex: 1, // Make all fields equal size
      border: "none",
      outline: "none",
      padding: "18px 15px",
      fontSize: "14px",
      borderRadius: "50px",
      backgroundColor: "#F8F8F8",
      color: "#6F6F6F",
      width: "100%",
    },
    select: {
      flex: 1,
      borderRadius: "50px",
      border: "none",
      backgroundColor: "#F8F8F8",
    },
    searchBtn: {
      backgroundColor: "#2A6310",
      border: "none",
      borderRadius: "50px",
      padding: "10px 20px",
      cursor: "pointer",
      color: "#fff",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "120px",
    },
    searchIcon: {
      fontSize: "16px",
      marginRight: "5px",
    },
  };

  return (
    <div
      className="dez-bnr-inr dez-bnr-inr-md"
      // style={{ backgroundImage: `url(${bnr1.default.src})` }}
      style={{ backgroundColor: '#f5f5f5' }}

    >
      <div className="container">
      {/* <div className="dez-bnr-inr-entry align-m"> */}
        <div className="mt-5">
          <div className="find-job-bx">
            {/* <Link
              href="/browse-job-filter"
              className="site-button button-sm"
              style={{ backgroundColor: "#2A6310" }}
            >
              <div style={{ margin: "0px", padding: "0px" }}>
                {parse(heading)}
              </div>
            </Link> */}
            <h2 style={{ marginTop:"70px", textAlign:"center",fontSize:"40px" }}>
              {parse(description)} <br />
            </h2>
            <form onSubmit={handleSubmit} style={styles.formContainer}>
              {/* Job Title Input */}
              <input
                type="search"
                name="job_title"
                value={filters.job_title}
                onChange={handleInputChange}
                placeholder="Enter keyword / designation / companies"
                style={styles.inputField}
                list="job-titles"
              />
              <datalist id="job-titles">
                {jobTitleOptions
                  .filter((job) =>
                    job.value
                      .toLowerCase()
                     
                      .includes(filters.job_title.toLowerCase())
                  ).slice(0, 3) // Limit the job title suggestions to 5 options
                  .map((job) => (
                    <option key={job.value} value={job.label} />
                  ))}
              </datalist>

              {/* Experience Dropdown */}
              <Select
                name="experience"
                options={experienceOptions}
                onChange={handleExperienceChange}
                placeholder="Select experience"
                isClearable
                styles={{
                  control: (base) => ({
                    ...base,
                    padding: "10px",
                    borderRadius: "50px",
                    border: "none", // Remove border
                    boxShadow: "none", // Remove the shadow typically shown when focused
                    backgroundColor: "#F8F8F8", // Match the background color of other inputs
                    width: "100%", // Set consistent width
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#6F6F6F", // Match the text color
                    fontSize:"15px"
                  }),
                }}
              />

              {/* City Input */}
              <input
                type="search"
                name="location"
                value={filters.location}
                onChange={handleInputChange}
                placeholder="Enter location"
                style={styles.inputField}
                list="city-names"
              />
              <datalist id="city-names">
                {loadCitySuggestions(filters.location).map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>

              {/* Search Button */}
              <button type="submit" style={styles.searchBtn}>
                <i className="fa fa-search" style={styles.searchIcon}></i>{" "}
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexBanner;
