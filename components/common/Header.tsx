"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dialog } from "radix-ui";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/portfolio";
import styles from "./SiteChrome.module.css";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isCurrent = (path: string) => pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));
  return (
    <header className={styles.header}>
      <div className={cn(styles.headerInner, "page-shell")}>
        <Link href="/" className={styles.brand} data-glow="logo" aria-label="Kevin Mercado — home"><span className={styles.brandMark} aria-hidden="true">k.</span><span>kevin mercado<span className={styles.brandPeriod}>.</span></span></Link>
        <nav aria-label="Main navigation" className={styles.desktopNav}>{NAV_LINKS.map((link) => <Link key={link.href} href={link.href} data-glow="nav" aria-current={isCurrent(link.href) ? "page" : undefined}>{link.label}</Link>)}</nav>
        <div className={styles.headerRight}>
          <ThemeToggle />
          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger className={styles.menuToggle} aria-label="Open navigation"><Menu size={21} aria-hidden="true" /></Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className={styles.mobileOverlay} />
              <Dialog.Content className={styles.mobilePanel} aria-describedby="navigation-description">
                <div className={styles.mobilePanelTop}><Dialog.Title>Explore</Dialog.Title><Dialog.Close className={styles.closeButton} aria-label="Close navigation"><X size={21} aria-hidden="true" /></Dialog.Close></div>
                <Dialog.Description id="navigation-description" className={styles.mobileDescription}>Kevin Mercado’s portfolio</Dialog.Description>
                <nav aria-label="Mobile navigation" className={styles.mobileNav}>{NAV_LINKS.map((link) => <Link key={link.href} href={link.href} data-glow="plain-nav" onClick={() => setMenuOpen(false)} aria-current={isCurrent(link.href) ? "page" : undefined}>{link.label}<ArrowUpRight size={20} aria-hidden="true" /></Link>)}</nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
