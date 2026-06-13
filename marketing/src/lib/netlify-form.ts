const FORM_NAMES = {
  siteVisit: "site-visit",
  brochure: "brochure",
} as const;

export type NetlifyFormName = (typeof FORM_NAMES)[keyof typeof FORM_NAMES];

export async function submitNetlifyForm(
  formName: NetlifyFormName,
  data: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const params = new URLSearchParams();
  params.set("form-name", formName);

  for (const [key, value] of data.entries()) {
    if (typeof value === "string") {
      params.set(key, value);
    }
  }

  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (res.ok) {
      return { ok: true };
    }

    return { ok: false, error: "Submission failed" };
  } catch {
    if (import.meta.env.DEV) {
      return {
        ok: false,
        error: "Form submissions are only processed on Netlify. Deploy or run netlify dev to test.",
      };
    }
    return { ok: false, error: "Network error" };
  }
}

export { FORM_NAMES };
