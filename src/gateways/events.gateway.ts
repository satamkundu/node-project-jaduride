import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { AuthService } from 'src/auth/auth.service';
import { WsAuthRequest, WsMessageResponse } from 'src/auth/dto/auth.dto';
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
    handleMessage(client: Socket, payload: WsAuthRequest): any {
        const token = payload.token
        
        if(typeof token === 'undefined'){
            return `Please provide token`
        }
        
        const user = this.authService.validateToken(token)

        if(!user){
            return "Unauthorised access"
        }

        let count = 1;
        const interval = setInterval(() => {
            if (count <= 20) {
                const generatedRandomNumber = this.randomNumberService.getRandomNumber(); // call random number generator from a generetor function
                
                console.log(`Sending ${count} no response...`);
                
                const wsResponse : WsMessageResponse = {
                    resonseCount : count,
                    uid : user.uid,
                    number : generatedRandomNumber
                }

                client.send(JSON.stringify(wsResponse));
                count++;
            } else {
                clearInterval(interval); //clear the 20 response send process
                client.close() //Manually close the socket connection
                console.log(`Client disconnected after 20 response send...`);                
            }
        }, 1000);
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
