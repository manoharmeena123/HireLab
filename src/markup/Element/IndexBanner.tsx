import React, { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form } from "react-bootstrap";
import {
  useGetSectorQuery,
  useGetFilterJobMutation,
  useGetBannerQuery,
} from "@/store/global-store/global.query";
import Loading from "@/components/Loading";
import parse from "html-react-parser";
import { toast } from "react-toastify";

const bnr1 = require("./../../images/main-slider/slide2.jpg");

interface Filters {
  job_title: string;
  city: string;
  sector: string;
  [key: string]: string; // Index signature for string properties
}

const IndexBanner: React.FC = () => {
  const { push } = useRouter();
  const { data: sectorData, isLoading: isSectorLoading } = useGetSectorQuery();
  const [getFilterJob, { isLoading: isFilterLoading }] =
    useGetFilterJobMutation();
  const { data: bannerData } = useGetBannerQuery();
  console.log("first", bannerData);
  const [filters, setFilters] = useState<Filters>({
    job_title: "",
    city: "",
    sector: "",
  });

  const handleFocus = useCallback((event: FocusEvent) => {
    const target = event.target as HTMLInputElement;
    target.parentElement?.parentElement?.classList.add("focused");
  }, []);

  const handleBlur = useCallback((event: FocusEvent) => {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;
    if (inputValue === "") {
      target.parentElement?.parentElement?.classList.remove("filled");
      target.parentElement?.parentElement?.classList.remove("focused");
    } else {
      target.parentElement?.parentElement?.classList.add("filled");
    }
  }, []);

  useEffect(() => {
    const inputSelector = document.querySelectorAll("input, textarea");

    inputSelector.forEach((input) => {
      input.addEventListener("focus", handleFocus as EventListener);
      input.addEventListener("blur", handleBlur as EventListener);
    });

    // Cleanup event listeners on component unmount
    return () => {
      inputSelector.forEach((input) => {
        input.removeEventListener("focus", handleFocus as EventListener);
        input.removeEventListener("blur", handleBlur as EventListener);
      });
    };
  }, [handleFocus, handleBlur]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const query = new URLSearchParams(filters as any).toString();
      // Check if any filter is provided
      if (filters.job_title || filters.city || filters.sector) {
        push(`/browse-job-filter?${query}`);
      } else {
        push(`/browse-jobs-grid`);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error filtering jobs:", error);
    }
  };

  if (isSectorLoading || isFilterLoading) {
    return <Loading />;
  }

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
                {bannerData
                  ? parse(
                      bannerData?.data?.heading.replace(
                        /<p/g,
                        '<p style="margin-bottom: 0"'
                      )
                    )
                  : ""}
              </div>
            </Link>
            <h2 style={{ marginTop: "20px" }}>
              {bannerData
                ? parse(
                    bannerData?.data?.description.replace(
                      /<p/g,
                      '<p style="margin-bottom: 0"'
                    )
                  )
                : ""}{" "}
              <br />
            </h2>
            <form className="dezPlaceAni" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="form-group">
                    <label>Job Title, Keywords, or Phrase</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="job_title"
                        value={filters.job_title}
                        onChange={handleChange}
                        placeholder=""
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fa fa-search"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="form-group">
                    <label>City, State or ZIP</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={filters.city}
                        onChange={handleChange}
                        placeholder=""
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fa fa-map-marker"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="form-group">
                    <Form.Control
                      as="select"
                      name="sector"
                      value={filters.sector}
                      onChange={handleChange}
                      className="select-btn"
                    >
                      <option>Select Industry</option>
                      {sectorData?.data?.map(
                        (sector: { id: number; name: string }) => (
                          <option key={sector.id} value={sector.name}>
                            {sector.name}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <button
                    type="submit"
                    style={{
                      fontFamily:
                        "apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                    }}
                    className="site-button btn-block"
                  >
                    Find Job
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexBanner;
