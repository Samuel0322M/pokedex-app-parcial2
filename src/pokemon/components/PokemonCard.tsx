import { Card, CardHeader } from '@/components/ui/card';
import type { SimplePokemon } from '../types/pokemon.interface';
import { useNavigate } from 'react-router';

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <Card 
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-slate-900 border-slate-800"
    >
      <div className="relative h-48 bg-slate-800/50 flex items-center justify-center p-4">
        <span className="absolute top-2 right-3 text-xs font-mono font-bold text-slate-500">
          #{pokemon.id.padStart(3, '0')}
        </span>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="h-36 w-36 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
          loading="lazy"
        />
      </div>

      <CardHeader className="p-4 text-center">
        <h3 className="capitalize font-bold text-lg text-slate-100">{pokemon.name}</h3>
      </CardHeader>
    </Card>
  );
};