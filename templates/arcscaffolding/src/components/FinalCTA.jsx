import { useState } from "react";
import { site } from "../data/siteContent";

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const projectTypes = [
  "Commercial Scaffolding",
  "Residential Scaffolding",
  "Temporary Roof System",
  "Specialized Trade Support",
  "Safety Inspection & Tagging",
  "Labour Specialists",
  "Supply",
  "Other",
];

export default function FinalCTA() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission — connect to backend/serverless function as required
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-navy py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — text */}
          <div>
            <span className="inline-block text-arc-orange font-semibold text-sm uppercase tracking-widest mb-3">
              Get a Free Quote
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Speak With ARC Scaffold
            </h2>
            <div className="w-14 h-1 bg-arc-orange mb-7" aria-hidden="true" />
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
              Contact {site.contacts} to discuss your scaffolding requirements for residential or commercial works.
            </p>

            {/* Contact details */}
            <div className="space-y-4 mb-8">
              <a
                href={`tel:${site.phoneTel}`}
                className="flex items-center gap-4 group"
                aria-label={`Call Dan on ${site.phone}`}
              >
                <div className="w-12 h-12 bg-arc-orange/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-arc-orange transition-colors duration-200">
                  <svg className="w-5 h-5 text-arc-orange group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">Phone</p>
                  <p className="text-white font-bold text-lg">Dan: {site.phone}</p>
                  <p className="text-gray-400 text-xs">Primary contact</p>
                </div>
              </a>

              <a
                href={`tel:${site.phoneTelSecondary}`}
                className="flex items-center gap-4 group"
                aria-label={`Call Keith on ${site.phoneSecondary}`}
              >
                <div className="w-12 h-12 bg-arc-orange/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-arc-orange transition-colors duration-200">
                  <svg className="w-5 h-5 text-arc-orange group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">Phone</p>
                  <p className="text-white font-bold text-lg">Keith: {site.phoneSecondary}</p>
                  <p className="text-gray-400 text-xs">Secondary contact</p>
                </div>
              </a>

              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4 group"
                aria-label={`Email ${site.email}`}
              >
                <div className="w-12 h-12 bg-arc-orange/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-arc-orange transition-colors duration-200">
                  <svg className="w-5 h-5 text-arc-orange group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">Email</p>
                  <p className="text-white font-bold">{site.email}</p>
                </div>
              </a>

              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
                aria-label="Follow ARC Scaffold Services on Instagram"
              >
                <div className="w-12 h-12 bg-arc-orange/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-arc-orange transition-colors duration-200">
                  <InstagramIcon />
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">Instagram</p>
                  <p className="text-white font-bold">Follow Our Projects</p>
                </div>
              </a>
            </div>

            {/* Call CTA button */}
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex items-center gap-2.5 border-2 border-white/30 hover:border-white/60 hover:bg-white/8 text-white font-bold text-sm px-7 py-3.5 rounded transition-all duration-200"
            >
              <svg className="w-4 h-4 text-arc-orange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Dan: {site.phone}
            </a>
            <a
              href={`tel:${site.phoneTelSecondary}`}
              className="inline-flex items-center gap-2.5 ml-0 sm:ml-3 mt-3 sm:mt-0 border-2 border-white/30 hover:border-white/60 hover:bg-white/8 text-white font-bold text-sm px-7 py-3.5 rounded transition-all duration-200"
            >
              <svg className="w-4 h-4 text-arc-orange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Keith: {site.phoneSecondary}
            </a>
          </div>

          {/* Right — form */}
          <div className="bg-white rounded-xl p-7 sm:p-8 shadow-card-hover">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-arc-orange/12 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-arc-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-navy font-black text-2xl mb-2">Quote Request Received</h3>
                <p className="text-arc-steel text-sm leading-relaxed">
                  Thanks — {site.contacts} will be in touch shortly to discuss your project.
                </p>
                <p className="text-arc-steel text-sm mt-3">
                  Or call directly:{" "}
                  <a href={`tel:${site.phoneTel}`} className="text-arc-orange font-bold hover:underline">Dan: {site.phone}</a>
                  {" "}or{" "}
                  <a href={`tel:${site.phoneTelSecondary}`} className="text-arc-orange font-bold hover:underline">Keith: {site.phoneSecondary}</a>
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-navy font-black text-xl mb-1">Request a Quote</h3>
                <p className="text-arc-steel text-sm mb-6">Fill in your details and we'll get back to you promptly.</p>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-navy font-semibold text-xs uppercase tracking-widest mb-1.5">
                        Full Name <span className="text-arc-orange">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy text-sm placeholder:text-gray-400 focus:outline-none focus:border-arc-orange focus:ring-2 focus:ring-arc-orange/15 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-navy font-semibold text-xs uppercase tracking-widest mb-1.5">
                        Phone <span className="text-arc-orange">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+353 85 156 9641"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy text-sm placeholder:text-gray-400 focus:outline-none focus:border-arc-orange focus:ring-2 focus:ring-arc-orange/15 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-navy font-semibold text-xs uppercase tracking-widest mb-1.5">
                      Email <span className="text-arc-orange">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy text-sm placeholder:text-gray-400 focus:outline-none focus:border-arc-orange focus:ring-2 focus:ring-arc-orange/15 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-navy font-semibold text-xs uppercase tracking-widest mb-1.5">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy text-sm bg-white focus:outline-none focus:border-arc-orange focus:ring-2 focus:ring-arc-orange/15 transition-colors"
                    >
                      <option value="" disabled>Select a service</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-navy font-semibold text-xs uppercase tracking-widest mb-1.5">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe your project, location, and timeline..."
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-navy text-sm placeholder:text-gray-400 focus:outline-none focus:border-arc-orange focus:ring-2 focus:ring-arc-orange/15 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-arc-orange hover:bg-arc-orange-dark text-white font-bold text-base px-6 py-4 rounded-lg transition-colors duration-200 shadow-orange flex items-center justify-center gap-2"
                  >
                    Request A Quote
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>

                  <p className="text-gray-400 text-xs text-center">
                    We respond promptly — usually within the same business day.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
