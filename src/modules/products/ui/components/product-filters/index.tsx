"use client"

import { PriceFilter } from "@/modules/products/ui/components/price-filter";
import { ProductFilter } from "@/modules/products/ui/components/product-filter";
import { useProductFilters } from "@/modules/products/hooks/use-product-filters";

export const ProductFilters = () => {
    const [filters, setFilters] = useProductFilters();

    const onChange = (key: keyof typeof filters, value: unknown) => {
        setFilters({...filters, [key]: value});
    };

    return (
        <div className="border rounded-md bg-white">
            <div className="p-4 border-b flex items-center justify-between">
                <p className="font-medium">Filters</p>
                <button
                    type="button"
                    onClick={() => { }}
                    className="underline"
                >
                    Clear
                </button>
            </div>
            <ProductFilter title="Price">
                <PriceFilter 
                    minPrice={filters.minPrice} 
                    maxPrice={filters.maxPrice} 
                    onMinPriceChange={(value) => onChange("minPrice", value)}
                    onMaxPriceChange={(value) => onChange("maxPrice", value)}
                />
            </ProductFilter>
        </div>
    );
};