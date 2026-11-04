import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Link, useLocation } from 'react-router';
import { cn } from '@/lib/utils';

export const CustomMenu = () => {
  const { pathname } = useLocation();
  
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <NavigationMenu className="py-4 border-b border-slate-800 mb-6">
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              "px-4 py-2 rounded-md transition-colors hover:bg-slate-800 hover:text-slate-50 cursor-pointer",
              isActive('/') ? 'bg-slate-800 text-slate-50 font-medium' : 'text-slate-400'
            )}
          >
            <Link to="/">Inicio</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              "px-4 py-2 rounded-md transition-colors hover:bg-slate-800 hover:text-slate-50 cursor-pointer",
              isActive('/search') ? 'bg-slate-800 text-slate-50 font-medium' : 'text-slate-400'
            )}
          >
            <Link to="/search">Buscar Pokémon</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};