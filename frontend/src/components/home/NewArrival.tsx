import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

/** Editorial photo/text banner announcing the newest equipment added to the catalog. */
export function NewArrival() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-zinc-100">
            <Image
              src="/images/home/new-arrival-banner.jpg"
              alt="Newly installed stainless steel commercial oven"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-orange">
              Just landed
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              New <span className="font-serif italic">Arrival</span>
            </h2>
            <p className="mt-4 max-w-md text-base text-brand-ink/70">
              The latest addition to our catalog — engineered for even heat, faster recovery,
              and the same heavy-gauge stainless steel build our customers rely on every shift.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
            >
              Shop now
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
