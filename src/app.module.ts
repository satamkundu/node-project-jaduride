import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RandomNumberService } from './random-number/random-number.service';
import { EventsGateway } from './gateways/events.gateway';
import { AuthService } from './auth/auth.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule
    ],
    controllers: [],
    providers: [
        RandomNumberService,
        AuthService,
        EventsGateway
    ],
})
export class AppModule {
    constructor() {
        console.log('App Model');
    }
}
