import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

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
            <li>{siteConfig.contact.phone}</li>
            <li>{siteConfig.contact.email}</li>
            <li>{siteConfig.contact.address}</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Follow</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            {siteConfig.social.facebook && <li>Facebook</li>}
            {siteConfig.social.youtube && <li>YouTube</li>}
            {siteConfig.social.linkedin && <li>LinkedIn</li>}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-4 text-center text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
