import { site } from "../data/siteContent";

const trustBadges = [
  { label: "Commercial & Residential" },
  { label: "Experienced Team" },
  { label: "Safety Inspections & Tagging" },
  { label: "Labour Specialists" },
  { label: "Supply Available" },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen bg-navy flex flex-col justify-center overflow-hidden pt-16 bg-cover bg-center"
      style={{
        backgroundImage: `url('${import.meta.env.BASE_URL}images/commercial-multistory-scaffold.jpg')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
      aria-label="Hero"
    >
      {/* Dark navy overlay with semi-transparency */}
      <div
        className="absolute inset-0 bg-navy/75 pointer-events-none"
        aria-hidden="true"
      />

      {/* Gradient vignette for depth */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy-dark/60 via-navy/70 to-navy-light/50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Orange accent line — left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-arc-orange" aria-hidden="true" />

      {/* Orange accent line — bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-arc-orange" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-arc-orange/15 border border-arc-orange/35 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-arc-orange rounded-full flex-shrink-0" />
            <span className="text-arc-orange font-semibold text-xs uppercase tracking-[0.15em]">
              Safety-Focused Scaffolding Services
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-black text-white leading-[1.05] mb-6 tracking-tight">
            Advanced<br />
            <span className="text-arc-orange">Scaffolding</span><br />
            Specialists
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-200 max-w-2xl mb-4 leading-relaxed font-medium">
            Safe, reliable scaffolding solutions for commercial, residential, and trade projects across Ireland.
          </p>

          {/* Supporting text */}
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mb-12 leading-relaxed">
            Commercial &amp; residential scaffolding, temporary roof systems, trade support, inspections, tagging, design, and calculation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 bg-arc-orange hover:bg-arc-orange-dark text-white font-bold text-base px-8 py-4 rounded transition-all duration-200 hover:scale-[1.02] shadow-orange"
            >
              Request A Scaffolding Quote
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex items-center justify-center gap-2.5 bg-transparent hover:bg-white/8 text-white font-bold text-base px-8 py-4 rounded border-2 border-white/30 hover:border-white/60 transition-all duration-200"
            >
              <svg className="w-5 h-5 text-arc-orange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Dan: {site.phone}
            </a>
          </div>

          <div className="mb-10 text-sm text-gray-300">
            <a href={`tel:${site.phoneTel}`} className="hover:text-white transition-colors">Dan: {site.phone}</a>
            <span className="mx-3 text-gray-500">|</span>
            <a href={`tel:${site.phoneTelSecondary}`} className="hover:text-white transition-colors">Keith: {site.phoneSecondary}</a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2.5" role="list" aria-label="Key credentials">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 bg-white/6 border border-white/12 rounded px-3.5 py-2"
                role="listitem"
              >
                <div className="w-1.5 h-1.5 bg-arc-orange rounded-full flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-300 text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/25 animate-bounce" aria-hidden="true">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
