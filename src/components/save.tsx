"use client"
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import { nanoid } from "nanoid";
import { useGetSavedJobQuery } from "@/store/global-store/global.query";

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
  const { data: savedJob, isError, isLoading } = useGetSavedJobQuery();
  console.log('savedJob', savedJob)
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
  const handleDeleteClick = (contactId: number | string) => {
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    setContacts(newContacts);
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
      swal("Good job!", "Successfully Added", "success");
      setAddFormData({ id: "", title: "", company: "", date: "", image: "" });
    } else {
      swal("Oops", errorMsg, "error");
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
              to={"#"}
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
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td className="job-post-company">
                  <Link to={"#"}>
                    <span>
                      <img
                        alt=""
                        src={require("../images/logo/icon2.png")}
                      />
                    </span>
                  </Link>
                </td>
                <td className="job-name">
                  <Link to={"/job-detail"}>{contact.title}</Link>
                </td>
                <td className="criterias text-primary">
                  <Link to={"/company-profile"}>{contact.company}</Link>
                </td>
                <td className="date">{contact.date}</td>
                <td className="job-links pencil">
                  <Link
                    to={"#"}
                    onClick={(event) => handleEditClick(event, contact)}
                  >
                    <i className="fa fa-pencil"></i>
                  </Link>
                  <Link to={"#"} onClick={() => handleDeleteClick(contact.id)}>
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
              <Link to={"#"}>
                <i className="ti-arrow-left"></i> Prev
              </Link>
            </li>
            <li className="active">
              <Link to={"#"}>1</Link>
            </li>
            <li>
              <Link to={"#"}>2</Link>
            </li>
            <li>
              <Link to={"#"}>3</Link>
            </li>
            <li className="next">
              <Link to={"#"}>
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
