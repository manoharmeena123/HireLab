import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import Link from 'next/link';

interface PersonalDetailsProps {
    show: boolean;
    onShow: () => void;
    onHide: () => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ show, onShow, onHide }) => {
    return (
        <div id="personal_details_bx" className="job-bx bg-white m-b30">
            <div className="d-flex">
                <h5 className="m-b30">Personal Details</h5>
                <Link href='' onClick={onShow} className="site-button add-btn button-sm"><i className="fa fa-pencil m-r5"></i> Edit</Link>
            </div>

            <Modal className="modal fade modal-bx-info editor" show={show} onHide={onHide}>
                <div className="modal-dialog my-0" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="PersonaldetailsModalLongTitle">Personal Details</h5>
                            <button type="button" className="close" onClick={onHide}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Date of Birth</label>
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                                    <Form.Control as="select">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                        <option>6</option>
                                                        <option>7</option>
                                                        <option>8</option>
                                                        <option>9</option>
                                                        <option>10</option>
                                                        <option>11</option>
                                                        <option>12</option>
                                                        <option>13</option>
                                                        <option>14</option>
                                                        <option>15</option>
                                                        <option>16</option>
                                                        <option>17</option>
                                                        <option>18</option>
                                                        <option>19</option>
                                                        <option>20</option>
                                                        <option>21</option>
                                                        <option>22</option>
                                                        <option>23</option>
                                                        <option>24</option>
                                                        <option>25</option>
                                                        <option>26</option>
                                                        <option>27</option>
                                                        <option>28</option>
                                                        <option>29</option>
                                                        <option>30</option>
                                                        <option>31</option>
                                                    </Form.Control>
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
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
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
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
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Gender</label>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" id="male" name="example1" />
                                                        <label className="custom-control-label" htmlFor="male">Male</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 col-md-6 col-sm-6 col-6">
                                                    <div className="custom-control custom-radio">
                                                        <input type="radio" className="custom-control-input" id="female" name="example1" />
                                                        <label className="custom-control-label" htmlFor="female">Female</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Permanent Address</label>
                                            <input type="email" className="form-control" placeholder="Enter Your Permanent Address" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Hometown</label>
                                            <input type="email" className="form-control" placeholder="Enter Hometown" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Pincode</label>
                                            <input type="email" className="form-control" placeholder="Enter Pincode" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Marital Status</label>
                                            <select>
                                                <option>Married</option>
                                                <option>Single / Unmarried</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Passport Number</label>
                                            <input type="email" className="form-control" placeholder="Enter Passport Number" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>What assistance do you need</label>
                                            <textarea className="form-control" placeholder="Type Description"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Work Permit for Other Countries</label>
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
                        <label className="m-b0">Date of Birth</label>
                        <span className="clearfix font-13">31 July 1998</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">Gender</label>
                        <span className="clearfix font-13">male</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">Marital Status</label>
                        <span className="clearfix font-13">Single / unmarried</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">Passport Number</label>
                        <span className="clearfix font-13">+ 123 456 7890</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">Differently Abled</label>
                        <span className="clearfix font-13">None</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">Languages</label>
                        <span className="clearfix font-13">English</span>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="clearfix m-b20">
                        <label className="m-b0">Permanent Address</label>
                        <span className="clearfix font-13">Add Permanent Address</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">Area Pin Code</label>
                        <span className="clearfix font-13">302010</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">Hometown</label>
                        <span className="clearfix font-13">Delhi</span>
                    </div>
                    <div className="clearfix m-b20">
                        <label className="m-b0">Work permit of other country</label>
                        <span className="clearfix font-13">USA</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalDetails;
