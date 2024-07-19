import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Link from 'next/link';
import { useGetResumeDataQuery, useCreateKeySkillMutation, useUpdateKeySkillMutation } from "@/app/my-resume/store/resume.query";
import { WritableKeySkillData } from "@/app/my-resume/types/resume";

interface KeySkillsProps {
    show: boolean;
    onShow: () => void;
    onHide: () => void;
}

const KeySkills: React.FC<KeySkillsProps> = ({ show, onShow, onHide }) => {
    const { data: resumeData, isLoading } = useGetResumeDataQuery();
    const [createKeySkill] = useCreateKeySkillMutation();
    const [updateKeySkill] = useUpdateKeySkillMutation();

    const [skills, setSkills] = useState<string>('');
    const [editMode, setEditMode] = useState(false);
    const [keySkillId, setKeySkillId] = useState<number | null>(null);

    useEffect(() => {
        if (resumeData && resumeData.data.length > 0) {
            const existingSkills = resumeData.data[0].key_skills;
            if (existingSkills.length > 0) {
                setSkills(existingSkills.map(skill => skill.title).join(', '));
                setKeySkillId(existingSkills[0].id);
                setEditMode(true);
            }
        }
    }, [resumeData]);

    const handleSave = async () => {
        const skillData: WritableKeySkillData = { title: skills };
        if (editMode && keySkillId !== null) {
            // Update existing key skills
            await updateKeySkill({ data: skillData, key_skill_id: keySkillId });
        } else {
            // Create new key skills
            await createKeySkill(skillData);
        }
        onHide();
    };

    return (
        <div id="key_skills_bx" className="job-bx bg-white m-b30">
            <div className="d-flex">
                <h5 className="m-b15">Key Skills</h5>
                <Link href='' data-toggle="modal" data-target="#keyskills" onClick={onShow} className="site-button add-btn button-sm">
                    <i className="fa fa-pencil m-r5"></i> Edit
                </Link>
            </div>
            <div className="job-time mr-auto">
                {skills.split(',').map((skill, index) => (
                    <Link href='' className="mr-1" key={index}><span>{skill.trim()}</span></Link>
                ))}
            </div>

            <Modal show={show} onHide={onHide} className="modal fade modal-bx-info editor">
                <div className="modal-dialog my-0" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="KeyskillsModalLongTitle">Key Skills</h5>
                            <button type="button" className="close" onClick={onHide}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>It is the first thing recruiters notice in your profile. Write concisely what makes you unique and right person for the job you are looking for.</p>
                            <form>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control tags_input"
                                                value={skills}
                                                onChange={(e) => setSkills(e.target.value)}
                                                placeholder="Type your skills separated by commas"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="site-button" onClick={onHide}>Cancel</button>
                            <button type="button" className="site-button" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default KeySkills;
