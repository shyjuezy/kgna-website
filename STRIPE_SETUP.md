# Stripe Integration Setup Guide

## 🚀 Current Status

The donation page with Stripe integration is now complete! You can access it at:
- **Development Server**: http://localhost:3001
- **Donation Page**: http://localhost:3001/donate

## 📋 Features Implemented

### Donation Form
- ✅ One-time donations with custom amounts
- ✅ Monthly recurring donations
- ✅ Annual recurring donations
- ✅ Option to cover processing fees
- ✅ Honor/memory dedications
- ✅ Newsletter opt-in
- ✅ Responsive design

### Stripe API Routes
- ✅ `/api/stripe/create-checkout` - Handles one-time donations
- ✅ `/api/stripe/create-subscription` - Handles recurring donations
- ✅ `/api/stripe/webhook` - Processes Stripe webhooks
- ✅ `/api/stripe/customer-portal` - Manages subscriptions

### Pages
- ✅ `/donate` - Main donation page
- ✅ `/donate/success` - Success confirmation page
- ✅ `/donate/cancel` - Cancellation page

## 🔧 Setting Up Stripe

### 1. Get Your Stripe Test Keys

1. Sign up for a Stripe account at https://stripe.com
2. Go to https://dashboard.stripe.com/test/apikeys
3. Copy your test keys:
   - **Publishable key**: Starts with `pk_test_`
   - **Secret key**: Starts with `sk_test_`

### 2. Update Environment Variables

Replace the placeholder values in `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key_here
STRIPE_SECRET_KEY=your_secret_key_here
```

### 3. Set Up Webhooks (Optional for Testing)

For local testing with webhooks:

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login to Stripe CLI:
   ```bash
   stripe login
   ```
3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3001/api/stripe/webhook
   ```
4. Copy the webhook signing secret and add to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

## 🧪 Testing the Integration

### Test Card Numbers

Use these test card numbers (all work with any future expiry date and any CVC):

- **Success**: `4242 4242 4242 4242`
- **Requires authentication**: `4000 0027 6000 3184`
- **Declined**: `4000 0000 0000 0002`

### Test Flow

1. Navigate to http://localhost:3001/donate
2. Select donation frequency (One-time, Monthly, or Annual)
3. Choose or enter a custom amount
4. Fill in donor information:
   - Use any name
   - Use a real email format (e.g., test@example.com)
   - Phone is optional
5. Click "Donate Now" or "Start Monthly/Annual Donation"
6. You'll be redirected to Stripe Checkout
7. Enter test card details
8. Complete the payment
9. You'll be redirected back to the success page

## 📊 Viewing Test Transactions

After completing test donations:
1. Go to https://dashboard.stripe.com/test/payments
2. You'll see all test transactions
3. Click on any payment to see details including metadata

## 🔄 Testing Recurring Donations

For subscriptions:
1. Complete a monthly or annual donation
2. Check https://dashboard.stripe.com/test/subscriptions
3. You can cancel/modify subscriptions from the Stripe dashboard
4. Customer portal link is sent in the confirmation email (when configured)

## ⚙️ Production Deployment

Before going live:

1. **Get Live Stripe Keys**:
   - Switch to live mode in Stripe Dashboard
   - Copy production keys (start with `pk_live_` and `sk_live_`)

2. **Create Recurring Price IDs** (Optional):
   - In Stripe Dashboard, create products for recurring donations
   - Update price IDs in environment variables

3. **Configure Webhooks**:
   - Add production webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Select events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

4. **Update Environment Variables**:
   - Use production Stripe keys
   - Update `NEXT_PUBLIC_BASE_URL` to your production domain

## 📝 Additional Features to Consider

- [ ] Email receipts using a service like SendGrid
- [ ] Donor database integration
- [ ] Donation thermometer/progress tracking
- [ ] Donor recognition wall
- [ ] Planned giving options
- [ ] Corporate matching integration

## 🆘 Troubleshooting

### Common Issues:

1. **"Failed to create checkout session"**
   - Check that your Stripe keys are correctly set in `.env.local`
   - Ensure the server was restarted after adding environment variables

2. **Page not loading**
   - Make sure the dev server is running on port 3001
   - Check for any console errors in the browser

3. **Webhook errors**
   - Verify webhook secret is correct
   - Check Stripe CLI is running if testing locally

## 📞 Support

For Stripe-specific questions:
- Documentation: https://stripe.com/docs
- Support: https://support.stripe.com

For website issues:
- Check the console for errors
- Review the API route logs in the terminal