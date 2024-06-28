export interface Blog {
  id: number;
  parent_id: number;
  title: string;
  description: string;
  image: string;
  meta_title: string | null;
  meta_description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface BlogResponse {
  code: number;
  success: string;
  message: string;
  data: Blog[];
}
export interface BlogsState {
  blogs: BlogResponse[];
  loading: boolean;
  error: string | null;
}
