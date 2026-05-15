import SectionHeading from "../components/SectionHeading";

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 md:px-8 md:pt-14">
      <section className="grid gap-10 md:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="About"
            title="A warm, practical eye for beautiful homes"
            intro="Céire Dunne Interiors helps homeowners create spaces that feel calm, personal, and thoughtfully put together."
          />
          <p className="mt-6 text-lg leading-relaxed text-charcoal/80">
            Céire believes good interiors should feel approachable and achievable. Her process combines creative direction
            with practical solutions, so every recommendation is grounded in real life, real homes, and real budgets.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/80">
            Whether you are refreshing one room or improving flow across your home, the goal is always the same:
            spaces with colour, comfort, and character that feel unmistakably yours.
          </p>
        </div>

        <div className="relative min-h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
            alt="Interior stylist in a curated home setting"
            className="photo-curve h-full w-full object-cover shadow-soft"
          />
          <div className="organic-shape absolute -bottom-5 -left-4 h-24 w-24 bg-lilac/80" aria-hidden="true" />
        </div>
      </section>

      <section className="mt-16 grid gap-5 md:grid-cols-3">
        {[
          {
            title: "Personal",
            text: "A collaborative, one-to-one process that listens to how you live in your space.",
          },
          {
            title: "Creative",
            text: "Fresh ideas and layered styling that feel refined without feeling precious.",
          },
          {
            title: "Practical",
            text: "Clear guidance designed to work within budget and improve everyday comfort.",
          },
        ].map((item) => (
          <article key={item.title} className="soft-card rounded-3xl p-7 shadow-soft">
            <h3 className="text-3xl text-charcoal">{item.title}</h3>
            <p className="mt-3 text-charcoal/80">{item.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default AboutPage;
