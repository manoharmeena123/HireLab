import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import Link from "next/link";
import {
  useGetResumeDataQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
} from "@/app/my-resume/store/resume.query";
import { WritableEducationData } from "@/app/my-resume/types/resume";
import { toast } from "react-toastify";

interface EducationProps {
  show: boolean;
  onShow: () => void;
  onHide: () => void;
}

const Education: React.FC<EducationProps> = ({ show, onShow, onHide }) => {
  const { data: resumeData, isLoading } = useGetResumeDataQuery();
  const [createEducation] = useCreateEducationMutation();
  const [updateEducation] = useUpdateEducationMutation();

  const [education, setEducation] = useState<WritableEducationData>({
    education: "",
    course: "",
    university: "",
    start_year: "",
    end_year: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [educationId, setEducationId] = useState<number | null>(null);

  useEffect(() => {
    if (resumeData && resumeData.data.length > 0) {
      const existingEducation = resumeData.data[0].educations[0]; // Assuming single education entry for simplicity
      if (existingEducation) {
        setEducation({
          education: existingEducation.education,
          course: existingEducation.course,
          university: existingEducation.university,
          start_year: existingEducation.start_year,
          end_year: existingEducation.end_year,
        });
        setEducationId(existingEducation.id);
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
    setEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!education.education || !education.course || !education.university) {
      toast.error("Please fill in all fields", { theme: "colored" });
      return;
    }

    if (!education.start_year || !education.end_year) {
      toast.error("Please select both start and end years", { theme: "colored" });
      return;
    }

    const startYear = parseInt(education.start_year);
    const endYear = parseInt(education.end_year);

    if (startYear > endYear) {
      toast.error("Start year must be earlier than end year", { theme: "colored" });
      return;
    }

    try {
      if (editMode && educationId !== null) {
        const response = await updateEducation({
          data: education,
          education_id: educationId,
        });
        toast.success(response?.data?.message, { theme: "colored" });
      } else {
        const response = await createEducation(education);
        toast.success(response?.data?.message, { theme: "colored" });
      }
      onHide();
    } catch (error: any) {
      toast.error(error?.message, { theme: "colored" });
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
    <div id="education_bx" className="job-bx bg-white m-b30">
      <div className="d-flex">
        <h5 className="m-b15">Education</h5>
        <Link
          href=""
          onClick={onShow}
          className="site-button add-btn button-sm"
        >
          <i className="fa fa-pencil m-r5"></i> Edit
        </Link>
      </div>
      <p>
        Mention your education details including your degrees, courses, and
        universities attended
      </p>

      <Modal
        className="modal fade modal-bx-info editor"
        show={show}
        onHide={onHide}
      >
        <div className="modal-dialog my-0" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="EducationModalLongTitle">
                {editMode ? "Edit Education" : "Add Education"}
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
                      <label>Education Level</label>
                      <Form.Control
                        as="select"
                        name="education"
                        value={education.education}
                        onChange={handleChange}
                      >
                        <option value="">Select Education</option>
                        <option value="Doctorate/PhD">Doctorate/PhD</option>
                        <option value="Masters/Post-Graduation">
                          Masters/Post-Graduation
                        </option>
                        <option value="Graduation/Diploma">
                          Graduation/Diploma
                        </option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Course</label>
                      <Form.Control
                        as="select"
                        name="course"
                        value={education.course}
                        onChange={handleChange}
                      >
                        <option value="">Select Course</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Business Administration">
                          Business Administration
                        </option>
                        <option value="Engineering">Engineering</option>
                        <option value="Law">Law</option>
                        <option value="Medicine">Medicine</option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>University/Institute</label>
                      <Form.Control
                        as="select"
                        name="university"
                        value={education.university}
                        onChange={handleChange}
                      >
                        <option value="">Select University/Institute</option>
                        <option value="Harvard University">Harvard University</option>
                        <option value="Stanford University">Stanford University</option>
                        <option value="MIT">MIT</option>
                        <option value="University of Oxford">
                          University of Oxford
                        </option>
                        <option value="University of Cambridge">
                          University of Cambridge
                        </option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>Start Year</label>
                      <Form.Control
                        as="select"
                        name="start_year"
                        value={education.start_year}
                        onChange={handleChange}
                      >
                        <option value="">Select Start Year</option>
                        {generateYears().map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Form.Control>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>End Year</label>
                      <Form.Control
                        as="select"
                        name="end_year"
                        value={education.end_year}
                        onChange={handleChange}
                      >
                        <option value="">Select End Year</option>
                        {generateYears().map((year) => (
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
        <div className="col-lg-12 col-md-12 col-sm-12">
          {resumeData?.data[0]?.educations.map((edu: any, index: number) => (
            <div key={index} className="clearfix m-b20">
              <span className="clearfix font-17 d-flex">
                <b>Education Level: </b> {edu.education}
              </span>
              <span className="clearfix font-17 d-flex">
                <b>Course: </b> {edu.course}
              </span>
              <p className="m-b0 d-flex font-17">
                <b>University: </b> {edu.university}
              </p>
              <p className="m-b0 d-flex font-17">
                <b>Years: </b> {edu.start_year} - {edu.end_year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
