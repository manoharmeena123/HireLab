import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import {
  useGetResumeDataQuery,
  useCreateResumeAccomplishmentsMutation,
  useUpdateResumeAccomplishmentsMutation,
} from "@/app/my-resume/store/resume.query";
import { WritableAccomplishmentsData } from "@/app/my-resume/types/resume";
import Link from "next/link";

interface AccomplishmentsProps {
  show: boolean;
  onShow: () => void;
  onHide: () => void;
}

const Accomplishments: React.FC<AccomplishmentsProps> = ({
  show,
  onShow,
  onHide,
}) => {
  const { data: resumeData } = useGetResumeDataQuery();
  const [createResumeAccomplishments] =
    useCreateResumeAccomplishmentsMutation();
  const [updateResumeAccomplishments] =
    useUpdateResumeAccomplishmentsMutation();
  const [accomplishmentData, setAccomplishmentData] =
    useState<WritableAccomplishmentsData | null>(null);
  const [accomplishmentId, setAccomplishmentId] = useState<number | null>(null);

  console.log('accomplishmentId', accomplishmentId)
  useEffect(() => {
    if (resumeData && resumeData.data.length > 0) {
      const initialData = resumeData.data[0]?.accomplishments?.[0];
      if (initialData) {
        setAccomplishmentData(initialData);
        setAccomplishmentId(initialData.id);
      }
    }
  }, [resumeData]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setAccomplishmentData((prevData: any) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? "yes" : "no") : value,
    }));
  };

  const handleSave = async () => {
    if (accomplishmentData) {
      if (accomplishmentId) {
        await updateResumeAccomplishments({
          data: accomplishmentData,
          accomplishment_id: accomplishmentId,
        });
      } else {
        await createResumeAccomplishments(accomplishmentData);
      }
      onHide();
    }
  };

  const renderField = (label: string, value: string | boolean | undefined) => (
    <div className="clearfix m-b20">
      <label className="m-b0">{label}</label>
      <span className="clearfix font-13">
        {value !== undefined ? value : "N/A"}
      </span>
    </div>
  );

  const renderModal = () => (
    <Modal
      className="modal fade modal-bx-info editor"
      show={show}
      onHide={onHide}
      centered
    >
      <div className="modal-dialog my-0" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Accomplishments</h5>
            <button type="button" className="close" onClick={onHide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>Online Profile</label>
                    <input
                      type="text"
                      name="online_social_profile"
                      className="form-control"
                      placeholder="Social Profile"
                      value={accomplishmentData?.online_social_url || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>URL</label>
                    <input
                      type="text"
                      name="online_social_url"
                      className="form-control"
                      placeholder="URL"
                      value={accomplishmentData?.online_social_url || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      name="online_social_description"
                      placeholder="Description"
                      value={
                        accomplishmentData?.online_social_description || ""
                      }
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>Work Sample</label>
                    <input
                      type="text"
                      name="work_title"
                      className="form-control"
                      placeholder="Title"
                      value={accomplishmentData?.work_title || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>URL</label>
                    <input
                      type="text"
                      name="work_url"
                      className="form-control"
                      placeholder="URL"
                      value={accomplishmentData?.work_url || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration From</label>
                    <Form.Control
                      as="select"
                      name="work_duration_from"
                      value={accomplishmentData?.work_duration_from || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Year</option>
                      {Array.from(
                        { length: 25 },
                        (_, i) => new Date().getFullYear() - i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Form.Control>
                  </div>
                  <div className="form-group">
                    <label>Duration To</label>
                    <Form.Control
                      as="select"
                      name="work_duration_to"
                      value={accomplishmentData?.work_duration_to || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Year</option>
                      {Array.from(
                        { length: 25 },
                        (_, i) => new Date().getFullYear() - i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Form.Control>
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="work_I_am_currently_working_on_this"
                      name="work_I_am_currently_working_on_this"
                      checked={
                        accomplishmentData?.work_I_am_currently_working_on_this ===
                        "yes"
                      }
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="work_I_am_currently_working_on_this"
                    >
                      I am currently working on this
                    </label>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      name="work_description"
                      placeholder="Description"
                      value={accomplishmentData?.work_description || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>
                      White Paper / Research Publication / Journal Entry
                    </label>
                    <input
                      type="text"
                      name="white_paper_title"
                      className="form-control"
                      placeholder="Title"
                      value={accomplishmentData?.white_paper_title || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>URL</label>
                    <input
                      type="text"
                      name="white_paper_url"
                      className="form-control"
                      placeholder="URL"
                      value={accomplishmentData?.white_paper_url || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Published On</label>
                    <div className="row">
                      <div className="col-6">
                        <Form.Control
                          as="select"
                          name="white_paper_published_on_year"
                          value={
                            accomplishmentData?.white_paper_published_on_year ||
                            ""
                          }
                          onChange={handleChange}
                        >
                          <option value="">Year</option>
                          {Array.from(
                            { length: 25 },
                            (_, i) => new Date().getFullYear() - i
                          ).map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </Form.Control>
                      </div>
                      <div className="col-6">
                        <Form.Control
                          as="select"
                          name="white_paper_published_on_month"
                          value={
                            accomplishmentData?.white_paper_published_on_month ||
                            ""
                          }
                          onChange={handleChange}
                        >
                          <option value="">Month</option>
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
                          ].map((month, index) => (
                            <option key={index} value={month}>
                              {month}
                            </option>
                          ))}
                        </Form.Control>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      name="white_paper_description"
                      placeholder="Description"
                      value={accomplishmentData?.white_paper_description || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>Presentation</label>
                    <input
                      type="text"
                      name="presentation_title"
                      className="form-control"
                      placeholder="Title"
                      value={accomplishmentData?.presentation_title || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>URL</label>
                    <input
                      type="text"
                      name="presentation_url"
                      className="form-control"
                      placeholder="URL"
                      value={accomplishmentData?.presentation_url || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      name="presentation_description"
                      placeholder="Description"
                      value={accomplishmentData?.presentation_description || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>Patent</label>
                    <input
                      type="text"
                      name="patent_title"
                      className="form-control"
                      placeholder="Title"
                      value={accomplishmentData?.patent_title || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>URL</label>
                    <input
                      type="text"
                      name="patent_url"
                      className="form-control"
                      placeholder="URL"
                      value={accomplishmentData?.patent_url || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Patent Office</label>
                    <input
                      type="text"
                      name="patent_office"
                      className="form-control"
                      placeholder="Patent Office"
                      value={accomplishmentData?.patent_office || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Application Number</label>
                    <input
                      type="text"
                      name="patent_application_number"
                      className="form-control"
                      placeholder="Application Number"
                      value={
                        accomplishmentData?.patent_application_number || ""
                      }
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Published On</label>
                    <div className="row">
                      <div className="col-6">
                        <Form.Control
                          as="select"
                          name="patent_published_on_year"
                          value={
                            accomplishmentData?.patent_published_on_year || ""
                          }
                          onChange={handleChange}
                        >
                          <option value="">Year</option>
                          {Array.from(
                            { length: 25 },
                            (_, i) => new Date().getFullYear() - i
                          ).map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </Form.Control>
                      </div>
                      <div className="col-6">
                        <Form.Control
                          as="select"
                          name="patent_published_on_month"
                          value={
                            accomplishmentData?.patent_published_on_month || ""
                          }
                          onChange={handleChange}
                        >
                          <option value="">Month</option>
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
                          ].map((month, index) => (
                            <option key={index} value={month}>
                              {month}
                            </option>
                          ))}
                        </Form.Control>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <div className="row">
                      <div className="col-6">
                        <Form.Check
                          type="radio"
                          label="Patent Issued"
                          name="patent_status"
                          value="Patent Issued"
                          checked={
                            accomplishmentData?.patent_status ===
                            "Patent Issued"
                          }
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-6">
                        <Form.Check
                          type="radio"
                          label="Patent Pending"
                          name="patent_status"
                          value="Patent Pending"
                          checked={
                            accomplishmentData?.patent_status ===
                            "Patent Pending"
                          }
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      name="patent_description"
                      placeholder="Description"
                      value={accomplishmentData?.patent_description || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>Certification</label>
                    <input
                      type="text"
                      name="certification_name"
                      className="form-control"
                      placeholder="Certification Name"
                      value={accomplishmentData?.certification_name || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Certification Body</label>
                    <input
                      type="text"
                      name="certification_body"
                      className="form-control"
                      placeholder="Certification Body"
                      value={accomplishmentData?.certification_body || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Year</label>
                    <Form.Control
                      as="select"
                      name="certification_year"
                      value={accomplishmentData?.certification_year || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Year</option>
                      {Array.from(
                        { length: 25 },
                        (_, i) => new Date().getFullYear() - i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Form.Control>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );

  return (
    <div id="accomplishments_bx" className="job-bx bg-white m-b30">
      <h5 className="m-b10">Accomplishments</h5>
      <div className="d-flex">
        <Link
          href="#"
          onClick={onShow}
          className="site-button add-btn button-sm"
        >
          <i className="fa fa-pencil m-r5"></i> Edit
        </Link>
      </div>
      <div className="list-row">
        {renderField(
          "Online Profile",
          accomplishmentData?.online_social_url
        )}
        {renderField("Work Sample", accomplishmentData?.work_title)}
        {renderField(
          "White Paper / Research Publication / Journal Entry",
          accomplishmentData?.white_paper_title
        )}
        {renderField("Presentation", accomplishmentData?.presentation_title)}
        {renderField("Patent Title", accomplishmentData?.patent_title)}
        {renderField(
          "Certification Name",
          accomplishmentData?.certification_name
        )}
      </div>
      {renderModal()}
    </div>
  );
};

export default Accomplishments;
