import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import {
  useGetResumeDataQuery,
  useCreateAttachmResumeFileMutation,
  useUpdateAttachResumeFileMutation,
} from "@/app/my-resume/store/resume.query";
import { useGetCvDownloadQuery } from '@/store/global-store/global.query'
import Loading from "@/components/Loading";
import { toast } from "react-toastify";

const AttachResume = () => {
  const { data: resumeData, isLoading } = useGetResumeDataQuery();
  const [createAttachmResumeFile] = useCreateAttachmResumeFileMutation();
  const [updateFile] = useUpdateAttachResumeFileMutation();
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null);
  const {data : resume} = useGetCvDownloadQuery()
  console.log('resume', resume)
  useEffect(() => {
    if (resumeData && resumeData.data.length > 0) {
      const resumeFile = resumeData.data[0]?.files?.[0];
      if (resumeFile) {
        setCurrentFile(resumeFile.file);
        setResumeId(resumeFile.id);
        setCurrentFileUrl(resumeFile.file); // Assuming the API provides a URL field
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
          let res;
          if (resumeId) {
            res = await updateFile(formData);
          } else {
            res = await createAttachmResumeFile(formData);
          }
          if (res && res.data) {
            toast.success(res.data.message, { theme: "colored" });
          } else {
            toast.error("Failed to upload file",{ theme: "colored" });
          }
          setCurrentFile(file.name);
          setCurrentFileUrl(URL.createObjectURL(file)); // Update the URL for download
        } catch (error: any) {
          toast.error(error?.message || "Failed to upload file", {
            theme: "colored",
          });
          console.error("Failed to upload file", error);
        }
      }
    },
    [resumeId, createAttachmResumeFile, updateFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {isLoading && <Loading />}
      <div id="attach_resume_bx" className="job-bx bg-white m-b30">
        <h5 className="m-b10">Attach Resume</h5>
        <p>
          Resume is the most important document recruiters look for. Recruiters
          generally do not look at profiles without resumes.
        </p>
        {currentFile && (
          <div className="m-b10">
            {currentFileUrl && (
              <a
                href={currentFileUrl}
                download={currentFile}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-download"></i> Download Resume
              </a>
            )}
            {currentFile}{" "}
          </div>
        )}
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
