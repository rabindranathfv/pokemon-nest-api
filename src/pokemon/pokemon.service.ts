import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon, PokemonDocument } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<PokemonDocument>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    try {
      const newPokemon = await this.pokemonModel.create(createPokemonDto);
      return newPokemon;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon exist in DB`);
      }
      throw new InternalServerErrorException(
        `can not create a pokemon, check logs`,
      );
    }
  }

  async findAll(): Promise<Array<Pokemon>> {
    return await this.pokemonModel.find();
  }

  async findOne(id: string): Promise<Pokemon> {
    const condition = [];
    if (!isNaN(+id)) {
      condition.push({ number: +id });
    }

    if (isValidObjectId(id)) {
      condition.push({ _id: id });
    }

    if (condition.length === 0) {
      condition.push({ name: id.toLocaleLowerCase() });
    }

    const pokemon = await this.pokemonModel.find({ $or: condition });
    if (!pokemon) {
      throw new NotFoundException(`this pokemon ${id} doesn't exist`);
    }
    return pokemon.pop();
  }

  async update(
    id: string,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    const findPokemon = await this.findOne(id);

    if (!findPokemon) {
      throw new NotFoundException(`this pokemon ${id} doesn't exist`);
    }

    const updatePokemon = await this.pokemonModel.findByIdAndUpdate(
      findPokemon._id,
      updatePokemonDto,
      { new: true },
    );
    return updatePokemon;
  }

  async remove(id: string) {
    const deletePokemon = await this.pokemonModel.deleteOne({ _id: id });

    if (!deletePokemon.deletedCount) {
      throw new BadRequestException(`this pokemon with ${id} can not be found`);
    }
    return deletePokemon;
  }
}
