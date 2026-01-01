# KGNA Website

Official website for the Kashmiri Group of North America (KGNA) - a non-profit organization devoted to charitable, educational, and scientific development to preserve Kashmiri culture and identity.

## Tech Stack

- **Framework:** Next.js 16.1.1 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Payments:** Stripe
- **Animations:** Framer Motion
- **Runtime:** Node.js 20.9.0+

## Getting Started

### Prerequisites

- Node.js 20.9.0 or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone git@github.com:shyjuezy/kgna-website.git
cd kgna-website
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your actual values:
   - Stripe API keys (get from Stripe dashboard)
   - Base URL for your deployment

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment to Vercel

### Prerequisites for Vercel

1. **Environment Variables** - Set these in your Vercel project settings:
   - `NEXT_PUBLIC_BASE_URL` - Your Vercel deployment URL
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
   - `STRIPE_SECRET_KEY` - Stripe secret key
   - `STRIPE_WEBHOOK_SECRET` - Stripe webhook endpoint secret

2. **Node.js Version** - Ensure Vercel uses Node.js 20.x (configured in vercel.json)

### Deployment Steps

1. Push your code to GitHub
2. Import the project to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Important Notes

- **Node.js 20.9.0+ Required**: Next.js 16 requires Node.js 20.9.0 or higher
- **Environment Variables**: All Stripe-related features require proper environment variables
- **Webhook Setup**: Configure Stripe webhook endpoint to `https://your-domain.vercel.app/api/stripe/webhook`

## Features

- Homepage with hero section and mission overview
- About page with organization information
- Events listing and detail pages
- Donation system with Stripe integration
- Culture and heritage information
- Photo gallery
- News and updates
- Contact form
- Fully responsive design
- WCAG compliant accessibility

## Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Project Structure

```
src/
├── app/             # Next.js app router pages
├── components/      # React components
├── config/          # Configuration files
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and libraries
└── types/           # TypeScript type definitions
```

## License

© 2025 Kashmiri Group of North America. All rights reserved.