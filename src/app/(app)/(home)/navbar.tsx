"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";

import { Button } from "@/components/ui/button";
import { NavbarSidebar } from "./navbar-sidebar";

// import { Poppins } from "next/font/google";
// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["700"],
// });

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ children, href, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href="/" className="pl-6 flex items-center">
        <Image
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTciIGhlaWdodD0iMjIiIGZpbGw9Im5vbmUiPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik05My4yOTMuNzc4Yy0zLjI0MyAwLTYuNDEzIDIuODA1LTYuNzc3IDYuODU4VjEuMTEyaC00LjY1N3YxOS42NzFoNC43MTR2LTkuNTIxYzAtMi42NjcgMS45NzktNi40MyA2LjcyLTYuNDN6bTQ5LjQ4NSAxNi44NTZWNC4xNTdoMi43MzFjMy42NDEgMCA2LjU5OSAyLjE3NCA2LjU5OSA2LjYzcy0yLjk1OCA2Ljg0Ny02LjU5OSA2Ljg0N3ptLTQuNjY1IDMuMTUyaDcuOTY1YzQuODkyIDAgMTAuOTIyLTMuMDQzIDEwLjkyMi05Ljk5OSAwLTYuODQ3LTYuMDMtOS42NzMtMTAuOTIyLTkuNjczaC03Ljk2NXptLTE3Ljg4OS05Ljc4YzAtMy41ODcgMS45MzQtNi41MjEgNS4xMi02LjUyMSAzLjA3MiAwIDQuNzc5IDIuOTM0IDQuNzc5IDYuNTIgMCAzLjU4Ny0xLjcwNyA2LjUyMi00Ljc3OSA2LjUyMi0zLjE4NiAwLTUuMTItMi45MzUtNS4xMi02LjUyMW0tNC43NzkuMjE3YzAgNS44NjkgMy4xODYgOS45OTkgOC4xOTIgOS45OTkgMy42NDEgMCA1LjgwMy0yLjI4MiA2Ljk0MS01Ljk3OHY1LjU0M2g0LjY2NFYxLjExNmgtNC42NjR2NS4yMTZDMTI5LjU1NCAyLjg1NSAxMjcuMzkyLjc5IDEyMy45NzkuNzljLTUuMTIgMC04LjUzNCA0LjQ1Ni04LjUzNCAxMC40MzNNOS4yMTYgMjEuMjIyQzMuNDEzIDIxLjIyMiAwIDE2Ljc2NiAwIDExLjIyMyAwIDUuNDYzIDMuNzU1Ljc5IDEwLjkyMy43OWM3LjM5NSAwIDkuODk4IDQuNzgyIDEwLjAxMiA3LjQ5OWgtNS4zNDdjLS4xMTQtMS41MjItMS40OC0zLjgwNC00Ljc4LTMuODA0LTMuNTI2IDAtNS44MDIgMi45MzQtNS44MDIgNi41MiAwIDMuNTg3IDIuMjc2IDYuNTIyIDUuODAzIDYuNTIyIDMuMTg2IDAgNC41NTEtMi4zOTEgNS4xMi00Ljc4MmgtNS4xMnYtMS45NTdoMTAuNzQzdjEwSDE2Ljg0di02LjMwNGMtLjM0MSAyLjI4Mi0xLjgyIDYuNzM4LTcuNjIzIDYuNzM4Wm0yMS44OTItLjAwMmMtNC40MzcgMC03LjE2OC0yLjgyNS03LjE2OC04LjQ3N1YxLjExNGg0Ljc3OXYxMS42M2MwIDIuOTM0IDEuNDc5IDQuMzQ3IDMuOTgyIDQuMzQ3IDQuODkyIDAgNi43MTMtNS43NiA2LjcxMy05Ljc4MlYxLjExNGg0Ljc3OHYxOS42NzJoLTQuNjY0di03LjI4MmMtLjkxIDQuMDIxLTMuNDE0IDcuNzE3LTguNDIgNy43MTdaTTcyLjc0MS43NzhjLTQuMDc3IDAtNi42NDkgMy43NjItNy40ODggNy4yNC0uMTQ0LTQuNjYtMi41NDQtNy4yNC02LjM4My03LjI0LTMuMzE4IDAtNi4zOTYgMi44MjYtNy4xOTUgNy4yOTdWMS4xMTNoLTQuNjU4djE5LjY3Mmg0LjcxOHYtNy4wNTJjMC0xLjc0OS43NjMtOC45MjQgNS41MTItOC45MjQgMy4wNzcgMCAzLjM5OCAyLjY1MSAzLjM5OCA2LjI3NXY5LjcwMWg0LjcxNnYtNy4wNTJjMC0xLjc0OS43OTQtOC45MjQgNS41NDQtOC45MjQgMy4wNzQgMCAzLjM5MiAyLjY1MSAzLjM5MiA2LjI3NXY5LjcwMWg0LjcyMlY5LjE1Yy4wMjItNS41ODItMi4wNDItOC4zNy02LjI3OC04LjM3Wm0zMC42NzQgMEM5Ny4zMDYuNzc4IDkzLjE2OCA1LjM1MyA5My4xNjggMTFjMCA2LjIyMSAzLjkzNiAxMC4yMiAxMC4yNDcgMTAuMjIgNi4xMDggMCAxMC4zMi00LjU3NCAxMC4zMi0xMC4yMiAwLTYuMjIyLTQuMDEzLTEwLjIyMi0xMC4zMi0xMC4yMjJtMCAxNi45NmMtMy41NTYgMC01Ljg2LTIuODc1LTUuODYtNi43MzhzMi4zMTItNi43NCA1Ljg2LTYuNzRjMy41NDcgMCA1Ljc2NiAyLjg3NiA1Ljc2NiA2Ljc0IDAgMy44NjMtMi4yMjEgNi43MzktNS43NjYgNi43MzlaIi8+PC9zdmc+"
          alt="Gumroad Logo"
          width={157}
          height={60}
          className="h-auto"
        />
      </Link>

      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />

      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item, index) => (
          <NavbarItem
            key={index}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      {session.data?.user ? (
        <div className="hidden lg:flex">
          <Button
            asChild
            variant="secondary"
            className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
          >
            <Link href="/admin">
              Dashboard
            </Link>
          </Button>
        </div>
      ) : (
        <div className="hidden lg:flex">
          <Button
            asChild
            variant="secondary"
            className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
          >
            <Link prefetch href="/sign-in">
              Log in
            </Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
          >
            <Link prefetch href="/sign-up">
              Start Selling
            </Link>
          </Button>
        </div>
      )}
      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant="ghost"
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
