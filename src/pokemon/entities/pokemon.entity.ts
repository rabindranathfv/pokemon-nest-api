import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import { HydratedDocument } from 'mongoose';

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema({ timestamps: true })
export class Pokemon {
  _id?: string;

  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  number: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
