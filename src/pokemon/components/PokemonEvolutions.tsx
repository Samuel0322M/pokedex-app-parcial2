import { useQuery } from "@tanstack/react-query";
import { getPokemonEvolutionsAction, type EvolutionNode } from "@/pokemon/actions/get-evolutions.action";
import { ArrowDown } from "lucide-react";

interface Props {
  pokemonId: string;
}

export const PokemonEvolutions = ({ pokemonId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ['evolutions', pokemonId],
    queryFn: () => getPokemonEvolutionsAction(pokemonId)
  });

  if (isLoading) return <p className="text-slate-400 animate-pulse text-center p-4">Analizando ADN evolutivo...</p>;
  if (!data) return null;

  
  const renderNode = (node: EvolutionNode) => (
    <div key={node.name} className="flex flex-col items-center">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center w-48 text-center hover:bg-slate-800 transition-colors">
        <img src={node.image} alt={node.name} className="w-24 h-24 object-contain drop-shadow-lg" loading="lazy" />
        <p className="capitalize font-bold text-slate-100 mt-2">{node.name}</p>
        <p className="text-xs text-emerald-400 font-mono mt-1 uppercase">{node.method}</p>
      </div>
      
      {node.evolvesTo.length > 0 && (
        <div className="flex flex-col items-center w-full">
          <ArrowDown className="text-slate-600 my-2 h-6 w-6" />
          <div className="flex gap-4 justify-center flex-wrap">
            
            {node.evolvesTo.map((child: EvolutionNode) => renderNode(child))}
          </div>
        </div>
      )}
    </div>
  );

  return <div className="flex justify-center p-4 overflow-x-auto">{renderNode(data)}</div>;
};