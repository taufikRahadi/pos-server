import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ChargeEWallet, MidtransChargeGopayResponse, MidtransModuleOptions } from "./midtrans.interface";
const midtransClient = require('midtrans-client')

@Injectable()
export class MidtransService {
  
  constructor(
    private readonly configService: ConfigService,
  ) {
    this.core = new midtransClient.CoreApi({
      isProduction: this.configService.get<string>('APP_ENV') === 'dev' ? false : true,
      serverKey: this.configService.get<string>('MIDTRANS_SERVER_KEY'),
      clientKey: this.configService.get<string>('MIDTRANS_CLIENT_KEY')
    })
  }

  private core;

  async chargeEWallet(payload: ChargeEWallet): Promise<MidtransChargeGopayResponse> {
    try {
      console.log(payload);
      
      const request = await this.core.charge(payload)

      return request
    } catch (error) {
      console.log(error)
      throw error
    }
  }

}