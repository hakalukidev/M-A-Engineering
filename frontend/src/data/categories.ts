import type { Category } from "@/types";

/**
 * Placeholder category/product data (proposal calls for 4-5 categories,
 * 10-15 images + descriptions each). Replace with real content once the
 * Client supplies category names, images, and descriptions.
 *
 * Once there's a real backend/CMS, swap this static array for a fetch
 * call in the same shape and the rest of the app (pages, search,
 * generateStaticParams) keeps working unchanged.
 */
export const categories: Category[] = [
  {
    id: "excavators",
    slug: "excavators",
    name: "Excavators",
    shortDescription: "Heavy-duty excavators for construction and earthmoving.",
    coverImage: "/images/categories/excavators/cover.jpg",
    products: [],
  },
  {
    id: "loaders",
    slug: "loaders",
    name: "Loaders",
    shortDescription: "Wheel and track loaders built for high-volume material handling.",
    coverImage: "/images/categories/loaders/cover.jpg",
    products: [],
  },
  {
    id: "generators",
    slug: "generators",
    name: "Generators",
    shortDescription: "Reliable industrial power generation equipment.",
    coverImage: "/images/categories/generators/cover.jpg",
    products: [],
  },
  {
    id: "agricultural-machinery",
    slug: "agricultural-machinery",
    name: "Agricultural Machinery",
    shortDescription: "Tractors and implements for modern farming.",
    coverImage: "/images/categories/agricultural-machinery/cover.jpg",
    products: [],
  },
];

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
