import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { LoginDTO } from 'src/models/user.dto';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    public async signUp(credentials: LoginDTO): Promise<UserEntity> {
        try {
            const user = this.userRepository.create(credentials);
            console.log(user);
            await user.save();
            return user;
        } catch (err) {
            if (err.code === '23505') {
                throw new ConflictException('Email is already in use');
            }
            throw new InternalServerErrorException()
        }
    }

    public async login({ email, password }: LoginDTO): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findOne({ where: { email } })
            const isValid = await user.comparePassword(password);
            if (!isValid) {
                throw new UnauthorizedException('Invalid Credentials');
            }
            return user;
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }
}
