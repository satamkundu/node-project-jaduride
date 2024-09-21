import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { RegisterAuthResponse, User } from './dto/auth.dto';

@Injectable()
export class AuthService {
    
    constructor(private jwtService : JwtService){}

    generateToken(user : User) : RegisterAuthResponse{
        user.uid = uuidv4()
        
        const token = this.jwtService.sign(user)
        
        return {
            access_token : token
        }       
    }

    validateToken(token: string): any {
        try {
            const decoded = this.jwtService.verify(token);
            return decoded
        } catch (error) {
            return false
        }
    }
}
