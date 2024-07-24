// src/app/manage-jobs/store/manage-job.api.ts
export const queries = {
  getManageJob: {
    query: () => ({
      url: "api/manage-jobs",
      method: "GET",
    }),
  },
  updateManageJob: {
    query: ( data: any) => ({
      url: `api/update-job`,
      method: "POST",
      body: data,
    }),
  },
  deleteManageJob: {
    query: (id: string) => ({
      url: `api/delete-job/${id}`,
      method: "GET",
    }),
  },
  getJobUser :{
    query :(jobId :number) =>({
      url :`api/get-job-users/${jobId}`,
      method : "GET",
    })
  }
};
