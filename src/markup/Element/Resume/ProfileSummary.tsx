import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Link from "next/link";
import {
  useGetResumeDataQuery,
  useCreateProfileSummaryMutation,
  useUpdateProfileSummaryMutation,
} from "@/app/my-resume/store/resume.query";

interface ProfileSummaryProps {
  show: boolean;
  onShow: () => void;
  onHide: () => void;
}

interface ProfileSummaryData {
  id: number;
  description: string;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({
  show,
  onShow,
  onHide,
}) => {
  const { data: resumeData, isLoading } = useGetResumeDataQuery();
  const [createProfileSummary] = useCreateProfileSummaryMutation();
  const [updateProfileSummary] = useUpdateProfileSummaryMutation();

  const [profileSummary, setProfileSummary] = useState<ProfileSummaryData>({
    id: 0,
    description: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (resumeData && resumeData.data.length > 0) {
      const existingSummary = resumeData.data[0].profile_summaries[0]; // Assuming we take the first profile summary
      if (existingSummary) {
        setProfileSummary(existingSummary);
        setEditMode(true);
      }
    }
  }, [resumeData]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileSummary((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { description } = profileSummary;
    if (!description || description.length < 50) {
      setError("Profile summary must be more than 50 characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    if (editMode && profileSummary.id) {
      await updateProfileSummary({ data: profileSummary, profile_summary_id: profileSummary.id });
    } else {
      await createProfileSummary(profileSummary);
    }
    onHide();
  };

  return (
    <div id="profile_summary_bx" className="job-bx bg-white m-b30">
      <div className="d-flex">
        <h5 className="m-b15">Profile Summary</h5>
        <Link
          href="#"
          onClick={onShow}
          className="site-button add-btn button-sm"
        >
          <i className="fa fa-pencil m-r5"></i> Edit
        </Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="m-b0">{profileSummary.description}</p>
        </>
      )}

      <Modal
        className="modal fade modal-bx-info editor"
        show={show}
        onHide={onHide}
      >
        <div className="modal-dialog my-0" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Profile Summary</h5>
              <button type="button" className="close" onClick={onHide}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Your Profile Summary should mention the highlights of your
                career and education, what your professional interests are, and
                what kind of a career you are looking for. Write a meaningful
                summary of more than 50 characters.
              </p>
              <form>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Profile Summary</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={profileSummary.description}
                        onChange={handleChange}
                        placeholder="Type Description"
                      ></textarea>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="site-button" onClick={onHide}>
                Cancel
              </button>
              <button type="button" className="site-button" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileSummary;
