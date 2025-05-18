import { DEFAULT_LIMIT } from "@/modules/tags/constants";

import { ProductCardSkeleton } from "@/modules/library/ui/components/product-card-skeleton";

export const ProductListSkeleton = () => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
