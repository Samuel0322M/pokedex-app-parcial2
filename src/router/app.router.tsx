import { createBrowserRouter, Navigate } from "react-router";
import { PokemonLayout } from "@/pokemon/layout/PokemonLayout";
import { HomePage } from "@/pokemon/pages/home/HomePage";
import { PokemonPage } from "@/pokemon/pages/detail/PokemonPage";
import { SearchPage } from "@/pokemon/pages/search/SearchPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <PokemonLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "pokemon/:idSlug",
        element: <PokemonPage />
      },
      {
        path: "search",
        element: <SearchPage />
      },
      {
        path: '*',
        element: <Navigate to="/" />
      }
    ]
  }
]);