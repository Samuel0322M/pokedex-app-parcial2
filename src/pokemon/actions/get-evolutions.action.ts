import { pokeApi } from "@/api/pokeApi";
import axios from "axios";

export interface EvolutionNode {
  name: string;
  image: string;
  method: string;
  evolvesTo: EvolutionNode[];
}


interface PokeAPIChainNode {
  species: {
    name: string;
    url: string;
  };
  evolution_details: {
    trigger: { name: string };
    min_level?: number;
    item?: { name: string };
    min_happiness?: number;
  }[];
  evolves_to: PokeAPIChainNode[];
}

export const getPokemonEvolutionsAction = async (id: string): Promise<EvolutionNode> => {
  const { data: speciesData } = await pokeApi.get(`/pokemon-species/${id}`);
  const { data: chainData } = await axios.get(speciesData.evolution_chain.url);

  const mapChain = (node: PokeAPIChainNode): EvolutionNode => {
    const name = node.species.name;
    const urlParts = node.species.url.split('/');
    const pokeId = urlParts[urlParts.length - 2];
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;

    let method = 'Forma Base';
    if (node.evolution_details.length > 0) {
      const detail = node.evolution_details[0];
      if (detail.trigger.name === 'level-up' && detail.min_level) {
        method = `Nivel ${detail.min_level}`;
      } else if (detail.item) {
        method = `Objeto: ${detail.item.name}`;
      } else if (detail.min_happiness) {
        method = 'Amistad';
      } else if (detail.trigger.name === 'trade') {
        method = 'Intercambio';
      } else {
        method = detail.trigger.name.replace('-', ' ');
      }
    }

    return {
      name,
      image,
      method,

      evolvesTo: node.evolves_to.map((n: PokeAPIChainNode) => mapChain(n))
    };
  };

  return mapChain(chainData.chain);
};