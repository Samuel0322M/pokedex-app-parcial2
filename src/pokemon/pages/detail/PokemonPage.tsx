import { Navigate, useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPokemonAction } from "@/pokemon/actions/get-pokemon.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PokemonEvolutions } from "@/pokemon/components/PokemonEvolutions";
import { Skeleton } from "@/components/ui/skeleton";

const statBarColors: Record<string, string> = {
  hp: "[&_[data-slot=progress-indicator]]:bg-emerald-500",
  attack: "[&_[data-slot=progress-indicator]]:bg-red-500",
  defense: "[&_[data-slot=progress-indicator]]:bg-blue-500",
  "special-attack": "[&_[data-slot=progress-indicator]]:bg-violet-500",
  "special-defense": "[&_[data-slot=progress-indicator]]:bg-teal-500",
  speed: "[&_[data-slot=progress-indicator]]:bg-amber-400",
  default: "[&_[data-slot=progress-indicator]]:bg-sky-500",
};

const moveBadgeColors = [
  "border-cyan-400/40 bg-cyan-500/15 text-cyan-200 hover:bg-cyan-500/30 hover:text-white",
  "border-fuchsia-400/40 bg-fuchsia-500/15 text-fuchsia-200 hover:bg-fuchsia-500/30 hover:text-white",
  "border-amber-400/40 bg-amber-500/15 text-amber-200 hover:bg-amber-500/30 hover:text-white",
  "border-emerald-400/40 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/30 hover:text-white",
  "border-violet-400/40 bg-violet-500/15 text-violet-200 hover:bg-violet-500/30 hover:text-white",
  "border-rose-400/40 bg-rose-500/15 text-rose-200 hover:bg-rose-500/30 hover:text-white",
];

export const PokemonPage = () => {
  const { idSlug = '' } = useParams();

  const { data: pokemon, isLoading, isError } = useQuery({
    queryKey: ['pokemon-detail', idSlug],
    queryFn: () => getPokemonAction(idSlug),
    retry: false,
  });

  if (isError) return <Navigate to="/" />;

  if (isLoading || !pokemon) {
    return (
      <div className="max-w-6xl mx-auto mt-4">
        <Skeleton className="h-10 w-40 mb-6 bg-slate-900" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 bg-slate-900/50 rounded-3xl p-6 border border-slate-800 flex flex-col items-center">
            <Skeleton className="h-56 w-56 rounded-full bg-slate-800 mb-6 mt-4" />
            <Skeleton className="h-10 w-48 bg-slate-800 mb-4" />
            <Skeleton className="h-20 w-full bg-slate-800 rounded-xl" />
          </div>
          <div className="lg:col-span-8">
            <Skeleton className="h-12 w-full bg-slate-900 mb-4" />
            <Skeleton className="h-96 w-full bg-slate-900 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-4">
      <Button variant="outline" asChild className="mb-6 bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200 hover:text-white">
        <Link to="/">← Volver a la Pokédex</Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 bg-slate-900/80 rounded-3xl p-6 border border-slate-800 flex flex-col items-center shadow-lg text-slate-100">
          <span className="text-slate-400 font-mono text-xl font-bold w-full text-left">#{pokemon.id.padStart(3, '0')}</span>
          <img src={pokemon.image} alt={pokemon.name} className="w-64 h-64 object-contain drop-shadow-2xl my-4 hover:scale-105 transition-transform" />
          <h1 className="text-4xl font-extrabold capitalize text-white mb-4 tracking-tight">{pokemon.name}</h1>
          <div className="flex gap-2 flex-wrap justify-center">
            {pokemon.types.map(type => (
              <Badge key={type} className="capitalize px-4 py-1 text-sm bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700">{type}</Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 w-full mt-8 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="text-center">
              <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Altura</p>
              <p className="text-slate-200 font-semibold">{pokemon.height} m</p>
            </div>
            <div className="text-center border-l border-slate-800">
              <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Peso</p>
              <p className="text-slate-200 font-semibold">{pokemon.weight} kg</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-20 min-h-20 bg-slate-900/80 border border-slate-800 p-1.5 rounded-xl">
              <TabsTrigger value="stats" className="h-full min-h-full text-base text-slate-400 hover:text-slate-200 data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-lg transition-all">
                Estadísticas
              </TabsTrigger>

              <TabsTrigger value="moves" className="h-full min-h-full text-base text-slate-400 hover:text-slate-200 data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-lg transition-all">
                Movimientos
              </TabsTrigger>

              <TabsTrigger value="evolutions" className="h-full min-h-full text-base text-slate-400 hover:text-slate-200 data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-lg transition-all">
                Evoluciones
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="mt-6 focus-visible:outline-none">
              <Card className="bg-slate-900/90 border-slate-800 shadow-xl text-slate-100 min-h-[450px]">
                <CardHeader className="border-b border-slate-800/80 pb-5">
                  <CardTitle className="text-2xl text-white">Stats de Combate</CardTitle>
                </CardHeader>
                <CardContent className="pt-8 space-y-7">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.name} className="space-y-3">
                      <div className="flex justify-between text-base font-medium">
                        <span className="capitalize text-slate-300">{stat.name.replace('-', ' ')}</span>
                        <span className="text-white font-bold text-lg">{stat.value}</span>
                      </div>
                      <Progress
                        value={(stat.value / 255) * 100}
                        className={`h-3 bg-slate-800/80 ${statBarColors[stat.name] ?? statBarColors.default}`}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="moves" className="mt-6 focus-visible:outline-none">
              <Card className="bg-slate-900/90 border-slate-800 shadow-xl text-slate-100 min-h-[450px]">
                <CardHeader className="border-b border-slate-800/80 pb-5">
                  <CardTitle className="text-2xl text-white">Movimientos Aprendidos</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-3 h-[350px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-700">
                    {pokemon.moves.map((move, index) => (
                      <Badge key={move} variant="outline" className={`h-auto rounded-xl px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${moveBadgeColors[index % moveBadgeColors.length]}`}>
                        {move.replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evolutions" className="mt-6 focus-visible:outline-none">
              <Card className="bg-slate-900/90 border-slate-800 shadow-xl text-slate-100 min-h-[450px]">
                <CardHeader className="border-b border-slate-800/80 pb-5">
                  <CardTitle className="text-2xl text-white">Línea Evolutiva</CardTitle>
                </CardHeader>
                <CardContent className="pt-10">
                  <PokemonEvolutions pokemonId={pokemon.id} />
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
};