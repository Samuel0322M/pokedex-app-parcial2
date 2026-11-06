import { useState, type SyntheticEvent } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPokemonAction } from "@/pokemon/actions/get-pokemon.action";
import { PokemonCard } from "@/pokemon/components/PokemonCard";
import { PokemonCardSkeleton } from "@/pokemon/components/PokemonCardSkeleton";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, AlertCircle } from "lucide-react";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Leemos el parámetro 'q' de la URL (ej: /search?q=charizard)
  const queryParam = searchParams.get('q') ?? '';
  
  // Estado local para controlar lo que el usuario escribe en el input
  const [inputValue, setInputValue] = useState(queryParam);

  const { data: pokemon, isLoading, isError } = useQuery({
    queryKey: ['pokemon-search', queryParam],
    queryFn: () => getPokemonAction(queryParam.toLowerCase()),
    // Solo ejecuta la petición si hay algo en la URL
    enabled: queryParam.length > 0, 
    retry: false, // No reintentar si el Pokémon no existe (para mostrar el error de inmediato)
  });

const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim().length === 0) return;
    
    setSearchParams({ q: inputValue.trim().toLowerCase() });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <CustomJumbotron 
        title="Buscador Pokémon" 
        description="Encuentra a tu Pokémon favorito por su nombre exacto o su número de Pokédex."
      />

      {/* Formulario de Búsqueda */}
      <form onSubmit={handleSubmit} className="flex gap-4 mb-10 mt-8">
        <Input 
          type="text"
          placeholder="Ejemplo: pikachu, lucario, 25..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
          className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-red-500 h-12 text-lg"
        />
        <Button 
          type="submit" 
          className="bg-red-600 hover:bg-red-700 text-white h-12 px-8 text-lg transition-colors cursor-pointer"
        >
          <Search className="mr-2 h-5 w-5" />
          Buscar
        </Button>
      </form>

      {/* Zona de Resultados */}
      <div className="flex justify-center mt-10">
        
        {/* Caso 1: Búsqueda en progreso */}
        {isLoading && (
          <div className="w-full max-w-[280px]">
            <PokemonCardSkeleton />
          </div>
        )}

        {/* Caso 2: Pokémon no encontrado (Error 404 de la PokéAPI) */}
        {isError && (
          <div className="bg-red-950/40 border border-red-900 rounded-xl p-8 flex flex-col items-center text-center w-full max-w-lg">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-red-400 mb-2">Pokémon no encontrado</h3>
            <p className="text-slate-400">
              No existe ningún Pokémon registrado con el nombre o número <strong className="text-slate-200">"{queryParam}"</strong>. Revisa la ortografía e intenta de nuevo.
            </p>
          </div>
        )}

        {/* Caso 3: Pokémon encontrado exitosamente */}
        {pokemon && !isLoading && !isError && (
          <div className="w-full max-w-[280px] animate-in fade-in zoom-in duration-300">
            {/* Reutilizamos el PokemonCard, adaptando nuestro PokemonDetail a un SimplePokemon */}
            <PokemonCard 
              pokemon={{
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.image
              }} 
            />
          </div>
        )}

        {/* Caso 4: Estado inicial vacío */}
        {!queryParam && !isLoading && !pokemon && !isError && (
          <div className="text-center text-slate-500 mt-10">
            <Search className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg">Ingresa un nombre para comenzar la búsqueda</p>
          </div>
        )}

      </div>
    </div>
  );
};