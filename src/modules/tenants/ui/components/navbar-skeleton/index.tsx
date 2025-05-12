import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <div />
        <Button className="bg-white" disabled>
          <ShoppingCartIcon className="text-black" />
        </Button>
      </div>
    </nav>
  );
};
