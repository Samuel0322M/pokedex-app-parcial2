import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { useQuery } from "@tanstack/react-query";
import { getPokemonsAction } from "@/pokemon/actions/get-pokemons.action";
import { PokemonCard } from "@/pokemon/components/PokemonCard";
import { useSearchParams } from "react-router";
import { CustomPagination } from "@/components/custom/CustomPagination";

export const HomePage = () => {

    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') ?? 1);
    const limit = 12;
    const { data, isLoading} = useQuery({
        queryKey: ['pokemons-list', page], // id o llvae
        queryFn: () => getPokemonsAction(page, limit), // función que retorna la promesa
        staleTime: 1000 * 60 * 60, // 1 hora
    });


  return (
    <div>
      <CustomJumbotron 
        title="Pokédex Nacional" 
        description="Explora las diferentes especies de Pokémon, sus estadísticas base y cadenas de evolución." 
      />

      {isLoading && <p className="text-slate-400 text-center">Cargando Pokemons...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {data?.pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <CustomPagination totalPages={data?.pages ?? 1} />    
    </div>
  );
};