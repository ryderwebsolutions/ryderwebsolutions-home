import { PrimaryButton, SecondaryButton } from "../components/Buttons";
import SectionHeading from "../components/SectionHeading";
import { featuredServices, reasons, testimonials } from "../data/siteContent";

function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-14 pt-10 md:grid-cols-2 md:px-8 md:pt-14">
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-dusty">Editorial Interior Consulting</p>
          <h1 className="text-5xl leading-[1.02] text-charcoal md:text-7xl">Revitalize Your Home</h1>
          <p className="mt-5 max-w-xl text-lg text-charcoal/80">
            Colour, comfort, and character beautifully balanced. Create warm, stylish spaces through personalised
            colour consultation and practical interior advice tailored to your lifestyle and home.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryButton to="/contact">Book A Consultation</PrimaryButton>
            <SecondaryButton to="/portfolio">View Portfolio</SecondaryButton>
          </div>
        </div>

        <div className="relative min-h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=900&q=80"
            alt="Warm Irish living room interior"
            className="photo-curve absolute right-0 top-2 h-64 w-48 object-cover shadow-soft md:h-80 md:w-64"
          />
          <img
            src="https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=900&q=80"
            alt="Stylish dining space"
            className="photo-curve absolute bottom-8 left-0 h-72 w-56 object-cover shadow-soft md:h-80 md:w-72"
          />
          <div className="organic-shape absolute -bottom-2 right-8 h-24 w-24 bg-blush/80" aria-hidden="true" />
          <div className="organic-shape absolute left-24 top-0 h-16 w-16 bg-sage/70" aria-hidden="true" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <SectionHeading
          eyebrow="Featured Services"
          title="Thoughtful support for every room"
          intro="Flexible consultation services designed to feel clear, personal, and genuinely useful."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service, index) => (
            <article
              key={service.title}
              className="soft-card rounded-3xl p-6 shadow-soft"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <h3 className="text-2xl text-charcoal">{service.title}</h3>
              <p className="mt-2 text-charcoal/80">{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:px-8">
        <div className="soft-card rounded-3xl p-8">
          <SectionHeading
            eyebrow="Why Céire"
            title="Creative guidance, never intimidating"
            intro="You get calm, collaborative support grounded in everyday life, practical budgets, and timeless style."
          />
          <ul className="mt-6 space-y-3">
            {reasons.map((item) => (
              <li key={item} className="rounded-2xl bg-white/70 px-4 py-3 text-charcoal/85">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <img
          src="https://images.unsplash.com/photo-1616593969747-4797dc75033e?auto=format&fit=crop&w=1200&q=80"
          alt="Curated interior styling"
          className="photo-curve h-full min-h-[320px] w-full object-cover shadow-soft"
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <SectionHeading
          eyebrow="Inspiration Gallery"
          title="Before, after, and in-between"
          intro="A curated glimpse at mood shifts, palette updates, and practical styling transformations."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {[
            "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=800&q=80",
          ].map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`Interior inspiration ${index + 1}`}
              className={`photo-curve w-full object-cover shadow-soft ${index % 2 === 0 ? "h-52 md:h-72" : "h-72 md:h-96"}`}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 rounded-[2rem] bg-gradient-to-br from-lilac/50 via-white/75 to-blush/45 p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dusty">Colour Consultation</p>
            <h2 className="mt-2 text-4xl text-charcoal md:text-5xl">Confidence with colour in every light</h2>
            <p className="mt-4 text-charcoal/80">
              From cool north-facing spaces to warm evening light, your palette is designed to feel beautiful all day.
            </p>
            <PrimaryButton to="/services" className="mt-7">
              Explore Services
            </PrimaryButton>
          </div>
          <img
            src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1200&q=80"
            alt="Paint and texture consultation"
            className="photo-curve h-full min-h-[300px] w-full object-cover shadow-soft"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <SectionHeading eyebrow="Client Notes" title="What homeowners say" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={item.name} className="soft-card rounded-3xl p-6 shadow-soft">
              <p className="text-charcoal/85">“{item.quote}”</p>
              <cite className="mt-4 block text-sm not-italic uppercase tracking-[0.15em] text-dusty">{item.name}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-10 max-w-7xl px-5 pb-20 pt-14 md:px-8">
        <div className="rounded-[2rem] bg-charcoal px-8 py-12 text-center text-cream md:px-16">
          <p className="text-xs uppercase tracking-[0.2em] text-lilac">Ready To Begin</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Let us refresh your home, beautifully and practically</h2>
          <p className="mx-auto mt-4 max-w-2xl text-cream/85">
            Book a consultation and receive personalised ideas tailored to your home, style, and budget.
          </p>
          <PrimaryButton to="/contact" className="mt-8 bg-lavender hover:bg-dusty">
            Book A Consultation
          </PrimaryButton>
        </div>
      </section>
    </>
  );
}

export default HomePage;
