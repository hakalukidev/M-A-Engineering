import { Fragment } from "react";
import Image from "next/image";
import { Leaf } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { CommitmentSettings } from "@/lib/commitmentSettings";

/** Renders `**bold**` spans and `[leaf]` markers from the admin-edited statement. */
function renderStatement(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\[leaf\])/g).map((part, i) => {
    if (part === "[leaf]") {
      return <Leaf key={i} className="mb-1 inline-block h-5 w-5 text-brand-green sm:h-6 sm:w-6" />;
    }
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <span key={i} className="font-medium text-zinc-700">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/**
 * "Our commitment" break — a staggered three-photo collage over a centered
 * statement. Sits between the catalog sections as a quieter, editorial beat
 * (mirrors the reference: overlapping photos, no eyebrow/title).
 * Photos and copy are admin-editable (Settings → Our Commitment).
 */
export function Commitment({ photos, text }: CommitmentSettings) {
  const [left, center, right] = photos;
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto flex max-w-5xl items-center justify-center">
          <div className="relative z-0 -mr-[6%] w-[26%] shrink-0 aspect-[13/15] overflow-hidden rounded-xl shadow-lg">
            <Image
              src={left.src}
              alt={left.alt}
              fill
              sizes="(min-width: 1024px) 260px, 26vw"
              className="object-cover"
            />
          </div>
          <div className="relative z-10 w-[48%] shrink-0 aspect-[65/44] overflow-hidden rounded-xl shadow-xl">
            <Image
              src={center.src}
              alt={center.alt}
              fill
              sizes="(min-width: 1024px) 520px, 48vw"
              className="object-cover"
            />
          </div>
          <div className="relative z-0 -ml-[6%] w-[26%] shrink-0 aspect-[13/15] overflow-hidden rounded-xl shadow-lg">
            <Image
              src={right.src}
              alt={right.alt}
              fill
              sizes="(min-width: 1024px) 260px, 26vw"
              className="object-cover"
            />
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xl leading-relaxed text-zinc-500 sm:mt-14 sm:text-2xl">
          {renderStatement(text)}
        </p>
      </Container>
    </section>
  );
}
