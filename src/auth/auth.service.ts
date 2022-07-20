import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const authenticated = await this.usersService.findOne(user.email);
    const { password, created_at, updated_at, ...result } = authenticated;
    const payload = result;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    return this.usersService.create(user);
  }
}
