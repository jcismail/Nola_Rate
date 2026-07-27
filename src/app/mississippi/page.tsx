import type { Metadata } from "next";
import LocationPage from "@/components/site/LocationPage";

export const metadata: Metadata = {
  title: "Mississippi Mortgage Guidance | Nola Rate Mortgage Advisory",
  description:
    "Nola Rate Mortgage Advisory helps Mississippi buyers and homeowners understand mortgage options with clear, personal guidance.",
};

export default function MississippiPage() {
  return (
    <LocationPage
      eyebrow="Mississippi Mortgage Guidance"
      title="Clear mortgage guidance for Mississippi buyers and homeowners."
      intro="John is licensed and proud to serve Mississippi customers with practical guidance across home purchase, refinance, and investor financing decisions."
      bullets={[
        "One-on-one support for Mississippi homebuyers, homeowners, and investors.",
        "Guidance across Conventional, FHA, VA, USDA, Jumbo, Non-QM, and investor financing.",
        "Help understanding affordability, qualification, down payment options, and next steps.",
        "A simple process built around clarity, responsiveness, and long-term success.",
      ]}
      marketNotes={[
        {
          title: "Local-State Support",
          text: "John serves Mississippi customers from his New Orleans base, with a focus on clear communication and accessible next-step planning.",
        },
        {
          title: "Program Options",
          text: "Whether you are buying, refinancing, or evaluating a more complex income profile, John can help compare options that fit your situation.",
        },
        {
          title: "Plain-Language Guidance",
          text: "You get a mortgage conversation built around your goals, not confusing jargon or one-size-fits-all advice.",
        },
      ]}
      image={{
        src: "https://images.unsplash.com/photo-1621302879828-a43aea3cb9fa?auto=format&fit=crop&q=80&w=1200",
        alt: "Bridge over the Mississippi River near Vicksburg, Mississippi",
        credit: "Justin Wilkens on Unsplash",
        creditHref:
          "https://unsplash.com/photos/gray-bridge-over-body-of-water-during-daytime-TcqGcfPnbTI",
      }}
    />
  );
}
