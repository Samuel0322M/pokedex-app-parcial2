import { pokeApi } from "@/api/pokeApi";
import type { PokeAPIListResponse } from "../types/pokeapi-response.interface";
import type { SimplePokemon } from "../types/pokemon.interface";

export interface PaginatedPokemons {
  total: number;
  pages: number;
  pokemons: SimplePokemon[];
}

export const getPokemonsAction = async (page: number = 1, limit: number = 12): Promise<PaginatedPokemons> => {
    
    const offset = (page - 1) * limit;
  
    const { data } = await pokeApi.get<PokeAPIListResponse>('/pokemon', {
    params: { limit: limit, offet: offset }
  });
  
  const pokemons = data.results.map( (item) => {
    const urlParts = item.url.split('/');
    const id = urlParts[urlParts.length - 2];
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return {
      id,
      name: item.name,
      image
    }
  });

  return {
    total: data.count,
    pages: Math.ceil(data.count / limit),
    pokemons
};
};