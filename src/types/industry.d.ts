import { WritableDraft } from "immer";
interface Industry {
  id: number;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface IndustryResponse {
  code: number;
  success: boolean;
  message: string;
  data: Industry[];
}

type WritableIndustryResponse = WritableDraft<IndustryResponse>;
