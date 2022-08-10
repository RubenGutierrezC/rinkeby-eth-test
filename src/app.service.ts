import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseProvider, InjectEthersProvider } from 'nestjs-ethers';
import { Block, BlockDocument } from './block.schema';
import { Transaction, TransactionDocument } from './transaction.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectEthersProvider()
    private readonly ethersProvider: BaseProvider,

    @InjectModel(Block.name)
    private blockModel: Model<BlockDocument>,

    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async getTransactions({
    hash,
    blockNumber,
    from,
    to,
  }: any): Promise<Transaction[]> {
    const filters: any = {};

    if (hash) filters.hash = hash;
    if (blockNumber) filters.blockNumber = blockNumber;
    if (from) filters.from = from;
    if (to) filters.to = to;

    const transactions = await this.transactionModel.find(filters);

    return transactions;
  }

  suscribe(): any {
    this.ethersProvider.on('block', async (b) => {
      console.log('transaction', b);
      try {
        const { transactions, ...block } =
          await this.ethersProvider.getBlockWithTransactions(b);

        const newBlock = await this.blockModel.create({
          ...block,
        });
        const savedBlock = await newBlock.save();

        await this.transactionModel.insertMany(
          transactions.map((t) => ({ blockId: savedBlock._id, ...t })),
        );

        console.log('block and transactions saved!');
      } catch (error) {
        console.log('transaction error:', error);
      }
    });
  }
}
