import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDTO } from 'src/models/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }

    @Post()
    signUp(@Body(ValidationPipe) credentials: LoginDTO): Promise<any> {
        return this.authService.signUp(credentials);
    }

    @Post('/login')
    login(@Body(ValidationPipe) credentials: LoginDTO): Promise<any> {
        return this.authService.login(credentials);
    }
}
