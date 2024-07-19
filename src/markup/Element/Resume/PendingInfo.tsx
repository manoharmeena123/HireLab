import React from 'react';
import Link from 'next/link';

const PendingInfo: React.FC = () => {
    return (
        <Link href=''>
            <div className="pending-info text-white p-a25">
                <h5>Pending Action</h5>
                <ul className="list-check secondry">
                    <li>Verify Mobile Number</li>
                    <li>Add Preferred Location</li>
                    <li>Add Resume</li>
                </ul>
            </div>
        </Link>
    );
}

export default PendingInfo;
