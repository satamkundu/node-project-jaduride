import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MygatewayGateway } from './gateways/mygateway.gateway';

@Module({
  imports: [ 
    ConfigModule.forRoot(),
    AuthModule
  ],
  controllers: [],
  providers: [MygatewayGateway],
})
export class AppModule {
  constructor(){
	  console.log('App Model');	
  }
}
