"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Mail, CheckCircle } from "lucide-react";

type NewsletterSignupProps = {
  heading?: string;
  body?: string;
  placeholder?: string;
  button?: string;
  privacy?: string;
};

export function NewsletterSignup({
  heading = "Stay Connected",
  body = "Join our newsletter to receive updates about upcoming events, cultural programs, and community initiatives.",
  placeholder = "Enter your email address",
  button = "Subscribe",
  privacy = "We respect your privacy. Unsubscribe at any time.",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submission - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-card rounded-lg p-8 md:p-12 shadow-lg">
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              {heading}
            </h2>
            <p className="text-muted-foreground mb-8">
              {body}
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 text-green-600"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Thank you for subscribing!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder={placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : button}
                </Button>
              </form>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              {privacy}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
