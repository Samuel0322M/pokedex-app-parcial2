import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router";
import { Button } from "../ui/button";


interface Props {
    totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const queryPage = searchParams.get('page') || '1';
    const page = isNaN(+queryPage) ? 1 : +queryPage;

    const handlePageChange = (newPage: number) => {
        if(newPage < 1 || newPage > totalPages) return;
        searchParams.set('page', newPage.toString());
        setSearchParams(searchParams);
    };

    return (
    <div className="flex items-center justify-center space-x-4 mt-10 mb-6">
      <Button 
        variant="outline" 
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="bg-slate-900 border-slate-700 hover:bg-slate-800 hover:text-white cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Anterior
      </Button>
      
      <span className="text-slate-400 font-medium">
        Página {page} de {totalPages}
      </span>

      <Button 
        variant="outline" 
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="bg-slate-900 border-slate-700 hover:bg-slate-800 hover:text-white cursor-pointer"
      >
        Siguiente
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};