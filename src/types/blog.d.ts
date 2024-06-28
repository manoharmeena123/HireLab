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
  success: boolean;
  message: string;
  data: Blog[];
}

export interface BlogsState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
}

export interface Event {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  created_at: string;
  updated_at: string;
  status: string;
}

export interface EventResponse {
  code: number;
  success: boolean;
  message: string;
  data: Event[];
}

export interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
}
