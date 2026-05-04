export type CmsSection = {
  type: string;
  props: Record<string, unknown>;
};

export type CmsPageContent = {
  title: string;
  sections: CmsSection[];
};

export async function getCmsPage(slug: string): Promise<CmsPageContent | null> {
  const baseUrl = process.env.KGNA_ADMIN_API_URL;
  if (!baseUrl) {
    return null;
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/public/pages/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { content?: CmsPageContent };
    return payload.content ?? null;
  } catch {
    return null;
  }
}

export function getSection(content: CmsPageContent | null, type: string) {
  return content?.sections.find((section) => section.type === type)?.props ?? null;
}

export function textProp(
  props: Record<string, unknown> | null | undefined,
  key: string,
  fallback: string,
) {
  const value = props?.[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

export function optionalTextProp(
  props: Record<string, unknown> | null | undefined,
  key: string,
) {
  const value = props?.[key];
  return typeof value === "string" && value.trim() ? value : undefined;
}

export function listProp<T extends Record<string, unknown>>(
  props: Record<string, unknown> | null | undefined,
  key: string,
  fallback: T[],
) {
  const value = props?.[key];
  return Array.isArray(value) ? (value as T[]) : fallback;
}

export function linesProp(
  props: Record<string, unknown> | null | undefined,
  key: string,
  fallback: string[],
) {
  const value = props?.[key];
  if (typeof value !== "string") {
    return fallback;
  }

  const lines = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length > 0 ? lines : fallback;
}
