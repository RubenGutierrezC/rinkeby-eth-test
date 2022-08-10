import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthersModule, RINKEBY_NETWORK } from 'nestjs-ethers';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './transaction.schema';
import { ConfigModule } from '@nestjs/config';
import { Block, BlockSchema } from './block.schema';

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
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    MongooseModule.forFeature([{ name: Block.name, schema: BlockSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
