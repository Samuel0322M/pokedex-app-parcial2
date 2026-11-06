import { pokeApi } from "@/api/pokeApi";

export interface PokemonDetail {
  id: string;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  moves: string[];
  stats: {
    name: string;
    value: number;
  }[];
}

export const getPokemonAction = async (idSlug: string): Promise<PokemonDetail> => {
  const { data } = await pokeApi.get(`/pokemon/${idSlug}`);

  return {
    id: data.id.toString(),
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default,
    types: data.types.map((t: { type: { name: string } }) => t.type.name),
    height: data.height / 10,
    weight: data.weight / 10,
    moves: data.moves.map((m: { move: { name: string } }) => m.move.name),
    stats: data.stats.map((s: { stat: { name: string }; base_stat: number }) => ({
      name: s.stat.name,
      value: s.base_stat
    }))
  };
};