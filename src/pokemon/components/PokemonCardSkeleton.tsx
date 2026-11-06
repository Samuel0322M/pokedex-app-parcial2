import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PokemonCardSkeleton = () => {
    return (
        <Card className="overflow-hidden bg-slate-900 border-slate-800">

            <div className="relative h-48 bg-slate-800/30 flex items-center justify-center p-4">

                <Skeleton className="absolute top-2 right-3 h-4 w-8 bg-slate-800" />

                <Skeleton className="h-32 w-32 rounded-full bg-slate-800" />
            </div>

            <CardHeader className="p-4 flex items-center">

                <Skeleton className="h-6 w-28 bg-slate-800" />
            </CardHeader>
        </Card>
    );
};