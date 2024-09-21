import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { RandomNumberService } from 'src/generator/random-number.service';
import { WsAuthGuard } from 'src/guard/wsauth.guard';
import { Server, Socket } from 'ws';

@WebSocketGateway()

export class MygatewayGateway {

    constructor(
        private jwtService : JwtService,
        private readonly randomNumberService: RandomNumberService
    ){}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: any): any {
        const token = payload?.token
        
        if(typeof token === 'undefined'){
            return `Please provide token`
        }
        
        const user = this.validateToken(token)

        if(!user){
            return "Unauthorised access"
        }

        const generatedRandomNumber = this.randomNumberService.getRandomNumber();

        const finalResponse = {
            uid : user?.uid,
            number : generatedRandomNumber
        }

        return finalResponse;
    }

    afterInit(server: Server) {
        console.log('WebSocket server initialized');
    }

    handleConnection(client: Socket) {
        console.log('Client connected');
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected');
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
