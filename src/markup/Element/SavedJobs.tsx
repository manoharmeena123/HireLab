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
import { useRouter } from "next/navigation";
import { formaterDate } from "@/utils/formateDate";
import Loading from "@/components/Loading";
import Pagination from "./Pagination"; // Import Pagination component

interface Job {
  id: number | string;
  title: string;
  company: string;
  date: string;
  image?: string;
}

const SavedJobs = () => {
  const { push } = useRouter();
  const router = useRouter();
  const {
    data: savedJob,
    refetch,
    isLoading: savedJobLoading,
  } = useGetSavedJobQuery();
  const [
    deleteSavedJob,
    { isLoading: deleteSavedJobLoading, isSuccess, isError },
  ] = useDeleteSavedJobMutation();
  const [postModal, setPostModal] = useState(false);
  const [contacts, setContacts] = useState<any>();
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set the number of items per page

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Delete data
  const handleDeleteClick = async (contactId: string) => {
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
          Swal.fire("Deleted!", "Your job has been deleted.", "success");
          refetch(); // Refetch data after deletion
        } catch (error) {
          Swal.fire("Error", "Failed to delete the job.", "error");
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
      setContacts((prevContacts: any) => [...prevContacts, newContact]);
      setPostModal(false);
      setAddFormData({ id: "", title: "", company: "", date: "", image: "" });
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
    const newContacts = contacts?.map((contact: any) =>
      contact.id === editContactId ? editedContact : contact
    );
    setContacts(newContacts);
    setEditContactId(null);
    setEditModal(false);
  };

  const viewJobHandler = (id: number) => {
    push(`/job-detail?jobId=${id}`);
  };

  // Get current jobs for the current page
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = savedJob?.data.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <>
      {savedJobLoading && deleteSavedJobLoading && <Loading />}
      <div className="job-bx save-job browse-job table-job-bx clearfix">
        <div className="row">
          <div className="col-lg-12">
            <h5 className="font-weight-700 pull-left text-uppercase">
              {savedJob?.data.length} Saved Jobs
            </h5>
            <button
              onClick={() => router.back()}
              className="site-button right-arrow button-sm float-right"
              style={{ fontFamily: "__Inter_Fallback_aaf875" }}
            >
              Back
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Jobs</th>
              <th>Company</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {savedJob?.data?.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  No job saved
                </td>
              </tr>
            ) : (
              currentJobs?.map((contact: any, index: number) => (
                <tr key={index}>
                  <td className="job-name">
                    <Link href={"/job-detail"}>{contact?.job_title}</Link>
                  </td>
                  <td className="criterias text-primary">
                    {contact?.company_name}
                  </td>
                  <td className="date">{formaterDate(contact?.created_at)}</td>
                  <td
                    className="job-links pencil"
                    style={{ cursor: "pointer" }}
                  >
                    <span onClick={() => viewJobHandler(contact?.id)}>
                      <i className="fa fa-eye"></i>
                    </span>
                    <Link
                      href={"#"}
                      onClick={() => handleDeleteClick(contact.id.toString())}
                    >
                      <i className="ti-trash"></i>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Component */}
        {savedJob?.data?.length !== 0 && (
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={savedJob?.data.length}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Modal for adding new job */}
      <Modal
        className="modal modal-bx-info fade"
        show={postModal}
        onHide={() => setPostModal(false)}
      >
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
            <div className="add-contact-box">
              <div className="add-contact-content">
                <div className="form-group">
                  <label className="text-black font-w500">Job Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={addFormData.title}
                    required
                    onChange={handleAddFormChange}
                    placeholder="Job Title"
                  />
                </div>
                <div className="form-group">
                  <label className="text-black font-w500">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="company"
                    value={addFormData.company}
                    required
                    onChange={handleAddFormChange}
                    placeholder="Company Name"
                  />
                </div>
                <div className="form-group">
                  <label className="text-black font-w500">Date</label>
                  <input
                    type="text"
                    className="form-control"
                    name="date"
                    value={addFormData.date}
                    required
                    onChange={handleAddFormChange}
                    placeholder="Date"
                  />
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
              Discard
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal for editing job */}
      <Modal
        className="modal modal-bx-info"
        show={editModal}
        onHide={() => setEditModal(false)}
      >
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
            <div className="add-contact-box">
              <div className="add-contact-content">
                <div className="form-group">
                  <label className="text-black font-w500">Job Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={editFormData.title}
                    required
                    onChange={handleEditFormChange}
                    placeholder="Job Title"
                  />
                </div>
                <div className="form-group">
                  <label className="text-black font-w500">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="company"
                    value={editFormData.company}
                    required
                    onChange={handleEditFormChange}
                    placeholder="Company Name"
                  />
                </div>
                <div className="form-group">
                  <label className="text-black font-w500">Date</label>
                  <input
                    type="text"
                    className="form-control"
                    name="date"
                    value={editFormData.date}
                    required
                    onChange={handleEditFormChange}
                    placeholder="Date"
                  />
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
              Discard
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default SavedJobs;
