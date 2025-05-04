import { ChangeEvent } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatAsCurrency } from "@/modules/products/utils";

interface PriceFilterProps {
    minPrice?: string | null;
    maxPrice?: string | null;
    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
};

export const PriceFilter = ({ onMaxPriceChange, onMinPriceChange, maxPrice, minPrice }: PriceFilterProps) => {

    const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Get raw input value and extract only numeric values
        const numericValue = e.target.value.replace(/[^0-9.]/g, "");
        onMinPriceChange(numericValue);
    };

    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Get raw input value and extract only numeric values
        const numericValue = e.target.value.replace(/[^0-9.]/g, "");
        onMaxPriceChange(numericValue);
    };


    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <Label className="font-medium text-base">
                    Minimum price
                </Label>
                <Input
                    type="text"
                    placeholder="$0"
                    value={minPrice ? formatAsCurrency(minPrice) : ""}
                    onChange={handleMinPriceChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label className="font-medium text-base">
                    Maximum price
                </Label>
                <Input
                    type="text"
                    placeholder="∞"
                    value={maxPrice ? formatAsCurrency(maxPrice) : ""}
                    onChange={handleMaxPriceChange}
                />
            </div>
        </div>
    );
};