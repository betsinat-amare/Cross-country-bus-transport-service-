import { Controller, Post ,Body, HttpCode, HttpStatus, UseGuards,Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto,SingInDto } from './dto';
import {Tokens} from './types'
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)    // http://localhost:8000//user/signup
    signup(@Body() dto:SignUpDto):Promise<Tokens>{
        return this.authService.signup(dto)
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body()dto:SignUpDto):Promise<Tokens>{
        return this.authService.signin(dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@Req() req:Request){
        const user =req.user;

        return this.authService.logout(user['sub'])

    }

    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(@Req() req:Request):Promise<Tokens>{
        const user= req.user;

        return this.authService.refreshTokens(user['id'],user['refreshToken'])
    }
    
    

}
