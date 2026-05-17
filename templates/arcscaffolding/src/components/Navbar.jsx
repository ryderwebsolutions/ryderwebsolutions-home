import { useState, useEffect } from "react";
import { site } from "../data/siteContent";

const brandLogoSrc = `${import.meta.env.BASE_URL}arcscaffoldinglogo.jpg`;

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Safety", href: "#safety" },
  { label: "Projects", href: "#gallery" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy shadow-xl shadow-navy-dark/40" : "bg-navy/98"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <a href="#" className="flex items-center flex-shrink-0 group" aria-label="ARC Scaffold Services home">
            <img
              src={brandLogoSrc}
              alt="ARC Scaffold Services"
              className="h-11 w-auto object-contain sm:h-12 lg:h-14 transition-transform duration-200 group-hover:scale-[1.01]"
              loading="eager"
              decoding="async"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white font-medium text-sm transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-arc-orange transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="tel:0831885888"
              className="hidden xl:flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium transition-colors"
              aria-label="Call 083 188 5888"
            >
              <svg className="w-4 h-4 text-arc-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              083 188 5888
            </a>
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2 bg-arc-orange hover:bg-arc-orange-dark text-white font-semibold text-sm px-5 py-2.5 rounded transition-colors duration-200 shadow-orange"
            >
              Request A Quote
            </a>
            <button
              className="lg:hidden text-white p-2 rounded hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-white/10 py-3" role="navigation" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center px-4 py-3.5 text-gray-300 hover:text-white hover:bg-white/5 font-medium text-sm transition-colors rounded"
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-3 pb-2 space-y-2">
              <a
                href="tel:0831885888"
                className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold text-sm px-5 py-3 rounded transition-colors"
                onClick={handleLinkClick}
              >
                <svg className="w-4 h-4 text-arc-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call 083 188 5888
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center bg-arc-orange hover:bg-arc-orange-dark text-white font-bold text-sm px-5 py-3.5 rounded transition-colors shadow-orange"
                onClick={handleLinkClick}
              >
                Request A Quote
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
