import { Outlet } from "react-router";
import { CustomMenu } from "@/components/custom/CustomMenu";

export const PokemonLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="max-w-7xl mx-auto p-6">
        <CustomMenu />
        <Outlet />
      </main>
    </div>
  );
};