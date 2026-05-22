import { galleryImages } from "../data/imageAssets";
import { site } from "../data/siteContent";
import { useState } from "react";

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

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
        src={`${import.meta.env.BASE_URL}${item.path}`}
        alt={item.alt}
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

      {/* Orange accent line — top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-arc-orange transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-300" aria-hidden="true" />

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
            A selection of recent scaffolding projects completed by ARC Scaffold Services.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryImages.map((item, index) => (
            <ProjectCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* CTA below gallery */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm mb-4">
            Follow ARC Scaffold Services for more project updates.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-arc-orange/50 hover:border-arc-orange text-arc-orange hover:text-white hover:bg-arc-orange font-semibold text-sm px-6 py-3 rounded transition-all duration-200"
            >
              Request A Scaffolding Quote
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-arc-orange/40 text-white font-semibold text-sm px-6 py-3 rounded transition-all duration-200"
              aria-label="Follow ARC Scaffold Services on Instagram"
            >
              <InstagramIcon />
              Follow Our Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
