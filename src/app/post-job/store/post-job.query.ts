// src/app/post-job/store/post-job.query.ts

import { hirelabApiSlice } from '@/rtk/base-query';
import { queries } from './post-job.api';
import { PostJobType, PostJobResponse } from '../types';

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: ['PostJob'],
});

const postJobApiSlice = hirelabEnhancedSlice.injectEndpoints({
  endpoints: (builder) => ({
    postJob: builder.mutation<PostJobResponse, PostJobType>({
      query: (profileData) => queries.postJob.query(profileData),
      invalidatesTags: ['PostJob'],
    }),
  }),
});

export const { usePostJobMutation } = postJobApiSlice;
export default postJobApiSlice;
