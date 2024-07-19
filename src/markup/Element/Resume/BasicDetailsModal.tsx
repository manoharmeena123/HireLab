import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import Link from 'next/link'
interface BasicDetailsModalProps {
    show: boolean;
    onHide: () => void;
    onShow: () => void;
}

const BasicDetailsModal: React.FC<BasicDetailsModalProps> = ({ show, onHide }) => {
    return (
        <Modal className="modal fade browse-job modal-bx-info editor" show={show} onHide={onHide}>
            <div className="modal-dialog my-0" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="ProfilenameModalLongTitle">Basic Details</h5>
                        <button type="button" className="close" onClick={onHide}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <label>Your Name</label>
                                        <input type="email" className="form-control" placeholder="Enter Your Name" />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" className="custom-control-input" id="fresher" name="example1" />
                                                    <label className="custom-control-label" htmlFor="fresher">Fresher</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" className="custom-control-input" id="experienced" name="example1" />
                                                    <label className="custom-control-label" htmlFor="experienced">Experienced</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <label>Select Your Country</label>
                                        <Form.Control as="select">
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
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <label>Select Your Country</label>
                                        <input type="text" className="form-control" placeholder="Select Your Country" />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <label>Select Your City</label>
                                        <input type="text" className="form-control" placeholder="Select Your City" />
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <label>Telephone Number</label>
                                        <div className="row">
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                                <input type="text" className="form-control" placeholder="Country Code" />
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                                <input type="text" className="form-control" placeholder="Area Code" />
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                                <input type="text" className="form-control" placeholder="Phone Number" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <h6 className="m-a0 font-14">info@example.com</h6>
                                        <Link href=''>Change Email Address</Link>
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
    );
}

export default BasicDetailsModal;
