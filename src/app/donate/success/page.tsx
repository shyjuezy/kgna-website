"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Heart, Users, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";

function DonationSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [isRecurring, setIsRecurring] = useState(false);

  useEffect(() => {
    // You could fetch session details here to show donation amount and frequency
    // For now, we'll just show a generic success message
    if (!sessionId) {
      router.push("/donate");
    }
  }, [sessionId, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-primary/20">
            <CardHeader className="text-center pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-4"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </motion.div>

              <CardTitle className="text-3xl font-serif mb-2">Thank You!</CardTitle>
              <CardDescription className="text-lg">
                Your donation has been successfully processed
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Success Message */}
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Your generosity directly supports our mission to preserve Kashmiri culture
                  and strengthen our community across North America.
                </p>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>A receipt has been sent to your email</span>
                </div>
              </div>

              {/* What's Next */}
              <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold">What&apos;s Next?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <Heart className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">You&apos;re making a difference</p>
                      <p className="text-muted-foreground">
                        Your support helps us organize cultural events, educational programs, and community initiatives.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Users className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Join our community</p>
                      <p className="text-muted-foreground">
                        Follow us on social media and attend our events to stay connected.
                      </p>
                    </div>
                  </div>

                  {isRecurring && (
                    <div className="flex gap-3">
                      <Download className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-medium">Manage your donation</p>
                        <p className="text-muted-foreground">
                          You can update or cancel your recurring donation anytime through the link in your email.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Return to Home
                  </Button>
                </Link>
                <Link href="/events" className="flex-1">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    View Upcoming Events
                  </Button>
                </Link>
              </div>

              {/* Social Share */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-3">
                  Help spread the word about our mission
                </p>
                <div className="flex justify-center gap-3">
                  <Button size="sm" variant="outline">
                    Share on Facebook
                  </Button>
                  <Button size="sm" variant="outline">
                    Share on Twitter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tax Information */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              KGNA is a 501(c)(3) tax-exempt organization.
              <br />
              Your donation is tax-deductible to the fullest extent allowed by law.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function DonationSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DonationSuccessContent />
    </Suspense>
  );
}