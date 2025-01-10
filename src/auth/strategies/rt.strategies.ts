import { ExtractJwt,Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Request } from "@nestjs/common";



@Injectable()
export class RtStrategy extends PassportStrategy(Strategy,'jwt-refresh'){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpration:false,
            secretOrKey:'bus-transport',
            passRegToCallBack:true
        })
    }
    async validate(req:Request, payload:any){
        const refreshToken=req.headers.get('authorization').replace('Bearer','').trim();
        return {
            ...payload,
            refreshToken,
        }
    }
}