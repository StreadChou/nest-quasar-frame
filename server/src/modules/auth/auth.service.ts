import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    private signUserMap: { [key: string]: UserEntity } = {};

    async validateUser(username: string, pass: string): Promise<UserEntity | null> {
        const user = await this.usersService.findByUsername(username);
        if (!user || user.password !== pass) return null;
        this.signUserMap[user.username] = user;
        return user;
    }

    async jwtSign(user: UserEntity) {
        const payload = { username: user.username, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            id: user.id,
            username: user.username,
            email: user.email,
            super: user.super,
        };
    }

    async getSignUser(username: string): Promise<UserEntity | undefined> {
        if (!this.signUserMap[username]) {
            this.signUserMap[username] = await this.usersService.findByUsername(username);
        }
        return this.signUserMap[username];
    }
}
