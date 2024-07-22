"use client";
import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import Link from "next/link";
import {
  useGetResumeDataQuery,
  useCreateCareerProfileMutation,
  useUpdateCareerProfileMutation,
} from "@/app/my-resume/store/resume.query";
import { WritableCareerProfileData } from "@/app/my-resume/types/resume";

interface DesiredCareerProfileProps {
  show: boolean;
  onShow: () => void;
  onHide: () => void;
}

const DesiredCareerProfile: React.FC<DesiredCareerProfileProps> = ({
  show,
  onShow,
  onHide,
}) => {
  const { data: resumeData } = useGetResumeDataQuery();
  const [profileData, setProfileData] = useState<WritableCareerProfileData>({
    career_profile_id: undefined,
    industry: "",
    functional_area: "",
    role: "",
    job_type: "",
    employment_type: "",
    desired_shift: "",
    availability_to_join: "",
    expected_salary: "",
    desired_location: "",
    desired_industry: "",
  });

  const [createCareerProfile] = useCreateCareerProfileMutation();
  const [updateCareerProfile] = useUpdateCareerProfileMutation();
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (
      resumeData &&
      resumeData.data &&
      resumeData?.data[0]?.career_profiles?.length > 0
    ) {
      const initialProfile = resumeData?.data[0]?.career_profiles[0];
      setProfileData({
        ...initialProfile,
        expected_salary:
          initialProfile?.expected_salary?.replace(" lakh", "") || "",
      });
    }
  }, [resumeData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!profileData.industry) newErrors.industry = "Industry is required";
    if (!profileData.functional_area)
      newErrors.functional_area = "Functional Area is required";
    if (!profileData.role) newErrors.role = "Role is required";
    if (!profileData.job_type) newErrors.job_type = "Job Type is required";
    if (!profileData.employment_type)
      newErrors.employment_type = "Employment Type is required";
    if (!profileData.desired_shift)
      newErrors.desired_shift = "Desired Shift is required";
    if (!profileData.availability_to_join)
      newErrors.availability_to_join = "Availability to Join is required";
    if (!profileData.expected_salary)
      newErrors.expected_salary = "Expected Salary is required";
    if (!profileData.desired_location)
      newErrors.desired_location = "Desired Location is required";
    if (!profileData.desired_industry)
      newErrors.desired_industry = "Desired Industry is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      const updatedProfileData = {
        ...profileData,
        expected_salary: `${profileData.expected_salary} lakh`,
      };
      if (profileData.career_profile_id) {
        await updateCareerProfile({
          data: updatedProfileData,
          career_profile_id: profileData.career_profile_id,
        });
      } else {
        await createCareerProfile(updatedProfileData);
      }
      onHide();
    } catch (error) {
      console.error("Failed to save career profile", error);
    }
  };

  return (
    <div id="desired_career_profile_bx" className="job-bx bg-white m-b30">
      <div className="d-flex">
        <h5 className="m-b30">Desired Career Profile</h5>
        <Link
          href="#"
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
              <h5 className="modal-title" id="DesiredprofileModalLongTitle">
                Desired Career Profile{" "}
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
                      <label>Industry</label>
                      <Form.Control
                        as="select"
                        name="industry"
                        value={profileData.industry}
                        onChange={handleChange}
                        isInvalid={!!errors.industry}
                      >
                        <option value="">Select Industry</option>
                        <option>Accounting / Finance</option>
                        <option>Banking / Financial Services / Broking</option>
                        <option>Education / Teaching / Training</option>
                        <option>IT-Hardware & Networking</option>
                        <option>Other</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.industry}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Functional Area / Department</label>
                      <Form.Control
                        as="select"
                        name="functional_area"
                        value={profileData.functional_area}
                        onChange={handleChange}
                        isInvalid={!!errors.functional_area}
                      >
                        <option value="">Select Functional Area</option>
                        <option>Agent</option>
                        <option>Architecture / Interior Design</option>
                        <option>Beauty / Fitness / Spa Services</option>
                        <option>IT Hardware / Technical Support</option>
                        <option>IT Software - System Programming</option>
                        <option>Other</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.functional_area}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Role</label>
                      <Form.Control
                        as="select"
                        name="role"
                        value={profileData.role}
                        onChange={handleChange}
                        isInvalid={!!errors.role}
                      >
                        <option value="">Select Role</option>
                        <option>Creative</option>
                        <option>Web Designer</option>
                        <option>Graphic Designer</option>
                        <option>National Creative Director</option>
                        <option>Fresher</option>
                        <option>Other</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.role}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Job Type</label>
                      <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="permanent"
                              name="job_type"
                              value="permanent"
                              checked={profileData.job_type === "permanent"}
                              onChange={handleChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="permanent"
                            >
                              Permanent
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="contractual"
                              name="job_type"
                              value="contractual"
                              checked={profileData.job_type === "contractual"}
                              onChange={handleChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="contractual"
                            >
                              Contractual
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Employment Type</label>
                      <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="fulltime"
                              name="employment_type"
                              value="Full Time"
                              checked={profileData.employment_type.includes(
                                "Full Time"
                              )}
                              onChange={handleChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="fulltime"
                            >
                              Full Time
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="parttime"
                              name="employment_type"
                              value="Part Time"
                              checked={profileData.employment_type.includes(
                                "Part Time"
                              )}
                              onChange={handleChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="parttime"
                            >
                              Part Time
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Preferred Shift</label>
                      <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="day"
                              name="desired_shift"
                              value="Day"
                              checked={profileData.desired_shift === "Day"}
                              onChange={handleChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="day"
                            >
                              Day
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="night"
                              name="desired_shift"
                              value="Night"
                              checked={profileData.desired_shift === "Night"}
                              onChange={handleChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="night"
                            >
                              Night
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="flexible"
                              name="desired_shift"
                              value="Flexible"
                              checked={profileData.desired_shift === "Flexible"}
                              onChange={handleChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="flexible"
                            >
                              Flexible
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6">
                    <div className="form-group">
                      <label>Availability to Join</label>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <Form.Control
                            as="select"
                            name="availability_to_join"
                            value={profileData.availability_to_join}
                            onChange={handleChange}
                            isInvalid={!!errors.availability_to_join}
                          >
                            <option value="">Select Year</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.availability_to_join}
                          </Form.Control.Feedback>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <Form.Control
                            as="select"
                            name="availability_to_join"
                            value={profileData.availability_to_join}
                            onChange={handleChange}
                            isInvalid={!!errors.availability_to_join}
                          >
                            <option value="">Select Month</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.availability_to_join}
                          </Form.Control.Feedback>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Expected Salary</label>
                      <div className="row mt-3">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                          <Form.Control
                            as="select"
                            name="expected_salary"
                            value={profileData.expected_salary}
                            onChange={handleChange}
                            isInvalid={!!errors.expected_salary}
                          >
                            <option value="">Select Salary</option>
                            <option value="1">1 lakh</option>
                            <option value="2">2 lakh</option>
                            <option value="3">3 lakh</option>
                            <option value="4">4 lakh</option>
                            <option value="5">5 lakh</option>
                            <option value="6">6 lakh</option>
                            <option value="7">7 lakh</option>
                            <option value="8">8 lakh</option>
                            <option value="9">9 lakh</option>
                            <option value="10">10 lakh</option>
                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                            {errors.expected_salary}
                          </Form.Control.Feedback>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Desired Location</label>
                      <Form.Control
                        as="select"
                        name="desired_location"
                        value={profileData.desired_location}
                        onChange={handleChange}
                        isInvalid={!!errors.desired_location}
                      >
                        <option value="">Select Location</option>
                        <option>India</option>
                        <option>Australia</option>
                        <option>Bahrain</option>
                        <option>China</option>
                        <option>Dubai</option>
                        <option>France</option>
                        <option>Germany</option>
                        <option>Hong Kong</option>
                        <option>Kuwait</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.desired_location}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Desired Industry</label>
                      <Form.Control
                        as="select"
                        name="desired_industry"
                        value={profileData.desired_industry}
                        onChange={handleChange}
                        isInvalid={!!errors.desired_industry}
                      >
                        <option value="">Select Industry</option>
                        <option>Software</option>
                        <option>Factory</option>
                        <option>Ngo</option>
                        <option>Other</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.desired_industry}
                      </Form.Control.Feedback>
                    </div>
                  </div>
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

      {profileData && (
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="clearfix m-b20">
              <label className="m-b0">Industry</label>
              <span className="clearfix font-13">
                {profileData.industry || "N/A"}
              </span>
            </div>
            <div className="clearfix m-b20">
              <label className="m-b0">Role</label>
              <span className="clearfix font-13">
                {profileData.role || "N/A"}
              </span>
            </div>
            <div className="clearfix m-b20">
              <label className="m-b0">Employment Type</label>
              <span className="clearfix font-13">
                {profileData.role || "N/A"}
              </span>
            </div>
            <div className="clearfix m-b20">
              <label className="m-b0">Employment Type</label>
              <span className="clearfix font-13">
                {profileData.employment_type || "N/A"}
              </span>
            </div>
            <div className="clearfix m-b20">
              <label className="m-b0">Availability to Join</label>
              <span className="clearfix font-13">
                {profileData.availability_to_join || "N/A"}
              </span>
            </div>
            <div className="clearfix m-b20">
              <label className="m-b0">Desired Location</label>
              <span className="clearfix font-13">
                {profileData.desired_location || "N/A"}
              </span>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="clearfix m-b20">
              <label className="m-b0">Functional Area</label>
              <span className="clearfix font-13">
                {profileData.functional_area || "N/A"}
              </span>
            </div>
            <div className="clearfix m-b20">
              <label className="m-b0">Job Type</label>
              <span className="clearfix font-13">
                {profileData.job_type || "N/A"}
              </span>
            </div>
            <div className="clearfix m-b20">
              <label className="m-b0">Desired Shift</label>
              <span className="clearfix font-13">
                {profileData.desired_shift || "N/A"}
              </span>
            </div>
            <div className="clearfix m-b20">
              <label className="m-b0">Expected Salary</label>
              <span className="clearfix font-13">
                {profileData.expected_salary
                  ? `${profileData.expected_salary} lakh`
                  : "N/A"}
              </span>
            </div>
            <div className="clearfix m-b20">
              <label className="m-b0">Desired Industry</label>
              <span className="clearfix font-13">
                {profileData.desired_industry || "N/A"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesiredCareerProfile;
