export interface MidtransModuleOptions {
  isProduction?: boolean;
  serverKey?: string;
  clientKey?: string;
}

export interface MidtransAsyncModuleOptions {
  imports?: any,
  inject?: any;
  useFactory?: (args?: any) => Promise<MidtransModuleOptions> | MidtransModuleOptions
}

export const availableEWalletService = ['gopay', 'shopeepay', 'ovo']

export interface ChargeEWallet {
  payment_type: string;
  transaction_details: {
    gross_amount: number;
    order_id: string;
  }
}

export interface MidtransChargeGopayResponseAction {
  name: string;
  method: 'GET' | 'POST';
  url: string;
}

export interface MidtransChargeGopayResponse {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  currency: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  actions: MidtransChargeGopayResponseAction[];
}
