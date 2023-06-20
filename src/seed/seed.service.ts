import { Injectable } from '@nestjs/common';

import { PokeResponse } from './interface/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon, PokemonDocument } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<PokemonDocument>,
    private readonly http: AxiosAdapter,
  ) {}

  async pokemonRunSeeder() {
    const checkData = await this.pokemonModel.find();

    if (checkData.length > 0) {
      return `your pokemon seed it's already DONE`;
    }

    const data = await this.http.get<PokeResponse>(
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
