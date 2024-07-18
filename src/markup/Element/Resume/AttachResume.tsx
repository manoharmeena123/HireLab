import React from 'react';
import Link from 'next/link';

const AttachResume: React.FC = () => {
    return (
        <div id="attach_resume_bx" className="job-bx bg-white m-b30">
            <h5 className="m-b10">Attach Resume</h5>
            <p>Resume is the most important document recruiters look for. Recruiters generally do not look at profiles without resumes.</p>
            <form className="attach-resume">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                            <div className="custom-file">
                                <p className="m-auto align-self-center">
                                    <i className="fa fa-upload"></i>
                                    Upload Resume File size is 3 MB
                                </p>
                                <input type="file" className="site-button form-control" id="customFile" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <p className="text-center">
                If you do not have a resume document, you may write your brief professional profile <Link href='' className="site-button-link">here</Link>.
            </p>
        </div>
    );
}

export default AttachResume;
