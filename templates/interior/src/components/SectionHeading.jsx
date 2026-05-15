function SectionHeading({ eyebrow, title, intro, align = "left" }) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <header className={`max-w-2xl ${alignClass}`}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-dusty">{eyebrow}</p>
      <h2 className="text-4xl leading-tight text-charcoal md:text-5xl">{title}</h2>
      {intro ? <p className="mt-4 text-base text-charcoal/80 md:text-lg">{intro}</p> : null}
    </header>
  );
}

export default SectionHeading;
