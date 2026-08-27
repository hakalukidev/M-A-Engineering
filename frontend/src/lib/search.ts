import { categories } from "@/data/categories";
import type { SearchableItem } from "@/types";

/** Flattens categories + products into one searchable list for the top search bar. */
export function buildSearchIndex(): SearchableItem[] {
  const items: SearchableItem[] = [];

  for (const category of categories) {
    items.push({
      type: "category",
      slug: category.slug,
      categorySlug: category.slug,
      title: category.name,
      description: category.shortDescription,
      image: category.coverImage,
    });

    for (const subcategory of category.subcategories) {
      items.push({
        type: "subcategory",
        slug: subcategory.slug,
        categorySlug: category.slug,
        subcategorySlug: subcategory.slug,
        title: subcategory.name,
        description: subcategory.shortDescription,
        image: subcategory.coverImage,
      });

      for (const product of subcategory.products) {
        items.push({
          type: "product",
          slug: product.id,
          categorySlug: category.slug,
          subcategorySlug: subcategory.slug,
          title: product.name,
          description: product.description,
          image: product.image,
        });
      }
    }
  }

  return items;
}

export function searchIndex(query: string, index: SearchableItem[] = buildSearchIndex()) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return index.filter(
    (item) =>
      item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
  );
}
