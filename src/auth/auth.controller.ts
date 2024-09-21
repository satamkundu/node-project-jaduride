import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterAuthResponse, User } from "./dto/auth.dto";

@Controller('auth')
export class AuthController{
    
    constructor(private authService: AuthService){}

    @Get('generateToken')
    generateToken( @Body() user : User ) : RegisterAuthResponse{
        return this.authService.generateToken(user)
    }

}