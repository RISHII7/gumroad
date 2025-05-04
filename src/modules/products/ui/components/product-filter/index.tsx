import { useState } from "react";
import { ChevronRightIcon, ChevronsDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ProductFilterProps {
    title: string;
    className?: string;
    children: React.ReactNode;
};

export const ProductFilter = ({ title, children, className }: ProductFilterProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const Icon = isOpen ? ChevronsDownIcon : ChevronRightIcon;

    return (
        <div className={cn(
            "p-4 border-b flex flex-col gap-2",
            className
        )}>
            <div
                onClick={() => setIsOpen((current) => !current)}
                className="flex items-center justify-between cursor-pointer"
            >
                <p className="font-medium">{title}</p>
                <Icon className="size-5" />
            </div>
            {isOpen && children}
        </div>
    );
};