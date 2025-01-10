import { Controller, Post, Body, Req, UseGuards, Param, Query,Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AuthGuard } from '@nestjs/passport';
import { ExpressRequest } from '../auth/types/expressRequest.interface';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPayment(@Body() dto: CreatePaymentDto, @Req() req: ExpressRequest) {
    const userId = req.user ? req.user.id : null;
    return this.paymentService.createPayment(dto, userId);
  }

  @Get('callback')
  async handleCallback(@Query('tx_ref') tx_ref: string, @Query('status') status: string) {
    return this.paymentService.handleCallback(tx_ref, status);
  }
}
