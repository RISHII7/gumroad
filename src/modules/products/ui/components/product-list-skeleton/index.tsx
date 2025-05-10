import { DEFAULT_LIMIT } from "@/modules/tags/constants";

import { ProductCardSkeleton } from "@/modules/products/ui/components/product-card-skeleton";
import { cn } from "@/lib/utils";

interface ProductListSkeletonProps {
  narrowView?: boolean;
}

export const ProductListSkeleton = ({
  narrowView,
}: ProductListSkeletonProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
        narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
      )}
    >
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
