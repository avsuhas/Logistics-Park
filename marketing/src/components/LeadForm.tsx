import { useState, type FormEvent } from "react";
import { site } from "../data/site";

const FORMSPREE_ID = import.meta.env.PUBLIC_FORMSPREE_SITE_VISIT || "";

const TIMELINES = [
  "Immediate (0–3 months)",
  "Short-term (3–6 months)",
  "Medium-term (6–12 months)",
  "Planning stage (12+ months)",
];

const AREA_OPTIONS = [
  "Under 10,000 sq ft",
  "10,000 – 25,000 sq ft",
  "25,000 – 50,000 sq ft",
  "50,000 – 1 acre",
  "1 – 2 acres (partial)",
  "Full site (3 acres)",
];

export default function LeadForm() {
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
    <section id="contact" className="py-20 lg:py-28 bg-charcoal text-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            Request Site Visit
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Schedule a walkthrough of {site.name}. We'll confirm
            within one business day.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-green-900/30 border border-green-700 rounded-sm p-8 text-center">
            <h3 className="text-xl font-bold text-green-400">Request Received</h3>
            <p className="mt-2 text-gray-300">
              Thank you. Our leasing team will contact you shortly to schedule your site visit.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm text-accent hover:underline"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-charcoal-light border border-gray-700 rounded-sm p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company *
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                  placeholder="+91"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-300 mb-2">
                  Required Area *
                </label>
                <select
                  id="area"
                  name="required_area"
                  required
                  className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-sm text-white focus:outline-none focus:border-accent"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select area requirement
                  </option>
                  {AREA_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                  Timeline *
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  required
                  className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-sm text-white focus:outline-none focus:border-accent"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select timeline
                  </option>
                  {TIMELINES.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full px-8 py-4 text-base font-semibold text-white bg-accent hover:bg-accent-hover disabled:opacity-60 transition-colors rounded-sm"
            >
              {status === "submitting" ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
