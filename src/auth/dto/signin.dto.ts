import { IsEmail, IsNotEmpty, IsString, isString } from "class-validator"

export class SingInDto{
    @IsEmail()
    @IsNotEmpty()
    email:string
    
    @IsString()
    @IsNotEmpty()
    password:string
}