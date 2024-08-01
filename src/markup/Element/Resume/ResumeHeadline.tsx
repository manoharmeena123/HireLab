import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Link from "next/link";
import {
  useGetResumeDataQuery,
  useCreateResumeHeadlineMutation,
  useUpdateResumeHeadlineMutation,
} from "@/app/my-resume/store/resume.query";
import { WritableHeadlineData } from "@/app/my-resume/types/resume";
import { toast } from "react-toastify";

interface ResumeHeadlineProps {
  show: boolean;
  onShow: () => void;
  onHide: () => void;
}

const ResumeHeadline: React.FC<ResumeHeadlineProps> = ({
  show,
  onShow,
  onHide,
}) => {
  const { data: resumeData, isLoading } = useGetResumeDataQuery();
  const [createHeadline] = useCreateResumeHeadlineMutation();
  const [updateHeadline] = useUpdateResumeHeadlineMutation();

  const [headline, setHeadline] = useState<WritableHeadlineData>({
    description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [headlineId, setHeadlineId] = useState<number | null>(null);

  useEffect(() => {
    if (resumeData && resumeData.data.length > 0) {
      const existingHeadline = resumeData.data[0].headlines[0];
      if (existingHeadline) {
        setHeadline({ description: existingHeadline.description });
        setHeadlineId(existingHeadline.id);
        setEditMode(true);
      }
    }
  }, [resumeData]);

  const handleSave = async () => {
    try {
      if (editMode && headlineId !== null) {
        // Update existing headline
        const response = await updateHeadline({
          data: headline,
          headline_id: headlineId,
        });
        toast.success(response?.data?.message, { theme: "colored" });
      } else {
        // Create new headline
        const response = await createHeadline(headline);
        toast.success(response?.data?.message, { theme: "colored" });
      }
      onHide();
    } catch (error: any) {
      toast.error(error?.message, { theme: "colored" });
    }
  };

  return (
    <div id="resume_headline_bx" className="job-bx bg-white m-b30">
      <div className="d-flex">
        <h5 className="m-b15">Resume Headline</h5>
        <Link
          href=""
          className="site-button add-btn button-sm"
          onClick={onShow}
        >
          <i className="fa fa-pencil m-r5"></i> Edit
        </Link>
      </div>
      <p className="m-b0">
        {headline.description || "Job board currently living in USA"}
      </p>

      <Modal
        show={show}
        onHide={onHide}
        className="modal fade modal-bx-info editor"
      >
        <div className="modal-dialog my-0" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ResumeheadlineModalLongTitle">
                Resume Headline
              </h5>
              <button type="button" className="close" onClick={onHide}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                It is the first thing recruiters notice in your profile. Write
                concisely what makes you unique and right person for the job you
                are looking for.
              </p>
              <form>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Type Description"
                        value={headline.description}
                        onChange={(e) =>
                          setHeadline({
                            ...headline,
                            description: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="site-button" onClick={onHide}>
                Cancel
              </button>
              <button
                type="button"
                className="site-button"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ResumeHeadline;
