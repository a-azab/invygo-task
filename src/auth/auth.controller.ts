import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  // @Post('register')
  // async register(@Body() user: RegisterDto) {
  //   return this.authService.register(user);
  // }
}
