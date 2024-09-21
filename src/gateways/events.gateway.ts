import { JwtService } from '@nestjs/jwt';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { AuthService } from 'src/auth/auth.service';
import { User, WsAuthRequest, WsMessageResponse } from 'src/auth/dto/auth.dto';
import { RandomNumberService } from 'src/random-number/random-number.service';

import { Server, Socket } from 'ws';

@WebSocketGateway()

export class EventsGateway {

    constructor(
        private authService : AuthService,
        private readonly randomNumberService: RandomNumberService
    ){}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: WsAuthRequest): string | WsMessageResponse {
        const token = payload.token
        
        if(typeof token === 'undefined'){
            return `Please provide token`
        }
        
        const user = this.authService.validateToken(token)

        if(!user){
            return "Unauthorised access"
        }

        const generatedRandomNumber = this.randomNumberService.getRandomNumber();

        const finalResponse = {
            uid : user.uid,
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
}
