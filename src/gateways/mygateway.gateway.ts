import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { WsAuthGuard } from 'src/guard/wsauth.guard';
import { Server, Socket } from 'ws';

@WebSocketGateway()
@UseGuards(WsAuthGuard)
export class MygatewayGateway {

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: any): string {
        console.log(client);
        
        return `Hello from server, you sent: ${payload}`;
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
