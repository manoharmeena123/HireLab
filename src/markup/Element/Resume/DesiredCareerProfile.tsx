import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import Link from 'next/link';

interface DesiredCareerProfileProps {
    show: boolean;
    onShow: () => void;
    onHide: () => void;
}

const DesiredCareerProfile: React.FC<DesiredCareerProfileProps> = ({ show, onShow, onHide }) => {
    return (
        <div id="desired_career_profile_bx" className="job-bx bg-white m-b30">
            <div className="d-flex">
                <h5 className="m-b30">Desired Career Profile</h5>
                <Link href='' onClick={onShow} className="site-button add-btn button-sm"><i className="fa fa-pencil m-r5"></i> Edit</Link>
            </div>
            <Modal className="modal fade modal-bx-info editor" show={show} onHide={onHide}>
                <div className="modal-dialog my-0" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="DesiredprofileModalLongTitle">Desired Career Profile </h5>
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
                                            <Form.Control as="select">
                                                <option>Accounting / Finance</option>
                                                <option>Banking / Financial Services / Broking</option>
                                                <option>Education / Teaching / Training</option>
                                                <option>IT-Hardware & Networking</option>
                                                <option>Other</option>
                                            </Form.Control>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Functional Area / Department</label>
                                            <Form.Control as="select">
                                                <option>Agent</option>
                                                <option>Architecture / Interior Design</option>
                                                <option>Beauty / Fitness / Spa Services</option>
                                                <option>IT Hardware / Technical Support</option>
                                                <option>IT Software - System Programming</option>
                                                <option>Other</option>
                                            </Form.Control>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Role</label>
                                            <Form.Control as="select">
                                                <option>Creative</option>
                                                <option>Web Designer</option>
                                                <option>Graphic Designer</option>
                                                <option>National Creative Director</option>
                                                <option>Fresher</option>
                                                <option>Other</option>
                                            </Form.Control>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Job Type</label>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="permanent" name="example1" />
                                                        <label className="custom-control-label" htmlFor="permanent">Permanent</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="contractual" name="example1" />
                                                        <label className="custom-control-label" htmlFor="contractual">Contractual</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Employment Type</label>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="fulltime" name="example1" />
                                                        <label className="custom-control-label" htmlFor="fulltime">Full Time</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="parttime" name="example1" />
                                                        <label className="custom-control-label" htmlFor="parttime">Part Time</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Preferred Shift</label>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" id="day" name="example1" />
                                                        <label className="custom-control-label" htmlFor="day">Day</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" id="night" name="example1" />
                                                        <label className="custom-control-label" htmlFor="night">Night</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" id="flexible" name="example1" />
                                                        <label className="custom-control-label" htmlFor="flexible">Part Time</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-6">
                                        <div className="form-group">
                                            <label>Availability to Join</label>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                    <Form.Control as="select">
                                                        <option>2018</option>
                                                        <option>2019</option>
                                                        <option>2020</option>
                                                        <option>2021</option>
                                                        <option>2022</option>
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
                                            <label>Expected Salary</label>
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" id="usdollars" name="example1" />
                                                        <label className="custom-control-label" htmlFor="usdollars">US Dollars</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" id="rupees" name="example1" />
                                                        <label className="custom-control-label" htmlFor="rupees">Indian Rupees</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-6">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                    <Form.Control as="select">
                                                        <option>0 lakh</option>
                                                        <option>1 lakh</option>
                                                        <option>2 lakh</option>
                                                        <option>5 lakh</option>
                                                        <option>4 lakh</option>
                                                        <option>5 lakh</option>
                                                    </Form.Control>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                    <Form.Control as="select">
                                                        <option> 05 Thousand </option>
                                                        <option> 10 Thousand </option>
                                                        <option> 15 Thousand </option>
                                                        <option> 20 Thousand </option>
                                                        <option> 25 Thousand </option>
                                                        <option> 30 Thousand </option>
                                                        <option> 35 Thousand </option>
                                                        <option> 40 Thousand </option>
                                                        <option> 45 Thousand </option>
                                                        <option> 50 Thousand </option>
                                                    </Form.Control>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Desired Location</label>
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
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Desired Industry</label>
                                            <Form.Control as="select">
                                                <option>Software</option>
                                                <option>Factory</option>
                                                <option>Ngo</option>
                                                <option>Other</option>
                                            </Form.Control>
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
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="clearfix m-b20">
                        <label className="m-b0">Industry</label>
                        <span className="clearfix font-13">IT-Software/Software Services</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">Role</label>
                        <span className="clearfix font-13">Web Designer</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">Employment Type</label>
                        <span className="clearfix font-13">Full Time</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">Availability to Join</label>
                        <span className="clearfix font-13">12 July</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">Desired Location</label>
                        <span className="clearfix font-13">Add Desired Location</span>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="clearfix m-b20">
                        <label className="m-b0">Functional Area</label>
                        <span className="clearfix font-13">Design / Creative / User Experience</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">Job Type</label>
                        <span className="clearfix font-13">permanent</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">Desired Shift</label>
                        <span className="clearfix font-13">Add Desired Shift</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">Expected Salary</label>
                        <span className="clearfix font-13">1 Lakhs</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">Desired Industry</label>
                        <span className="clearfix font-13">Add Desired Industry</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DesiredCareerProfile;
