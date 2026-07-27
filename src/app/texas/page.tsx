import type { Metadata } from "next";
import LocationPage from "@/components/site/LocationPage";

export const metadata: Metadata = {
  title: "Texas Mortgage Guidance | Nola Rate Mortgage Advisory",
  description:
    "John Ismail helps Texas buyers and homeowners compare mortgage options with clear guidance across major loan programs.",
};

export default function TexasPage() {
  return (
    <LocationPage
      eyebrow="Texas Mortgage Guidance"
      title="Mortgage support for buyers and homeowners across Texas."
      intro="Raised in Plano and maintaining a home there today, John brings Texas roots and more than 20 years of mortgage experience to families comparing purchase, refinance, and investor financing options."
      bullets={[
        "Clear purchase and refinance guidance for Texas households.",
        "Support across Conventional, FHA, VA, USDA, Jumbo, Non-QM, and investor financing.",
        "A practical review of credit, income, down payment, and timeline before you make your next move.",
        "Personal mortgage guidance from someone who understands the Plano and broader Texas market connection.",
      ]}
      marketNotes={[
        {
          title: "Plano Roots",
          text: "John was raised in Plano and earned both his Bachelor's degree and MBA from the University of Texas at Dallas.",
        },
        {
          title: "Loan Program Fit",
          text: "John helps customers compare programs based on goals, income profile, property type, and long-term affordability.",
        },
        {
          title: "Personal Process",
          text: "Expect plain-language guidance, consistent communication, and a focus on choosing a mortgage path with confidence.",
        },
      ]}
      image={{
        src: "https://images.unsplash.com/photo-1666969565832-b55bf42a900d?auto=format&fit=crop&q=80&w=1200",
        alt: "Austin, Texas skyline at sunset",
        credit: "Justin Wallace on Unsplash",
        creditHref:
          "https://unsplash.com/photos/eine-skyline-der-stadt-bei-sonnenuntergang-cB_LQ6NGkq4",
      }}
    />
  );
}
