import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import Link from 'next/link';

interface EmploymentProps {
    show: boolean;
    onShow: () => void;
    onHide: () => void;
}

const Employment: React.FC<EmploymentProps> = ({ show, onShow, onHide }) => {
    return (
        <div id="employment_bx" className="job-bx bg-white m-b30">
            <div className="d-flex">
                <h5 className="m-b15">Employment</h5>
                <Link href='' onClick={onShow} className="site-button add-btn button-sm"><i className="fa fa-pencil m-r5"></i> Edit</Link>
            </div>
            <h6 className="font-14 m-b0">Junior Software Developer</h6>
            <p className="m-b0">W3itexperts</p>
            <p className="m-b0">Oct 2015 to Present (3 years 4 months)</p>
            <p className="m-b0">Available to join in 1 Months</p>
            <p className="m-b0">Junior Software Developer</p>

            <Modal show={show} onHide={onHide} className="modal fade modal-bx-info editor">
                <div className="modal-dialog my-0" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="EmploymentModalLongTitle">Add Employment</h5>
                            <button type="button" className="close" onClick={onHide}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Your Designation</label>
                                            <input type="email" className="form-control" placeholder="Enter Your Designation" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Your Organization</label>
                                            <input type="email" className="form-control" placeholder="Enter Your Organization" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Is this your current company?</label>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" id="employ_yes" name="example1" />
                                                        <label className="custom-control-label" htmlFor="employ_yes">Yes</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" id="employ_no" name="example1" />
                                                        <label className="custom-control-label" htmlFor="employ_no">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Started Working From</label>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                    <Form.Control as="select">
                                                        <option>2018</option>
                                                        <option>2017</option>
                                                        <option>2016</option>
                                                        <option>2015</option>
                                                        <option>2014</option>
                                                        <option>2013</option>
                                                        <option>2012</option>
                                                        <option>2011</option>
                                                        <option>2010</option>
                                                        <option>2009</option>
                                                        <option>2008</option>
                                                        <option>2007</option>
                                                        <option>2006</option>
                                                        <option>2005</option>
                                                        <option>2004</option>
                                                        <option>2003</option>
                                                        <option>2002</option>
                                                        <option>2001</option>
                                                    </Form.Control>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                    <Form.Control as="select">
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Worked Till</label>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                    <Form.Control as="select">
                                                        <option>2018</option>
                                                        <option>2017</option>
                                                        <option>2016</option>
                                                        <option>2015</option>
                                                        <option>2014</option>
                                                        <option>2013</option>
                                                        <option>2012</option>
                                                        <option>2011</option>
                                                        <option>2010</option>
                                                        <option>2009</option>
                                                        <option>2008</option>
                                                        <option>2007</option>
                                                        <option>2006</option>
                                                        <option>2005</option>
                                                        <option>2004</option>
                                                        <option>2003</option>
                                                        <option>2002</option>
                                                        <option>2001</option>
                                                    </Form.Control>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                    <Form.Control as="select">
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Describe your Job Profile</label>
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

export default Employment;
