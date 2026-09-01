"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { adminDb } from "@/lib/firebase/admin";
import { requireAdmin } from "@/lib/auth/session";

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function assertSlug(slug: string) {
  if (!SLUG_RE.test(slug)) {
    throw new Error("Slug must be lowercase letters, numbers, and single hyphens only (e.g. dining-furniture)");
  }
}

async function nextOrder(query: FirebaseFirestore.Query) {
  const snap = await query.count().get();
  return snap.data().count;
}

function revalidateCatalog() {
  updateTag("catalog"); // busts the unstable_cache in src/data/categories.ts immediately, read-your-own-writes
  revalidatePath("/");
  revalidatePath("/categories");
  revalidatePath("/products");
  revalidatePath("/about");
  revalidatePath("/api/catalog/index");
  revalidatePath("/sitemap.xml");
}

// ---------- Categories ----------

export type CategoryInput = { slug: string; name: string; shortDescription: string; coverImage: string };

export async function createCategory(input: CategoryInput) {
  await requireAdmin();
  assertSlug(input.slug);

  const ref = adminDb.collection("categories").doc(input.slug);
  if ((await ref.get()).exists) throw new Error("A category with this slug already exists");

  const now = new Date();
  await ref.set({
    slug: input.slug,
    name: input.name,
    shortDescription: input.shortDescription,
    coverImage: input.coverImage,
    order: await nextOrder(adminDb.collection("categories")),
    createdAt: now,
    updatedAt: now,
  });

  revalidateCatalog();
  redirect("/admin/categories");
}

export async function updateCategory(slug: string, input: Omit<CategoryInput, "slug">) {
  await requireAdmin();
  await adminDb.collection("categories").doc(slug).update({ ...input, updatedAt: new Date() });
  revalidateCatalog();
  revalidatePath(`/categories/${slug}`);
}

export async function deleteCategory(slug: string) {
  await requireAdmin();

  const writer = adminDb.bulkWriter();
  writer.delete(adminDb.collection("categories").doc(slug));
  const subcats = await adminDb.collection("subcategories").where("categorySlug", "==", slug).get();
  subcats.forEach((doc) => writer.delete(doc.ref));
  const products = await adminDb.collection("products").where("categorySlug", "==", slug).get();
  products.forEach((doc) => writer.delete(doc.ref));
  await writer.close();

  revalidateCatalog();
  redirect("/admin/categories");
}

// ---------- Subcategories ----------

export type SubcategoryInput = {
  categorySlug: string;
  slug: string;
  name: string;
  shortDescription: string;
  coverImage: string;
};

export async function createSubcategory(input: SubcategoryInput) {
  await requireAdmin();
  assertSlug(input.slug);

  const id = `${input.categorySlug}__${input.slug}`;
  const ref = adminDb.collection("subcategories").doc(id);
  if ((await ref.get()).exists) throw new Error("A subcategory with this slug already exists in this category");

  const now = new Date();
  await ref.set({
    categorySlug: input.categorySlug,
    slug: input.slug,
    name: input.name,
    shortDescription: input.shortDescription,
    coverImage: input.coverImage,
    order: await nextOrder(adminDb.collection("subcategories").where("categorySlug", "==", input.categorySlug)),
    createdAt: now,
    updatedAt: now,
  });

  revalidateCatalog();
  redirect(`/admin/categories/${input.categorySlug}`);
}

export async function updateSubcategory(
  categorySlug: string,
  slug: string,
  input: Omit<SubcategoryInput, "categorySlug" | "slug">
) {
  await requireAdmin();
  const id = `${categorySlug}__${slug}`;
  await adminDb.collection("subcategories").doc(id).update({ ...input, updatedAt: new Date() });
  revalidateCatalog();
  revalidatePath(`/categories/${categorySlug}/${slug}`);
}

export async function deleteSubcategory(categorySlug: string, slug: string) {
  await requireAdmin();
  const id = `${categorySlug}__${slug}`;

  const writer = adminDb.bulkWriter();
  writer.delete(adminDb.collection("subcategories").doc(id));
  const products = await adminDb
    .collection("products")
    .where("categorySlug", "==", categorySlug)
    .where("subcategorySlug", "==", slug)
    .get();
  products.forEach((doc) => writer.delete(doc.ref));
  await writer.close();

  revalidateCatalog();
  redirect(`/admin/categories/${categorySlug}`);
}

// ---------- Products ----------

export type ProductInput = {
  categorySlug: string;
  subcategorySlug: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  size: string;
  price: number;
  specs: Record<string, string>;
};

export async function createProduct(input: ProductInput) {
  await requireAdmin();
  assertSlug(input.slug);

  const id = `${input.categorySlug}__${input.subcategorySlug}__${input.slug}`;
  const ref = adminDb.collection("products").doc(id);
  if ((await ref.get()).exists) throw new Error("A product with this slug already exists in this subcategory");

  const now = new Date();
  await ref.set({
    categorySlug: input.categorySlug,
    subcategorySlug: input.subcategorySlug,
    id: input.slug,
    name: input.name,
    description: input.description,
    image: input.image,
    images: input.images.length > 0 ? input.images : null,
    size: input.size,
    price: input.price,
    specs: Object.keys(input.specs).length > 0 ? input.specs : null,
    order: await nextOrder(
      adminDb
        .collection("products")
        .where("categorySlug", "==", input.categorySlug)
        .where("subcategorySlug", "==", input.subcategorySlug)
    ),
    createdAt: now,
    updatedAt: now,
  });

  revalidateCatalog();
  redirect(`/admin/categories/${input.categorySlug}/subcategories/${input.subcategorySlug}`);
}

export async function updateProduct(
  categorySlug: string,
  subcategorySlug: string,
  slug: string,
  input: Omit<ProductInput, "categorySlug" | "subcategorySlug" | "slug">
) {
  await requireAdmin();
  const id = `${categorySlug}__${subcategorySlug}__${slug}`;
  await adminDb
    .collection("products")
    .doc(id)
    .update({
      name: input.name,
      description: input.description,
      image: input.image,
      images: input.images.length > 0 ? input.images : null,
      size: input.size,
      price: input.price,
      specs: Object.keys(input.specs).length > 0 ? input.specs : null,
      updatedAt: new Date(),
    });
  revalidateCatalog();
  revalidatePath(`/categories/${categorySlug}/${subcategorySlug}/${slug}`);
}

export async function deleteProduct(categorySlug: string, subcategorySlug: string, slug: string) {
  await requireAdmin();
  const id = `${categorySlug}__${subcategorySlug}__${slug}`;
  await adminDb.collection("products").doc(id).delete();
  revalidateCatalog();
  redirect(`/admin/categories/${categorySlug}/subcategories/${subcategorySlug}`);
}
