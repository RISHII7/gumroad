import { useQueryStates, parseAsArrayOf, parseAsString, parseAsStringLiteral } from "nuqs";

import { sortValues } from "@/modules/products/constants";

const params = {
  sort: parseAsStringLiteral(sortValues).withDefault("curated"),
  minPrice: parseAsString.withOptions({
    clearOnDefault: true,
  })
  .withDefault(""),
  maxPrice: parseAsString.withOptions({
    clearOnDefault: true,
  })
  .withDefault(""),
  tags: parseAsArrayOf(parseAsString)
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault([]),
};

export const useProductFilters = () => {
  return useQueryStates(params);
};

