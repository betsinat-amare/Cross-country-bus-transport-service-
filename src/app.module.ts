import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { RoutesModule } from './routes/routes.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [PrismaModule, AuthModule, RoutesModule, BookingModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
