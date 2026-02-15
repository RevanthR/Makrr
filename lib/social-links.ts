import type { SiteSettings } from "@/lib/db/schema";
import { SOCIAL_LINKS } from "@/data/constants";

export type SocialLinks = {
  whatsapp: string;
  email: string;
  instagram: string;
  linkedin: string;
};

export function getSocialLinks(settings: SiteSettings | null): SocialLinks {
  if (!settings) {
    return {
      whatsapp: SOCIAL_LINKS.whatsapp,
      email: SOCIAL_LINKS.email,
      instagram: SOCIAL_LINKS.instagram,
      linkedin: SOCIAL_LINKS.linkedin,
    };
  }
  const number = (settings.whatsappNumber ?? "").replace(/\D/g, "") || "919876543210";
  const message = settings.whatsappMessage?.trim() || "";
  const whatsapp =
    message.length > 0
      ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
      : `https://wa.me/${number}`;
  return {
    whatsapp,
    email: settings.email ? `mailto:${settings.email}` : SOCIAL_LINKS.email,
    instagram: settings.instagramUrl || SOCIAL_LINKS.instagram,
    linkedin: settings.linkedinUrl || SOCIAL_LINKS.linkedin,
  };
}
