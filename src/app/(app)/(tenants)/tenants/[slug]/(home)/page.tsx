import { SearchParams } from "nuqs";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { trpc, getQueryClient } from "@/trpc/server";

import { DEFAULT_LIMIT } from "@/modules/tags/constants";
import { loadProductFilters } from "@/modules/products/utils/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";

interface Props {
    searchParams: Promise<SearchParams>;
    params: Promise<{ slug: string }>;
};

const Page = async ({ params, searchParams }: Props) => {
    const { slug } = await params;
    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        ...filters,
        tenantSlug: slug,
        limit: DEFAULT_LIMIT
    }));

    return ( 
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView tenantSlug={slug} narrowView />
        </HydrationBoundary>
     );
};

export default Page;