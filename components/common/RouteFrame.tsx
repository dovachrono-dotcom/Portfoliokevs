"use client";

import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";
import { useSiteScrollMotion } from "./useSiteScrollMotion";

export function RouteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  useSiteScrollMotion(root, pathname);
  const className = pathname === "/" ? undefined : pathname === "/contact" ? "secondary-page contact-page" : pathname === "/about" ? "secondary-page about-page" : pathname === "/projects" ? "secondary-page projects-page" : pathname === "/blog" || pathname.startsWith("/blog/") ? "secondary-page blog-page" : "secondary-page";
  return <div ref={root} className={className}>{children}</div>;
}
