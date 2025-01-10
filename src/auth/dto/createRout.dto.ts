import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, IsTimeZone, ValidateNested} from "class-validator"
import { Booking} from "@prisma/client"
import { Type } from "class-transformer";


class CreateBookingDto{
  @IsNotEmpty()
  @IsNumber()
  userId:number;


  @IsNotEmpty()
  @IsNumber()
  seatNumber:number;
  
  @IsNotEmpty()
  @IsString()
  status:string

}

export class CreatRoutDto{
@IsNotEmpty()
@IsString()
  departure:string 
@IsNotEmpty()
@IsString() 
  destination:string
@IsNotEmpty()
@IsNumber()
  price:number
@IsNotEmpty()
@IsNumber()
    seats:number

@IsTimeZone()
@IsNotEmpty()
  departureTime:string
@IsString()
@IsNotEmpty()
  departureplace:string
@IsBoolean()
@IsNotEmpty()
  isAvalaible:boolean
@IsNumber()
  passengers:number 

  @IsArray()
  @ValidateNested({each:true})
  @Type(()=>CreateBookingDto)
  bookings:Booking[]
}