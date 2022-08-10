import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getTransactions(@Query() query): Promise<any> {
    const { hast, blockNumber, from, to } = query;

    return this.appService.getTransactions({ hast, blockNumber, from, to });
  }
}
