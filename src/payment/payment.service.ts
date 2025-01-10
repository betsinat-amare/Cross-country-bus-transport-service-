import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import axios from 'axios';
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

    const response = await axios.post('https://api.chapa.co/v1/transaction/initialize', {
      amount,
      currency: 'ETB',
      email: booking.user.email,
      first_name: booking.firstName,
      last_name: booking.lastName,
      tx_ref: `tx-${payment.id}`,
      callback_url: 'http://localhost:8000/payment/callback',
      return_url: 'http://localhost:8000/payment/success',
    }, {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      },
    });

    return response.data;
  }

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
