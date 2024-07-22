import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import {
  useGetResumeDataQuery,
  useCreateAttachmResumeFileMutation,
  useUpdateAttachResumeFileMutation,
} from "@/app/my-resume/store/resume.query";
import Loading from "@/components/Loading";
const AttachResume = () => {
  const { data: resumeData, isLoading } = useGetResumeDataQuery();
  const [createAttachmResumeFile] = useCreateAttachmResumeFileMutation();
  const [updateFile] = useUpdateAttachResumeFileMutation();
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<string | null>(null);

  useEffect(() => {
    if (resumeData && resumeData.data.length > 0) {
      const resumeFile = resumeData.data[0]?.files?.[0];
      if (resumeFile) {
        setCurrentFile(resumeFile.file);
        setResumeId(resumeFile.id);
      }
    }
  }, [resumeData]);

  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      const file = acceptedFiles[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        if (resumeId) {
          formData.append("file_id", resumeId);
        }

        try {
          if (resumeId) {
            await updateFile(formData);
          } else {
            await createAttachmResumeFile(formData);
          }
          setCurrentFile(URL.createObjectURL(file));
        } catch (error) {
          console.error("Failed to upload file", error);
        }
      }
    },
    [resumeId, createAttachmResumeFile, updateFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
     { isLoading && <Loading />}
      <div id="attach_resume_bx" className="job-bx bg-white m-b30">
        <h5 className="m-b10">Attach Resume</h5>
        <p>
          Resume is the most important document recruiters look for. Recruiters
          generally do not look at profiles without resumes.
        </p>
        {currentFile && <div className="m-b10">{currentFile}</div>}
        <form className="attach-resume">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <div {...getRootProps()} className="custom-file">
                  <input
                    {...getInputProps()}
                    className="site-button form-control"
                    id="customFile"
                  />
                  <p className="m-auto align-self-center">
                    <i className="fa fa-upload"></i>
                    {isDragActive
                      ? "Drop the files here ..."
                      : "Upload Resume File size is 3 MB"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AttachResume;
