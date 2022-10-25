import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './object.define';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserEntity } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        const user: UserEntity = await this.usersService.create(registerDto);
        return this.authService.jwtSign(user);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req) {
        return this.authService.jwtSign(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('user')
    check(@Request() req) {
        const user: UserEntity = req.user;
        return { username: user.username, id: user.id, super: user.super };
    }
}
