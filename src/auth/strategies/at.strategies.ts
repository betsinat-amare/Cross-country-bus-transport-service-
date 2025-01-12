import { ExtractJwt,Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";


@Injectable()
export class AtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:true,
            secretOrKey:'bustransport'
        })
        
    }
    async validate(payload:any){
        return payload
    }
}