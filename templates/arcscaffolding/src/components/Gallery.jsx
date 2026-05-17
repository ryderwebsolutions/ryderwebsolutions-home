import { galleryImages } from "../data/imageAssets";
import { useState } from "react";

function ProjectCard({ item, index }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      key={index}
      className="group relative rounded-lg overflow-hidden aspect-[4/3] shadow-card hover:shadow-card-hover transition-all duration-300"
      role="img"
      aria-label={item.label}
    >
      {/* Image */}
      <img
        src={`${import.meta.env.BASE_URL}images/${item.name}`}
        alt={item.label}
        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />

      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-200 animate-pulse" />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Orange accent line — top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-arc-orange transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-300" aria-hidden="true" />

      {/* Project label — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <span className="inline-block bg-arc-orange text-white text-xs font-semibold px-2.5 py-1 rounded mb-2">
          {item.type
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </span>
        <p className="text-white font-semibold text-sm leading-tight">{item.label}</p>
      </div>

      {/* Icon — top left */}
      <div className="absolute top-4 left-4 w-8 h-8 bg-black/30 backdrop-blur-sm rounded flex items-center justify-center text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="bg-navy-dark py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-arc-orange font-semibold text-sm uppercase tracking-widest mb-3">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            Project Gallery
          </h2>
          <div className="w-14 h-1 bg-arc-orange mx-auto mb-5" aria-hidden="true" />
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            From large commercial builds to residential renovations and specialist trade projects — ARC Scaffold Services has the experience your project demands.
          </p>
        </div>

        {/* Gallery grid — responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryImages.map((item, index) => (
            <ProjectCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* CTA below gallery */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm mb-4">
            Explore our completed scaffolding projects — residential, commercial, and specialist trade work across Ireland.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-arc-orange/50 hover:border-arc-orange text-arc-orange hover:text-white hover:bg-arc-orange font-semibold text-sm px-6 py-3 rounded transition-all duration-200"
          >
            Request A Scaffolding Quote
          </a>
        </div>
      </div>
    </section>
  );
}
