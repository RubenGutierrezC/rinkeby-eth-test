import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';
import { Block } from './block.schema';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop()
  accessList: any[];

  @Prop()
  blockHash: string;

  @Prop({ type: MSchema.Types.ObjectId, ref: 'Block' })
  blockId: Block;

  @Prop()
  blockNumber: number;

  @Prop()
  chainId: number;

  @Prop()
  confirmations: number;

  @Prop()
  creates: string;

  @Prop()
  data: string;

  @Prop()
  from: string;

  @Prop()
  gasLimit: number;

  @Prop()
  gasPrice: number;

  @Prop()
  hash: string;

  @Prop()
  nonce: number;

  @Prop()
  r: string;

  @Prop()
  s: string;

  @Prop()
  to: string;

  @Prop()
  transactionIndex: number;

  @Prop()
  type: number;

  @Prop()
  v: number;

  @Prop()
  value: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
