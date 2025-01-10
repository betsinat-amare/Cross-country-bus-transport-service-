import { Controller, Get , Put , Post, Delete, Param, Body} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreatRoutDto } from '../auth/dto/createRout.dto';

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

@Put(':id')
 async updateRoute(@Param('id') id:string, @Body()data:any) {
    return this.routeServices.updateRoute(parseInt(id, 10),data) ;
}

@Post('create')
async createRoute(@Body() createRouteDto: CreatRoutDto) {
    return this.routeServices.createRoute(createRouteDto);
}


@Delete(':id')
 async deleteRoute(@Param('id')id:string){
    return this.routeServices.deleteRoute(parseInt(id));
}
}
