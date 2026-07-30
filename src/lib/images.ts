import { PLACEHOLDER_IMAGES } from "@/lib/constants";

/**
 * Hosts next/image is allowed to optimize. Must stay in sync with
 * `images.remotePatterns` in next.config.ts.
 */
const ALLOWED_IMAGE_HOSTS = [
  "images.unsplash.com",
  "plus.unsplash.com",
  "res.cloudinary.com",
];

/**
 * Guards a CMS-supplied image URL before it reaches next/image.
 *
 * next/image throws a runtime error for any host missing from
 * images.remotePatterns, which takes down the whole page. Editors can type any
 * URL into the admin, so an unconfigured host must degrade to a placeholder
 * instead of crashing the route.
 */
export function safeImageUrl(
  value: unknown,
  fallback: string = PLACEHOLDER_IMAGES.culturalEvent,
): string {
  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }

  const url = value.trim();

  // Same-origin assets under /public are always fine.
  if (url.startsWith("/")) {
    return url;
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return fallback;
    }
    return ALLOWED_IMAGE_HOSTS.includes(parsed.hostname) ? url : fallback;
  } catch {
    return fallback;
  }
}
