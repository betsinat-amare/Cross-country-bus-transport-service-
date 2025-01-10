import { Body, Injectable,NotFoundException} from '@nestjs/common';
import { CreatRoutDto } from 'src/auth/dto/createRout.dto';
import {PrismaService} from '../prisma/prisma.service'
import { BusRoute } from '@prisma/client';

@Injectable()
export class RoutesService {
    constructor(private prisma:PrismaService){}

// create a route
async createRoute(@Body() dto:CreatRoutDto){
    return this.prisma.busRoute.create({
        data:{
                destination:dto.destination,
                departure:dto.departure,
                departureTime:dto.departureTime,
                departureplace:dto.departureplace,
                price:dto.price,
                seats:dto.seats,
                isAvalaible:dto.isAvalaible,
                passengers:dto.passengers,
                bookings:{
                    create : dto.bookings,},
                
            }
    });
}
// Get all routes 
async getAllRoutes(){
    return this.prisma.busRoute.findMany();
}
// Get a route by deaprture, destination
async getRoute(departure:string, destination:string){
    return await this.prisma.busRoute.findMany({
        where:{departure,
             destination}
    });
}
// update a route by destination and departure 
async updateRoute(id:number,data:any) {
    return await this.prisma.busRoute.update({
        where:{id},
        data:{
            destination:data.destination,
            departure:data.departure,
            departureTime:data.departureTime,
            departureplace:data.departureplace,
            price:data.price,
            seats:data.seats,
            isAvalaible:data.isAvalaible,
        }
    });
}
// Delete a route by destination and departure
async deleteRoute(id:number){
    const route = await this.prisma.busRoute.findUnique({
        where:{id},
    });
    
    if (!route){
        throw new NotFoundException('Route not found');
    }

    return await this.prisma.busRoute.delete({
        where:{id},
    })

}

}
