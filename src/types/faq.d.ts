
import { WritableDraft } from "immer";

interface ReferralResponse {
    code: number;
    success: string;
    message: string;
    data: {
      id: number;
      title: string;
      heading: string;
      description: string;
      image: string | null;
      bg_image: string | null;
      meta_title: string | null;
      meta_description: string | null;
      sttaus: string;
      created_at: string | null;
      updated_at: string | null;
    };
  }


  interface SupportResponse {
    code: number;
    success: string;
    message: string;
    data: {
        id: number;
        title: string;
        heading: string;
        description: string;
        image: string | null;
        bg_image: string | null;
        meta_title: string | null;
        meta_description: string | null;
        sttaus: string;
        created_at: string | null;
        updated_at: string | null;
    };
  }
  interface RefundPolicyResponse {
    code: number;
    success: string;
    message: string;
    data: {
        id: number;
        title: string;
        heading: string;
        description: string;
        image: string | null;
        bg_image: string | null;
        meta_title: string | null;
        meta_description: string | null;
        sttaus: string;
        created_at: string | null;
        updated_at: string | null;
    };
  }
  

 type WritableReferralResponse = WritableDraft<ReferralResponse>;
 type WritableSupportResponse = WritableDraft<SupportResponse>;
 type WritableRefundPolicyResponse = WritableDraft<RefundPolicyResponse>;


export {
    WritableReferralResponse,
    WritableSupportResponse,
    WritableRefundPolicyResponse
}
