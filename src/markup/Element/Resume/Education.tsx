import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import Link from 'next/link';

interface EducationProps {
    show: boolean;
    onShow: () => void;
    onHide: () => void;
}

const Education: React.FC<EducationProps> = ({ show, onShow, onHide }) => {
    return (
        <div id="education_bx" className="job-bx bg-white m-b30">
            <div className="d-flex">
                <h5 className="m-b15">Education</h5>
                <Link href='' onClick={onShow} className="site-button add-btn button-sm"><i className="fa fa-pencil m-r5"></i> Edit</Link>
            </div>
            <p>Mention your employment details including your current and previous company work experience</p>

            <Modal className="modal fade modal-bx-info editor" show={show} onHide={onHide}>
                <div className="modal-dialog my-0" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="EducationModalLongTitle">Education</h5>
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
                                            <Form.Control as="select">
                                                <option>Doctorate/PhD</option>
                                                <option>Masters/Post-Graduation</option>
                                                <option>Graduation/Diploma</option>
                                            </Form.Control>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Course</label>
                                            <input type="email" className="form-control" placeholder="Select Course" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>University/Institute</label>
                                            <input type="email" className="form-control" placeholder="Select University/Institute" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="site-button" onClick={onHide}>Cancel</button>
                            <button type="button" className="site-button">Save</button>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="clearfix m-b20">
                        <label className="m-b0">London - 12th</label>
                        <span className="clearfix font-13">2017</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">London - 10th</label>
                        <span className="clearfix font-13">2015</span>
                    </div>
                </div>
            </div>
            <Link href='' className="clearfix">Add Doctorate/PhD</Link>
            <Link href='' className="clearfix">Add Masters/Post-Graduation</Link>
            <Link href='' className="clearfix">Add Graduation/Diploma</Link>
        </div>
    );
}

export default Education;
