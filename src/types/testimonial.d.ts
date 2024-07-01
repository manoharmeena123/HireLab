// Define the interface for an individual testimonial
import { WritableDraft } from "immer";

export interface Testimonial {
  id: number;
  title: string;
  content: string;
  image: string;
  designation: string;
  created_at: string;
  updated_at: string;
  status: string;
}

// Define the interface for the response containing testimonials
export interface TestimonialResponse {
  code: number;
  success: boolean;
  message: string;
  data: Testimonial[];
}s

export type WritableTestimonialResponse = WritableDraft<TestimonialResponse>;
