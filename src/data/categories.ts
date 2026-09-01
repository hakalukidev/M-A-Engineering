import "server-only";
import { cache } from "react";
import { adminDb } from "@/lib/firebase/admin";
import type { Category, Product, Subcategory } from "@/types";

/**
 * Firestore-backed catalog reads. Collections: categories/{categorySlug},
 * subcategories/{categorySlug}__{subcategorySlug}, products/{categorySlug}__{subcategorySlug}__{productSlug},
 * each ordered by an `order` field. See scripts/seed-firestore.ts for the
 * writer side and src/app/admin/(protected)/categories/actions.ts for admin
 * CRUD mutations.
 *
 * getAllCategories is wrapped in React's cache() so every other function in
 * this file funnels through one deduped Firestore round trip per request —
 * callers that look up a single category/subcategory/product (e.g. the
 * product detail page's three chained lookups) don't pay for three reads.
 */
export const getAllCategories = cache(async (): Promise<Category[]> => {
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
});

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
