import { DynamicModule, Module } from "@nestjs/common";
import { MidtransModuleOptions } from "./midtrans.interface";
import { MidtransService } from "./midtrans.service";

@Module({

})
export class MidtransModule {
  static register(options?: MidtransModuleOptions): DynamicModule {
    return {
      module: MidtransModule,
      providers: [
        {
          provide: 'MIDTRANS_OPTIONS',
          useValue: options
        },
        MidtransService
      ],
      exports: [MidtransService]
    }
  }
}
