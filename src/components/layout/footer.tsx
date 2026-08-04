import Link from "next/link";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { ORGANIZATION_INFO } from "@/lib/constants";
import { getCmsPage, getSection, listProp } from "@/lib/cms";
import { Facebook, Instagram, Twitter, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Falls back to the built-in links whenever the CMS is unreachable. */
const FALLBACK_SOCIAL_LINKS = [
  { label: "Facebook", url: siteConfig.links.facebook },
  { label: "Instagram", url: siteConfig.links.instagram },
  { label: "Twitter", url: siteConfig.links.twitter },
];

function iconFor(label: string) {
  const name = label.toLowerCase();
  if (name.includes("instagram")) return Instagram;
  if (name.includes("twitter")) return Twitter;
  return Facebook;
}

export async function Footer() {
  // The footer is global but CMS content is per page, so the social links are
  // read from the contact page's "social" section - the same rows the admin
  // edits under Contact. That keeps the footer and /contact from disagreeing.
  const contact = await getCmsPage("contact");
  const social = getSection(contact, "social");
  const socialLinks = listProp<Record<string, unknown>>(
    social,
    "items",
    listProp<Record<string, unknown>>(social, "links", FALLBACK_SOCIAL_LINKS),
  );

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">KGNA</h3>
            <p className="text-sm opacity-90">
              Preserving Kashmiri culture and identity through charitable,
              educational, and scientific initiatives in North America.
            </p>
            <p className="text-xs opacity-75">{ORGANIZATION_INFO.taxStatus}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {footerNav.quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-90 hover:opacity-100 hover:underline transition-opacity"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2">
              {footerNav.resources.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-90 hover:opacity-100 hover:underline transition-opacity"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold">Stay Connected</h4>

            {/* Contact Info */}
            <div className="space-y-2 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{ORGANIZATION_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>
                  {ORGANIZATION_INFO.address.street}
                  <br />
                  {ORGANIZATION_INFO.address.city},{" "}
                  {ORGANIZATION_INFO.address.state}{" "}
                  {ORGANIZATION_INFO.address.zip}
                </span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-2">
              <p className="text-sm">Join our newsletter</p>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Email address"
                  className="bg-background/10 border-background/20 placeholder:text-secondary-foreground/50"
                />
                {/* The outline variant sets bg-background (cream) but no text
                    colour, so on this burgundy footer the label inherited white
                    and vanished. Force a transparent fill and keep the label
                    light, including on hover. */}
                <Button
                  variant="outline"
                  className="border-secondary-foreground/30 bg-transparent text-secondary-foreground hover:bg-secondary-foreground/10 hover:text-secondary-foreground"
                >
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const label = String(link.label ?? "Social");
                const href = String(link.url ?? link.href ?? "");
                if (!href) return null;
                const Icon = iconFor(label);

                return (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="opacity-90 hover:opacity-100 transition-opacity"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-background/10" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-75">
          <p>
            © {new Date().getFullYear()} {ORGANIZATION_INFO.name}. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            {footerNav.legal.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hover:opacity-100 transition-opacity"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
