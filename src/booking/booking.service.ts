import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async createBooking(dto: CreateBookingDto, userId?: number) {
    const busRoute = await this.prisma.busRoute.findUnique({
      where: { id: dto.busRouteId },
    });

    if (!busRoute) {
      throw new NotFoundException('Bus route not found');
    }

    const seatNumber = await this.getNextAvailableSeatNumber(dto.busRouteId);

    const booking = await this.prisma.booking.create({
      data: {
        userId: userId || null,
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
        phoneNumber: dto.phoneNumber,
        busRouteId: dto.busRouteId,
        seatNumber,
        status: 'unreserved',
      },
    });

    const updatedBusRoute = await this.prisma.busRoute.update({
        where:{id:dto.busRouteId},
        data:{
            passengers:{
                increment:1,
            },
            isAvalaible: busRoute.passengers +1 < busRoute.seats,
            
        },
    })

    // Schedule a job to check payment status after 30 minutes
    setTimeout(async () => {
      const updatedBooking = await this.prisma.booking.findUnique({
        where: { id: booking.id },
      });

      if (updatedBooking.status === 'unreserved') {
        await this.prisma.booking.update({
          where: { id: booking.id },
          data: { seatNumber: null },
        });
      }
    }, 30 * 60 * 1000);

    return booking;
  }

  private async getNextAvailableSeatNumber(busRouteId: number): Promise<number> {
    const lastBooking = await this.prisma.booking.findFirst({
      where: { busRouteId },
      orderBy: { seatNumber: 'desc' },
    });

    return lastBooking ? lastBooking.seatNumber + 1 : 1;
  }
}
