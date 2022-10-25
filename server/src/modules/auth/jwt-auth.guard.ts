import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SetMetadata } from '@nestjs/common';
import * as JsonWebTokenError from 'jsonwebtoken/lib/JsonWebTokenError';
import { Reflector } from '@nestjs/core';

export type AccessLevel = 'super' | 'user' | 'public';
export const ACCESS_LEVEL_KEY = 'access_level';
export const Access = (level?: AccessLevel) => {
    return SetMetadata(ACCESS_LEVEL_KEY, level ?? 'public');
};

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    handleRequest(error, user, info, context) {
        if (error) throw error; // 如果有错则直接抛出
        if (info instanceof JsonWebTokenError) {
            throw new UnauthorizedException('登录信息错误或者过期');
        }

        let access_level = this.reflector.getAllAndOverride<AccessLevel>(
            ACCESS_LEVEL_KEY,
            [context.getHandler(), context.getClass()],
        );
        access_level = access_level ?? 'public';
        switch (access_level) {
            case 'super': {
                if (!user || !user.super) {
                    throw new ForbiddenException('您无权进行此操作');
                }
                return user;
            }
            case 'user': {
                if (!user) {
                    throw new UnauthorizedException(
                        '您需要登录后才能进行此操作',
                    );
                }
                return user;
            }
            case 'public': {
                return user;
            }
        }
    }
}
