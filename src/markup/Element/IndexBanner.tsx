import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useGetBannerQuery,
  useGetHomeBannerQuery,
  useGetJobTitleSuggestionMutation
} from "@/store/global-store/global.query";
import Loading from "@/components/Loading";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import Select from "react-select";
import cityData from "@/data/in.json";
import { experienceOptions } from "@/data/indexSearch";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import Image from "next/image";

interface City {
  city: string;
  country: string;
}

interface Filters {
  job_title: { value: string; label: string } | null;
  experience: { value: string; label: string } | null;
  location: { value: string; label: string } | null;
}

const IndexBanner: React.FC = () => {
  const { push } = useRouter();
  const { data: bannerData, isLoading: isBannerLoading } = useGetBannerQuery();
  const { data: getHomeBanner, isLoading: getHomeBannerLoading } =
    useGetHomeBannerQuery({});
  const [getJobTitleSuggestion, { data: jobTitleData, isLoading: jobTitleDataLoading }] = useGetJobTitleSuggestionMutation();
  
  const [filters, setFilters] = useState<Filters>({
    job_title: null,
    experience: null,
    location: null,
  });

  // Handle changes for job title (designation) dropdown with dynamic suggestions
  const handleJobTitleInputChange = (inputValue: string) => {
    if (inputValue) {
      getJobTitleSuggestion({ search: inputValue });
    }
  };

  const handleJobTitleChange = (selectedOption: { value: string; label: string } | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      job_title: selectedOption,
    }));
  };

  // Handle changes for experience dropdown
  const handleExperienceChange = (selectedOption: { value: string; label: string } | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      experience: selectedOption,
    }));
  };

  // Handle changes for location dropdown
  const handleLocationChange = (selectedOption: { value: string; label: string } | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      location: selectedOption,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      job_title: filters.job_title?.value || "",
      experience: filters.experience?.value || "",
      location: filters.location?.value || "",
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

  if (isBannerLoading || getHomeBannerLoading) {
    return <Loading />;
  }

  // Generate location options from city data
  const locationOptions = cityData.map((city) => ({
    value: city.city,
    label: city.city,
  }));

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

  const bannerImageUrl = getHomeBanner?.data?.image
    ? `${IMAGE_URL}/${getHomeBanner.data.image}`
    : null;

  // Custom styles
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
      flex: 1,
      border: "none",
      outline: "none",
      padding: "18px 15px",
      fontSize: "14px",
      borderRadius: "50px",
      backgroundColor: "#F8F8F8",
      color: "#6F6F6F",
      width: "100%",
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
    bannerImageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "60px",
      maxWidth: "900px",
      width: "100%",
      margin: "0 auto",
      maxHeight: "300px",
    },
  };

  return (
    <div className="dez-bnr-inr dez-bnr-inr-md" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="container">
        <div className="mt-5">
          <div className="find-job-bx">
            <h2 style={{ marginTop: "70px", textAlign: "center", fontSize: "30px" }}>
              {parse(description)} <br />
            </h2>
            <form onSubmit={handleSubmit} style={styles.formContainer}>
              <Select
                name="job_title"
                options={
                  jobTitleData?.data.map((title: string) => ({
                    value: title,
                    label: title,
                  })) || []
                }
                onInputChange={handleJobTitleInputChange}
                onChange={handleJobTitleChange}
                placeholder="Enter skills / designations / companies"
                isClearable
                isLoading={jobTitleDataLoading}
                styles={{
                  control: (base) => ({
                    ...base,
                    padding: "10px",
                    borderRadius: "50px",
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "#F8F8F8",
                    width: "300px", 
                    cursor: "pointer"
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#6F6F6F",
                    fontSize: "15px",
                  }),
                  indicatorsContainer: (base) => ({
                    ...base,
                    display: "none", // Hide the dropdown indicator
                  }),
                }}
              />
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
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "#F8F8F8",
                    width: "100%",
                    cursor: "pointer"
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#6F6F6F",
                    fontSize: "15px",
                  }),
                  
                }}
              />
              <Select
                name="location"
                options={locationOptions}
                onChange={handleLocationChange}
                placeholder="Enter location"
                isClearable
                styles={{
                  control: (base) => ({
                    ...base,
                    padding: "10px",
                    borderRadius: "50px",
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "#F8F8F8",
                    width: "100%",
                    cursor: "pointer"
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#6F6F6F",
                    fontSize: "15px",
                  }),
                }}
              />
              <button type="submit" style={styles.searchBtn}>
                <i className="fa fa-search" style={{ fontSize: "16px", marginRight: "5px" }}></i> Search
              </button>
            </form>
          </div>
        </div>
        {bannerImageUrl && (
          <div style={styles.bannerImageContainer}>
            <Image
              src={bannerImageUrl}
              alt="Home Banner"
              width={900}
              height={300}
              style={{ objectFit: "cover", borderRadius: "20px", maxHeight: "200px"}}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexBanner;
