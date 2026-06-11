import { useState, type FormEvent } from "react";
import { site } from "../data/site";

const FORMSPREE_ID = import.meta.env.PUBLIC_FORMSPREE_BROCHURE || "";

export default function BrochureDownload() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    if (!FORMSPREE_ID) {
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="brochure" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
              Download Property Brochure
            </h2>
            <p className="mt-4 text-lg text-steel leading-relaxed">
              Get the complete property package including survey sketch, measurements,
              location maps, and site photographs.
            </p>

            <ul className="mt-8 space-y-3">
              {["Survey sketch & measurements", "Location & connectivity maps", "Site photographs", "Zoning & utility details"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 text-charcoal">
                    <svg className="w-5 h-5 text-accent shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-sm p-8">
            {status === "success" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto flex items-center justify-center bg-green-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-charcoal">Brochure Ready</h3>
                <p className="mt-2 text-steel">
                  Check your email for the download link. Our team may follow up to
                  discuss your requirements.
                </p>
                <a
                  href={site.brochurePdf}
                  download
                  className="inline-flex items-center justify-center mt-6 px-6 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover transition-colors rounded-sm"
                >
                  Download PDF Now
                </a>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="block mx-auto mt-4 text-sm text-steel hover:text-charcoal"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="text-sm text-steel">
                  Complete the form below to receive the property brochure.
                </p>

                <div>
                  <label htmlFor="brochure-name" className="block text-sm font-medium text-charcoal mb-2">
                    Name *
                  </label>
                  <input
                    id="brochure-name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="brochure-company" className="block text-sm font-medium text-charcoal mb-2">
                    Company *
                  </label>
                  <input
                    id="brochure-company"
                    name="company"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label htmlFor="brochure-email" className="block text-sm font-medium text-charcoal mb-2">
                    Email *
                  </label>
                  <input
                    id="brochure-email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="brochure-phone" className="block text-sm font-medium text-charcoal mb-2">
                    Phone *
                  </label>
                  <input
                    id="brochure-phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                    placeholder="+91"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full px-6 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover disabled:opacity-60 transition-colors rounded-sm"
                >
                  {status === "submitting" ? "Processing..." : "Download Property Brochure"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
