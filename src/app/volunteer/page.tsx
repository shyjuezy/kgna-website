import { redirect } from "next/navigation";

/**
 * /volunteer is linked from the About page's "Get Involved" CTA and from
 * external material, but there is no standalone volunteer page. Send visitors
 * to the contact form with the Volunteering interest preselected rather than
 * 404ing. Temporary redirect so a real landing page can replace it later.
 */
export default function VolunteerPage() {
  redirect("/contact?interest=Volunteering");
}
