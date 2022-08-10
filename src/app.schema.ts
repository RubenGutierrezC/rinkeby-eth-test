import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionsDocument = Transactions & Document;

@Schema()
export class Transactions {
  @Prop()
  blockNumber: string;

  @Prop([])
  transactions: any[];
}

export const TransactionsSchema = SchemaFactory.createForClass(Transactions);
