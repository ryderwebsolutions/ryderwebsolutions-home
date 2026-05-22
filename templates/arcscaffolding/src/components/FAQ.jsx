import { useState } from "react";
import { faqs, site } from "../data/siteContent";

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`border rounded-lg overflow-hidden transition-colors duration-200 ${isOpen ? "border-arc-orange/40 shadow-card" : "border-gray-200 hover:border-arc-orange/20"}`}>
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-arc-grey/50 transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={`font-semibold text-sm sm:text-base leading-snug transition-colors ${isOpen ? "text-arc-orange" : "text-navy"}`}>
          {faq.question}
        </span>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${isOpen ? "bg-arc-orange text-white rotate-180" : "bg-arc-grey text-navy"}`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-5 bg-white">
          <div className="pt-1 border-t border-arc-orange/15">
            <p className="text-arc-steel text-sm leading-relaxed mt-3">{faq.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-arc-grey py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block text-arc-orange font-semibold text-sm uppercase tracking-widest mb-3">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy mb-4 leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-14 h-1 bg-arc-orange mx-auto mb-5" aria-hidden="true" />
          <p className="text-arc-steel text-base leading-relaxed">
            Common questions about ARC Scaffold Services. Can't find what you're looking for? Call{" "}
            <a href={`tel:${site.phoneTel}`} className="text-arc-orange font-semibold hover:underline">Dan: {site.phone}</a>
            {" "}or{" "}
            <a href={`tel:${site.phoneTelSecondary}`} className="text-arc-orange font-semibold hover:underline">Keith: {site.phoneSecondary}</a>.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3" role="list">
          {faqs.map((faq, i) => (
            <div key={faq.question} role="listitem">
              <FAQItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
