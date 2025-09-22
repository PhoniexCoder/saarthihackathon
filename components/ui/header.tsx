"use client";
import { useEffect, useState } from "react";
import { GSAPTextHover } from "@/components/effects/gsap-text-hover";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBase =
    "fixed top-0 w-full z-50 rounded-b-2xl text-black transition-all duration-300 shadow-none border-0";
  const navWhenTop =
    "bg-transparent backdrop-blur-0";
  const navWhenScrolled =
    "bg-white backdrop-blur-0";

  const mobilePanelBase =
    "absolute left-0 top-full w-full md:hidden animate-slide-in-down z-40 rounded-b-2xl transition-all duration-300";
  const mobilePanelTop =
    "bg-white/85 backdrop-blur-xl";
  const mobilePanelScrolled =
    "bg-white";

  const navLinks = [
    { href: "/" , label: "Home" },
    { href: "/about", label: "About" },
    { href: "/team", label: "Organizers" },
    { href: "/sponsors", label: "Sponsors" },
    { href: "/guidelines", label: "Guidelines" },
    { href: "/results", label: "Results" },
  ];

  return (
    <nav className={`${navBase} ${scrolled ? navWhenScrolled : navWhenTop}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          <a href="/" className="flex items-center space-x-3 group z-[60] relative">
            <img src="/GEHU.png" alt="GEHU Logo" className="h-10 w-auto" />
            <img src="/saarthi_log.png" alt="SAARTHI Logo" className="h-10 w-auto" />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8 z-[60] relative">
            {navLinks.map((link) => (
              <GSAPTextHover key={link.href} blendMode="overlay" scaleAmount={1.1}>
                <a
                  href={link.href}
                  className="nav-link-tech text-black font-semibold"
                >
                  {link.label}
                </a>
              </GSAPTextHover>
            ))}
            <Button size="lg" className="text-lg px-8 py-3 ml-2" asChild>
              <a href="https://unstop.com/" target="_blank" rel="noopener noreferrer">
                Register Now
              </a>
            </Button>
          </div>

          {/* Mobile hamburger */}
          {!mobileOpen ? (
            <button
              className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary z-[60] relative"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          ) : (
            <button
              className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary z-[60] relative"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Mobile nav overlay */}
          {mobileOpen && (
            <div
              className={`${mobilePanelBase} ${scrolled ? mobilePanelScrolled : mobilePanelTop}`}
            >
              <div className="flex flex-col py-6 px-6">
                {navLinks.map((link, idx) => (
                  <div key={link.href}>
                    <a
                      href={link.href}
                      className="block text-lg font-semibold text-black py-2 px-2 rounded hover:bg-primary/10 transition"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                    {idx !== navLinks.length - 1 && <div className="border-b border-gray-200 my-1" />}
                  </div>
                ))}
                <div className="mt-4">
                  <a
                    href="https://unstop.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg font-bold text-center bg-primary text-white rounded px-4 py-3 shadow hover:bg-primary/90 transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Decorative inset glow (kept above bg, below text) */}
          <div className="absolute inset-0 pointer-events-none" />
        </div>
      </div>
    </nav>
  );
}
