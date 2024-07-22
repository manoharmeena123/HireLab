import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Link from 'next/link';
import {
  useGetResumeDataQuery,
  useCreateResumeItSkillsMutation,
  useUpdateResumeItSkillsMutation
} from '@/app/my-resume/store/resume.query';
import { WritableResumeItSkill } from '@/app/my-resume/types/resume';

interface ITSkillsProps {
  show: boolean;
  onShow: () => void;
  onHide: () => void;
}

const ITSkills: React.FC<ITSkillsProps> = ({ show, onShow, onHide }) => {
  const { data: resumeData } = useGetResumeDataQuery();
  const [createITSkill] = useCreateResumeItSkillsMutation();
  const [updateITSkill] = useUpdateResumeItSkillsMutation();

  const [skillData, setSkillData] = useState<WritableResumeItSkill>({
    skill: '',
    version: '',
    last_used: '',
    experience: '',
    description: ''
  });

  const [editMode, setEditMode] = useState(false);
  const [skillId, setSkillId] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSkillData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!skillData.skill) newErrors.skill = 'Skill is required';
    if (!skillData.version) newErrors.version = 'Version is required';
    if (!skillData.last_used) newErrors.last_used = 'Last used is required';
    if (!skillData.experience) newErrors.experience = 'Experience is required';
    if (!skillData.description) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      if (editMode && skillId !== null) {
        await updateITSkill({ data: skillData, it_skill_id: skillId });
      } else {
        await createITSkill(skillData);
      }
      onHide();
    } catch (error) {
      console.error('Failed to save IT skill', error);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 }, (_, index) => 2000 + index);

  return (
    <div id="it_skills_bx" className="job-bx table-job-bx bg-white m-b30">
      <div className="d-flex">
        <h5 className="m-b15">IT Skills</h5>
        <Link href="" onClick={onShow} className="site-button add-btn button-sm">
          <i className="fa fa-plus m-r5"></i> Add
        </Link>
      </div>
      <p>Mention your employment details including your current and previous company work experience</p>
      <table>
        <thead>
          <tr>
            <th>Skills</th>
            <th>Version</th>
            <th>Last Used</th>
            <th>Experience</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {resumeData?.data[0]?.it_skills?.map((itSkill) => (
            <tr key={itSkill.id}>
              <td>{itSkill.skill}</td>
              <td>{itSkill.version}</td>
              <td>{itSkill.last_used}</td>
              <td>{itSkill.experience} Years</td>
              <td>
                <Link
                  href=""
                  className="m-l15 font-14"
                  onClick={() => {
                    setSkillData({
                      skill: itSkill.skill,
                      version: itSkill.version,
                      last_used: itSkill.last_used,
                      experience: itSkill.experience,
                      description: itSkill.description
                    });
                    setSkillId(itSkill.id);
                    setEditMode(true);
                    onShow();
                  }}
                >
                  <i className="fa fa-pencil"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal className="modal fade modal-bx-info editor" show={show} onHide={onHide}>
        <div className="modal-dialog my-0" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">IT Skills</h5>
              <button type="button" className="close" onClick={onHide}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>IT Skills</label>
                      <input
                        type="text"
                        className={`form-control ${errors.skill ? 'is-invalid' : ''}`}
                        name="skill"
                        value={skillData.skill}
                        onChange={handleChange}
                        placeholder="Enter IT Skills"
                      />
                      {errors.skill && <div className="invalid-feedback">{errors.skill}</div>}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>Version</label>
                      <input
                        type="text"
                        className={`form-control ${errors.version ? 'is-invalid' : ''}`}
                        name="version"
                        value={skillData.version}
                        onChange={handleChange}
                        placeholder="Enter Version"
                      />
                      {errors.version && <div className="invalid-feedback">{errors.version}</div>}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>Last Used</label>
                      <Form.Control
                        as="select"
                        name="last_used"
                        value={skillData.last_used}
                        onChange={handleChange}
                        className={errors.last_used ? 'is-invalid' : ''}
                      >
                        <option value="">Select Year</option>
                        {years.map(year => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </Form.Control>
                      {errors.last_used && <div className="invalid-feedback">{errors.last_used}</div>}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>Experience</label>
                      <input
                        type="text"
                        className={`form-control ${errors.experience ? 'is-invalid' : ''}`}
                        name="experience"
                        value={skillData.experience}
                        onChange={handleChange}
                        placeholder="Enter Experience"
                      />
                      {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        name="description"
                        value={skillData.description}
                        onChange={handleChange}
                        placeholder="Enter Description"
                      ></textarea>
                      {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="site-button" onClick={onHide}>
                Cancel
              </button>
              <button type="button" className="site-button" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ITSkills;
