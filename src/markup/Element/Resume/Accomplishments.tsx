import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import Link from 'next/link';

interface AccomplishmentsProps {
    showOnlineProfile: boolean;
    showWorkSample: boolean;
    showWhitePaper: boolean;
    showPresentation: boolean;
    showPatent: boolean;
    showCertification: boolean;
    onShowOnlineProfile: () => void;
    onShowWorkSample: () => void;
    onShowWhitePaper: () => void;
    onShowPresentation: () => void;
    onShowPatent: () => void;
    onShowCertification: () => void;
    onHide: () => void;
}

const Accomplishments: React.FC<AccomplishmentsProps> = ({
    showOnlineProfile,
    showWorkSample,
    showWhitePaper,
    showPresentation,
    showPatent,
    showCertification,
    onShowOnlineProfile,
    onShowWorkSample,
    onShowWhitePaper,
    onShowPresentation,
    onShowPatent,
    onShowCertification,
    onHide
}) => {
    return (
        <div id="accomplishments_bx" className="job-bx bg-white m-b30">
            <h5 className="m-b10">Accomplishments</h5>
            <div className="list-row">
                <div className="list-line">
                    <div className="d-flex">
                        <h6 className="font-14 m-b5">Online Profile</h6>
                        <Link href='' onClick={onShowOnlineProfile} className="site-button add-btn button-sm">
                            <i className="fa fa-pencil m-r5"></i> Edit
                        </Link>
                    </div>
                    <p className="m-b0">Add link to Online profiles (e.g. Linkedin, Facebook etc.).</p>

                    <Modal className="modal fade modal-bx-info editor" show={showOnlineProfile} onHide={onHide}>
                        <div className="modal-dialog my-0" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Online Profiles</h5>
                                    <button type="button" className="close" onClick={onHide}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Social Profile</label>
                                                    <input type="email" className="form-control" placeholder="Social Profile Name" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>URL</label>
                                                    <input type="email" className="form-control" placeholder="www.google.com" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Description</label>
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
                <div className="list-line">
                    <div className="d-flex">
                        <h6 className="font-14 m-b5">Work Sample</h6>
                        <Link href='' onClick={onShowWorkSample} className="site-button add-btn button-sm">
                            <i className="fa fa-pencil m-r5"></i> Edit
                        </Link>
                    </div>
                    <p className="m-b0">Add link to your Projects (e.g. Github links etc.).</p>

                    <Modal className="modal fade modal-bx-info editor" show={showWorkSample} onHide={onHide}>
                        <div className="modal-dialog my-0" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Work Sample</h5>
                                    <button type="button" className="close" onClick={onHide}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Work Title</label>
                                                    <input type="email" className="form-control" placeholder="Enter Title" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>URL</label>
                                                    <input type="email" className="form-control" placeholder="www.google.com" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Duration From</label>
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
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Duration To</label>
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
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="check1" name="example1" />
                                                        <label className="custom-control-label" htmlFor="check1">I am currently working on this</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Description</label>
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
                <div className="list-line">
                    <div className="d-flex">
                        <h6 className="font-14 m-b5">White Paper / Research Publication / Journal Entry</h6>
                        <Link href='' onClick={onShowWhitePaper} className="site-button add-btn button-sm"><i className="fa fa-pencil m-r5"></i> Edit</Link>
                    </div>
                    <p className="m-b0">Add links to your Online publications.</p>

                    <Modal className="modal fade modal-bx-info editor" show={showWhitePaper} onHide={onHide}>
                        <div className="modal-dialog my-0" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="JournalentryModalLongTitle">White Paper / Research Publication / Journal Entry</h5>
                                    <button type="button" className="close" onClick={onHide}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Title</label>
                                                    <input type="email" className="form-control" placeholder="Enter Title" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>URL</label>
                                                    <input type="email" className="form-control" placeholder="www.google.com" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Published On</label>
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
                                                    <label>Description</label>
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
                <div className="list-line">
                    <div className="d-flex">
                        <h6 className="font-14 m-b5">Presentation</h6>
                        <Link href='' onClick={onShowPresentation} className="site-button add-btn button-sm"><i className="fa fa-pencil m-r5"></i> Edit</Link>
                    </div>
                    <p className="m-b0">Add links to your Online presentations (e.g. Slideshare presentation links etc.).</p>

                    <Modal className="modal fade modal-bx-info editor" id="presentation" show={showPresentation} onHide={onHide}>
                        <div className="modal-dialog my-0" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="PresentationModalLongTitle">Presentation</h5>
                                    <button type="button" className="close" onClick={onHide}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Title</label>
                                                    <input type="email" className="form-control" placeholder="Enter Title" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>URL</label>
                                                    <input type="email" className="form-control" placeholder="www.google.com" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Description</label>
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
                <div className="list-line">
                    <div className="d-flex">
                        <h6 className="font-14 m-b5">Patent</h6>
                        <Link href='' onClick={onShowPatent} className="site-button add-btn button-sm"><i className="fa fa-pencil m-r5"></i> Edit</Link>
                    </div>
                    <p className="m-b0">Add details of Patents you have filed.</p>

                    <Modal className="modal fade modal-bx-info editor" show={showPatent} onHide={onHide}>
                        <div className="modal-dialog my-0" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="PatentModalLongTitle">Patent</h5>
                                    <button type="button" className="close" onClick={onHide}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Title</label>
                                                    <input type="email" className="form-control" placeholder="Enter Title" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>URL</label>
                                                    <input type="email" className="form-control" placeholder="www.google.com" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Patent Office</label>
                                                    <input type="email" className="form-control" placeholder="Enter Patent Office" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Status</label>
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="custom-control custom-radio">
                                                                <input type="radio" className="custom-control-input" id="check2" name="example1" />
                                                                <label className="custom-control-label" htmlFor="check2">Patent Issued</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="custom-control custom-radio">
                                                                <input type="radio" className="custom-control-input" id="check3" name="example1" />
                                                                <label className="custom-control-label" htmlFor="check3">Patent pending</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Application Number</label>
                                                    <input type="email" className="form-control" placeholder="Enter Application Number" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Published On</label>
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
                                                    <label>Description</label>
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
                <div className="list-line">
                    <div className="d-flex">
                        <h6 className="font-14 m-b5">Certification</h6>
                        <Link href='' onClick={onShowCertification} className="site-button add-btn button-sm"><i className="fa fa-pencil m-r5"></i> Edit</Link>
                    </div>
                    <p className="m-b0">Add details of Certification you have filed.</p>

                    <Modal className="modal fade modal-bx-info editor" show={showCertification} onHide={onHide}>
                        <div className="modal-dialog my-0" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="CertificationModalLongTitle">Certification</h5>
                                    <button type="button" className="close" onClick={onHide}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Certification Name</label>
                                                    <input type="text" className="form-control" placeholder="Enter Certification Name" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Certification Body</label>
                                                    <input type="text" className="form-control" placeholder="Enter Certification Body" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Year On</label>
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
            </div>
        </div>
    );
}

export default Accomplishments;
