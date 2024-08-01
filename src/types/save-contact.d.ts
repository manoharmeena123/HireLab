// C:\Users\DELL\Desktop\hirelab-api-updated\src\types\save-contact.d.ts

export interface SaveContactData {
    name: string;
    email: string;
    message: string;
    recaptchaToken?: string;
  }
  
  export interface SaveContactDataResponse {
    code: number;
    success: boolean;
    message: string;
    data: SaveContactData[];
  }
  
  export interface SaveContactDataState {
    saveContact: SaveContactData[];
    saveContactLoading: boolean;
    saveContactError: string | null;
  }
  
  