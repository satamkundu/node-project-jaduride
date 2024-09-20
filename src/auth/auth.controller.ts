import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    
    constructor(private authService: AuthService){}

    @Get('generateToken')
    generateToken() : string{
        return this.authService.generateToken()
    }

}