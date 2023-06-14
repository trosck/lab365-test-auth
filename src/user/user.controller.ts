import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  @MessagePattern({ cmd: 'get-user' })
  @UseGuards(JwtAuthGuard)
  async getUser(@Request() req) {
    return {
      id: req.user._id,
    };
  }
}
