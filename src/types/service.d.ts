import { WritableDraft } from "immer";

// types.ts
export interface Service {
  id: number;
  title: string;
  description: string;
  image: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceResponse {
  code: number;
  success: boolean;
  data: Service[];
}
type WritableServiceResponse = WritableDraft<ServiceResponse>;

export { WritableServiceResponse };
