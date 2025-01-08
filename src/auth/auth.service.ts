import { Injectable,Body, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto, SingInDto } from './dto';
import * as bcrypt from 'bcrypt'
import {Tokens} from './types'
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService,private jwtService:JwtService){}

    hashData(data){
        return bcrypt.hash(data,10);
    }
    async getTokens(userId:number,fistName:string,email:string):Promise<Tokens>{
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {sub:userId,
                 fistName,
                 email,
                },
                {
                   secret:'bustransport',
                   expiresIn:'30m', 
                },
            ),
            this.jwtService.signAsync(
                { sub:userId,
                    fistName,
                    email,
                   },
                   {
                      secret:'bustransport',
                      expiresIn:'7d', 
                   },

                
            )
        ]);
    
        return{
            access_token:accessToken,
            refresh_token:refreshToken,
        }
    }
    async signup(@Body() dto:SignUpDto):Promise<Tokens>{
        const hash= await this.hashData(dto.password);

        const newUser= this.prisma.user.create({
            data:{
                fistName:dto.firstName,
                middleName:dto.middleName,
                lastName:dto.lastName,
                phoneNumber:dto.phoneNumber,
                email:dto.email,
                hash
            
                


            }
        });
        const tokens=await this.getTokens((await newUser).id,(await newUser).fistName,(await newUser).email)
        await this.updateRtHash((await newUser).id,tokens.refresh_token)
        return tokens;
    }

    async updateRtHash(userId:number, rt:string){
        const hash =await this.hashData(rt);
        await this.prisma.user.update({
        where:{
            id:userId
        },
        data:{
            hashedRt:hash
        }
        })
    }

    async signin(@Body() dto:SingInDto):Promise<Tokens>{
        const user= await this.prisma.user.findUnique({
            where:{
                email:dto.email
            }
        
        })
        if(!user) throw new ForbiddenException("Acces denid")
         
        const passwordMatches = await bcrypt.compare(dto.password,user.hash)
        if (!passwordMatches) throw new ForbiddenException('Access denid')

        const tokens=await this.getTokens(user.id, user.fistName ,user.email)
        await this.updateRtHash (user.id,tokens.refresh_token)
        return tokens;
    }

   async logout(userId:number){
     await this.prisma.user.updateMany({
        where:{
            id:userId,
            hashedRt:{
                not:null,
            },
        },
        data:{
            hashedRt:null,
        }
        
     })

    }

async refreshTokens(userId:number,rtToken:string){
        const user= await this.prisma.user.findUnique({
            where:{
                id:userId
            }
        })
        if (!user) throw new ForbiddenException('Acces Denied')
        const tokenMatch=bcrypt.compare(rtToken,user.hashedRt) 
       
        if(!tokenMatch) throw new ForbiddenException("Access Denied")

        const tokens=await this.getTokens(user.id, user.fistName ,user.email)
        await this.updateRtHash (user.id,tokens.refresh_token)
        return tokens;
}

}
