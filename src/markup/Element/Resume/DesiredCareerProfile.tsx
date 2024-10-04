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
import { toast } from "react-toastify";

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

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 20 }, (_, index) => currentYear + index);
  };

  const generateSalaries = () => {
    return Array.from({ length: 50 }, (_, index) => index + 1);
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
        const response = await updateCareerProfile({
          data: updatedProfileData,
          career_profile_id: profileData.career_profile_id,
        });
        toast.success(response?.data?.message, { theme: "colored" });
      } else {
        const response = await createCareerProfile(updatedProfileData);
        toast.success(response?.data?.message, { theme: "colored" });
      }
      onHide();
    } catch (error: any) {
      toast.error(error?.message, { theme: "colored" });
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
                Desired Career Profile
              </h5>
              <button type="button" className="close" onClick={onHide}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  {Object.keys(errors).map((key) => (
                    <div key={key} className="col-lg-12 col-md-12">
                      <div className="alert alert-danger">{errors[key]}</div>
                    </div>
                  ))}
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
                      <Form.Control
                        as="select"
                        name="job_type"
                        value={profileData.job_type}
                        onChange={handleChange}
                        isInvalid={!!errors.job_type}
                      >
                        <option value="">Select Job Type</option>
                        <option value="permanent">Permanent</option>
                        <option value="contractual">Contractual</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.job_type}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Employment Type</label>
                      <Form.Control
                        as="select"
                        name="employment_type"
                        value={profileData.employment_type}
                        onChange={handleChange}
                        isInvalid={!!errors.employment_type}
                      >
                        <option value="">Select Employment Type</option>
                        <option>Full Time</option>
                        <option>Part Time</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.employment_type}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Preferred Shift</label>
                      <Form.Control
                        as="select"
                        name="desired_shift"
                        value={profileData.desired_shift}
                        onChange={handleChange}
                        isInvalid={!!errors.desired_shift}
                      >
                        <option value="">Select Preferred Shift</option>
                        <option value="Day">Day</option>
                        <option value="Night">Night</option>
                        <option value="Flexible">Flexible</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.desired_shift}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6">
                    <div className="form-group">
                      <label>Availability to Join</label>
                      <Form.Control
                        as="select"
                        name="availability_to_join"
                        value={profileData.availability_to_join}
                        onChange={handleChange}
                        isInvalid={!!errors.availability_to_join}
                      >
                        <option value="">Select Year</option>
                        {generateYears().map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.availability_to_join}
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Expected Salary (in lakh)</label>
                      <Form.Control
                        as="select"
                        name="expected_salary"
                        value={profileData.expected_salary}
                        onChange={handleChange}
                        isInvalid={!!errors.expected_salary}
                      >
                        <option value="">Select Salary</option>
                        {generateSalaries().map((salary) => (
                          <option key={salary} value={salary}>
                            {salary} lakh
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.expected_salary}
                      </Form.Control.Feedback>
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
                        <option>NGO</option>
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
