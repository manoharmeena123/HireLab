"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  useGetCommunityMutation,
  useGetDesignationQuery,
} from "@/store/global-store/global.query";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { IMAGE_URL } from "@/lib/apiEndPoints";
import Loading from "@/components/Loading";

const MyCommunity = () => {
  const { user } = useLoggedInUser();
  const [
    getCommunity,
    { data: getCommunityData, isLoading: getCommunityDataLoading },
  ] = useGetCommunityMutation();
  const { data: designationData, isLoading: designationDataLoading } =
    useGetDesignationQuery();
  const [designationOptions, setDesignationOptions] = useState<any[]>([]);

  useEffect(() => {
    if (user?.user?.communities?.length > 0) {
      const communityName = user.user.communities[0].name.replace(/\s+/g, "-");
      getCommunity(communityName);
    }
  }, [user, getCommunity]);

  useEffect(() => {
    if (designationData?.data) {
      const options = designationData.data.map((designation: any) => ({
        id: designation.id.toString(),
        title: designation.title,
      }));
      setDesignationOptions(options);
    }
  }, [designationData]);

  // Find the designation title based on designation_id
  const getDesignationTitle = (designationId: string) => {
    const designation = designationOptions.find(
      (option) => option.id === designationId
    );
    return designation ? designation.title : "Designation not available";
  };

  const communityUsers =
    getCommunityData?.data[0]?.users?.filter(
      (communityUser: any) => communityUser.id !== user?.user?.id
    ) || [];

  return (
    <>
      {getCommunityDataLoading && designationDataLoading && <Loading />}
      <div className="container mt-5">
        <div className="text-center mb-4">
          <h3 className="fw-bold">Community Members</h3>
          <p className="text-muted">
            <span className="fw-bold">Community Name:</span>{" "}
            {getCommunityData?.data[0]?.name || "No Community"}
          </p>
          <p className="text-muted">
            <span className="fw-bold">Total Members:</span>{" "}
            {communityUsers.length}
          </p>
        </div>

        {communityUsers.length > 0 ? (
          <div className="row">
            {communityUsers.map((communityUser: any) => (
              <div
                key={communityUser.id}
                className="col-lg-4 col-md-6 col-sm-12 mb-4"
              >
                <div
                  className="card text-center p-3"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    borderRadius: "10px",
                  }}
                >
                  <div className="d-flex justify-content-center mb-3">
                    {communityUser.image ? (
                      <Image
                        src={`${IMAGE_URL}${communityUser.image}`}
                        alt={communityUser.name}
                        className="rounded-circle"
                        width={120}
                        height={120}
                        objectFit="cover"
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                        style={{
                          width: "80px",
                          height: "80px",
                          fontSize: "30px",
                          fontWeight: "bold",
                        }}
                      >
                        {communityUser.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <h5 className="fw-bold mb-1">{communityUser.name}</h5>
                  <p className="text-muted small mb-1">
                    Designation:{" "}
                    {getDesignationTitle(communityUser.designation_id)}
                  </p>
                  <p className="text-muted small mb-1">
                    Company: {communityUser.company_name || "N/A"}
                  </p>
                  <p className="text-muted small mb-1">
                    Experience: {communityUser.experience || "N/A"} years
                  </p>
                  <p className="text-muted small mb-3">
                    Location: {communityUser.location || "N/A"}
                  </p>

                  <button
                    className="btn btn-outline-primary w-100 font-weight-bold"
                    style={{
                      borderRadius: "20px",
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#2A6310";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "blue";
                    }}
                    onClick={() =>
                      console.log(`Connect with ${communityUser.name}`)
                    }
                  >
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No members found</p>
        )}
      </div>
    </>
  );
};

export default MyCommunity;
