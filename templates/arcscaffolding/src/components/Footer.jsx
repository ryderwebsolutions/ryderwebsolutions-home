import { site, services } from "../data/siteContent";

const brandLogoSrc = `${import.meta.env.BASE_URL}arcscaffoldinglogo.jpg`;

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-gray-400">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 — Brand & Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="inline-flex items-center mb-5 group" aria-label="ARC Scaffold Services home">
              <img
                src={brandLogoSrc}
                alt="ARC Scaffold Services"
                className="h-12 w-auto max-w-[180px] object-contain"
                loading="lazy"
                decoding="async"
              />
            </a>

            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Advanced scaffolding specialists providing safe, reliable scaffolding solutions for commercial, residential, and trade projects across Ireland.
            </p>

            <div className="space-y-2.5 text-sm">
              <a
                href={`tel:${site.phoneTel}`}
                className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors group"
              >
                <svg className="w-4 h-4 text-arc-orange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{site.phone}</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-arc-orange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>{site.email}</span>
              </a>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-arc-orange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
                </svg>
                <a href={`https://${site.domain}`} className="hover:text-white transition-colors">
                  {site.domain}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Services</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-arc-orange text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-arc-orange/50 rounded-full group-hover:bg-arc-orange transition-colors flex-shrink-0" />
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Navigation */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Navigation</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Services", href: "#services" },
                { label: "Safety", href: "#safety" },
                { label: "Projects", href: "#gallery" },
                { label: "Process", href: "#process" },
                { label: "FAQ", href: "#faq" },
                { label: "Request A Quote", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-arc-orange text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-arc-orange/50 rounded-full group-hover:bg-arc-orange transition-colors flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Social & CTA */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Follow Us</h3>
            <div className="flex gap-3 mb-7">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/8 hover:bg-arc-orange border border-white/10 hover:border-arc-orange rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                aria-label="ARC Scaffold Services on Instagram"
              >
                <InstagramIcon />
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-5">
              <p className="text-white font-bold text-sm mb-1">Ready to get started?</p>
              <p className="text-gray-400 text-xs mb-4">Call or request a quote online today.</p>
              <a
                href="#contact"
                className="block text-center bg-arc-orange hover:bg-arc-orange-dark text-white font-bold text-sm px-4 py-2.5 rounded transition-colors duration-200"
              >
                Request A Quote
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            &copy; {currentYear} ARC Scaffold Services. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            <a href={`https://${site.domain}`} className="hover:text-arc-orange transition-colors">
              {site.domain}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
