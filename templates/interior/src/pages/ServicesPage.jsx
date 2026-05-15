import SectionHeading from "../components/SectionHeading";
import { PrimaryButton } from "../components/Buttons";
import { services } from "../data/siteContent";

function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 md:px-8 md:pt-14">
      <SectionHeading
        eyebrow="Services"
        title="Practical interior support, tailored to your home"
        intro="Every session is personal, collaborative, and shaped around real life in Irish homes."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.title} className="soft-card rounded-3xl p-7 shadow-soft">
            <h3 className="text-3xl text-charcoal">{service.title}</h3>
            <p className="mt-3 text-charcoal/80">{service.detail}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 grid gap-8 rounded-[2rem] bg-gradient-to-r from-sage/45 via-white/80 to-lilac/40 p-8 md:grid-cols-2 md:p-12">
        <div>
          <h2 className="text-4xl text-charcoal">What a consultation can include</h2>
          <ul className="mt-5 space-y-3 text-charcoal/80">
            <li>Room-by-room colour recommendations</li>
            <li>Furniture and layout refinements</li>
            <li>Lighting, texture, and finish suggestions</li>
            <li>Affordable purchasing priorities</li>
            <li>A simple action plan you can follow confidently</li>
          </ul>
          <PrimaryButton to="/contact" className="mt-8">
            Book A Consultation
          </PrimaryButton>
        </div>
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
          alt="Design consultation in a cozy room"
          className="photo-curve h-full min-h-[300px] w-full object-cover shadow-soft"
        />
      </div>
    </div>
  );
}

export default ServicesPage;
