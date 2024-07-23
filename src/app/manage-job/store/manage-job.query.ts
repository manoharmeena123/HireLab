// src/app/manage-jobs/store/manage-job.query.ts
import { ManageResponse, JobData, getJobUserData,getJobUserDataResponse } from "../types/index";
import { hirelabApiSlice } from "@/rtk/base-query";
import { queries } from "./manage-job.api";

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: [
    "ManageJob",
    "UpdateManageJob",
    "DeleteManageJob",
    "GetJobUser",
  ],
});

const manageJobApi = hirelabEnhancedSlice.injectEndpoints({
  endpoints: (builder) => ({
    getManageJob: builder.query<ManageResponse, void>({
      query: queries.getManageJob.query,
      providesTags: ["ManageJob"],
    }),
    updateManageJob: builder.mutation<
      ManageResponse,
      { data: Partial<JobData> }
    >({
      query: ({ data }) => queries.updateManageJob.query(data),
      invalidatesTags: ["UpdateManageJob"],
    }),
    deleteManageJob: builder.mutation<{ success: boolean; id: string }, string>(
      {
        query: (id) => queries.deleteManageJob.query(id),
        invalidatesTags: ["DeleteManageJob"],
      }
    ),
    getJobUser: builder.mutation<getJobUserDataResponse, number>({
      query: (jobId) => queries.getJobUser.query(jobId),
      invalidatesTags: ["GetJobUser"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetManageJobQuery,
  useUpdateManageJobMutation,
  useDeleteManageJobMutation,
  useGetJobUserMutation
} = manageJobApi;
export default manageJobApi;
