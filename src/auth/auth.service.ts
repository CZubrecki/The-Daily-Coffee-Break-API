import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { LoginDTO } from 'src/models/user.model';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/repository/Repository';
import { JwtService } from '@nestjs/jwt'
import * as _ from 'lodash';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    public async signUp(credentials: LoginDTO): Promise<any> {
        try {
            const user = this.userRepository.create(credentials);
            await user.save();
            const payload = { email: user.email };
            const token = this.jwtService.sign(payload);
            return {
                user: {
                    ...user.toJSON(),
                    token,
                }
            };
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Email is already in use');
            }
            throw new InternalServerErrorException()
        }
    }

    public async login({ email, password }: LoginDTO) {
        const user = await this.userRepository.findOne({ where: { email } })
        if (_.isNil(user)) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const isValid = await user.comparePassword(password);
        if (!isValid) {
            throw new HttpException('Incorrect Password', HttpStatus.UNAUTHORIZED);
        }
        const payload = { email: user.email };
        const token = this.jwtService.sign(payload);
        return {
            user: {
                ...user.toJSON(),
                token,
            }
        };
    }
}
