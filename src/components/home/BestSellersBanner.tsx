import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

/** Editorial text/photo banner introducing the Best Sellers carousel below it. */
export function BestSellersBanner() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-orange">
              Customer favorites
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Best <span className="font-serif italic">sellers</span>
            </h2>
            <p className="mt-4 max-w-md text-base text-brand-ink/70">
              Heavy-gauge stainless steel cookware and cooking equipment, built to hold up
              through the busiest service — the pieces our customers keep coming back to
              re-order.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
            >
              Browse best sellers
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-zinc-100">
            <Image
              src="/images/home/best-sellers-banner.jpg"
              alt="Polished stainless steel cookware in a commercial kitchen"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
