import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Transaction } from './transaction.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getTransactions(@Query() query): Promise<Transaction[]> {
    const { hash, blockNumber, from, to } = query;

    return this.appService.getTransactions({ hash, blockNumber, from, to });
  }
}
