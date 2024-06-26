// src/rtk/types/paginated.ts\
import { UserDTO, RegisterDTO } from '@/rtk/types/dto';
import { PaginatedResponse } from '@/rtk/types/paginated';

export type Paginated = {
    lang: string;
    offset: number;
    [key: string]: unknown;
  };
  
  export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
  }
  
  // Example usage with a user list
  export type PaginatedUserResponse = PaginatedResponse<UserDTO>;