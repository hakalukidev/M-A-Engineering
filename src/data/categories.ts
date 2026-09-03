import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import type { Category, Product, Subcategory } from "@/types";

/**
 * Firestore-backed catalog reads. Collections: categories/{categorySlug},
 * subcategories/{categorySlug}__{subcategorySlug}, products/{categorySlug}__{subcategorySlug}__{productSlug},
 * each ordered by an `order` field. See scripts/seed-firestore.ts for the
 * writer side and src/app/admin/(protected)/categories/actions.ts for admin
 * CRUD mutations.
 *
 * getAllCategories is wrapped in two layers of caching:
 *  - unstable_cache persists the result *across requests* (tag "catalog",
 *    24h safety-net revalidate) — without this, every single page load
 *    re-reads all ~125 catalog docs from Firestore (1 Firestore read per
 *    document returned) with no reuse between visitors. A 5 min window
 *    (the original setting) meant ~125 reads every 5 minutes in the
 *    background alone — ~36k/day, which is what actually burned through
 *    the Spark plan's free daily read quota, not visitor traffic. Admin
 *    mutations call revalidateTag("catalog") so edits still show up
 *    immediately — the 24h window is only a safety net for the rare edit
 *    path that doesn't go through that action.
 *  - React's cache() on top dedupes *within* a single request, so a page
 *    that calls getCategoryBySlug/getSubcategoryBySlug/getProductBySlug
 *    (each built on this) only resolves the outer promise once.
 */
const fetchAllCategoriesFromFirestore = unstable_cache(
  async (): Promise<Category[]> => {
    const [categoriesSnap, subcategoriesSnap, productsSnap] = await Promise.all([
      adminDb.collection("categories").orderBy("order").get(),
      adminDb.collection("subcategories").orderBy("order").get(),
      adminDb.collection("products").orderBy("order").get(),
    ]);

    const productsBySubcategory = new Map<string, Product[]>();
    for (const doc of productsSnap.docs) {
      const data = doc.data();
      const key = `${data.categorySlug}__${data.subcategorySlug}`;
      const product: Product = {
        id: data.id,
        name: data.name,
        description: data.description,
        image: data.image,
        images: data.images ?? undefined,
        size: data.size,
        price: data.price,
        specs: data.specs ?? undefined,
      };
      const list = productsBySubcategory.get(key) ?? [];
      list.push(product);
      productsBySubcategory.set(key, list);
    }

    const subcategoriesByCategory = new Map<string, Subcategory[]>();
    for (const doc of subcategoriesSnap.docs) {
      const data = doc.data();
      const subcategory: Subcategory = {
        id: data.slug,
        slug: data.slug,
        name: data.name,
        shortDescription: data.shortDescription,
        coverImage: data.coverImage,
        products: productsBySubcategory.get(`${data.categorySlug}__${data.slug}`) ?? [],
      };
      const list = subcategoriesByCategory.get(data.categorySlug) ?? [];
      list.push(subcategory);
      subcategoriesByCategory.set(data.categorySlug, list);
    }

    return categoriesSnap.docs.map((doc) => {
      const data = doc.data();
      const category: Category = {
        id: data.slug,
        slug: data.slug,
        name: data.name,
        shortDescription: data.shortDescription,
        coverImage: data.coverImage,
        subcategories: subcategoriesByCategory.get(data.slug) ?? [],
      };
      return category;
    });
  },
  ["catalog-all-categories"],
  { revalidate: 86400, tags: ["catalog"] }
);

export const getAllCategories = cache(fetchAllCategoriesFromFirestore);

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return (await getAllCategories()).find((category) => category.slug === slug);
}

export async function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): Promise<Subcategory | undefined> {
  return (await getCategoryBySlug(categorySlug))?.subcategories.find(
    (subcategory) => subcategory.slug === subcategorySlug
  );
}

export async function getProductBySlug(
  categorySlug: string,
  subcategorySlug: string,
  productSlug: string
): Promise<Product | undefined> {
  return (await getSubcategoryBySlug(categorySlug, subcategorySlug))?.products.find(
    (product) => product.id === productSlug
  );
}

/** Flattened list of every product across every category/subcategory, used by the order form and search. */
export async function getAllProducts(): Promise<Array<Product & { categorySlug: string; subcategorySlug: string }>> {
  return (await getAllCategories()).flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.products.map((product) => ({
        ...product,
        categorySlug: category.slug,
        subcategorySlug: subcategory.slug,
      }))
    )
  );
}
