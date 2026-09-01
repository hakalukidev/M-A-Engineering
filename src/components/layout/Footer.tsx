import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { getFooterSettings } from "@/lib/settings";
import { telHref } from "@/lib/utils";

/** Company blurb, contact info, and social links are admin-editable (see /admin/settings) — nav links stay fixed. */
export async function Footer() {
  const settings = await getFooterSettings();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 text-zinc-300">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">{settings.shortName}</p>
          <p className="mt-2 text-sm text-zinc-400">{settings.description}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li>
              <a href={telHref(settings.phone)} className="flex items-center gap-2 hover:text-white">
                <Phone size={14} /> {settings.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail size={14} /> {settings.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0" /> {settings.address}
            </li>
          </ul>
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
          <p className="text-sm font-semibold text-white">Follow</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            {settings.facebook && (
              <li>
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <ExternalLink size={14} /> Facebook
                </a>
              </li>
            )}
            {settings.youtube && (
              <li>
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <ExternalLink size={14} /> YouTube
                </a>
              </li>
            )}
            {settings.linkedin && (
              <li>
                <a
                  href={settings.linkedin}
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

      <div className="border-t border-white/10 py-4 text-center text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
