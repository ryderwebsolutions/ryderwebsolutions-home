const phoneNumber = "+353 87 137 2847";
const phoneHref = "tel:+353871372847";

const services = [
  {
    title: "Roof Waterproofing",
    text: "Long-lasting membrane systems and targeted repairs to stop ingress before it reaches the structure.",
  },
  {
    title: "Balcony Waterproofing",
    text: "Durable detailing for exposed outdoor spaces where movement, weather, and pooling water cause failures.",
  },
  {
    title: "Wet Rooms & Bathrooms",
    text: "Clean, fully sealed wet-area systems for showers, bathrooms, and tiled spaces that need dependable protection.",
  },
  {
    title: "Damp Proofing",
    text: "Treat rising damp and moisture-related issues with a practical fix that protects finishes and structure.",
  },
  {
    title: "Leak Repairs",
    text: "Quick identification and repair of active leaks to limit disruption and reduce follow-on damage.",
  },
  {
    title: "Basements & Foundations",
    text: "Waterproof below-ground spaces with proven barrier systems designed for pressure and persistent moisture.",
  },
  {
    title: "Commercial Waterproofing",
    text: "Professional waterproofing for shops, offices, apartments, and facilities needing dependable protection.",
  },
];

const reasons = [
  "Technical waterproofing solutions chosen for the property, not a one-size-fits-all patch.",
  "Clear communication from inspection to completion so you know what is happening and why.",
  "Strong attention to detail on the weak points that usually fail first: edges, junctions, and penetrations.",
  "Designed to protect your property long term, not just hide the symptoms for a season.",
];

const process = [
  {
    step: "01",
    title: "Free Inspection",
    text: "We assess the affected area, identify visible damage, and understand the likely water entry points.",
  },
  {
    step: "02",
    title: "Leak/Damp Diagnosis",
    text: "We determine whether the issue is structural, surface-level, or coming from an overlooked junction.",
  },
  {
    step: "03",
    title: "Waterproofing Solution",
    text: "We recommend the right repair or waterproofing system based on the property and the problem.",
  },
  {
    step: "04",
    title: "Long-Lasting Protection",
    text: "The finished system is built to withstand Irish weather and reduce the risk of repeat issues.",
  },
];

const projects = [
  {
    title: "South Dublin Roof Edge Repair",
    detail: "Failed roof perimeter sealed and re-detailed after repeated water ingress.",
    metric: "Leak source isolated in one visit",
  },
  {
    title: "Balcony Waterproofing Upgrade",
    detail: "A weather-exposed balcony received a new waterproofing layer and clean drainage detailing.",
    metric: "Improved weather resistance",
  },
  {
    title: "Basement Moisture Control",
    detail: "Below-ground moisture pathways addressed before the property fit-out moved ahead.",
    metric: "Protected future interiors",
  },
  {
    title: "Commercial Wet Area Seal",
    detail: "A business washroom and service area were sealed to prevent downtime from recurring damp.",
    metric: "Reduced operational risk",
  },
];

const testimonials = [
  {
    quote:
      "PrimeSeal responded quickly, explained the issue clearly, and fixed a leak that had been causing repeated damage.",
    name: "Homeowner, Dublin 6",
  },
  {
    quote:
      "Professional from start to finish. The waterproofing work was tidy, efficient, and the communication was excellent.",
    name: "Property Manager, South Dublin",
  },
  {
    quote:
      "We needed a proper solution for a damp basement. The inspection was thorough and the repair plan made sense.",
    name: "Commercial Client, Dublin",
  },
];

const faqs = [
  {
    question: "Do you offer a free inspection?",
    answer:
      "Yes. PrimeSeal offers a free inspection and quote so you can understand the issue before committing to any work.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "We serve Dublin and surrounding areas, helping homeowners, landlords, and businesses protect their properties.",
  },
  {
    question: "Do you work on both residential and commercial properties?",
    answer:
      "Yes. Our waterproofing services are designed for homes, apartments, shops, offices, and other commercial spaces.",
  },
  {
    question: "How fast can you respond?",
    answer:
      "Response times depend on workload and location, but urgent leak and damp enquiries are prioritised where possible.",
  },
];

const trustPoints = [
  "Dublin Based",
  "Residential & Commercial",
  "Long-Lasting Waterproofing Solutions",
  "Fast Response",
  "Free Inspection & Quote",
];

function Button({ href, variant = "primary", children, className = "" }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition duration-200 focus-ring";
  const styles =
    variant === "primary"
      ? "bg-lime text-navy shadow-[0_12px_30px_-18px_rgba(184,242,59,0.75)] hover:-translate-y-0.5 hover:bg-[#ccff58]"
      : "border border-white/20 bg-white/8 text-white hover:bg-white/12";

  return (
    <a href={href} className={`${base} ${styles} ${className}`.trim()}>
      {children}
    </a>
  );
}

function SectionHeading({ eyebrow, title, intro, align = "left", light = false }) {
  const textColor = light ? "text-white" : "text-navy";
  const introColor = light ? "text-white/74" : "text-slate-600";
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`${alignClass} max-w-3xl`}>
      {eyebrow ? (
        <p className={`section-kicker text-xs font-extrabold uppercase ${light ? "text-lime" : "text-blue"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`mt-3 text-3xl leading-tight sm:text-4xl lg:text-5xl ${textColor}`}>{title}</h2>
      {intro ? <p className={`mt-4 text-base leading-7 sm:text-lg ${introColor}`}>{intro}</p> : null}
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/8 px-5 py-4 backdrop-blur-sm">
      <div className="text-2xl font-extrabold text-white sm:text-3xl">{value}</div>
      <div className="mt-1 text-sm text-white/72">{label}</div>
    </div>
  );
}

function App() {
  return (
    <div className="page-shell">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/92 backdrop-blur-xl">
        <div className="container-page flex items-center justify-between gap-4 py-4 text-white">
          <a href="#top" className="focus-ring flex items-center gap-3 rounded-full px-1 py-1">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime text-sm font-black text-navy">
              PS
            </span>
            <span>
              <span className="block text-base font-extrabold tracking-wide">PrimeSeal Waterproofing</span>
              <span className="block text-xs uppercase tracking-[0.28em] text-white/60">Dublin Waterproofing Specialists</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-white/78 lg:flex">
            <a className="focus-ring rounded-full px-3 py-2 hover:text-white" href="#services">
              Services
            </a>
            <a className="focus-ring rounded-full px-3 py-2 hover:text-white" href="#why">
              Why PrimeSeal
            </a>
            <a className="focus-ring rounded-full px-3 py-2 hover:text-white" href="#process">
              Process
            </a>
            <a className="focus-ring rounded-full px-3 py-2 hover:text-white" href="#proof">
              Proof
            </a>
            <a className="focus-ring rounded-full px-3 py-2 hover:text-white" href="#faq">
              FAQ
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href={phoneHref} className="focus-ring rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white hover:bg-white/8">
              {phoneNumber}
            </a>
            <Button href="#contact" variant="primary">
              Get A Free Inspection & Quote
            </Button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="bg-navy-radial pb-16 pt-10 text-white sm:pb-20 sm:pt-14">
          <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="relative z-10 max-w-2xl">
              <p className="section-kicker text-xs font-extrabold uppercase text-lime">PrimeSeal Waterproofing</p>
              <h1 className="mt-4 text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
                Protect Your Property From Leaks, Damp &amp; Water Damage
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/78 sm:text-lg">
                High-quality waterproofing solutions for roofs, balconies, bathrooms, basements, and commercial properties
                across Dublin and surrounding areas.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#contact" variant="primary">
                  Get A Free Inspection
                </Button>
                <Button href={phoneHref} variant="secondary">
                  Call {phoneNumber}
                </Button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {trustPoints.map((point) => (
                  <div key={point} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold text-white/86">
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-8 h-28 w-28 rounded-full bg-lime/12 blur-3xl" aria-hidden="true" />
              <div className="absolute right-2 top-0 h-32 w-32 rounded-full bg-blue/18 blur-3xl" aria-hidden="true" />

              <div className="surface relative overflow-hidden rounded-[2rem] p-5 text-slate-900 sm:p-6">
                <div className="grid-mask absolute inset-0 opacity-[0.18]" aria-hidden="true" />
                <div className="relative grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-navy p-5 text-white sm:col-span-2">
                    <p className="text-xs font-bold uppercase tracking-[0.26em] text-lime">Built for Irish weather</p>
                    <p className="mt-3 text-xl font-bold leading-7">
                      Technical waterproofing systems that focus on the problem, the structure, and the long-term fix.
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] bg-mist p-5">
                    <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue">Scope</div>
                    <div className="mt-2 text-2xl font-black text-navy">Residential</div>
                    <div className="mt-1 text-sm text-slate-600">Homes, apartments, and renovations</div>
                  </div>

                  <div className="rounded-[1.5rem] bg-mist p-5">
                    <div className="text-sm font-bold uppercase tracking-[0.22em] text-blue">Scope</div>
                    <div className="mt-2 text-2xl font-black text-navy">Commercial</div>
                    <div className="mt-1 text-sm text-slate-600">Shops, offices, and managed properties</div>
                  </div>

                  <div className="rounded-[1.5rem] bg-white p-5 shadow-[0_16px_40px_-24px_rgba(8,26,44,0.35)] sm:col-span-2">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Service area</div>
                        <div className="mt-2 text-2xl font-black text-navy">Dublin &amp; Surrounding Areas</div>
                      </div>
                      <div className="rounded-full bg-lime px-4 py-2 text-sm font-black text-navy">Free Inspection</div>
                    </div>
                    <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
                      Fast, professional support when water damage, damp, or failed waterproofing needs immediate attention.
                    </p>
                  </div>
                </div>

                <div className="relative mt-5 grid gap-3 sm:grid-cols-3">
                  <StatCard value="5★" label="Conversion-friendly trust focus" />
                  <StatCard value="24/7" label="Water damage can escalate fast" />
                  <StatCard value="1 Call" label="Starts the inspection process" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-mist py-16 sm:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Services"
              title="Premium waterproofing services built for lasting protection"
              intro="Each service is presented clearly so homeowners, landlords, and businesses can quickly understand the right solution."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <article key={service.title} className="surface rounded-[1.75rem] p-6 transition duration-200 hover:-translate-y-1">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue/10 text-sm font-black text-blue">
                    PS
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-navy">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="bg-white py-16 sm:py-20">
          <div className="container-page grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Why Choose PrimeSeal"
                title="A reliable waterproofing partner for homes and businesses"
                intro="We focus on clear diagnosis, durable materials, and neat workmanship that respects the property and the client."
              />
              <div className="mt-8 rounded-[1.75rem] bg-navy p-7 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-lime">Built around trust</p>
                <p className="mt-3 text-2xl font-bold leading-8">
                  When leaks and damp issues are left too long, the repair gets more expensive. PrimeSeal helps you act early.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {reasons.map((reason, index) => (
                <div key={reason} className="surface rounded-[1.5rem] p-6">
                  <div className="text-sm font-black uppercase tracking-[0.24em] text-blue">0{index + 1}</div>
                  <p className="mt-3 text-base leading-7 text-slate-700">{reason}</p>
                </div>
              ))}

              <div className="rounded-[1.5rem] bg-mist p-6 md:col-span-2">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <div className="text-3xl font-black text-navy">Dublin</div>
                    <div className="mt-1 text-sm text-slate-600">Local service area</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-navy">Residential</div>
                    <div className="mt-1 text-sm text-slate-600">Home waterproofing support</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-navy">Commercial</div>
                    <div className="mt-1 text-sm text-slate-600">Business property protection</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="bg-mist py-16 sm:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Process"
              title="A simple 4-step process designed to reduce stress"
              intro="The goal is to make the next step obvious, then move quickly from diagnosis to protection."
              align="center"
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-4">
              {process.map((item) => (
                <article key={item.title} className="surface rounded-[1.5rem] p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-black uppercase tracking-[0.24em] text-blue">Step {item.step}</div>
                    <div className="h-3 w-3 rounded-full bg-lime" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-navy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className="bg-white py-16 sm:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Project Gallery / Proof"
              title="Recent waterproofing work that shows the kind of protection clients need"
              intro="These project snapshots are written to show scope, clarity, and practical outcomes without clutter or vague claims."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {projects.map((project, index) => (
                <article key={project.title} className="surface overflow-hidden rounded-[1.75rem]">
                  <div className={`h-40 ${index % 2 === 0 ? "bg-gradient-to-br from-navy via-seal to-blue" : "bg-gradient-to-br from-seal via-blue to-[#4d97df]"}`}>
                    <div className="flex h-full items-end p-6 text-white">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.28em] text-lime">Project Snapshot</div>
                        <div className="mt-2 text-3xl font-black">{project.metric}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-navy">{project.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{project.detail}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="surface rounded-[1.5rem] p-6">
                <div className="text-3xl font-black text-navy">4 areas</div>
                <div className="mt-1 text-sm text-slate-600">Roof, balcony, below-ground, and wet-area protection</div>
              </div>
              <div className="surface rounded-[1.5rem] p-6">
                <div className="text-3xl font-black text-navy">Fast response</div>
                <div className="mt-1 text-sm text-slate-600">Ideal when active leaks need immediate attention</div>
              </div>
              <div className="surface rounded-[1.5rem] p-6">
                <div className="text-3xl font-black text-navy">Clear plans</div>
                <div className="mt-1 text-sm text-slate-600">Straightforward recommendations and next steps</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-mist py-16 sm:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Testimonials"
              title="Clients want calm communication and a waterproofing fix that lasts"
              intro="Use the reviews section to reduce hesitation and show the kind of service clients can expect."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <blockquote key={testimonial.name} className="surface rounded-[1.75rem] p-6">
                  <p className="text-base leading-7 text-slate-700">“{testimonial.quote}”</p>
                  <footer className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-blue">{testimonial.name}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-16 sm:py-20">
          <div className="container-page grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions answered before you book"
              intro="The answers are short, direct, and designed to remove friction from the enquiry process."
            />
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="surface rounded-[1.4rem] p-5">
                  <summary className="cursor-pointer list-none text-lg font-bold text-navy focus-ring rounded-lg">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-navy py-16 text-white sm:py-20">
          <div className="container-page">
            <div className="surface rounded-[2rem] bg-white/6 p-8 text-white sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                <div>
                  <p className="section-kicker text-xs font-extrabold uppercase text-lime">Final CTA</p>
                  <h2 className="mt-3 text-3xl leading-tight sm:text-4xl lg:text-5xl">
                    Don’t Wait Until Small Problems Become Costly Damage
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-7 text-white/76 sm:text-lg">
                    Book a free inspection and protect your property with professional waterproofing solutions.
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-lime p-6 text-navy">
                  <div className="text-sm font-black uppercase tracking-[0.24em]">Request A Free Quote</div>
                  <p className="mt-3 text-base leading-7 font-medium">
                    Speak to PrimeSeal Waterproofing today about leaks, damp, bathrooms, balconies, roofs, or basement protection.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Button href={phoneHref} variant="primary" className="bg-navy text-white hover:bg-[#0f2b46]">
                      Call {phoneNumber}
                    </Button>
                    <Button href="mailto:info@primesealwaterproofing.ie" variant="secondary" className="border-navy/15 bg-white text-navy hover:bg-slate-50">
                      Email Enquiry
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#061521] py-12 text-white">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div>
            <div className="text-2xl font-black">PrimeSeal Waterproofing</div>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/70">
              Premium waterproofing solutions for Dublin and surrounding areas. Residential and commercial work, built for long-term protection.
            </p>
            <div className="mt-5 space-y-2 text-sm text-white/78">
              <div>Phone: {phoneNumber}</div>
              <div>Service Area: Dublin and surrounding areas</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-black uppercase tracking-[0.22em] text-lime">Services</div>
            <ul className="mt-4 space-y-2 text-sm text-white/74">
              <li>Roof &amp; Balcony Waterproofing</li>
              <li>Bathrooms &amp; Wet Rooms</li>
              <li>Basements &amp; Foundations</li>
              <li>Damp Proofing</li>
              <li>Leak Detection &amp; Repairs</li>
              <li>Commercial &amp; Residential Waterproofing</li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-black uppercase tracking-[0.22em] text-lime">Social</div>
            <ul className="mt-4 space-y-2 text-sm text-white/74">
              <li><a href="#" className="focus-ring rounded-md hover:text-white">Facebook</a></li>
              <li><a href="#" className="focus-ring rounded-md hover:text-white">Instagram</a></li>
              <li><a href="#" className="focus-ring rounded-md hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="container-page mt-10 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-white/45">
          © 2026 PrimeSeal Waterproofing. All rights reserved.
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy/96 px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-3xl gap-3">
          <Button href={phoneHref} variant="secondary" className="flex-1 border-white/15 text-center">
            Call
          </Button>
          <Button href="#contact" variant="primary" className="flex-1 text-center">
            Free Quote
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;