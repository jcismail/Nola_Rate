const DEFAULT_CONTACT_PHONE = "469.226.2429";
const DEFAULT_CONTACT_EMAIL = "john@example.com";
const DEFAULT_REVIEW_URL = "/contact";

export const siteConfig = {
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || DEFAULT_CONTACT_PHONE,
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL,
  reviewUrl: process.env.NEXT_PUBLIC_REVIEW_URL?.trim() || DEFAULT_REVIEW_URL,
};

export function toTelHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits.startsWith("+") ? digits : `+1${digits}`}`;
}
