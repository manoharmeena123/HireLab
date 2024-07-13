"use client";
import React, { useEffect } from "react";

const Jobsearchform  = () => {
  useEffect(() => {
    // Placeholder Animation Start
    const inputSelector = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      "input, textarea"
    );

    inputSelector.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement?.parentElement?.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        const inputValue = input.value;
        if (inputValue === "") {
          input.parentElement?.parentElement?.classList.remove("filled");
          input.parentElement?.parentElement?.classList.remove("focused");
        } else {
          input.parentElement?.parentElement?.classList.add("filled");
        }
      });
    });
    // Placeholder Animation End

    // Cleanup event listeners on component unmount
    return () => {
      inputSelector.forEach((input) => {
        input.removeEventListener("focus", () => {});
        input.removeEventListener("blur", () => {});
      });
    };
  }, []);

  return (
    <div className="job-search-form">
      <form>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Job Title, Keywords Or Company Name" />
          <input type="text" className="form-control" placeholder="City, Province Or Region" />
          <div className="input-group-prepend">
            <button className="site-button">Search</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Jobsearchform;
