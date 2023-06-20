import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interface/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async pokemonRunSeeder() {
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
    console.log(
      '🚀 ~ file: seed.service.ts:20 ~ SeedService ~ pokemonMapped ~ pokemonMapped:',
      pokemonMapped,
    );
    return data.results;
  }
}
