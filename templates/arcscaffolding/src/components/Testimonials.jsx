export default function Testimonials() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-arc-orange font-semibold text-sm uppercase tracking-widest mb-3">
            Trust & Reliability
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy mb-4 leading-tight">
            Professional Scaffolding Standards
          </h2>
          <div className="w-14 h-1 bg-arc-orange mx-auto" aria-hidden="true" />
        </div>

        <div className="max-w-4xl mx-auto bg-arc-grey border border-gray-200 rounded-xl p-8 lg:p-10">
          <p className="text-arc-steel text-base sm:text-lg leading-relaxed text-center">
            ARC Scaffold focuses on safe, reliable and professional scaffolding services across residential and commercial projects.
          </p>
        </div>
      </div>
    </section>
  );
}
