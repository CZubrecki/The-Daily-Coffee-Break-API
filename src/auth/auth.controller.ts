import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDTO, UpdateEmail } from 'src/models/user.model';
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

    @Post('/update-email')
    updateEmail(@Body() data: UpdateEmail): Promise<any> {
        return this.authService.updateEmail(data);
    }

    @Post('/verify-token')
    verifyJwt(@Body() data: any) {
        const token = data.token
        return this.authService.validToken(token);
    }
}
