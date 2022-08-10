import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthersModule, RINKEBY_NETWORK } from 'nestjs-ethers';
import { MongooseModule } from '@nestjs/mongoose';
import { Transactions, TransactionsSchema } from './app.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EthersModule.forRoot({
      network: RINKEBY_NETWORK,
      alchemy: process.env.ALCHEMY_TOKEN,
      quorum: 2,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([
      { name: Transactions.name, schema: TransactionsSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
