import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { telHref } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 text-zinc-300">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">{siteConfig.shortName}</p>
          <p className="mt-2 text-sm text-zinc-400">{siteConfig.description}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Navigate</p>
          <ul className="mt-3 space-y-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-zinc-400 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li>
              <a href={telHref(siteConfig.contact.phone)} className="flex items-center gap-2 hover:text-white">
                <Phone size={14} /> {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail size={14} /> {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-white"
              >
                <MapPin size={14} className="mt-0.5 shrink-0" /> {siteConfig.contact.address}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Follow</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            {siteConfig.social.facebook && (
              <li>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <ExternalLink size={14} /> Facebook
                </a>
              </li>
            )}
            {siteConfig.social.youtube && (
              <li>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <ExternalLink size={14} /> YouTube
                </a>
              </li>
            )}
            {siteConfig.social.linkedin && (
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <ExternalLink size={14} /> LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>

      <Container className="pb-12">
        <iframe
          src={siteConfig.contact.mapEmbedUrl}
          title="Our location on Google Maps"
          className="h-64 w-full rounded-lg border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Container>

      <div className="border-t border-white/10 py-4 text-center text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
