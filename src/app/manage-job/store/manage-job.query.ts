// src/app/manage-jobs/store/manage-job.query.ts
import { ManageResponse, JobData } from '../types/index';
import { hirelabApiSlice } from '@/rtk/base-query';
import { queries } from './manage-job.api';

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: ['ManageJob','UpdateManageJob','DeleteManageJob'],
});

const manageJobApi = hirelabEnhancedSlice.injectEndpoints({
  endpoints: (builder) => ({
    getManageJob: builder.query<ManageResponse, void>({
      query: queries.getManageJob.query,
      providesTags: ['ManageJob'],
    }),
    updateManageJob: builder.mutation<ManageResponse, {  data: Partial<JobData> }>({
      query: ({  data }) => queries.updateManageJob.query( data),
      invalidatesTags: ['UpdateManageJob'],
    }),
    deleteManageJob: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => queries.deleteManageJob.query(id),
      invalidatesTags: ['DeleteManageJob'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetManageJobQuery, useUpdateManageJobMutation, useDeleteManageJobMutation } = manageJobApi;
export default manageJobApi;
