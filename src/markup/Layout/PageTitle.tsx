import React from "react";
import Link from "next/link";

const PageTitle = ({ activeName, motherName }: any) => {
  return (
    <>
      <div className="container">
        <div className="dez-bnr-inr-entry">
          <h1 className="text-white">{activeName}</h1>
          <div className="breadcrumb-row">
            {/* <ul className="list-inline">
              <li>
                <Link href={"#"}>{motherName}</Link>
              </li>
              <li>{activeName}</li>
            </ul> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default PageTitle;
