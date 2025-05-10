"use client"

import Link from "next/link";
import Image from "next/image";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { generateTenantUrl } from "@/modules/tenants/utils";

interface NavbarProps {
  slug: string
};

export const Navbar = ({ slug }: NavbarProps ) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }))

  return (
    <nav className="h-20 border-b font-medium bg-white">
        <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
          <Link 
            href={generateTenantUrl(slug)} 
            className="flex items-center gap-2"
          >
            {data.image?.url && (
              <Image 
                src={data.image?.url}
                alt={data.name}
                width={32}
                height={32}
                className="rounded-full border shrink-0 size-[32px]"
              />
            )}
            <p className="text-xl">{data.name}</p>
          </Link>
        </div>
    </nav>
  );
};