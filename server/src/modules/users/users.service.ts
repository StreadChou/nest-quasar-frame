import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserBo, UpdateUserBo } from './object.define';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
    ) {}

    async create(createUserBo: CreateUserBo): Promise<UserEntity> {
        const user_count: number = await this.repository.count();
        createUserBo.super = user_count <= 0; // 第一次创建的账户一定是超级用户
        let entity: UserEntity = this.repository.create(createUserBo);
        entity = await this.repository.save(entity);
        return entity;
    }

    findAll(): Promise<Array<UserEntity>> {
        return this.repository.find();
    }

    findByUsername(username: string): Promise<UserEntity> {
        return this.repository.findOneOrFail({ where: { username } });
    }

    async update(username: string, updateUserBo: UpdateUserBo): Promise<UserEntity> {
        let entity = await this.findByUsername(username);
        entity = this.repository.merge(entity, updateUserBo);
        entity = await this.repository.save(entity);
        return entity;
    }

    async remove(username: string) {
        const entity = await this.findByUsername(username);
        return this.repository.remove(entity);
    }
}
