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

  return index
    .map((item) => {
      const title = item.title.toLowerCase();
      if (title.startsWith(q)) return { item, score: 3 };
      if (title.includes(q)) return { item, score: 2 };
      // Product descriptions are currently boilerplate placeholder text shared
      // across every product ("placeholder description... materials... Client"),
      // so a short query (e.g. a single letter) matches almost everything via
      // the description. Only fall back to description matches once the query
      // is specific enough to be meaningful.
      if (q.length >= 3 && item.description.toLowerCase().includes(q)) {
        return { item, score: 1 };
      }
      return null;
    })
    .filter((result): result is { item: SearchableItem; score: number } => result !== null)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);
}
