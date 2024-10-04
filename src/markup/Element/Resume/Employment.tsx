import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import Link from "next/link";
import {
  useGetResumeDataQuery,
  useCreateResumeEmploymentMutation,
  useUpdateResumeEmploymentMutation,
} from "@/app/my-resume/store/resume.query";
import { WritableEmploymentData } from "@/app/my-resume/types/resume";
import { toast } from "react-toastify";

interface EmploymentProps {
  show: boolean;
  onShow: () => void;
  onHide: () => void;
}

const Employment: React.FC<EmploymentProps> = ({ show, onShow, onHide }) => {
  const { data: resumeData, isLoading } = useGetResumeDataQuery();
  const [createEmployment] = useCreateResumeEmploymentMutation();
  const [updateEmployment] = useUpdateResumeEmploymentMutation();

  const [employment, setEmployment] = useState<WritableEmploymentData>({
    designation: "",
    organization: "",
    current_company: "no",
    start_from_year: "",
    start_from_month: "",
    worked_till_year: "",
    worked_till_month: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [employmentId, setEmploymentId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (resumeData && resumeData.data.length > 0) {
      const existingEmployment = resumeData.data[0].employments[0]; // Assuming single employment entry for simplicity
      if (existingEmployment) {
        setEmployment({
          designation: existingEmployment.designation,
          organization: existingEmployment.organization,
          current_company: existingEmployment.current_company ? "yes" : "no",
          start_from_year: existingEmployment.start_from_year,
          start_from_month: existingEmployment.start_from_month,
          worked_till_year: existingEmployment.worked_till_year,
          worked_till_month: existingEmployment.worked_till_month,
        });
        setEmploymentId(existingEmployment.id);
        setEditMode(true);
      }
    }
  }, [resumeData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEmployment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!employment.designation) {
      setError("Designation is required.");
      return;
    }

    if (!employment.organization) {
      setError("Organization is required.");
      return;
    }

    if (!employment.start_from_year || !employment.start_from_month) {
      setError("Start date is required.");
      return;
    }

    if (
      employment.current_company === "no" &&
      (!employment.worked_till_year || !employment.worked_till_month)
    ) {
      setError("End date is required.");
      return;
    }

    const startDate = new Date(
      `${employment.start_from_year}-${employment.start_from_month}-01`
    );
    const endDate =
      employment.current_company === "no"
        ? new Date(`${employment.worked_till_year}-${employment.worked_till_month}-01`)
        : null;

    if (endDate && startDate > endDate) {
      setError("Start date must be earlier than end date.");
      return;
    }

    setError(null);

    try {
      if (editMode && employmentId !== null) {
        const response = await updateEmployment({
          data: employment,
          employment_id: employmentId,
        });
        toast.success(response?.data?.message, { theme: "colored" });
      } else {
        const response = await createEmployment(employment);
        toast.success(response?.data?.message, { theme: "colored" });
      }
      onHide();
    } catch (error: any) {
      toast.error(error?.message, { theme: "colored" });

      console.error("Error saving employment:", error);
    }
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 2000; year--) {
      years.push(year);
    }
    return years;
  };

  return (
    <div id="employment_bx" className="job-bx bg-white m-b30">
      <div className="d-flex">
        <h5 className="m-b15">Employment</h5>
        <Link
          href=""
          onClick={onShow}
          className="site-button add-btn button-sm"
        >
          <i className="fa fa-pencil m-r5"></i> Edit
        </Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h6 className="font-14 m-b0">{employment.designation}</h6>
          <p className="m-b0">{employment.organization}</p>
          <p className="m-b0">
            {employment.start_from_month} {employment.start_from_year} to{" "}
            {employment.current_company === "yes"
              ? "Present"
              : `${employment.worked_till_month} ${employment.worked_till_year}`}
          </p>
        </>
      )}

      <Modal
        show={show}
        onHide={onHide}
        className="modal fade modal-bx-info editor"
      >
        <div className="modal-dialog my-0" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EmploymentModalLongTitle">
                {editMode ? "Edit Employment" : "Add Employment"}
              </h5>
              <button type="button" className="close" onClick={onHide}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {error && <p style={{ color: "red" }}>{error}</p>}
              <form>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Your Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        name="designation"
                        value={employment.designation}
                        onChange={handleChange}
                        placeholder="Enter Your Designation"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Your Organization</label>
                      <input
                        type="text"
                        className="form-control"
                        name="organization"
                        value={employment.organization}
                        onChange={handleChange}
                        placeholder="Enter Your Organization"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Is this your current company?</label>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="employ_yes"
                              name="current_company"
                              value="yes"
                              checked={employment.current_company === "yes"}
                              onChange={handleChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="employ_yes"
                            >
                              Yes
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="employ_no"
                              name="current_company"
                              value="no"
                              checked={employment.current_company === "no"}
                              onChange={handleChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="employ_no"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Started Working From</label>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                          <Form.Control
                            as="select"
                            name="start_from_year"
                            value={employment.start_from_year}
                            onChange={handleChange}
                          >
                            <option value="">Select Year</option>
                            {generateYears().map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </Form.Control>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                          <Form.Control
                            as="select"
                            name="start_from_month"
                            value={employment.start_from_month}
                            onChange={handleChange}
                          >
                            <option value="">Select Month</option>
                            {[
                              "January",
                              "February",
                              "March",
                              "April",
                              "May",
                              "June",
                              "July",
                              "August",
                              "September",
                              "October",
                              "November",
                              "December",
                            ].map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </Form.Control>
                        </div>
                      </div>
                    </div>
                  </div>
                  {employment.current_company === "no" && (
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Worked Till</label>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <Form.Control
                              as="select"
                              name="worked_till_year"
                              value={employment.worked_till_year}
                              onChange={handleChange}
                            >
                              <option value="">Select Year</option>
                              {generateYears().map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </Form.Control>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <Form.Control
                              as="select"
                              name="worked_till_month"
                              value={employment.worked_till_month}
                              onChange={handleChange}
                            >
                              <option value="">Select Month</option>
                              {[
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December",
                              ].map((month) => (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              ))}
                            </Form.Control>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="site-button" onClick={onHide}>
                Cancel
              </button>
              <button
                type="button"
                className="site-button"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Employment;
