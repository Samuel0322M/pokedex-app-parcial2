import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPokemonsAction } from "@/pokemon/actions/get-pokemons.action";
import { PokemonCard } from "@/pokemon/components/PokemonCard";
import { PokemonCardSkeleton } from "@/pokemon/components/PokemonCardSkeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router";
import { GENERATIONS } from "@/pokemon/const/generation";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentGen = searchParams.get('gen') ?? 'gen1';
  const page = Number(searchParams.get('page') ?? '1');
  const limit = 12;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['pokemons-list', currentGen, page],
    queryFn: () => getPokemonsAction(page, limit, currentGen),
    staleTime: 1000 * 60 * 60,
    placeholderData: keepPreviousData,
  });

  const handleGenChange = (genId: string) => {
    setSearchParams((prev) => {
      prev.set('gen', genId);
      prev.set('page', '1');
      return prev;
    });
  };

  return (
    <div>
      <CustomJumbotron
        title="Pokédex Nacional"
        description="Explora las diferentes especies de Pokémon clasificadas por región."
      />


      <div className="flex justify-center mb-10 w-full">
        <Tabs value={currentGen} onValueChange={handleGenChange} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-9 h-20 min-h-20 gap-2 bg-slate-900/80 border border-slate-800 p-2 rounded-xl w-full">
            {GENERATIONS.map((gen) => (
              <TabsTrigger
                key={gen.id}
                value={gen.id}
                className="h-full min-h-0 data-[state=active]:bg-red-500 data-[state=active]:text-white text-slate-300 hover:bg-slate-700 hover:text-white data-[state=inactive]:hover:bg-slate-800 px-1 transition-all rounded-lg text-sm md:text-base whitespace-nowrap"
              >
                <div className="flex flex-col items-center justify-center">
                  <span className="font-semibold">{gen.region}</span>
                  <span className="text-[10px] md:text-xs opacity-70">{gen.name}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>


      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {[...Array(12)].map((_, i) => (
            <PokemonCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className={`transition-opacity duration-300 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {data?.pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </div>
      )}

      <CustomPagination totalPages={data?.pages ?? 1} />
    </div>
  );
};