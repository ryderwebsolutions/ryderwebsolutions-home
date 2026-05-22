import { safetyPoints } from "../data/siteContent";
import { safetyFeatureImage } from "../data/imageAssets";

export default function Safety() {
  return (
    <section id="safety" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — intro + image */}
          <div className="flex flex-col gap-8">
            <div>
            <span className="inline-block text-arc-orange font-semibold text-sm uppercase tracking-widest mb-3">
              Safety & Compliance
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy mb-4 leading-tight">
              Safety Is Non-Negotiable
            </h2>
            <div className="w-14 h-1 bg-arc-orange mb-7" aria-hidden="true" />
            <p className="text-arc-steel text-base sm:text-lg leading-relaxed mb-6">
              At ARC Scaffold Services, every scaffold system we design and erect is built around one fundamental principle — the safety of everyone on site.
            </p>
            <p className="text-arc-steel text-base leading-relaxed mb-8">
              We operate in full compliance with current Irish health and safety legislation, applying rigorous inspection and tagging protocols on every job — commercial or residential, large or small.
            </p>

            {/* Feature list */}
            <ul className="space-y-3" aria-label="Safety highlights">
              {[
                "Full compliance with Irish H&S legislation",
                "Structured inspection and tagging on every job",
                "Project-specific scaffold design and planning",
                "Experienced crew — trained to modern standards",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-arc-orange/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-arc-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-navy font-medium text-sm">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-arc-orange hover:bg-arc-orange-dark text-white font-bold text-sm px-7 py-3.5 rounded transition-colors duration-200 shadow-orange"
              >
                Discuss Your Safety Requirements
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>            </div>

            {/* Supporting safety image */}
            <img
              src={`${import.meta.env.BASE_URL}${safetyFeatureImage.path}`}
              alt={safetyFeatureImage.alt}
              className="w-full rounded-lg object-cover shadow-card border border-white/40 h-96"
            />          </div>

          {/* Right — safety points grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {safetyPoints.map((point) => (
              <div
                key={point.title}
                className="bg-arc-grey border border-gray-200 rounded-lg p-5 hover:border-arc-orange/30 hover:shadow-card transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 bg-arc-orange/12 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-arc-orange/20 transition-colors">
                    <svg className="w-4 h-4 text-arc-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-navy font-bold text-sm leading-snug">{point.title}</h3>
                </div>
                <p className="text-arc-steel text-xs leading-relaxed">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
