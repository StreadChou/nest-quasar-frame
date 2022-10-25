import { PartialType } from '@nestjs/mapped-types';

export class CreateUserBo {
    username: string;
    email: string;
    password: string;
    super?: boolean;
}

export class UpdateUserBo {
    email?: string;
    password?: string;
    super?: boolean;
}

export class CreateUserDto extends PartialType(CreateUserBo) {
    username: string;
    email: string;
    password: string;
}

export class UpdateUserDto extends PartialType(UpdateUserBo) {}
