import SectionHeading from "../components/SectionHeading";
import { portfolioItems } from "../data/siteContent";

function PortfolioPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 md:px-8 md:pt-14">
      <SectionHeading
        eyebrow="Portfolio"
        title="Curated inspiration for warm, elevated homes"
        intro="A blend of room styling, colour palettes, and practical interior ideas gathered for everyday living."
      />

      <div className="mt-10 columns-1 gap-5 md:columns-2 lg:columns-3 [&>article]:mb-5">
        {portfolioItems.map((item, index) => (
          <article key={item.title} className="break-inside-avoid overflow-hidden rounded-3xl bg-white/75 shadow-soft">
            <img
              src={item.image}
              alt={item.title}
              className={`w-full object-cover ${index % 3 === 0 ? "h-80" : "h-64"}`}
            />
            <div className="p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-dusty">{item.tag}</p>
              <h3 className="mt-2 text-2xl text-charcoal">{item.title}</h3>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14 grid gap-6 rounded-[2rem] bg-white/80 p-8 md:grid-cols-4">
        {[
          { name: "Lavender Mist", hex: "#B499C8" },
          { name: "Dusty Plum", hex: "#8F759D" },
          { name: "Soft Sage", hex: "#A6B39A" },
          { name: "Warm Cream", hex: "#F7F2EC" },
        ].map((swatch) => (
          <div key={swatch.name} className="rounded-2xl border border-charcoal/10 p-4">
            <div className="h-20 rounded-xl" style={{ backgroundColor: swatch.hex }} aria-hidden="true" />
            <p className="mt-3 font-medium text-charcoal">{swatch.name}</p>
            <p className="text-sm text-charcoal/70">{swatch.hex}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PortfolioPage;
