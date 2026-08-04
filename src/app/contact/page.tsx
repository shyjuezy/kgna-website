"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Mail,
  Send,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { ORGANIZATION_INFO } from "@/lib/constants";
import type { CmsPageContent } from "@/lib/cms";

// export const metadata: Metadata = {
//   title: "Contact Us",
//   description: "Get in touch with the Kashmiri Group of North America. We're here to help with any questions about our community, events, and initiatives.",
// };

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  interests: string[];
};

const interestOptions = [
  "Events & Activities",
  "Volunteering",
  "Donations & Support",
  "Cultural Programs",
  "Youth Programs",
  "Membership",
  "General Inquiry",
];

const faqData = [
  {
    question: "How can I become a member of KGNA?",
    answer:
      "Membership is open to all individuals interested in preserving and promoting Kashmiri culture. You can join by filling out our membership form online or at any of our events.",
  },
  {
    question: "Are your events open to non-Kashmiris?",
    answer:
      "Yes. We welcome everyone interested in learning about and experiencing Kashmiri culture, whatever their background. Note that admission depends on the event: some gatherings are open to the community, while others are private, ticketed events that require an invitation.",
  },
  {
    question: "How do I attend a KGNA event?",
    answer:
      "Several of our events are private and ticketed, and attendance is by invitation only. There is no public registration for those events. Email the organizers at info@kgna.us to request an invitation, and if one is issued, ticketing is completed off-site through our ticketing partner.",
  },
  {
    question: "Can I bring a guest or pass my invitation to someone else?",
    answer:
      "Invitations are issued to a named guest and are not transferable. If you would like to bring someone with you, mention it when you request your invitation so the organizers can confirm whether capacity allows.",
  },
  {
    question: "What happens if an event is cancelled or rescheduled?",
    answer:
      "KGNA reserves the right to cancel and refund your registration if an event is cancelled or rescheduled, if venue capacity or safety requirements change, or if a registration was not made by the invited guest. Refunds are issued to the original payment method. We will contact registered guests by email as soon as a change is confirmed.",
  },
  {
    question: "Are KGNA events photographed?",
    answer:
      "Yes. We photograph and record our events and may use those images in our gallery, newsletters, and promotional material. If you would prefer not to appear, tell an organizer at the event or contact us afterwards and we will remove identifiable images of you where reasonably possible.",
  },
  {
    question: "How can I volunteer for KGNA?",
    answer:
      'We are always looking for volunteers. Use the contact form above and tick "Volunteering" under Areas of Interest, or email us at info@kgna.us.',
  },
  {
    question: "Do you offer Kashmiri language classes?",
    answer:
      "Yes, we offer regular Kashmiri language workshops for both children and adults. Check our Events page for upcoming sessions.",
  },
  {
    question: "How can I support KGNA's mission?",
    answer:
      "You can support us through donations, volunteering, attending events, or spreading awareness about our initiatives. Visit our Donate page for more information.",
  },
  {
    question: "Can I host a KGNA event in my city?",
    answer:
      "Absolutely! We encourage community members to organize local events. Contact us to discuss how we can support your initiative.",
  },
];

export default function ContactPage() {
  const [cmsContent, setCmsContent] = useState<CmsPageContent | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    interests: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const getSection = (type: string) =>
    cmsContent?.sections.find((section) => section.type === type)?.props;
  const text = (
    props: Record<string, unknown> | undefined,
    key: string,
    fallback: string,
  ) => {
    const value = props?.[key];
    return typeof value === "string" && value.trim() ? value : fallback;
  };
  const list = <T extends Record<string, unknown>>(
    props: Record<string, unknown> | undefined,
    key: string,
    fallback: T[],
  ) => {
    const value = props?.[key];
    return Array.isArray(value) ? (value as T[]) : fallback;
  };
  const hero = getSection("hero");
  const info = getSection("info") ?? getSection("contactInfo");
  const social = getSection("social");
  const form = getSection("form");
  const faq = getSection("faq");
  const faqs = list(faq, "items", faqData);
  const socialLinks = list<Record<string, unknown>>(
    social,
    "items",
    list<Record<string, unknown>>(social, "links", [
      { label: "Facebook", url: "https://facebook.com/kgnaus" },
      { label: "Instagram", url: "https://instagram.com/kgnaus" },
      { label: "Twitter", url: "https://twitter.com/kgnaus" },
    ]),
  );

  useEffect(() => {
    fetch("/api/cms/contact")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => setCmsContent(payload?.content ?? null))
      .catch(() => setCmsContent(null));
  }, []);

  // Preselect an interest from ?interest=... so /volunteer can land people here
  // with Volunteering already ticked. Read from location rather than
  // useSearchParams so this prerendered route needs no Suspense boundary.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get(
      "interest",
    );
    const match = interestOptions.find(
      (option) => option.toLowerCase() === requested?.toLowerCase(),
    );
    if (match) {
      setFormData((prev) =>
        prev.interests.includes(match)
          ? prev
          : { ...prev, interests: [...prev.interests, match] },
      );
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        interests: [],
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif font-bold mb-4"
            >
              {text(hero, "heading", "Get in Touch")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              {text(
                hero,
                "body",
                "We're here to help and answer any questions you might have. We look forward to hearing from you!",
              )}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1 space-y-6">
                {/* Contact Details Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">
                      {text(info, "heading", "Contact Information")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a
                          href={`mailto:${text(info, "email", ORGANIZATION_INFO.email)}`}
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          {text(info, "email", ORGANIZATION_INFO.email)}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">
                      {text(social, "heading", "Follow Us")}
                    </CardTitle>
                    <CardDescription>
                      {text(
                        social,
                        "body",
                        "Stay connected with our community on social media",
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {socialLinks.map((link) => {
                      const label = String(link.label ?? "Social");
                      const Icon = label.toLowerCase().includes("instagram")
                        ? Instagram
                        : label.toLowerCase().includes("twitter")
                          ? Twitter
                          : Facebook;

                      return (
                        <a
                          key={label}
                          href={String(link.url ?? link.href ?? "#")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <Icon className="h-5 w-5 text-primary" />
                          <span className="text-sm">{label}</span>
                        </a>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif">
                      {text(form, "heading", "Send us a Message")}
                    </CardTitle>
                    <CardDescription>
                      {text(
                        form,
                        "body",
                        "Fill out the form below and we'll get back to you as soon as possible",
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Fields */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      {/* Contact Fields */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>

                      {/* Interests */}
                      <div>
                        <Label>Areas of Interest</Label>
                        <p className="text-sm text-muted-foreground mb-3">
                          Select all that apply
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {interestOptions.map((interest) => (
                            <Badge
                              key={interest}
                              variant={
                                formData.interests.includes(interest)
                                  ? "default"
                                  : "outline"
                              }
                              className="cursor-pointer"
                              onClick={() => handleInterestToggle(interest)}
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          className="mt-1 min-h-[120px]"
                        />
                      </div>

                      {/* Submit Status */}
                      {submitStatus === "success" && (
                        <Alert className="bg-green-50 text-green-800 border-green-200">
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            Thank you for your message! We&apos;ll get back to
                            you soon.
                          </AlertDescription>
                        </Alert>
                      )}

                      {submitStatus === "error" && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            There was an error sending your message. Please try
                            again.
                          </AlertDescription>
                        </Alert>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        className="w-full sm:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-4">
                {text(faq, "heading", "Frequently Asked Questions")}
              </h2>
              <p className="text-muted-foreground">
                {text(
                  faq,
                  "body",
                  "Find answers to common questions about KGNA",
                )}
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-start gap-2">
                        <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Still have questions?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Contact us directly
                </Button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
