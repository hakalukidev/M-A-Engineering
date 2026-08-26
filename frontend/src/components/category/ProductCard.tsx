import Image from "next/image";
import type { Product } from "@/types";

export function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 text-left"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-zinc-900">{product.name}</p>
        <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{product.description}</p>
      </div>
    </button>
  );
}
