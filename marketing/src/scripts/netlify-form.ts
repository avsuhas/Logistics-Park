export function initNetlifyForm(
  formId: string,
  successId: string,
  options: {
    errorId?: string;
    submitLabel?: string;
    submittingLabel?: string;
  } = {},
) {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  const success = document.getElementById(successId);
  const error = options.errorId ? document.getElementById(options.errorId) : null;
  const submitBtn = form?.querySelector('button[type="submit"]') as HTMLButtonElement | null;
  const submitLabel = options.submitLabel ?? submitBtn?.textContent ?? "Submit";
  const submittingLabel = options.submittingLabel ?? "Submitting...";

  if (!form || !success || !submitBtn) return;

  const resetBtn = success.querySelector("[data-reset-form]") as HTMLButtonElement | null;

  resetBtn?.addEventListener("click", () => {
    form.reset();
    form.hidden = false;
    success.hidden = true;
    if (error) error.hidden = true;
    submitBtn.disabled = false;
    submitBtn.textContent = submitLabel;
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (error) error.hidden = true;

    submitBtn.disabled = true;
    submitBtn.textContent = submittingLabel;

    const data = new FormData(form);
    const params = new URLSearchParams();
    params.set("form-name", form.getAttribute("name") ?? "");
    for (const [key, value] of data.entries()) {
      if (typeof value === "string") params.set(key, value);
    }

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (res.ok) {
        form.hidden = true;
        success.hidden = false;
        return;
      }

      if (error) {
        error.hidden = false;
        error.textContent = "Something went wrong. Please try again or email us directly.";
      }
    } catch {
      if (error) {
        error.hidden = false;
        error.textContent = "Network error. Please check your connection and try again.";
      }
    }

    submitBtn.disabled = false;
    submitBtn.textContent = submitLabel;
  });
}
