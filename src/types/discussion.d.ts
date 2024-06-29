import { WritableDraft } from 'immer';

interface Discussion {
    id: number;
    question: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
  }
  
  interface DiscussionResponse {
    code: number;
    success: boolean;
    message: string;
    data: Discussion[][];
  }

export type WritableDiscussionResponse = WritableDraft<DiscussionResponse>;
