import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { PrimaryButton } from "./Buttons";
import { navLinks } from "../data/siteContent";

const activeClass = "text-dusty";

function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <Link to="/" className="text-3xl leading-none text-charcoal">
          Céire Dunne
          <span className="block font-sans text-xs uppercase tracking-[0.3em] text-charcoal/70">Interiors</span>
        </Link>

        <button
          type="button"
          className="rounded-full border border-dusty px-4 py-2 text-sm text-charcoal md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          Menu
        </button>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm tracking-wide text-charcoal transition hover:text-dusty ${isActive ? activeClass : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <PrimaryButton to="/contact">Book A Consultation</PrimaryButton>
        </nav>
      </div>

      <div
        id="mobile-nav"
        className={`mx-5 overflow-hidden rounded-3xl bg-white/80 px-5 transition-all duration-300 md:hidden ${
          open ? "max-h-96 py-5" : "max-h-0 py-0"
        }`}
      >
        <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-base text-charcoal transition hover:text-dusty ${isActive ? activeClass : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <PrimaryButton to="/contact" className="mt-2" onClick={() => setOpen(false)}>
            Book A Consultation
          </PrimaryButton>
        </nav>
      </div>

      <main key={location.pathname} className="page-enter">
        <Outlet />
      </main>

      <footer className="mt-20 border-t border-charcoal/10 bg-white/65">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3 md:px-8">
          <div>
            <p className="text-3xl text-charcoal">Céire Dunne</p>
            <p className="text-sm uppercase tracking-[0.3em] text-charcoal/70">Interiors</p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-dusty">Contact</p>
            <p className="text-charcoal/80">ceiredunneinteriors@gmail.com</p>
            <p className="text-charcoal/80">087 9956 0006</p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-dusty">Studio Focus</p>
            <p className="text-charcoal/80">Thoughtful interiors for real Irish homes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
