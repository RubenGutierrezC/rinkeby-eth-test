import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlockDocument = Block & Document;

@Schema()
export class Block {
  @Prop()
  number: number;

  @Prop()
  hash: string;

  @Prop()
  parentHash: string;

  @Prop()
  timestamp: number;

  @Prop()
  nonce: string;

  @Prop()
  difficulty: number;

  @Prop()
  gasLimit: number;

  @Prop()
  gasUsed: number;

  @Prop()
  miner: string;

  @Prop()
  extraData: string;

  @Prop()
  baseFeePerGas: number;
}

export const BlockSchema = SchemaFactory.createForClass(Block);
