import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import * as bcrypt from 'bcrypt';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  @HttpCode(200)
  async signup(@Body() signUpDto: SignUpDto) {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const user = await this.userService.createUser(hashedPassword);
    return {
      id: user._id,
      token: await this.authService.login(user),
    };
  }

  @Post('signin')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async signin(@Request() req) {
    return {
      token: await this.authService.login(req.user),
    };
  }
}
