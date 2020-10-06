import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDTO {
    @IsEmail()
    @IsString()
    @MinLength(4)
    email: string;

    @IsString()
    @MinLength(8)

    password: string;
}