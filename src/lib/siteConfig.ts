const DEFAULT_CONTACT_PHONE = "469.226.2429";
const DEFAULT_NEW_ORLEANS_PHONE = "504.408.9868";
const DEFAULT_CONTACT_EMAIL = "jismail@C2financial.com";
const DEFAULT_REVIEW_URL = "/contact";
const DEFAULT_LINKEDIN_URL = "https://www.linkedin.com/in/johnismail";
const DEFAULT_NMLS = "231283";
const DEFAULT_SITE_URL = "www.NolaRate.com";

export const siteConfig = {
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || DEFAULT_CONTACT_PHONE,
  newOrleansPhone:
    process.env.NEXT_PUBLIC_NEW_ORLEANS_PHONE?.trim() || DEFAULT_NEW_ORLEANS_PHONE,
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL,
  reviewUrl: process.env.NEXT_PUBLIC_REVIEW_URL?.trim() || DEFAULT_REVIEW_URL,
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || DEFAULT_LINKEDIN_URL,
  nmls: process.env.NEXT_PUBLIC_NMLS?.trim() || DEFAULT_NMLS,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL,
};

export function toTelHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits.startsWith("+") ? digits : `+1${digits}`}`;
}
