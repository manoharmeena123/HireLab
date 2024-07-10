import { WritableDraft } from "immer";

// Buy pass
interface BuyPassData {
  event_id: string;
  amount: string;
}
interface BuyPassResponse {
  code: number;
  success: string;
  message: string;
  data: [];
}


export interface BuyPassState {
    buyPass: BuyPassData[];
    buyPassLoading: boolean,
    buyPassError:  string | null;
}

type WritableBuyPassResponse = WritableDraft<BuyPassResponse>;
type WritableBuyPassData = WritableDraft<BuyPassData>;
type WritableBuyPassState = WritableDraft<BuyPassState>;
// Export all types
export { WritableBuyPassResponse, WritableBuyPassData,WritableBuyPassState };
