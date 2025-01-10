import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ExpressRequest } from '../auth/types/expressRequest.interface';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  
  @Post()
  async createBooking(@Body() dto: CreateBookingDto, @Req() req: ExpressRequest) {
    const userId = req.user ? req.user.id : null;
    return this.bookingService.createBooking(dto, userId);
  }
}
