import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/icons/SocialIcons";
import { siteConfig } from "@/config/site";
import { getFooterSettings } from "@/lib/settings";
import { telHref } from "@/lib/utils";

/** Company blurb, contact info, and social links are admin-editable (see /admin/settings) — nav links stay fixed. */
export async function Footer() {
  const settings = await getFooterSettings();

  return (
    <footer className="bg-brand-ink text-brand-cream/70">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="pr-4">
          <p className="text-lg font-bold tracking-tight text-brand-cream">{settings.shortName}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-brand-cream/55">{settings.description}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-cream/40">Contact</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={telHref(settings.phone)} className="flex items-center gap-2.5 transition-colors hover:text-brand-cream">
                <Phone size={14} className="shrink-0 text-brand-cream/40" /> {settings.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2.5 transition-colors hover:text-brand-cream">
                <Mail size={14} className="shrink-0 text-brand-cream/40" /> {settings.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={14} className="mt-0.5 shrink-0 text-brand-cream/40" /> {settings.address}
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-cream/40">Navigate</p>
          <ul className="mt-4 space-y-3">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm transition-colors hover:text-brand-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-cream/40">Follow</p>
          <ul className="mt-4 space-y-3 text-sm">
            {settings.facebook && (
              <li>
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-brand-cream"
                >
                  <FacebookIcon size={14} className="shrink-0 text-brand-cream/40" /> Facebook
                </a>
              </li>
            )}
            {settings.youtube && (
              <li>
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-brand-cream"
                >
                  <YoutubeIcon size={14} className="shrink-0 text-brand-cream/40" /> YouTube
                </a>
              </li>
            )}
            {settings.instagram && (
              <li>
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-brand-cream"
                >
                  <InstagramIcon size={14} className="shrink-0 text-brand-cream/40" /> Instagram
                </a>
              </li>
            )}
            {settings.linkedin && (
              <li>
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-brand-cream"
                >
                  <LinkedinIcon size={14} className="shrink-0 text-brand-cream/40" /> LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-brand-cream/10">
        <Container className="flex flex-col items-center gap-1.5 py-5 text-center text-xs text-brand-cream/35 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            Developed by{" "}
            <a
              href="https://hakaluki.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-cream/50 transition-colors hover:text-brand-cream"
            >
              hakaluki.dev
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
