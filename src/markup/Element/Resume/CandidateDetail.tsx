import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

interface CandidateDetailProps {
    setBasicDetails: React.Dispatch<React.SetStateAction<boolean>>;
    teamImg: StaticImageData;
}

const CandidateDetail: React.FC<CandidateDetailProps> = ({ setBasicDetails, teamImg }) => {
    return (
        <div className="candidate-detail">
            <div className="canditate-des text-center">
                <Link href='/'>
                    <Image alt="" src={teamImg} />
                </Link>
                <div className="upload-link" title="update" data-toggle="tooltip" data-placement="right">
                    <input type="file" className="update-flie" />
                    <i className="fa fa-camera"></i>
                </div>
            </div>
            <div className="text-white browse-job text-left">
                <h4 className="m-b0">John Doe
                    <Link href='' onClick={() => setBasicDetails(true)} className="m-l15 font-16 text-white"><i className="fa fa-pencil"></i></Link>
                </h4>
                <p className="m-b15">Freelance Senior PHP Developer at various agencies</p>
                <ul className="clearfix">
                    <li><i className="ti-location-pin"></i> Sacramento, California</li>
                    <li><i className="ti-mobile"></i> +1 123 456 7890</li>
                    <li><i className="ti-briefcase"></i> Fresher</li>
                    <li><i className="ti-email"></i> info@example.com</li>
                </ul>
                <div className="progress-box m-t10">
                    <div className="progress-info">Profile Strength (Average)<span>70%</span></div>
                    <div className="progress">
                        <div className="progress-bar bg-primary" style={{ width: "80%" }} role="progressbar"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CandidateDetail;
