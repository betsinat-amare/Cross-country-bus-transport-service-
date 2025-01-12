import { Controller, Put, Body, Req, UseGuards ,Get,Delete, Query, BadRequestException} from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/updatUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { ExpressRequest } from '../auth/types/expressRequest.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getUserProfile(@Query('user_id') userId: string) {
    console.log('User ID from query parameter:', userId);
  
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
  
    const user_id = parseInt(userId)
  return this.userService.getUserPorfile(user_id);
  }
  

  @UseGuards(AuthGuard('jwt'))
  @Put('update')
  async updateUser(@Body() dto: UpdateUserDto, @Req() req: ExpressRequest) {
    const userId = req.user ? req.user.id : null;
    return this.userService.updateUser(userId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  async deleteUser(@Req() req:ExpressRequest){
    const userId=req.user ? req.user.id:null;
    return this.userService.deleteUser(userId);
  }

}