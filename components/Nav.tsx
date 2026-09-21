"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";
import NavSocials from "@/components/NavSocials";

const links = [
  ["Home", "/"],
  ["About Us", "/about-us"],
  ["Service List", "/services"],
  ["Products", "/products"],
  ["Contact Us", "/book-online#contact"],
] as const;

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!menuOpen) return;

    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="site-width header-inner">
        <a className="brand dark-brand" href="/" onClick={() => setMenuOpen(false)}>
          <img className="brand-mark" src="/images/image.png" alt="Codcknet logo" />
          <span className="brand-name">
            Codcknet <small>Nigeria Limited</small>
          </span>
        </a>
        <nav id="main-navigation" className={`main-nav${menuOpen ? " open" : ""}`} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a
              key={href}
              className={(() => {
                const route = href.split("#")[0];
                return (route === "/" ? pathname === "/" : pathname.startsWith(route))
                  ? "active"
                  : undefined;
              })()}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="mobile-nav-socials">
            <NavSocials />
          </div>
        </nav>
        <div className="header-tools">
          <NavSocials />
          <ThemeToggle />
          <a className="header-action" href="/book-online">
            Get started <ArrowRight size={15} />
          </a>
        </div>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}