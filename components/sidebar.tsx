"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export function Sidebar() {
  return (
    <div className="flex flex-col  items-end fixed">
      <SidebarLink href="/">Overview</SidebarLink>
      <SidebarLink href="/items">Items</SidebarLink>
      <SidebarLink href="/materials">Materials</SidebarLink>
      <SidebarLink href="/crafters">Crafters</SidebarLink>
    </div>
  );
}

function SidebarLink(props: { href: string; children: ReactNode }) {
  const pathName = usePathname();
  const isCurrent = pathName == props.href;

  const weight = isCurrent ? "font-extrabold" : "";
  return (
    <Link href={props.href} className={`hover:underline ${weight} font-mono`}>
      {props.children}
    </Link>
  );
}
