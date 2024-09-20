import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsAuthGuard implements CanActivate {

    constructor(private jwtService : JwtService){}

    canActivate(
        context: ExecutionContext,
    ): boolean  {
        const client = context.switchToWs().getData();
        const token = client?.token;
        
        if (!token) {
            throw new UnauthorizedException('Token not found');
        }
        
        return this.validateToken(token);
    }

    validateToken(token: string): boolean {
        try {
            const decoded = this.jwtService.verify(token);
            return true
        } catch (error) {
            console.log('Unauthorised access');
            
            return false
        }
    }
}
