import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseProvider, InjectEthersProvider } from 'nestjs-ethers';
import { Transactions, TransactionsDocument } from './app.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectEthersProvider()
    private readonly ethersProvider: BaseProvider,
    @InjectModel(Transactions.name)
    private transactionsModels: Model<TransactionsDocument>,
  ) {}

  async getTransactions({ hash, blockNumber, from, to }: any): Promise<any> {
    let result;

    if (hash) {
      result = await this.ethersProvider.getTransaction(hash);
    }

    if (blockNumber) {
      result = await this.ethersProvider.getBlockWithTransactions(
        parseInt(blockNumber),
      );
      result = result.transactions;
    }

    if (from) {
      result = await this.ethersProvider.getLogs(hash);
    }

    if (to) {
      result = await this.ethersProvider.getLogs(to);
    }

    return result;
  }

  suscribe(): any {
    console.log('suscribed');
    this.ethersProvider.on('block', async (b) => {
      console.log('transaction', b);
      try {
        const result = await this.ethersProvider.getBlockWithTransactions(b);
        const newTransaction = await this.transactionsModels.create({
          blockNumber: b,
          transactions: result?.transactions || [],
        });
        await newTransaction.save();
      } catch (error) {
        console.log('transaction error:', error);
      }
    });
  }
}
