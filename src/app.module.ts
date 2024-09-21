import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MygatewayGateway } from './gateways/mygateway.gateway';
import { RandomNumberService } from './generator/random-number.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule
    ],
    controllers: [],
    providers: [
        RandomNumberService,
        MygatewayGateway
    ],
})
export class AppModule {
    constructor() {
        console.log('App Model');
    }
}
