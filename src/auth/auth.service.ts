import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    
    constructor(private jwtService : JwtService){}

    generateToken() : string{
        const payload = { uid : uuidv4() }
        console.log(payload);        
        const token = this.jwtService.sign(payload)
        return token             
    }
}
