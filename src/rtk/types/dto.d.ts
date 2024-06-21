// src/rtk/types/dto.ts
export type Params<P> = P;
export type Headers<H> = H;
export type Body<B> = B;

export type QueryDefinition<P, H, B> = {
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
  params?: Params<P>;
  headers?: Headers<H>;
  body?: Body<B>;
};


// Example DTOs (Data Transfer Objects)
export interface UserDTO {
  id: string;
  name: string;
  email: string;
  // Add more fields as necessary
}

export interface RegisterDTO {
  name: string;
  email: string;
  mobile_number: string;
  // Add more fields as necessary
}