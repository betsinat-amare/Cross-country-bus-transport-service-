import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  bookingId: number;
  amount: number;
  currency: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  callbackUrl: string;
}
