// src/app/manage-jobs/store/manage-job.api.ts
export const queries = {
  getManageJob: {
    query: () => ({
      url: "api/manage-jobs",
      method: "GET",
    }),
  },
  updateManageJob: {
    query: (id: string, data: any) => ({
      url: `api/manage-jobs/${id}`,
      method: "PATCH",
      body: data,
    }),
  },
  deleteManageJob: {
    query: (id: string) => ({
      url: `api/delete-job/${id}`,
      method: "GET",
    }),
  },
};
