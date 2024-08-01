import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import Link from "next/link";
import {
  useGetResumeDataQuery,
  useCreateResumePersonalDetailsMutation,
  useUpdateResumePersonalDetailsMutation,
} from "@/app/my-resume/store/resume.query";
import { WritablePersonalDetails } from "@/app/my-resume/types/resume";
interface PersonalDetailsProps {
  show: boolean;
  onShow: () => void;
  onHide: () => void;
}
const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  show,
  onShow,
  onHide,
}) => {
  const { data: resumeData, isLoading } = useGetResumeDataQuery();
  const [createPersonalDetails] = useCreateResumePersonalDetailsMutation();
  const [updatePersonalDetails] = useUpdateResumePersonalDetailsMutation();

  const [personalDetails, setPersonalDetails] =
    useState<WritablePersonalDetails>({
      dob: "",
      permanent_address: "",
      gender: "",
      pin_code: "",
      marital_status: "",
      hometown: "",
      passport_number: "",
      work_permit_of_other_country: "",
      differently_abled: "",
      languages: "",
    });

  const [editMode, setEditMode] = useState(false);
  const [personalDetailsId, setPersonalDetailsId] = useState<number | null>(
    null
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (resumeData && resumeData.data.length > 0) {
      const existingDetails = resumeData.data[0].personal_details[0]; // Assuming single entry for simplicity
      if (existingDetails) {
        setPersonalDetails({
          dob: existingDetails.dob,
          permanent_address: existingDetails.permanent_address,
          gender: existingDetails.gender,
          pin_code: existingDetails.pin_code,
          marital_status: existingDetails.marital_status,
          hometown: existingDetails.hometown,
          passport_number: existingDetails.passport_number,
          work_permit_of_other_country:
            existingDetails.work_permit_of_other_country,
          differently_abled: existingDetails.differently_abled,
          languages: existingDetails.languages,
        });
        setPersonalDetailsId(existingDetails.id);
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
    setPersonalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const {
      dob,
      permanent_address,
      gender,
      pin_code,
      marital_status,
      hometown,
      passport_number,
      work_permit_of_other_country,
      differently_abled,
      languages,
    } = personalDetails;

    if (
      !dob ||
      !permanent_address ||
      !gender ||
      !pin_code ||
      !marital_status ||
      !hometown ||
      !passport_number ||
      !work_permit_of_other_country ||
      !differently_abled ||
      !languages
    ) {
      setError("All fields must be filled");
      return false;
    }

    setError("");
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    if (editMode && personalDetailsId !== null) {
      await updatePersonalDetails({
        data: personalDetails,
        personal_detail_id: personalDetailsId,
      });
    } else {
      await createPersonalDetails(personalDetails);
    }
    onHide();
  };

  return (
    <div id="personal_details_bx" className="job-bx bg-white m-b30">
      <div className="d-flex">
        <h5 className="m-b30">Personal Details</h5>
        <Link
          href=""
          onClick={onShow}
          className="site-button add-btn button-sm"
        >
          <i className="fa fa-pencil m-r5"></i> Edit
        </Link>
      </div>

      <Modal
        className="modal fade modal-bx-info editor"
        show={show}
        onHide={onHide}
      >
        <div className="modal-dialog my-0" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="PersonaldetailsModalLongTitle">
                Personal Details
              </h5>
              <button type="button" className="close" onClick={onHide}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={personalDetails.dob}
                        onChange={handleChange}
                        placeholder="Enter Date of Birth"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Gender</label>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="male"
                              name="gender"
                              value="Male"
                              checked={personalDetails.gender === "Male"}
                              onChange={handleChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="male"
                            >
                              Male
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="female"
                              name="gender"
                              value="Female"
                              checked={personalDetails.gender === "Female"}
                              onChange={handleChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="female"
                            >
                              Female
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Permanent Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="permanent_address"
                        value={personalDetails.permanent_address}
                        onChange={handleChange}
                        placeholder="Enter Your Permanent Address"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Hometown</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hometown"
                        value={personalDetails.hometown}
                        onChange={handleChange}
                        placeholder="Enter Hometown"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Pincode</label>
                      <input
                        type="text"
                        className="form-control"
                        name="pin_code"
                        value={personalDetails.pin_code}
                        onChange={handleChange}
                        placeholder="Enter Pincode"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Marital Status</label>
                      <Form.Control
                        as="select"
                        name="marital_status"
                        value={personalDetails.marital_status}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Married">Married</option>
                        <option value="Single">Single / Unmarried</option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Passport Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="passport_number"
                        value={personalDetails.passport_number}
                        onChange={handleChange}
                        placeholder="Enter Passport Number"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>What assistance do you need</label>
                      <textarea
                        className="form-control"
                        name="differently_abled"
                        value={personalDetails.differently_abled}
                        onChange={handleChange}
                        placeholder="Type Description"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Languages</label>
                      <input
                        type="text"
                        className="form-control"
                        name="languages"
                        value={personalDetails.languages}
                        onChange={handleChange}
                        placeholder="Enter Languages"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Work Permit for Other Countries</label>
                      <Form.Control
                        as="select"
                        name="work_permit_of_other_country"
                        value={
                          personalDetails.work_permit_of_other_country || ""
                        }
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="India">India</option>
                        <option value="Australia">Australia</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="China">China</option>
                        <option value="Dubai">Dubai</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="USA">USA</option>
                      </Form.Control>
                    </div>
                  </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
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

      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <div className="clearfix m-b20">
            <label className="m-b0">Date of Birth</label>
            <span className="clearfix font-13">{personalDetails.dob}</span>
          </div>
          <div className="clearfix m-b20">
            <label className="m-b0">Gender</label>
            <span className="clearfix font-13">{personalDetails.gender}</span>
          </div>
          <div className="clearfix m-b20">
            <label className="m-b0">Marital Status</label>
            <span className="clearfix font-13">
              {personalDetails.marital_status}
            </span>
          </div>
          <div className="clearfix m-b20">
            <label className="m-b0">Passport Number</label>
            <span className="clearfix font-13">
              {personalDetails.passport_number}
            </span>
          </div>
          <div className="clearfix m-b20">
            <label className="m-b0">Differently Abled</label>
            <span className="clearfix font-13">
              {personalDetails.differently_abled}
            </span>
          </div>
          <div className="clearfix m-b20">
            <label className="m-b0">Languages</label>
            <span className="clearfix font-13">
              {personalDetails.languages}
            </span>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <div className="clearfix m-b20">
            <label className="m-b0">Permanent Address</label>
            <span className="clearfix font-13">
              {personalDetails.permanent_address}
            </span>
          </div>
          <div className="clearfix m-b20">
            <label className="m-b0">Area Pin Code</label>
            <span className="clearfix font-13">{personalDetails.pin_code}</span>
          </div>
          <div className="clearfix m-b20">
            <label className="m-b0">Hometown</label>
            <span className="clearfix font-13">{personalDetails.hometown}</span>
          </div>
          <div className="clearfix m-b20">
            <label className="m-b0">Work Permit of Other Country</label>
            <span className="clearfix font-13">
              {personalDetails.work_permit_of_other_country || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;



