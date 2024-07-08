import React, { useEffect, FocusEvent } from "react";
import { Form } from "react-bootstrap";
import { useGetSectorQuery } from "@/store/global-store/global.query";

const Jobfindbox = () => {
  const { data: sectorData, isLoading, isError } = useGetSectorQuery();
  useEffect(() => {
    const handleFocus = (
      event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const target = event.target as HTMLInputElement;
      target.parentElement?.parentElement?.classList.add("focused");
    };

    const handleBlur = (
      event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const target = event.target as HTMLInputElement;
      const inputValue = target.value;
      if (inputValue === "") {
        target.parentElement?.parentElement?.classList.remove("filled");
        target.parentElement?.parentElement?.classList.remove("focused");
      } else {
        target.parentElement?.parentElement?.classList.add("filled");
      }
    };

    const inputSelector = document.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >("input, textarea");

    inputSelector.forEach((input) => {
      input.addEventListener("focus", handleFocus as unknown as EventListener);
      input.addEventListener("blur", handleBlur as unknown as EventListener);
    });

    return () => {
      inputSelector.forEach((input) => {
        input.removeEventListener(
          "focus",
          handleFocus as unknown as EventListener
        );
        input.removeEventListener(
          "blur",
          handleBlur as unknown as EventListener
        );
      });
    };
  }, []);

  return (
    <div className="section-full browse-job-find">
      <div className="container">
        <div className="find-job-bx">
          <form className="dezPlaceAni">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="form-group">
                  <label>Job Title, Keywords, or Phrase</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
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
                  <Form.Control as="select" className="select-btn">
                    <option>Select Sector</option>
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
                <button type="submit" className="site-button btn-block">
                  Find Job
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Jobfindbox;
