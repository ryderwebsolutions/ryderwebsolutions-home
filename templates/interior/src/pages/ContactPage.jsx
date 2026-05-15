import { useState } from "react";
import SectionHeading from "../components/SectionHeading";

function ContactPage() {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      service: formData.get("service"),
      message: formData.get("message"),
      website: formData.get("website"),
      page_url: window.location.href,
    };

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/interior-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your inquiry.");
      }

      event.currentTarget.reset();
      setStatus({
        type: "success",
        message: result.message || "Inquiry received. We will be in touch shortly.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Unable to send your inquiry right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 md:px-8 md:pt-14">
      <section className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Book your interior consultation"
            intro="Share your room, goals, and style preferences. You will receive warm, practical guidance tailored to your home."
          />
          <div className="mt-8 space-y-4 rounded-3xl bg-white/75 p-6 shadow-soft">
            <p className="text-charcoal/80">
              <span className="font-semibold text-charcoal">Email:</span> ceiredunneinteriors@gmail.com
            </p>
            <p className="text-charcoal/80">
              <span className="font-semibold text-charcoal">Phone:</span> 087 9956 0006
            </p>
            <p className="text-charcoal/80">
              <span className="font-semibold text-charcoal">Instagram:</span> @ceiredunneinteriors
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80"
            alt="Calm interior workspace"
            className="photo-curve mt-8 h-72 w-full object-cover shadow-soft"
          />
        </div>

        <form
          className="rounded-[2rem] bg-gradient-to-br from-white/85 via-lilac/25 to-blush/25 p-8 shadow-soft"
          aria-label="Consultation inquiry form"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl text-charcoal">Inquiry Form</h2>
          <p className="mt-2 text-charcoal/75">Tell us about your home and what support you need.</p>

          <div className="mt-6 grid gap-5">
            <input type="text" name="website" className="hidden" tabIndex="-1" autoComplete="off" />

            <label className="text-sm font-medium text-charcoal">
              Full Name
              <input
                type="text"
                name="name"
                className="mt-2 w-full rounded-xl border border-charcoal/15 bg-white/90 px-4 py-3 text-base outline-none transition focus:border-dusty"
                placeholder="Your name"
                required
              />
            </label>

            <label className="text-sm font-medium text-charcoal">
              Email Address
              <input
                type="email"
                name="email"
                className="mt-2 w-full rounded-xl border border-charcoal/15 bg-white/90 px-4 py-3 text-base outline-none transition focus:border-dusty"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="text-sm font-medium text-charcoal">
              Service of Interest
              <select
                name="service"
                className="mt-2 w-full rounded-xl border border-charcoal/15 bg-white/90 px-4 py-3 text-base outline-none transition focus:border-dusty"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option>Colour Consultation</option>
                <option>Room Refresh Advice</option>
                <option>Home Styling Guidance</option>
                <option>Layout & Decor Suggestions</option>
                <option>Interior Inspiration Planning</option>
              </select>
            </label>

            <label className="text-sm font-medium text-charcoal">
              Project Notes
              <textarea
                name="message"
                rows={5}
                className="mt-2 w-full rounded-xl border border-charcoal/15 bg-white/90 px-4 py-3 text-base outline-none transition focus:border-dusty"
                placeholder="Tell us about your room, style, and timeline"
                required
              />
            </label>
          </div>

          {status.type !== "idle" ? (
            <p
              className={`mt-5 text-sm ${
                status.type === "success" ? "text-green-700" : "text-red-700"
              }`}
              role="status"
            >
              {status.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-dusty px-6 py-3 text-sm font-medium tracking-wide text-white transition duration-300 hover:-translate-y-0.5 hover:bg-lavender hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusty"
          >
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default ContactPage;
