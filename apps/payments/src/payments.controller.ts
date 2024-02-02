import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateChargeDto } from '@app/common';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  async createCharge(@Payload() { amount, card }: CreateChargeDto) {
    return this.paymentsService.createCharge(card, amount);
  }
}
