// src/data/formatters/blogFormatter.ts

import { Blog } from '@/types/blog'; // Import the Blog interface

export const formatBlogData = (data: any[]): Blog[] => {
  return data.map((item) => ({
    id: item.id,
    parent_id: item.parent_id,
    title: item.title,
    description: item.description,
    image: item.image,
    meta_title: item.meta_title,
    meta_description: item.meta_description,
    status: item.status,
    created_at: new Date(item.created_at).toISOString(), // Ensure date is formatted properly
    updated_at: new Date(item.updated_at).toISOString(), // Ensure date is formatted properly
  }));
};
