import { Controller, Post, Body, Req, UseGuards, Param, Query,Get,Res} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AuthGuard } from '@nestjs/passport';
import { ExpressRequest } from '../auth/types/expressRequest.interface';
import { Response} from 'express';
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  
  @Post()
  async createPayment(@Body() dto: CreatePaymentDto, @Req() req: ExpressRequest) {
    const userId = req.user ? req.user.id : null;
    return this.paymentService.createPayment(dto, userId);
  }

  @Get('callback')
  async handleCallback(@Query('tx_ref') tx_ref: string, @Query('status') status: string,@Res() res:Response) {
    return this.paymentService.handleCallback(tx_ref, status);
    if (status==='success'){
      return res.redirect('/payment/success');
    } else{
      return res.redirect('payment/failure');
    }
  }
  @Get('success')
  async showSuccessPage(@Res() res:Response){
    return res.sendFile('success.html',{root:'../success.html'});
  }
  @Get('failure')
  async showFailurePage(@Res() res:Response){
    return res.sendFile('failure.html', { root: '../failure.html' });

  }
}
