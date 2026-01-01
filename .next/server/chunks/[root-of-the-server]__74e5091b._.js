module.exports = [
"[project]/.next-internal/server/app/api/stripe/create-subscription/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/src/lib/stripe.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stripe",
    ()=>stripe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$20$2e$1$2e$0_$40$types$2b$node$40$20$2e$19$2e$27$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/stripe@20.1.0_@types+node@20.19.27/node_modules/stripe/esm/stripe.esm.node.js [app-route] (ecmascript)");
;
const stripe = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$stripe$40$20$2e$1$2e$0_$40$types$2b$node$40$20$2e$19$2e$27$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
    typescript: true
});
}),
"[project]/src/config/donation-tiers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DONATION_PRODUCTS",
    ()=>DONATION_PRODUCTS
]);
const DONATION_PRODUCTS = {
    'one-time': {
        priceId: null,
        amounts: [
            25,
            50,
            100,
            250,
            500
        ],
        default: 50,
        tiers: [
            {
                amount: 25,
                impact: "Helps preserve Kashmiri language materials for future generations"
            },
            {
                amount: 50,
                impact: "Sponsors a student's participation in cultural education programs"
            },
            {
                amount: 100,
                impact: "Supports community gatherings that connect diaspora families"
            },
            {
                amount: 250,
                impact: "Funds documentary projects preserving oral histories"
            },
            {
                amount: 500,
                impact: "Enables scholarship opportunities for young Kashmiris"
            }
        ]
    },
    'monthly': {
        amounts: [
            10,
            25,
            50,
            100
        ],
        default: 25,
        // Create recurring prices in Stripe for each
        prices: {
            10: ("TURBOPACK compile-time value", "price_monthly_10") || 'price_monthly_10',
            25: ("TURBOPACK compile-time value", "price_monthly_25") || 'price_monthly_25',
            50: ("TURBOPACK compile-time value", "price_monthly_50") || 'price_monthly_50',
            100: ("TURBOPACK compile-time value", "price_monthly_100") || 'price_monthly_100'
        },
        tiers: [
            {
                amount: 10,
                impact: "Monthly support for cultural preservation initiatives"
            },
            {
                amount: 25,
                impact: "Sustains ongoing educational programs"
            },
            {
                amount: 50,
                impact: "Provides consistent support for community events"
            },
            {
                amount: 100,
                impact: "Champions major cultural heritage projects"
            }
        ]
    },
    'annual': {
        amounts: [
            100,
            250,
            500,
            1000
        ],
        default: 250,
        prices: {
            100: ("TURBOPACK compile-time value", "price_annual_100") || 'price_annual_100',
            250: ("TURBOPACK compile-time value", "price_annual_250") || 'price_annual_250',
            500: ("TURBOPACK compile-time value", "price_annual_500") || 'price_annual_500',
            1000: ("TURBOPACK compile-time value", "price_annual_1000") || 'price_annual_1000'
        },
        tiers: [
            {
                amount: 100,
                impact: "Annual supporter of cultural preservation"
            },
            {
                amount: 250,
                impact: "Patron of educational initiatives"
            },
            {
                amount: 500,
                impact: "Guardian of heritage programs"
            },
            {
                amount: 1000,
                impact: "Visionary leader in community development"
            }
        ]
    }
};
}),
"[project]/src/app/api/stripe/create-subscription/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$9_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.9_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/stripe.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$donation$2d$tiers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/donation-tiers.ts [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { frequency, amount, coverFees, donorInfo } = body;
        // For subscriptions, we need to use pre-created price IDs or create them dynamically
        const config = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$donation$2d$tiers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DONATION_PRODUCTS"][frequency];
        let priceId;
        // Check if we have a pre-configured price for this amount
        if (config.prices && amount in config.prices) {
            priceId = config.prices[amount];
        }
        // If no pre-configured price or custom amount, create a new price
        if (!priceId || priceId.startsWith('price_')) {
            const product = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stripe"].products.create({
                name: `${frequency === 'monthly' ? 'Monthly' : 'Annual'} Donation to KGNA`,
                description: donorInfo.isHonorarium && donorInfo.honorariumName ? `In ${donorInfo.honorariumName}` : 'Recurring support for our mission'
            });
            const price = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stripe"].prices.create({
                product: product.id,
                unit_amount: Math.round(amount * 100),
                currency: 'usd',
                recurring: {
                    interval: frequency === 'monthly' ? 'month' : 'year'
                }
            });
            priceId = price.id;
        }
        // Create checkout session for subscription
        const session = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stripe"].checkout.sessions.create({
            payment_method_types: [
                'card'
            ],
            mode: 'subscription',
            customer_email: donorInfo.email,
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            metadata: {
                donationType: frequency,
                firstName: donorInfo.firstName,
                lastName: donorInfo.lastName,
                phone: donorInfo.phone || '',
                isHonorarium: donorInfo.isHonorarium ? 'true' : 'false',
                honorariumName: donorInfo.honorariumName || '',
                subscribeToNewsletter: donorInfo.subscribeToNewsletter ? 'true' : 'false',
                coverFees: coverFees ? 'true' : 'false',
                customAmount: amount.toString()
            },
            subscription_data: {
                metadata: {
                    donationType: frequency,
                    firstName: donorInfo.firstName,
                    lastName: donorInfo.lastName
                }
            },
            success_url: `${("TURBOPACK compile-time value", "http://localhost:3001")}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${("TURBOPACK compile-time value", "http://localhost:3001")}/donate/cancel`
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$9_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            url: session.url
        });
    } catch (error) {
        console.error('Error creating subscription session:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$9_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to create subscription session'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__74e5091b._.js.map