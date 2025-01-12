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
    async getTokens(userId:number,firstName:string,email:string):Promise<Tokens>{
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {sub:userId,
                 firstName,
                 email,
                },
                {
                   secret:'bustransport',
                   expiresIn:'30000000', 
                },
            ),
            this.jwtService.signAsync(
                { sub:userId,
                    firstName,
                    email,
                   },
                   {
                      secret:'bustransport',
                      expiresIn:'70000000000', 
                   },

                
            )
        ]);
    
        return{
            access_token:accessToken,
            refresh_token:refreshToken,
        }
    }
    async signup(@Body() dto:SignUpDto):Promise<any>{
        const hash= await this.hashData(dto.password);

        const newUser= await this.prisma.user.create({
            data:{
                firstName:dto.firstName,
                middleName:dto.middleName,
                lastName:dto.lastName,
                phoneNumber:dto.phoneNumber,
                email:dto.email,
                hash
            
                


            }
        });
        const tokens=await this.getTokens((await newUser).id,(await newUser).firstName,(await newUser).email)
        await this.updateRtHash((await newUser).id,tokens.refresh_token)
        return { ...tokens, user: newUser };    }

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

    async signin(@Body() dto:SingInDto):Promise<any>{
        const user= await this.prisma.user.findUnique({
            where:{
                email:dto.email
            }
        
        })
        if(!user) throw new ForbiddenException("Acces denid")
         
        const passwordMatches = await bcrypt.compare(dto.password,user.hash)
        if (!passwordMatches) throw new ForbiddenException('Access denid')

        const tokens=await this.getTokens(user.id, user.firstName ,user.email)
        await this.updateRtHash (user.id,tokens.refresh_token)
        return { ...tokens, user: user };
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
        
     });

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

        const tokens=await this.getTokens(user.id, user.firstName ,user.email)
        await this.updateRtHash (user.id,tokens.refresh_token)
        return tokens;
}
async updateUserProfile(userId:number,data:any){
    return await this.prisma.user.update({
        where:{id:userId},
    data:{
        firstName:data.firstName,
        middleName:data.middleName,
        lastName:data.lastName,
        phoneNumber:data.phoneNumber,
        email:data.email,
        hash:data.password,} 
});
    
}
async assignRole(userId:number,role:Role){
    return await this.prisma.user.update({
        where:{id:userId},
        data:{role},
    })
}

}
