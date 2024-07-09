"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Select, { SingleValue } from "react-select";
import { useRouter } from "next/navigation";
import { useAuthToken } from "@/hooks/useAuthToken";
import { useUpdateProfileMutation } from "./store/job-poster.query";
import { useGetCategoriesQuery } from "@/store/global-store/global.query";
import { WritableProfileData } from "./types/index";
import { toast } from "react-toastify";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useGetDesignationQuery } from "@/store/global-store/global.query";
import { useLogoutMutation } from "@/app/login/store/login.query";
import { navigateSource } from "@/lib/action";
interface OptionType {
  id: string;
  value: string;
  label: string;
}

const Companyprofile = () => {
  const { token } = useAuthToken();
  const { user, refetch } = useLoggedInUser();
  const router = useRouter();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [logout] = useLogoutMutation();
  const { removeToken } = useAuthToken();


  const handleLogout = async () => {
    try {
      await logout().unwrap();
      removeToken();
      navigateSource("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const [profileData, setProfileData] = useState<WritableProfileData>({
    name: null,
    email: null,
    website: null,
    founded_date: null,
    category_id: null,
    country: null,
    description: null,
    mobile_number: "",
    city: null,
    zip: null,
    address: null,
    facebook: null,
    twitter: null,
    google: null,
    linkedin: null,
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user?.user?.name || null,
        email: user?.user?.email || null,
        website: user?.user?.website || null,
        founded_date: user?.user?.founded_date || null,
        category_id: user?.user?.category_id?.toString() || null,
        country: user?.user?.country || null,
        description: user?.user?.description || null,
        mobile_number: user?.user?.mobile_number || "",
        city: user?.user?.city || null,
        zip: user?.user?.zip || null,
        address: user?.user?.address || null,
        facebook: user?.user?.facebook || null,
        twitter: user?.user?.twitter || null,
        google: user?.user?.google || null,
        linkedin: user?.user?.linkedin || null,
      });
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await updateProfile(profileData).unwrap();
      toast.success("Profile successfully updated");
      refetch();
      console.log("Profile Updated Successfully", response);
      // Redirect or show success message
    } catch (error) {
      console.error("Failed to update profile", error);
      // Handle error
    }
  };

  const handleCategoryChange = (selectedOption: SingleValue<OptionType>) => {
    const selectedCategoryId = (selectedOption as OptionType)?.id || null;
    setProfileData((prevState) => ({
      ...prevState,
      category_id: selectedCategoryId,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value === "" ? null : value,
    }));
  };

  const categoryOptions = categoriesData?.data?.map((category) => ({
    id: category.id.toString(),
    value: category.title,
    label: category.title,
  }));

  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: 38,
      minHeight: 38,
    }),
  };

  const { data: designationData } = useGetDesignationQuery(); // Fetch designation data

  const [designationOptions, setDesignationOptions] = useState<any[]>([]);
  const [designationLabel, setDesignationLabel] = useState<string>("");

  useEffect(() => {
    // Map designation options
    if (designationData?.data) {
      const options = designationData.data.map((designation: any) => ({
        value: designation.title,
        label: designation.title,
        id: designation.id.toString(),
      }));
      setDesignationOptions(options);
    }
  }, [designationData, refetch]);

  useEffect(() => {
    if (user && user.user?.designation_id !== null) {
      // Only proceed if user and designation_id are not null
      const designationId = user.user.designation_id.toString();
      const designation = designationOptions.find(
        (option) => option.id === designationId
      );
      if (designation) {
        setDesignationLabel(designation.label);
      } else {
        setDesignationLabel("Designation not found");
      }
    } else {
      setDesignationLabel("Designation not available");
    }
  }, [user, designationOptions, refetch]);
  return (
    <>
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-4 m-b30">
                  <div className="sticky-top">
                    <div className="candidate-info company-info">
                      <div className="candidate-detail text-center">
                        <div className="canditate-des">
                          <Link href={"#"}>
                          <Image
                            src={`http://thinkdream.in/hirelab/images/${user?.user?.image}`}
                            alt="Company Logo"
                            width={300}
                            height={300}
                          />
                        </Link>
                        </div>
                        <div className="candidate-title">
                          <h4 className="m-b5">
                            <Link href={"#"}>
                              {user?.user?.name || "User Name"}
                            </Link>
                          </h4>
                          <p className="m-b0">
                            <Link href={"#"}>
                              {designationLabel || "Not available"}
                            </Link>
                          </p>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <Link href="/profile" className="active">
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>{user?.user?.name} Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/post-job">
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            <span>Post A job</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/credit-earned">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <span>Credit Earned</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/manage-job">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            <span>Manage Jobs</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/" onClick={handleLogout}>
                            <i
                              className="fa fa-sign-out"
                              aria-hidden="true"
                            ></i>
                            <span>Log Out</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        {user?.user?.name}'s Profile
                      </h5>
                      <Link
                        href={"/company-profile"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="row m-b30">
                        {/* Company Details */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              type="text"
                              name="name"
                              value={profileData.name || ""}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Enter Your Name"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Your Email</label>
                            <input
                              type="email"
                              name="email"
                              value={profileData.email || ""}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Enter Your Gmail"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Website</label>
                            <input
                              type="text"
                              name="website"
                              value={profileData.website || ""}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Website Link"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Founded Date</label>
                            <input
                              type="text"
                              name="founded_date"
                              value={profileData.founded_date || ""}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="17/12/2018"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Category</label>
                            <Select
                              styles={customStyles}
                              value={categoryOptions?.find(
                                (option) =>
                                  option.id === profileData.category_id
                              )}
                              onChange={handleCategoryChange}
                              options={categoryOptions}
                              placeholder="Select Category"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Description:</label>
                            <textarea
                              className="form-control"
                              value={profileData.description || ""}
                              onChange={handleChange}
                              name="description"
                              placeholder="write about yourself"
                              rows={4}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      {/* Contact Information */}
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Contact Information
                        </h5>
                      </div>
                      <div className="row m-b30">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Phone</label>
                            <input
                              type="text"
                              name="mobile_number"
                              value={profileData.mobile_number}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Contact Number"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Country</label>
                            <input
                              type="text"
                              name="country"
                              value={profileData.country || ""}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Country"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>City</label>
                            <input
                              type="text"
                              name="city"
                              value={profileData.city || ""}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Enter City"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Zip Code</label>
                            <input
                              type="text"
                              name="zip"
                              value={profileData.zip || ""}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Enter Zip code"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Full Address</label>
                            <input
                              type="text"
                              name="address"
                              value={profileData.address || ""}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Enter Your Address"
                            />
                          </div>
                        </div>
                      </div>
                      {/* Social Link */}
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Social Link
                        </h5>
                      </div>
                      <div className="row m-b30">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Facebook</label>
                            <input
                              type="text"
                              name="facebook"
                              value={profileData.facebook || ""}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="www.facebook.com"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Twitter</label>
                            <input
                              type="text"
                              name="twitter"
                              value={profileData.twitter || ""}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="www.twitter.com"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Google</label>
                            <input
                              type="text"
                              name="google"
                              value={profileData.google || ""}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="www.google.com"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Linkedin</label>
                            <input
                              type="text"
                              name="linkedin"
                              value={profileData.linkedin || ""}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="www.linkedin.com"
                            />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="site-button m-b30">
                        Save Details
                      </button>
                    </form>
                  </div>
                </div>
                {/* Modal */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Companyprofile;
