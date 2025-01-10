import { IsEmail, IsEnum, IsNotEmpty,IsOptional,IsPhoneNumber,IsString} from "class-validator";
import { Role } from "@prisma/client";


export class SignUpDto{
    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    middleName:string

    @IsString()
    @IsNotEmpty()
    lastName:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('ET')
    phoneNumber:string



}