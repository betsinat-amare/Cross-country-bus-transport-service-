import { Controller, Get , Put , Post, Delete, Param, Body, UseGuards} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreatRoutDto } from '../auth/dto/createRout.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
@Controller('routes')
export class RoutesController {
    constructor(private readonly routeServices:RoutesService){}

@Get()
getAllRoute(){
    return this.routeServices.getAllRoutes();
}

@Get(':departure/:destination/')
async getRoute(
    @Param('departure') departure:string,
    @Param('destination') destination:string,
) {
    return this.routeServices.getRoute(departure,destination);
}
@UseGuards(AuthGuard('jwt'),RolesGuard)
@Roles(Role.ADMIN)
@Put(':id')
 async updateRoute(@Param('id') id:string, @Body()data:any) {
    return this.routeServices.updateRoute(parseInt(id, 10),data) ;
}

@UseGuards(AuthGuard('jwt'),RolesGuard)
@Roles(Role.ADMIN)
@Post('create')
async createRoute(@Body() createRouteDto: CreatRoutDto) {
    return this.routeServices.createRoute(createRouteDto);
}

@UseGuards(AuthGuard('jwt'),RolesGuard)
@Roles(Role.ADMIN)
@Delete(':id')
 async deleteRoute(@Param('id')id:string){
    return this.routeServices.deleteRoute(parseInt(id));
}
}
