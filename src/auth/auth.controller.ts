import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { LoginDTO } from 'src/models/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }

    @Post()
    signUp(@Body(ValidationPipe) credentials: LoginDTO): Promise<UserEntity> {
        return this.authService.signUp(credentials);
    }

    @Post('/login')
    login(@Body(ValidationPipe) credentials: LoginDTO): Promise<UserEntity> {
        return this.authService.login(credentials);
    }
}
