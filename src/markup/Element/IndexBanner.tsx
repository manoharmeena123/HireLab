import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetBannerQuery } from "@/store/global-store/global.query";
import Loading from "@/components/Loading";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import Select, { SingleValue } from "react-select"; // For dynamic search
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
    setFilters((prevFilters) => ({ ...prevFilters, experience: selectedOption }));
  };

  // Dynamic filtering of city data
  const loadCitySuggestions = (inputValue: string) => {
    return cityData
      .filter((city) =>
        city.city.toLowerCase().includes(inputValue.toLowerCase())
      )
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
      ? bannerData.data.description.replace(/<p/g, '<p style="margin-bottom: 0"')
      : "";

  // Custom styles matching the image design
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
      flex: "1",
      border: "none",
      outline: "none",
      padding: "10px 15px",
      fontSize: "14px",
      borderRadius: "50px",
      backgroundColor: "#F8F8F8",
      color: "#6F6F6F",
    },
    datalistInput: {
      position: "relative",
      backgroundColor: "#fff",
      color: "#000",
      border: "1px solid #ccc",
      borderRadius: "5px",
      padding: "5px 10px",
    },
    select: {
      padding: "10px",
      borderRadius: "50px",
      flex: 1,
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
      style={{ backgroundImage: `url(${bnr1.default.src})` }}
    >
      <div className="container">
        <div className="dez-bnr-inr-entry align-m">
          <div className="find-job-bx">
            <Link
              href="/browse-job-filter"
              className="site-button button-sm"
              style={{ backgroundColor: "#2A6310" }}
            >
              <div style={{ margin: "0px", padding: "0px" }}>
                {parse(heading)}
              </div>
            </Link>
            <h2 style={{ marginTop: "20px" }}>
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
                    job.value.toLowerCase().includes(filters.job_title.toLowerCase())
                  )
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
                styles={{ control: (base) => ({ ...base, ...styles.select }) }}
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
                <i className="fa fa-search" style={styles.searchIcon}></i> Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexBanner;





///////////////////////////////////////////////////////
// import React, { useState, useEffect, FocusEvent } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Form } from "react-bootstrap";
// import {
//   useGetSectorQuery,
//   useGetFilterJobMutation,
//   useGetBannerQuery,
// } from "@/store/global-store/global.query";
// import Loading from "@/components/Loading";
// import parse from "html-react-parser";
// import { toast } from "react-toastify";

// const bnr1 = require("./../../images/main-slider/slide2.jpg");

// interface Filters {
//   job_title: string;
//   city: string;
//   sector: string;
//   [key: string]: string; // Index signature for string properties
// }

// const IndexBanner: React.FC = () => {
//   const { push } = useRouter();
//   const { data: sectorData, isLoading: isSectorLoading } = useGetSectorQuery();
//   const [getFilterJob, { isLoading: isFilterLoading }] =
//     useGetFilterJobMutation();
//   const { data: bannerData, isLoading :isBannerLoading } = useGetBannerQuery();
//   console.log("first", bannerData);
//   const [filters, setFilters] = useState<Filters>({
//     job_title: "",
//     city: "",
//     sector: "",
//   });

//   const handleFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const target = event.target as HTMLInputElement;
//     target.parentElement?.parentElement?.classList.add("focused");
//   };

//   const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const target = event.target as HTMLInputElement;
//     const inputValue = target.value;
//     if (inputValue === "") {
//       target.parentElement?.parentElement?.classList.remove("filled");
//       target.parentElement?.parentElement?.classList.remove("focused");
//     } else {
//       target.parentElement?.parentElement?.classList.add("filled");
//     }
//   };

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const query = new URLSearchParams(filters as any).toString();
//       // Check if any filter is provided
//       if (filters.job_title || filters.city || filters.sector) {
//         push(`/browse-job-filter?${query}`);
//       } else {
//         push(`/browse-jobs-grid`);
//       }
//     } catch (error: any) {
//       toast.error(error.message);
//       console.error("Error filtering jobs:", error);
//     }
//   };

//   if (isSectorLoading || isFilterLoading || isBannerLoading) {
//     return <Loading />;
//   }

//   return (
//     <div className="dez-bnr-inr dez-bnr-inr-md" style={{ backgroundImage: `url(${bnr1.default.src})` }}>
//       <div className="container">
//         <div className="dez-bnr-inr-entry align-m">
//           <div className="find-job-bx">
//             <Link
//               href="/browse-job-filter"
//               className="site-button button-sm"
//               style={{ backgroundColor: "#2A6310" }}
//             >
//               <div style={{ margin: "0px", padding: "0px" }}>
//                 {bannerData
//                   ? parse(
//                       bannerData?.data?.heading.replace(
//                         /<p/g,
//                         '<p style="margin-bottom: 0"'
//                       )
//                     )
//                   : ""}
//               </div>
//             </Link>
//             <h2 style={{ marginTop: "20px" }}>
//               {bannerData
//                 ? parse(
//                     bannerData?.data?.description.replace(
//                       /<p/g,
//                       '<p style="margin-bottom: 0"'
//                     )
//                   )
//                 : ""}{" "}
//               <br />
//             </h2>
//             <form className="dezPlaceAni" onSubmit={handleSubmit}>
//               <div className="row">
//                 <div className="col-lg-4 col-md-6">
//                   <div className="form-group">
//                     <label>Job Title, Keywords, or Phrase</label>
//                     <div className="input-group">
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="job_title"
//                         value={filters.job_title}
//                         onChange={handleChange}
//                         onFocus={handleFocus}
//                         onBlur={handleBlur}
//                         placeholder=""
//                       />
//                       <div className="input-group-append">
//                         <span className="input-group-text">
//                           <i className="fa fa-search"></i>
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-lg-3 col-md-6">
//                   <div className="form-group">
//                     <label>City, State or ZIP</label>
//                     <div className="input-group">
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="city"
//                         value={filters.city}
//                         onChange={handleChange}
//                         onFocus={handleFocus}
//                         onBlur={handleBlur}
//                         placeholder=""
//                       />
//                       <div className="input-group-append">
//                         <span className="input-group-text">
//                           <i className="fa fa-map-marker"></i>
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-lg-3 col-md-6">
//                   <div className="form-group">
//                     <Form.Control
//                       as="select"
//                       name="sector"
//                       value={filters.sector}
//                       onChange={handleChange}
//                       onFocus={handleFocus}
//                       onBlur={handleBlur}
//                       className="select-btn"
//                     >
//                       <option>Select Industry</option>
//                       {sectorData?.data?.map((sector: { id: number; name: string }) => (
//                         <option key={sector.id} value={sector.name}>
//                           {sector.name}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   </div>
//                 </div>
//                 <div className="col-lg-2 col-md-6">
//                   <button
//                     type="submit"
//                     style={{
//                       fontFamily:
//                         "apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
//                     }}
//                     className="site-button btn-block"
//                   >
//                     Find Job
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IndexBanner;
