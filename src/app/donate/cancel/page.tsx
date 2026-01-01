import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, ArrowLeft, Heart, HelpCircle } from "lucide-react";

export default function DonationCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-muted/10">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-4">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                  <XCircle className="h-12 w-12 text-orange-600" />
                </div>
              </div>

              <CardTitle className="text-3xl font-serif mb-2">Donation Cancelled</CardTitle>
              <CardDescription className="text-lg">
                Your donation was not completed
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Message */}
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  We understand that you may have changed your mind or encountered an issue.
                  Your interest in supporting our mission means a lot to us.
                </p>
              </div>

              {/* Common Issues */}
              <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Common issues and solutions
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Payment method declined:</strong> Try using a different card or payment method</li>
                  <li>• <strong>Technical issues:</strong> Clear your browser cache and try again</li>
                  <li>• <strong>Questions about donation:</strong> Contact us at donate@kgna.us</li>
                  <li>• <strong>Need other payment options:</strong> We also accept checks and wire transfers</li>
                </ul>
              </div>

              {/* Other Ways to Help */}
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Other ways you can help
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Volunteer at our events</li>
                  <li>• Share our mission on social media</li>
                  <li>• Attend our cultural programs</li>
                  <li>• Join our newsletter for updates</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link href="/donate" className="flex-1">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Return to Home
                  </Button>
                </Link>
              </div>

              {/* Contact */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Need help? Contact us at{" "}
                  <a href="mailto:donate@kgna.us" className="text-primary hover:underline">
                    donate@kgna.us
                  </a>{" "}
                  or call (555) 123-4567
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}