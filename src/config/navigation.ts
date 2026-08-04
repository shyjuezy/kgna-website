export interface NavItem {
  title: string;
  href?: string;
  description?: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Events",
    href: "/events",
  },
  {
    title: "Culture",
    href: "/culture",
  },
  {
    title: "Gallery",
    href: "/gallery",
  },
  {
    title: "News",
    href: "/news",
  },
  {
    title: "Patron",
    href: "/patron",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const footerNav = {
  quickLinks: [
    { title: "About Us", href: "/about" },
    { title: "Upcoming Events", href: "/events" },
    { title: "Gallery", href: "/gallery" },
    { title: "Contact", href: "/contact" },
  ],
  resources: [
    { title: "Culture & Heritage", href: "/culture" },
    { title: "News & Updates", href: "/news" },
    { title: "Past Events", href: "/events?tab=past" },
    { title: "Donate", href: "/donate" },
    { title: "Become a Patron", href: "/patron" },
    { title: "Community Directory", href: "/directory" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "501(c)(3) Status", href: "/nonprofit-status" },
  ],
};
