import { pokeApi } from "@/api/pokeApi";
import type { PokeAPIListResponse } from "../types/pokeapi-response.interface";
import type { SimplePokemon } from "../types/pokemon.interface";
import { GENERATIONS } from "../const/generation";

export interface PaginatedPokemons {
  total: number;
  pages: number;
  pokemons: SimplePokemon[];
}

export const getPokemonsAction = async (
  page: number = 1, 
  limit: number = 12,
  genId: string = 'gen1'
): Promise<PaginatedPokemons> => {
  
  
  const gen = GENERATIONS.find((g) => g.id === genId) ?? GENERATIONS[0];
  
  
  const genOffset = gen.offset + (page - 1) * limit;


  const remainingInGen = gen.limit - (page - 1) * limit;
  const currentLimit = Math.min(limit, Math.max(remainingInGen, 0));


  if (currentLimit <= 0) {
    return { total: gen.limit, pages: Math.ceil(gen.limit / limit), pokemons: [] };
  }

  const { data } = await pokeApi.get<PokeAPIListResponse>('/pokemon', {
    params: { limit: currentLimit, offset: genOffset }
  });
  
  const pokemons = data.results.map((item) => {
    const urlParts = item.url.split('/');
    const id = urlParts[urlParts.length - 2];
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return { id, name: item.name, image };
  });

  return {
    total: gen.limit,
    pages: Math.ceil(gen.limit / limit), // El total de páginas depende de la región
    pokemons
  };
};