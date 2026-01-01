# KGNA Website Modernization - Claude Code Agent Prompt

## Project Overview

Build a modern, professional nonprofit website for **KGNA (Kashmiri Group of North America)** - a cultural heritage organization devoted to preserving Kashmiri culture and identity in North America. The site should inspire donations, showcase events, and connect the diaspora community.

**Current Site Reference:** https://www.kgna.us/ (Wix-based, outdated design)

---

## Tech Stack

- **Framework:** Next.js 16 (latest stable) with App Router
- **Bundler:** Turbopack (default in Next.js 16)
- **Styling:** Tailwind CSS v4 + shadcn/ui components
- **Language:** TypeScript 5+
- **Runtime:** Node.js 20.9+ (required)
- **Payments:** Stripe (subscriptions + one-time donations)
- **Package Manager:** pnpm (preferred) or npm
- **Images:** Unsplash placeholders (to be replaced later)

---

## Project Initialization

```bash
# Create Next.js 16 project (Turbopack is now the default bundler)
pnpm create next-app@latest kgna-website

# The new simplified create-next-app will prompt for:
# - TypeScript: Yes
# - Tailwind CSS: Yes  
# - src/ directory: Yes
# - App Router: Yes (default)

cd kgna-website

# Initialize shadcn/ui
pnpm dlx shadcn@latest init

# Install required shadcn components
pnpm dlx shadcn@latest add button card dialog dropdown-menu form input label navigation-menu select separator sheet tabs textarea toast badge avatar accordion carousel scroll-area

# Install additional dependencies
pnpm add stripe @stripe/stripe-js next-themes lucide-react framer-motion zod react-hook-form @hookform/resolvers date-fns

# Dev dependencies
pnpm add -D @types/node
```

### Next.js 16 Key Features to Leverage

1. **Turbopack** - Default bundler with 2-5x faster builds and up to 10x faster Fast Refresh
2. **Cache Components** - New opt-in caching model with `"use cache"` directive
3. **`proxy.ts`** - Replaces `middleware.ts` for clearer network boundary handling
4. **React 19.2** - Includes View Transitions, `useEffectEvent()`, and `<Activity/>`
5. **Enhanced Routing** - Layout deduplication and incremental prefetching
6. **Improved Caching APIs** - New `updateTag()` and refined `revalidateTag()`

---

## Project Structure

```
kgna-website/
├── src/
│   ├── app/
│   │   ├── (marketing)/           # Public pages group
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── about/
│   │   │   │   ├── page.tsx       # About Us
│   │   │   │   ├── mission/page.tsx
│   │   │   │   ├── team/page.tsx
│   │   │   │   └── history/page.tsx
│   │   │   ├── events/
│   │   │   │   ├── page.tsx       # Events listing
│   │   │   │   ├── [slug]/page.tsx # Event detail
│   │   │   │   └── past/page.tsx  # Past events archive
│   │   │   ├── culture/
│   │   │   │   ├── page.tsx       # Culture & Heritage
│   │   │   │   ├── traditions/page.tsx
│   │   │   │   ├── cuisine/page.tsx
│   │   │   │   └── language/page.tsx
│   │   │   ├── gallery/
│   │   │   │   └── page.tsx       # Photo/Video gallery
│   │   │   ├── news/
│   │   │   │   ├── page.tsx       # News/Blog listing
│   │   │   │   └── [slug]/page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx       # Contact form
│   │   │
│   │   ├── donate/
│   │   │   ├── page.tsx           # Donation page
│   │   │   ├── success/page.tsx   # Success callback
│   │   │   └── cancel/page.tsx    # Cancel callback
│   │   │
│   │   ├── api/
│   │   │   ├── stripe/
│   │   │   │   ├── create-checkout/route.ts
│   │   │   │   ├── create-subscription/route.ts
│   │   │   │   ├── webhook/route.ts
│   │   │   │   └── customer-portal/route.ts
│   │   │   └── contact/route.ts
│   │   │
│   │   ├── layout.tsx             # Root layout
│   │   ├── loading.tsx            # Global loading
│   │   ├── error.tsx              # Error boundary
│   │   └── not-found.tsx          # 404 page
│   │
│   ├── proxy.ts                   # Network proxy (replaces middleware.ts in Next.js 16)
│   │
│   ├── components/
│   │   ├── ui/                    # shadcn components
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── navbar.tsx
│   │   ├── sections/
│   │   │   ├── hero.tsx
│   │   │   ├── mission-statement.tsx
│   │   │   ├── upcoming-events.tsx
│   │   │   ├── impact-stats.tsx
│   │   │   ├── testimonials.tsx
│   │   │   ├── donation-cta.tsx
│   │   │   ├── newsletter-signup.tsx
│   │   │   └── featured-gallery.tsx
│   │   ├── donations/
│   │   │   ├── donation-form.tsx
│   │   │   ├── amount-selector.tsx
│   │   │   ├── frequency-toggle.tsx
│   │   │   └── donor-info-form.tsx
│   │   ├── events/
│   │   │   ├── event-card.tsx
│   │   │   └── event-timeline.tsx
│   │   └── shared/
│   │       ├── page-header.tsx
│   │       ├── section-heading.tsx
│   │       └── cta-button.tsx
│   │
│   ├── lib/
│   │   ├── stripe.ts              # Stripe server config
│   │   ├── stripe-client.ts       # Stripe client config
│   │   ├── utils.ts               # Utility functions
│   │   └── constants.ts           # Site constants
│   │
│   ├── config/
│   │   ├── site.ts                # Site metadata
│   │   ├── navigation.ts          # Nav structure
│   │   └── donation-tiers.ts      # Donation amounts
│   │
│   ├── types/
│   │   ├── index.ts
│   │   └── stripe.ts
│   │
│   └── styles/
│       └── globals.css
│
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── kashmir/               # Culture images
│   │   └── events/                # Event photos
│   └── fonts/                     # Custom fonts if needed
│
├── .env.local.example
├── next.config.ts                 # Next.js 16 config (TypeScript native support)
├── components.json
└── package.json
```

---

## Next.js 16 Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable Cache Components for optimal caching (new in Next.js 16)
  cacheComponents: true,
  
  // Turbopack is now the default bundler - no config needed
  // Use filesystem caching for even faster dev builds (beta)
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  
  // React Compiler for automatic memoization (stable in Next.js 16)
  reactCompiler: true,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
```

### Proxy Configuration (replaces middleware)

```typescript
// src/proxy.ts
import { NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
  // Handle any request interception/routing logic here
  // This runs on Node.js runtime (not Edge)
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
```

---

## Design Requirements

### Visual Identity & Aesthetic

**Theme:** Warm, Cultural Heritage with Modern Elegance

**Color Palette:**
```css
/* Primary - Deep Saffron (Kashmir connection) */
--primary: #D97706;
--primary-foreground: #FFFFFF;

/* Secondary - Rich Burgundy */
--secondary: #7C2D12;
--secondary-foreground: #FFFFFF;

/* Accent - Gold */
--accent: #B45309;

/* Background - Warm neutrals */
--background: #FEFCE8;        /* Light cream */
--background-alt: #FEF3C7;    /* Warm yellow tint */

/* Dark mode alternatives */
--background-dark: #1C1917;
--foreground-dark: #F5F5F4;

/* Muted tones */
--muted: #78716C;
--muted-foreground: #A8A29E;
```

**Typography:**
- **Display/Headings:** `Playfair Display` or `Cormorant Garamond` (elegant serif)
- **Body:** `Source Sans Pro` or `Nunito Sans` (readable sans-serif)
- **Accent:** `Noto Nastaliq Urdu` for Kashmiri script elements (optional cultural touch)

**Design Elements:**
- Subtle paisley or chinar leaf patterns as background textures
- Warm gradient overlays on hero images
- Generous whitespace with intentional asymmetry
- Smooth scroll animations and micro-interactions
- Card-based layouts with soft shadows
- Full-width hero sections with parallax effects

### Responsive Design
- Mobile-first approach
- Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)
- Hamburger menu on mobile with slide-out sheet
- Touch-friendly tap targets (min 44px)

---

## Page Specifications

### 1. Homepage (`/`)

**Hero Section:**
- Full-viewport height with background image/video of Kashmir valley
- Gradient overlay for text readability
- Main headline: "Preserving Kashmir's Rich Heritage in North America"
- Subheadline about community and culture
- Two CTAs: "Upcoming Events" and "Support Our Mission"
- Animated scroll indicator

**Mission Statement Section:**
- Brief intro to KGNA (2-3 sentences)
- Three pillars with icons: Charitable, Educational, Scientific
- "Learn More" link to About page

**Upcoming Events Section:**
- Carousel or grid of next 3 events
- Event cards with date, title, location, thumbnail
- "View All Events" button

**Impact Statistics:**
- Animated counters on scroll
- Metrics: Years Active, Members, Events Hosted, Communities Served

**Donation CTA Section:**
- Compelling message about supporting the mission
- Quick donation buttons ($25, $50, $100, Custom)
- "Become a Monthly Supporter" option

**Photo Gallery Preview:**
- Masonry grid of 6-8 images from past events
- Hover effects with image info
- "View Full Gallery" link

**Newsletter Signup:**
- Simple email capture form
- "Join our community" messaging

### 2. About Pages (`/about/*`)

**Main About Page:**
- Organization history since founding
- Mission and vision statements
- Core values grid
- Link to team and detailed pages

**Team Page:**
- Leadership grid with photos
- Board members section
- Volunteer recognition

**History/Timeline Page:**
- Visual timeline of KGNA milestones
- Key events and achievements

### 3. Events Pages (`/events/*`)

**Events Listing:**
- Toggle: Upcoming / Past Events
- Filter by year or event type
- Event cards in grid layout
- Search functionality

**Event Detail Page:**
- Hero image/banner
- Date, time, location with map integration
- Full description
- Registration/ticket info
- Related events suggestions
- Photo gallery from past occurrences

**Past Events Archive:**
- Year-grouped accordion layout
- Links to: KGNA 2024, 2022, 2018, 2017, 2016

### 4. Culture & Heritage (`/culture/*`)

**Main Culture Page:**
- Introduction to Kashmiri heritage
- Featured articles grid
- Image-rich storytelling

**Sub-pages:**
- Traditions (festivals, customs)
- Cuisine (traditional foods)
- Language (Kashmiri language resources)

### 5. Gallery Page (`/gallery`)

- Masonry grid layout
- Lightbox for full-size viewing
- Filter by event/year
- Video embeds for event recordings

### 6. News/Blog (`/news/*`)

- Blog listing with featured post
- Categories/tags
- Search functionality
- Individual article pages with sharing

### 7. Contact Page (`/contact`)

- Contact form (name, email, subject, message)
- Organization address and email
- Social media links
- Embedded map (optional)
- FAQ accordion

### 8. Donation Page (`/donate`) - **CRITICAL**

**Layout:**
- Split layout: Info section (left) + Donation form (right)
- Mobile: stacked layout

**Donation Form Components:**

1. **Frequency Toggle:**
   - Three options: One-Time, Monthly, Annual
   - Visual toggle/tabs with clear selection state
   - Monthly as highlighted "Most Impact" option

2. **Amount Selector:**
   ```
   Suggested Amounts:
   - One-Time: $25, $50, $100, $250, $500, Custom
   - Monthly: $10, $25, $50, $100, Custom
   - Annual: $100, $250, $500, $1000, Custom
   ```
   - Pre-selected default ($50 one-time, $25 monthly)
   - Custom amount input field
   - Impact statements per tier (e.g., "$25 provides...")

3. **Donor Information:**
   - Full name
   - Email address
   - Phone (optional)
   - "Make this donation in honor/memory of someone" checkbox with name field
   - "I'd like to receive updates" checkbox

4. **Checkout Options:**
   - "Donate Now" button → Stripe Checkout
   - Apple Pay / Google Pay badges
   - Security badges and SSL indicator

5. **Additional Elements:**
   - "Cover processing fees" checkbox (+3%)
   - Tax-deductibility notice
   - Recurring donation management info

**Success Page (`/donate/success`):**
- Thank you message with animation
- Receipt summary
- Social sharing buttons
- "Manage your recurring donation" link
- Suggested next actions

---

## Stripe Integration Details

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Stripe Products Setup

Create these products in Stripe Dashboard or via API:

```typescript
// config/donation-tiers.ts
export const DONATION_PRODUCTS = {
  oneTime: {
    priceId: null, // Dynamic amount
    amounts: [25, 50, 100, 250, 500],
    default: 50,
  },
  monthly: {
    amounts: [10, 25, 50, 100],
    default: 25,
    // Create recurring prices in Stripe for each
    prices: {
      10: 'price_monthly_10',
      25: 'price_monthly_25',
      50: 'price_monthly_50',
      100: 'price_monthly_100',
    }
  },
  annual: {
    amounts: [100, 250, 500, 1000],
    default: 250,
    prices: {
      100: 'price_annual_100',
      250: 'price_annual_250',
      500: 'price_annual_500',
      1000: 'price_annual_1000',
    }
  }
};
```

### API Routes

**`/api/stripe/create-checkout/route.ts`:**
- Handle one-time donations using Stripe Checkout Session
- Accept: amount, frequency, donor info
- Support for custom amounts
- Include metadata for donor tracking

**`/api/stripe/create-subscription/route.ts`:**
- Handle monthly/annual subscriptions
- Create or retrieve Stripe Customer
- Create subscription with chosen price

**`/api/stripe/webhook/route.ts`:**
- Verify webhook signature
- Handle events:
  - `checkout.session.completed`
  - `invoice.payment_succeeded`
  - `customer.subscription.created`
  - `customer.subscription.deleted`
- Use Next.js 16 caching APIs:
  - `updateTag()` for immediate cache invalidation in Server Actions
  - `revalidateTag(tag, 'max')` for stale-while-revalidate behavior

**`/api/stripe/customer-portal/route.ts`:**
- Create Stripe Customer Portal session
- Allow donors to manage subscriptions

### Checkout Flow

```typescript
// One-time donation flow
1. User selects amount and enters info
2. Click "Donate Now"
3. POST /api/stripe/create-checkout
4. Redirect to Stripe Checkout (hosted)
5. On success → /donate/success?session_id={id}
6. Display confirmation with receipt

// Subscription flow
1. User selects monthly/annual and amount
2. Click "Subscribe"
3. POST /api/stripe/create-subscription
4. Redirect to Stripe Checkout for subscription
5. On success → /donate/success?session_id={id}
6. Webhook confirms subscription created
```

---

## Component Specifications

### Header/Navbar

```tsx
// Features:
- Logo (left)
- Main navigation (center): Home, About (dropdown), Events, Culture (dropdown), Gallery, News
- Donate CTA button (right, prominent)
- Mobile: hamburger menu with Sheet component
- Sticky on scroll with background blur
- Reduce size/opacity on scroll
```

### Footer

```tsx
// Sections:
- Logo and brief description
- Quick Links column
- Contact Information column
- Social Media icons
- Newsletter signup (compact)
- Copyright and legal links
- 501(c)(3) tax-exempt notice
```

### Donation Form Component

```tsx
// donation-form.tsx
interface DonationFormProps {
  defaultFrequency?: 'one-time' | 'monthly' | 'annual';
  defaultAmount?: number;
}

// State management:
- frequency (one-time/monthly/annual)
- amount (number)
- customAmount (boolean)
- coverFees (boolean)
- donorInfo (name, email, phone)
- isHonorarium (boolean)
- honorariumName (string)
- isLoading (boolean)

// Validation with Zod schema
```

---

## SEO & Metadata

```typescript
// src/config/site.ts
export const siteConfig = {
  name: "KGNA - Kashmiri Group of North America",
  description: "Preserving Kashmiri culture and identity through charitable, educational, and scientific initiatives in North America.",
  url: "https://kgna.us",
  ogImage: "/images/og-image.jpg",
  links: {
    facebook: "https://facebook.com/kgnaus",
    instagram: "https://instagram.com/kgnaus",
    twitter: "https://twitter.com/kgnaus",
  },
  keywords: [
    "Kashmiri",
    "Kashmir",
    "Kashmiri American",
    "Kashmiri diaspora",
    "cultural organization",
    "nonprofit",
    "heritage preservation"
  ]
};
```

Each page should have:
- Unique title and description
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD) for Organization

---

## Accessibility Requirements

- WCAG 2.1 AA compliance
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Color contrast ratios (4.5:1 minimum)
- Alt text for all images
- Form labels and error messages
- Skip to main content link

---

## Performance Goals

- Lighthouse score: 90+ across all metrics
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.8s
- Cumulative Layout Shift: < 0.1

**Optimizations:**
- Next.js Image optimization with updated defaults (minimum cache TTL: 4 hours)
- Turbopack for 2-5x faster builds and 10x faster Fast Refresh
- Turbopack filesystem caching for even faster dev restarts
- Dynamic imports for heavy components
- Static generation with Cache Components where possible
- Streaming with Suspense
- Font optimization with next/font
- React Compiler for automatic memoization
- Layout deduplication and incremental prefetching (automatic in Next.js 16)

---

## Development Phases

### Phase 1: Foundation
1. Project setup and configuration
2. Basic layout (header, footer, root layout)
3. Homepage structure
4. Theme setup with dark mode

### Phase 2: Core Pages
1. About pages
2. Events pages with listing and detail
3. Culture section
4. Contact page

### Phase 3: Donation System
1. Donation page UI
2. Stripe integration
3. Webhook handling
4. Success/cancel pages
5. Testing payment flows

### Phase 4: Polish
1. Gallery page
2. News/blog section
3. Animations and micro-interactions
4. SEO optimization
5. Accessibility audit
6. Performance optimization

---

## Sample Content

### Hero Section Copy
```
Headline: "Preserving Kashmir's Rich Heritage in North America"
Subheadline: "Join the largest network of Kashmiri Americans united in celebrating our culture, supporting our community, and preserving our identity for future generations."
CTA 1: "Explore Events"
CTA 2: "Support Our Mission"
```

### Mission Statement
```
KGNA is a non-profit organization devoted to charitable, educational, and scientific development in an effort to preserve the unique Kashmiri culture and identity. We bring together Kashmiris across North America to celebrate our heritage and build lasting community connections.
```

### Impact Stats (placeholder)
```
- 30+ Years of Community Service
- 5,000+ Members Across North America
- 50+ Cultural Events Hosted
- 25+ Cities with Active Chapters
```

### Donation Impact Statements
```
$25 - Helps preserve Kashmiri language materials for future generations
$50 - Sponsors a student's participation in cultural education programs
$100 - Supports community gatherings that connect diaspora families
$250 - Funds documentary projects preserving oral histories
$500 - Enables scholarship opportunities for young Kashmiris
```

---

## Testing Checklist

- [ ] All pages render correctly
- [ ] Navigation works on all devices
- [ ] Donation form validation works
- [ ] Stripe test payments succeed
- [ ] Webhooks process correctly
- [ ] Email notifications send
- [ ] Dark mode toggle works
- [ ] Mobile responsiveness verified
- [ ] Forms are accessible
- [ ] Images have alt text
- [ ] Links are keyboard accessible
- [ ] Error pages display correctly

---

## Notes for Claude Code Agent

1. **Use Context7 MCP** for latest Next.js 16, shadcn/ui, and Stripe documentation lookups when implementing features.

2. **Read SKILL.md files** before creating documents or complex components.

3. **Next.js 16 Breaking Changes to Remember:**
   - `params` and `searchParams` are now async: use `await params`, `await searchParams`
   - `cookies()`, `headers()`, `draftMode()` are async: use `await cookies()`, etc.
   - Use `proxy.ts` instead of `middleware.ts` for request interception
   - Turbopack is the default bundler
   - All parallel route slots require explicit `default.js` files
   - Node.js 20.9+ is required
   - TypeScript 5+ is required

4. **Next.js 16 New Features to Use:**
   - `"use cache"` directive for explicit caching
   - `updateTag()` in Server Actions for read-your-writes semantics
   - `revalidateTag(tag, profile)` with cacheLife profile for SWR behavior
   - `refresh()` for refreshing uncached data
   - React 19.2 View Transitions for page animations
   - Cache Components with `cacheComponents: true` config

5. **Prioritize working code** over placeholder comments - implement actual functionality.

6. **Use Unsplash** for placeholder images. Example URLs:
   - Kashmir landscape: `https://images.unsplash.com/photo-1566837945700-30057527ade0`
   - Cultural events: `https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3`
   
7. **Stripe Test Mode**: All implementations should use test keys. Include `.env.local.example` with placeholder values.

8. **Component-first approach**: Build reusable components before assembling pages.

9. **Type everything**: No `any` types - create proper TypeScript interfaces.

10. **Error handling**: Implement proper error boundaries and user-friendly error messages.

11. **Mobile-first CSS**: Start with mobile styles, then add responsive variants.

12. **Commit frequently**: Create logical, atomic commits with clear messages.

13. **Async Dynamic APIs Pattern (Next.js 16):**
```typescript
// Page component with async params
export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // ... rest of component
}

// Using cookies/headers
import { cookies, headers } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const headersList = await headers();
  // ...
}
```

---

## Getting Started Command

After initialization, start the development server:

```bash
pnpm dev
```

Visit `http://localhost:3000` to see the site.

For Stripe webhook testing locally:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

**END OF PROMPT**
