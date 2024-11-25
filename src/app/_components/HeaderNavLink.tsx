"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type PropsWithChildren } from "react";

type HeaderNavLinkProps = {
  href: string;
} & PropsWithChildren;

export function HeaderNavLink({ href, children }: HeaderNavLinkProps) {
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <Link
      href={href}
      className={`block rounded p-2 hover:bg-white/20 ${
        active ? "font-semibold text-[hsl(280,100%,70%)]" : "text-white"
      }`}
    >
      {children}
    </Link>
  );
}
