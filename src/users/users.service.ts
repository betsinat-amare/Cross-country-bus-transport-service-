import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/updatUser.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserPorfile(userId:number){
    const user=await this.prisma.user.findUnique({
        where:{id:userId},
    });
    
    if(!user){
        throw new NotFoundException("User not found");

    }
    return user;
  }

  async updateUser(userId: number, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        firstName: dto.firstName,
        middleName: dto.middleName,
        lastName: dto.lastName,
        phoneNumber: dto.phoneNumber,
        email: dto.email,
      },
    });
  }
  async deleteUser(userId:number){
    const user=await this.prisma.user.findUnique({
      where:{id:userId}
    })
    if (!user){
      throw new NotFoundException("User not found");
    }
    return this.prisma.user.delete({
      where:{id:userId}
    });
  }
}