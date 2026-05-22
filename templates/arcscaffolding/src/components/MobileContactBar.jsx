import { site } from "../data/siteContent";

export default function MobileContactBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-navy-dark/98 border-t border-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-2.5 grid grid-cols-2 gap-2">
        <a
          href={`tel:${site.phoneTel}`}
          className="inline-flex items-center justify-center gap-2 rounded bg-arc-orange hover:bg-arc-orange-dark text-white font-bold text-xs sm:text-sm py-3 transition-colors"
          aria-label={`Call ${site.phone}`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {site.phone}
        </a>
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 rounded border border-white/20 text-white font-semibold text-sm py-3 hover:bg-white/10 transition-colors"
          aria-label="Go to quote form"
        >
          Get a Quote
        </a>
      </div>
    </div>
  );
}
