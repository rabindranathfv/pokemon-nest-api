import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interface/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon, PokemonDocument } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<PokemonDocument>,
  ) {}

  async pokemonRunSeeder() {
    const checkData = await this.pokemonModel.find();

    if (checkData.length > 0) {
      return `your pokemon seed it's already DONE`;
    }

    const { data } = await this.axios.get<PokeResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=650`,
    );

    const pokemonMapped = data.results.map(({ name, url }) => {
      const segmentUrl = url.split('/');
      const pokemonNum: number = +segmentUrl[segmentUrl.length - 2];

      return {
        name: name,
        number: pokemonNum,
      };
    });

    const insertedPokemons = await this.pokemonModel.insertMany(pokemonMapped);

    return insertedPokemons;
  }
}
