import type { TransactionRegisteredPayload } from "./transactionType";

export type registerCustomerForm = {
  name: string,
  contact: string,
  address: string,
}

export type getCustomerDataType = {
  customer_id: string,
  customer_name: string,
  customer_contact: string,
  customer_address: string,
  customer_status: string,
}

export interface updateCustomer extends getCustomerDataType {
  customer_lat?: number,
  customer_lng?: number,
}


export type getCustomerNameDataType = {
  customer_name: string,
} 

export type CustomerDetailResponse = {
  customer_id?: string;
  customer_name?: string;
  customer_contact?: string;
  customer_since?: Date;
  customer_address?: string;
  customer_status?: 'ACTIVE' | 'SUSPENDED';
  customer_lat?: number | null;
  customer_lng?: number | null;
  transaction?: TransactionRegisteredPayload[];
};

