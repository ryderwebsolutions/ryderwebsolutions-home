import { process } from "../data/siteContent";

export default function Process() {
  return (
    <section id="process" className="bg-arc-grey py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-arc-orange font-semibold text-sm uppercase tracking-widest mb-3">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy mb-4 leading-tight">
            Our Process
          </h2>
          <div className="w-14 h-1 bg-arc-orange mx-auto mb-5" aria-hidden="true" />
          <p className="text-arc-steel text-base sm:text-lg leading-relaxed">
            From initial enquiry to ongoing site support — a structured, professional process that keeps your project moving.
          </p>
        </div>

        {/* Process steps */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div
            className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5 bg-gray-200"
            aria-hidden="true"
          >
            <div className="absolute left-0 top-0 h-full bg-arc-orange" style={{ width: "100%" }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                {/* Step circle */}
                <div className="relative z-10 w-[60px] h-[60px] bg-arc-orange rounded-full flex items-center justify-center mb-5 shadow-orange flex-shrink-0">
                  <span className="text-white font-black text-lg leading-none">{step.step}</span>
                </div>

                {/* Connector — mobile */}
                {i < process.length - 1 && (
                  <div className="lg:hidden absolute top-[60px] left-1/2 -translate-x-1/2 w-0.5 h-8 bg-arc-orange/30" aria-hidden="true" />
                )}

                <div className="bg-white rounded-lg p-5 shadow-card w-full">
                  <h3 className="text-navy font-bold text-base mb-2 leading-snug">{step.title}</h3>
                  <p className="text-arc-steel text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 bg-arc-orange hover:bg-arc-orange-dark text-white font-bold text-base px-8 py-4 rounded transition-colors duration-200 shadow-orange"
          >
            Speak With ARC Scaffold
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
