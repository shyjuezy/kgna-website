import { Metadata } from "next";
import Image from "next/image";
import { DonationForm } from "@/components/donations/donation-form";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { Heart, Users, TrendingUp, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Donate - Support Our Mission",
  description: "Support KGNA's mission to preserve Kashmiri culture and identity through your generous donation.",
};

const reasons = [
  {
    icon: Heart,
    title: "Preserve Heritage",
    description: "Help maintain and pass on Kashmiri traditions to future generations"
  },
  {
    icon: Users,
    title: "Build Community",
    description: "Support programs that bring the Kashmiri diaspora together"
  },
  {
    icon: TrendingUp,
    title: "Enable Growth",
    description: "Fund educational initiatives and cultural events"
  },
  {
    icon: Globe,
    title: "Expand Reach",
    description: "Help us serve more communities across North America"
  }
];

export default function DonatePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Support Our Mission
            </h1>
            <p className="text-lg text-muted-foreground">
              Your generosity helps preserve Kashmiri heritage and strengthens our community across North America
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Info */}
            <div className="lg:col-span-1 space-y-8">
              {/* Why Donate Section */}
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6">Why Your Support Matters</h2>
                <div className="space-y-4">
                  {reasons.map((reason) => (
                    <div key={reason.title} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <reason.icon className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{reason.title}</h3>
                        <p className="text-sm text-muted-foreground">{reason.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax Info */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-semibold mb-3">Tax-Deductible Giving</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  KGNA is a registered 501(c)(3) nonprofit organization. Your donation is tax-deductible to the fullest extent allowed by law.
                </p>
                <p className="text-xs text-muted-foreground">
                  EIN: XX-XXXXXXX (will be provided on your receipt)
                </p>
              </div>

              {/* Image */}
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={PLACEHOLDER_IMAGES.community}
                  alt="KGNA Community"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Other Ways to Give */}
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Other Ways to Give</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Donor Advised Funds</li>
                  <li>• Corporate Matching</li>
                  <li>• Legacy Giving</li>
                  <li>• Stock Donations</li>
                </ul>
                <p className="text-sm mt-4">
                  Contact us at{" "}
                  <a href="mailto:donate@kgna.us" className="text-primary hover:underline">
                    donate@kgna.us
                  </a>
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-2">
              <DonationForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}