import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useCart } from "@/modules/checkout/hooks/use-cart";
import { generateTenantURL } from "@/modules/tenants/utils";

interface CheckoutButtonProps {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
}

export const CheckoutButton = ({
  className,
  hideIfEmpty,
  tenantSlug,
}: CheckoutButtonProps) => {
  const { totalItems } = useCart(tenantSlug);

  if (hideIfEmpty && totalItems === 0) return null;

  return (
    <Button variant="elevated" asChild className={cn("bg-white", className)}>
      <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
        <ShoppingCartIcon /> {totalItems > 0 ? totalItems : ""}
      </Link>
    </Button>
  );
};
