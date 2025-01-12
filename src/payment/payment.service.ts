import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import axios, { Axios } from 'axios';
import {subDays} from 'date-fns';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(dto: CreatePaymentDto, userId: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: dto.bookingId },
      include: { user: true, busRoute: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    let amount = booking.busRoute.price;
    const lastBooking= await this.prisma.booking.findFirst({
      where: { userId },
      orderBy:{createdAt:'desc'},
    });

    if (lastBooking && lastBooking.createdAt >=subDays(new Date(),30)) {
      amount *= 0.8; // Apply 20% discount
    }

    const payment = await this.prisma.payment.create({
      data: {
        bookingId: dto.bookingId,
        amount,
        status: 'pending',
      },
    });
    const chapaPayload = {
      amount: dto.amount,
      currency: dto.currency,
      email: dto.email,
      first_name: dto.firstName,
      last_name: dto.lastName,
      phone_number: dto.phoneNumber,
      tx_ref: `tx-${Date.now()}`,
      callback_url: dto.callbackUrl,
      return_url: dto.callbackUrl,
      customizations: {
        title: 'Bus Booking Payment',
        description: `Payment for booking ID ${dto.bookingId}`,
      },
    };

    try{
    const response = await axios.post('https://api.chapa.co/v1/transaction/initialize', chapaPayload ,{
     headers:{
            Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
            'Content-Type':'application/json',
         },
    });
    if (response.data.status !== 'success') {
      throw new Error('Failed to initialize payment');
    }
    return { checkout_url: response.data.data.checkout_url };
     }catch (error) {
      if (axios.isAxiosError(error)){
        throw new Error(`Payment initialization failed: ${error.message}`);
      }
      throw new Error('An unexpected error occurred');
      
    }
  }

   
     // callback_url: 'http://localhost:8000/payment/callback',
      //return_url: 'http://localhost:8000/payment/success',
    

  async handleCallback(tx_ref: string, status: string) {
    const paymentId = parseInt(tx_ref.split('-')[1]);
    const payment = await this.prisma.payment.update({
      where: { id: paymentId },
      data: { status },
    });

    if (status === 'success') {
      await this.prisma.booking.update({
        where: { id: payment.bookingId },
        data: { status: 'reserved' },
      });
    }

    return payment;
  }
}
