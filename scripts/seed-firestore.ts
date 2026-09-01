import { adminDb } from "@/lib/firebase/admin";
import { seedCategories } from "./seed-data";

/**
 * One-time (idempotent) population of Firestore from the frozen catalog
 * snapshot in ./seed-data.ts. Safe to re-run: document IDs are deterministic
 * (derived from slugs), so re-running just overwrites the same docs.
 *
 * Run via: npm run seed
 */
async function seed() {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  console.log(`Seeding Firestore project: ${projectId}`);
  if (!projectId) throw new Error("FIREBASE_ADMIN_PROJECT_ID is not set");

  const writer = adminDb.bulkWriter();
  const now = new Date();
  let categoryCount = 0;
  let subcategoryCount = 0;
  let productCount = 0;

  seedCategories.forEach((category, categoryIndex) => {
    writer.set(adminDb.collection("categories").doc(category.slug), {
      slug: category.slug,
      name: category.name,
      shortDescription: category.shortDescription,
      coverImage: category.coverImage,
      order: categoryIndex,
      createdAt: now,
      updatedAt: now,
    });
    categoryCount++;

    category.subcategories.forEach((subcategory, subcategoryIndex) => {
      const subcategoryId = `${category.slug}__${subcategory.slug}`;
      writer.set(adminDb.collection("subcategories").doc(subcategoryId), {
        categorySlug: category.slug,
        slug: subcategory.slug,
        name: subcategory.name,
        shortDescription: subcategory.shortDescription,
        coverImage: subcategory.coverImage,
        order: subcategoryIndex,
        createdAt: now,
        updatedAt: now,
      });
      subcategoryCount++;

      subcategory.products.forEach((product, productIndex) => {
        const productId = `${category.slug}__${subcategory.slug}__${product.id}`;
        writer.set(adminDb.collection("products").doc(productId), {
          categorySlug: category.slug,
          subcategorySlug: subcategory.slug,
          id: product.id,
          name: product.name,
          description: product.description,
          image: product.image,
          images: product.images ?? null,
          size: product.size,
          price: product.price,
          specs: product.specs ?? null,
          order: productIndex,
          createdAt: now,
          updatedAt: now,
        });
        productCount++;
      });
    });
  });

  await writer.close();
  console.log(`Seeded ${categoryCount} categories, ${subcategoryCount} subcategories, ${productCount} products.`);
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
