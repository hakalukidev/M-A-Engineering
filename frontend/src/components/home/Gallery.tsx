import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCategories } from "@/data/categories";

/**
 * Photo bento — real subcategory photography, one pick per category, per the
 * reference's dense editorial gallery strip. No captions beyond the actual
 * subcategory name (no fabricated "inspiration" copy).
 */
const PICKS: [string, string][] = [
  ["restaurant-equipment", "dining-furniture"],
  ["commercial-kitchen-equipment", "cooking-equipment"],
  ["bakery-equipment", "display-showcases"],
  ["medical-equipment", "surgical-equipment"],
  ["food-shop-equipment", "display-counters"],
];

function GalleryTile({
  categorySlug,
  subcategorySlug,
  name,
  image,
  className,
}: {
  categorySlug: string;
  subcategorySlug: string;
  name: string;
  image: string;
  className?: string;
}) {
  return (
    <Link
      href={`/categories/${categorySlug}/${subcategorySlug}`}
      className={`group relative block overflow-hidden rounded-2xl bg-zinc-100 ${className ?? ""}`}
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 90vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {name}
      </span>
    </Link>
  );
}

export function Gallery() {
  const categories = getAllCategories();

  const tiles = PICKS.map(([categorySlug, subcategorySlug]) => {
    const category = categories.find((c) => c.slug === categorySlug);
    const subcategory = category?.subcategories.find((s) => s.slug === subcategorySlug);
    if (!category || !subcategory) return null;
    return { categorySlug, subcategorySlug, name: subcategory.name, image: subcategory.coverImage };
  }).filter((t) => t !== null);

  if (tiles.length < 5) return null;

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="A closer look"
          title="Equipment in every setting"
          subtitle="A few of the setups we supply into — kitchens, bakeries, clinics, and shop floors."
          className="mb-8"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:grid-rows-2">
          <GalleryTile {...tiles[0]} className="col-span-2 aspect-[16/10] sm:aspect-auto sm:row-span-2" />
          <GalleryTile {...tiles[1]} className="aspect-square" />
          <GalleryTile {...tiles[2]} className="aspect-square" />
          <GalleryTile {...tiles[3]} className="aspect-square" />
          <GalleryTile {...tiles[4]} className="aspect-square" />
        </div>
      </Container>
    </section>
  );
}
