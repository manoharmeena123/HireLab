"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";
import {
  useGetSavedJobQuery,
  useDeleteSavedJobMutation,
} from "@/store/global-store/global.query";

import { formaterDate } from "@/utils/formateDate";
interface Job {
  id: number | string;
  title: string;
  company: string;
  date: string;
  image?: string;
}

const jobAlert: Job[] = [
  {
    id: 1,
    title: "Social Media Expert",
    company: "@company-name",
    date: "December 15,2018",
  },
  {
    id: 2,
    title: "Web Designer",
    company: "@company-name",
    date: "November 10,2018",
  },
  {
    id: 3,
    title: "Finance Accountant",
    company: "@company-name",
    date: "October 5,2018",
  },
  {
    id: 4,
    title: "Social Media Expert",
    company: "@company-name",
    date: "December 15,2018",
  },
  {
    id: 5,
    title: "Web Designer",
    company: "@company-name",
    date: "November 10,2018",
  },
  {
    id: 6,
    title: "Finance Accountant",
    company: "@company-name",
    date: "October 5,2018",
  },
  {
    id: 7,
    title: "Social Media Expert",
    company: "@company-name",
    date: "December 15,2018",
  },
  {
    id: 8,
    title: "Web Designer",
    company: "@company-name",
    date: "November 10,2018",
  },
  {
    id: 9,
    title: "Finance Accountant",
    company: "@company-name",
    date: "October 5,2018",
  },
  {
    id: 10,
    title: "Social Media Expert",
    company: "@company-name",
    date: "December 15,2018",
  },
];

const SavedJobs = () => {
  const { data: savedJob, refetch } = useGetSavedJobQuery();
  const [deleteSavedJob, { isLoading, isSuccess, isError }] =
    useDeleteSavedJobMutation();
  const [postModal, setPostModal] = useState(false);
  const [contacts, setContacts] = useState<Job[]>(jobAlert);
  const [addFormData, setAddFormData] = useState<Job>({
    id: "",
    title: "",
    company: "",
    date: "",
    image: "",
  });

  const [editModal, setEditModal] = useState(false);
  const [editContactId, setEditContactId] = useState<number | string | null>(
    null
  );
  const [editFormData, setEditFormData] = useState<Job>({
    id: "",
    title: "",
    company: "",
    date: "",
    image: "",
  });

  // Delete data
  const handleDeleteClick = async (contactId: string) => {
    console.log("contactId", contactId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteSavedJob(contactId).unwrap();
          console.log("API response:", response);
          Swal.fire("Deleted!", "Your job has been deleted.", "success");
          refetch(); // Example: refetch data after deletion
        } catch (error) {
          console.error("Error deleting:", error);
          Swal.fire("Error", "Failed to delete the file.", "error");
        }
      }
    });
  };

  // Handle form change
  const handleAddFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Add submit data
  const handleAddFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let error = false;
    let errorMsg = "";
    if (!addFormData.title) {
      error = true;
      errorMsg = "Please fill title";
    } else if (!addFormData.company) {
      error = true;
      errorMsg = "Please fill Company name.";
    } else if (!addFormData.date) {
      error = true;
      errorMsg = "Please fill Date";
    }
    if (!error) {
      const newContact: Job = {
        id: nanoid(),
        title: addFormData.title,
        company: addFormData.company,
        date: addFormData.date,
        image: addFormData.image,
      };
      setContacts((prevContacts) => [...prevContacts, newContact]);
      setPostModal(false);
      //   swal("Good job!", "Successfully Added", "success");
      setAddFormData({ id: "", title: "", company: "", date: "", image: "" });
    } else {
      //   swal("Oops", errorMsg, "error");
    }
  };

  // Edit function
  const handleEditClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    contact: Job
  ) => {
    event.preventDefault();
    setEditContactId(contact.id);
    setEditFormData({
      id: contact.id,
      title: contact.title,
      company: contact.company,
      date: contact.date,
      image: contact.image,
    });
    setEditModal(true);
  };

  // Handle edit form change
  const handleEditFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Edit form data submit
  const handleEditFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const editedContact: Job = {
      id: editContactId!,
      title: editFormData.title,
      company: editFormData.company,
      date: editFormData.date,
      image: editFormData.image,
    };
    const newContacts = contacts.map((contact) =>
      contact.id === editContactId ? editedContact : contact
    );
    setContacts(newContacts);
    setEditContactId(null);
    setEditModal(false);
  };

  return (
    <>
      <div className="job-bx save-job browse-job table-job-bx clearfix">
        <div className="job-bx-title clearfix">
          <h5 className="font-weight-700 pull-left text-uppercase">
            269 Saved Jobs
          </h5>
          <div className="float-right">
            <span className="select-title">Sort by freshness</span>
            {/* <select className="custom-btn">
							<option>Last 2 Months</option>
							<option>Last Months</option>
							<option>Last Weeks</option>
							<option>Last 3 Days</option>
						</select> */}
            <Link
              href={"#"}
              className="btn site-button"
              onClick={() => setPostModal(true)}
            >
              + Add Job
            </Link>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Premium jobs</th>
              <th>Company</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {savedJob?.data?.map((contact, index) => (
              <tr key={index}>
                <td className="job-post-company">
                  <Link href={"#"}>
                    <span>
                      <img alt="" src={require("../images/logo/icon2.png")} />
                    </span>
                  </Link>
                </td>
                <td className="job-name">
                  <Link href={"/job-detail"}>{contact?.job_title}</Link>
                </td>
                <td className="criterias text-primary">
                  <Link href={"/company-profile"}>{contact?.company_name}</Link>
                </td>
                <td className="date">{formaterDate(contact?.created_at)}</td>
                <td className="job-links pencil">
                  <Link
                    href={"#"}
                    onClick={(
                      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                    ) => handleEditClick(event, contact)}
                  >
                    <i className="fa fa-pencil"></i>
                  </Link>
                  <Link
                    href={"#"}
                    onClick={() => handleDeleteClick(contact.id.toString())}
                  >
                    <i className="ti-trash"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-bx float-right">
          <ul className="pagination">
            <li className="previous">
              <Link href={"#"}>
                <i className="ti-arrow-left"></i> Prev
              </Link>
            </li>
            <li className="active">
              <Link href={"#"}>1</Link>
            </li>
            <li>
              <Link href={"#"}>2</Link>
            </li>
            <li>
              <Link href={"#"}>3</Link>
            </li>
            <li className="next">
              <Link href={"#"}>
                Next <i className="ti-arrow-right"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Modal
        className="modal modal-bx-info fade"
        show={postModal}
        onHide={() => setPostModal(false)}
      >
        <div className="">
          <div className="">
            <form onSubmit={handleAddFormSubmit}>
              <div className="modal-header">
                <h4 className="modal-title fs-20">Add Task</h4>
                <button
                  type="button"
                  className="close"
                  onClick={() => setPostModal(false)}
                >
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <i className="flaticon-cancel-12 close"></i>
                <div className="add-contact-box">
                  <div className="add-contact-content">
                    {/* <div className="image-placeholder">	
											<div className="avatar-edit">
												<input type="file" onChange={fileHandler} id="imageUpload" 
													onClick={(event) => setFile(event.target.value)}
												/> 					
												<label htmlFor="imageUpload" name=''  ></label>
											</div>
											<div className="avatar-preview">
												<div id="imagePreview">
													<img id="saveImageFile" src={file? URL.createObjectURL(file) : user} 
														alt={file? file.name : null}
													/>
												</div>
											</div>
										</div>  */}
                    <div className="form-group">
                      <label className="text-black font-w500">Job Title</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          name="title"
                          required
                          onChange={handleAddFormChange}
                          placeholder="title"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="text-black font-w500">
                        Company Name
                      </label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          name="company"
                          required
                          onChange={handleAddFormChange}
                          placeholder="Company Name"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="text-black font-w500">Date</label>
                      <div className="contact-occupation">
                        <input
                          type="text"
                          autoComplete="off"
                          name="date"
                          required
                          className="form-control"
                          placeholder="date"
                          onChange={handleAddFormChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setPostModal(false)}
                  className="btn btn-danger"
                >
                  <i className="flaticon-delete-1"></i> Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <Modal
        className="modal modal-bx-info"
        show={editModal}
        onHide={() => setEditModal(false)}
      >
        <div className="">
          <div className="">
            <form onSubmit={handleEditFormSubmit}>
              <div className="modal-header">
                <h4 className="modal-title fs-20">Edit Task</h4>
                <button
                  type="button"
                  className="close"
                  onClick={() => setEditModal(false)}
                >
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <i className="flaticon-cancel-12 close"></i>
                <div className="add-contact-box">
                  <div className="add-contact-content">
                    <div className="form-group">
                      <label className="text-black font-w500">Job Title</label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          name="title"
                          required
                          value={editFormData.title}
                          onChange={handleEditFormChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="text-black font-w500">
                        Company Name
                      </label>
                      <div className="contact-name">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="off"
                          name="company"
                          required
                          value={editFormData.company}
                          onChange={handleEditFormChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="text-black font-w500">Client</label>
                      <div className="contact-occupation">
                        <input
                          type="text"
                          autoComplete="off"
                          name="date"
                          required
                          className="form-control"
                          value={editFormData.date}
                          onChange={handleEditFormChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="btn btn-danger"
                >
                  <i className="flaticon-delete-1"></i> Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default SavedJobs;
