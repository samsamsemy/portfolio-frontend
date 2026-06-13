export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function compactText(value: unknown, fallback = "") {
  return isNonEmptyString(value) ? value.trim() : fallback;
}

export function formatPeriod(startDate?: string | null, endDate?: string | null, isCurrent?: boolean | null) {
  const start = formatMonthYear(startDate);
  const end = isCurrent ? "Present" : formatMonthYear(endDate);

  if (start && end) {
    return `${start} - ${end}`;
  }

  return start || end || "Period not specified";
}

export function formatMonthYear(value?: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function markdownFromRichText(value: unknown) {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value
      .map((block) => {
        if (!block || typeof block !== "object") {
          return "";
        }

        const children = "children" in block ? block.children : [];

        if (!Array.isArray(children)) {
          return "";
        }

        return children
          .map((child) =>
            child && typeof child === "object" && "text" in child
              ? String(child.text ?? "")
              : "",
          )
          .join("");
      })
      .filter(Boolean)
      .join("\n\n");
  }

  return "";
}
