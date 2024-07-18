import React from 'react';
import { Modal } from 'react-bootstrap';
import Link from 'next/link';

interface ProfileSummaryProps {
    show: boolean;
    onShow: () => void;
    onHide: () => void;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({ show, onShow, onHide }) => {
    return (
        <div id="profile_summary_bx" className="job-bx bg-white m-b30">
            <div className="d-flex">
                <h5 className="m-b15">Profile Summary</h5>
                <Link href='' onClick={onShow} className="site-button add-btn button-sm">
                    <i className="fa fa-pencil m-r5"></i> Edit
                </Link>
            </div>
            <p className="m-b0">Your Profile Summary should mention the highlights of your career and education, what your professional interests are, and what kind of a career you are looking for. Write a meaningful summary of more than 50 characters.</p>

            <Modal className="modal fade modal-bx-info editor" show={show} onHide={onHide}>
                <div className="modal-dialog my-0" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Profile Summary</h5>
                            <button type="button" className="close" onClick={onHide}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Your Profile Summary should mention the highlights of your career and education, what your professional interests are, and what kind of a career you are looking for. Write a meaningful summary of more than 50 characters.</p>
                            <form>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Details of Project</label>
                                            <textarea className="form-control" placeholder="Type Description"></textarea>
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
        </div>
    );
}

export default ProfileSummary;
