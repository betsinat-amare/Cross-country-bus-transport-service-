import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  @IsNotEmpty()
  bookingId: number;
}
