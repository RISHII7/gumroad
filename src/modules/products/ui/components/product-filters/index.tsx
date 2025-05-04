"use client"

import { TagsFilter } from "@/modules/tags/ui/components/tags-filter";

import { PriceFilter } from "@/modules/products/ui/components/price-filter";
import { ProductFilter } from "@/modules/products/ui/components/product-filter";
import { useProductFilters } from "@/modules/products/hooks/use-product-filters";

export const ProductFilters = () => {
    const [filters, setFilters] = useProductFilters();
    
    const hasAnyFilters = Object.entries(filters).some(([key, value]) => {
        if (key === "sort") return false;

        if (Array.isArray(value)) {
            return value.length > 0;
        };

        if (typeof value === "string") {
            return value !== "";
        };

        return value !== null;
    })

    const onClear = () => {
        setFilters({
            minPrice: "",
            maxPrice: "",
            tags: [],
        });
    };

    const onChange = (key: keyof typeof filters, value: unknown) => {
        setFilters({...filters, [key]: value});
    };

    return (
        <div className="border rounded-md bg-white">
            <div className="p-4 border-b flex items-center justify-between">
                <p className="font-medium">Filters</p>
                {hasAnyFilters && (
                <button
                    type="button"
                    onClick={() => onClear()}
                    className="underline cursor-pointer"
                >
                    Clear
                </button>
                )}
            </div>
            <ProductFilter title="Price">
                <PriceFilter 
                    minPrice={filters.minPrice} 
                    maxPrice={filters.maxPrice} 
                    onMinPriceChange={(value) => onChange("minPrice", value)}
                    onMaxPriceChange={(value) => onChange("maxPrice", value)}
                />
            </ProductFilter>

            <ProductFilter title="Tags">
                <TagsFilter
                    value={filters.tags}
                    onChange={(value) => onChange("tags", value) }
                />
            </ProductFilter>
        </div>
    );
};