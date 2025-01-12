import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { JwtAuthGuard } from './guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    UserService,
  ],
  controllers: [UserController],
})
export class UserModule {}
