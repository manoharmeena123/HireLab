import { WritableDraft } from "immer";
interface College {
  id: number;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface CollegeResponse {
  code: number;
  success: boolean;
  message: string;
  data: College[];
}

type WritableCollegeResponse = WritableDraft<CollegeResponse>;
