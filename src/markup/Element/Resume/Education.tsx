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
    // title: "",
    year: "",
    // description: "",
    education: "",
    course: "",
    university: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [educationId, setEducationId] = useState<number | null>(null);

  useEffect(() => {
    if (resumeData && resumeData.data.length > 0) {
      const existingEducation = resumeData.data[0].educations[0]; // Assuming single education entry for simplicity
      if (existingEducation) {
        setEducation({
          // title: existingEducation.title,
          year: existingEducation.year,
          // description: existingEducation.description,
          education: existingEducation.education,
          course: existingEducation.course,
          university: existingEducation.university,
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
        Mention your employment details including your current and previous
        company work experience
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
                Education
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
                      <label>Education</label>
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
                      <input
                        type="text"
                        className="form-control"
                        name="course"
                        value={education.course}
                        onChange={handleChange}
                        placeholder="Select Course"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>University/Institute</label>
                      <input
                        type="text"
                        className="form-control"
                        name="university"
                        value={education.university}
                        onChange={handleChange}
                        placeholder="Select University/Institute"
                      />
                    </div>
                  </div>
                  {/* <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={education.title}
                        onChange={handleChange}
                        placeholder="Enter Title"
                      />
                    </div>
                  </div> */}
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Year</label>
                      <input
                        type="text"
                        className="form-control"
                        name="year"
                        value={education.year}
                        onChange={handleChange}
                        placeholder="Enter Year"
                      />
                    </div>
                  </div>
                  {/* <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={education.description}
                        onChange={handleChange}
                        placeholder="Type Description"
                      ></textarea>
                    </div>
                  </div> */}
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
              {/* <label className="m-b0">{edu.title}</label> */}
              <span className="clearfix font-17 d-flex">
                {" "}
                <b>Years :</b>
                {edu.year}
              </span>
              <p className="m-b0 d-flex font-17">
                <b>Course : </b>
                {edu.course}
              </p>
              <p className="m-b0 d-flex font-17">
                <b>University : </b>
                {edu.university}
              </p>
              {/* <p className="m-b0">Description : {edu.description}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
