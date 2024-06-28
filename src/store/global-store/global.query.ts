import { createApi } from '@reduxjs/toolkit/query/react';
import { BlogResponse } from '@/types/blog';
import { hirelabApiSlice } from '@/rtk/base-query';
import { queries } from './global.api';

const hirelabEnhancedSlice = hirelabApiSlice.enhanceEndpoints({
  addTagTypes: ['Blogs'],
});

const blogsApi = hirelabEnhancedSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogsData: builder.query<BlogResponse, string>({ 
      query: queries.getBlogs.query, 
      providesTags: ['Blogs'], 
    }),
    getBlogsDataById: builder.query<BlogResponse, string>({
      query: (id) => queries.getBlogsById.query(id),
      providesTags: ['Blogs'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetBlogsDataQuery, useGetBlogsDataByIdQuery } = blogsApi;
export default blogsApi;
