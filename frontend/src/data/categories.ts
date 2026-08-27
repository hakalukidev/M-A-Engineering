import type { Category, Subcategory } from "@/types";

/**
 * Placeholder category/subcategory/product data (proposal calls for 4-5
 * categories, each split into subcategories with 10-15 images +
 * descriptions). Replace with real content once the Client supplies
 * category/subcategory names, images, and descriptions.
 *
 * Once there's a real backend/CMS, swap this static array for a fetch
 * call in the same shape and the rest of the app (pages, search,
 * generateStaticParams) keeps working unchanged.
 */

function makeSubcategory(
  categorySlug: string,
  slug: string,
  name: string,
  shortDescription: string
): Subcategory {
  return {
    id: slug,
    slug,
    name,
    shortDescription,
    coverImage: `/images/categories/${categorySlug}/${slug}/cover.jpg`,
    products: [],
  };
}

export const categories: Category[] = [
  {
    id: "restaurant-equipment",
    slug: "restaurant-equipment",
    name: "Restaurant Equipment",
    shortDescription: "Furniture and equipment to fit out a full-service restaurant floor.",
    coverImage: "/images/categories/restaurant-equipment/cover.jpg",
    subcategories: [
      makeSubcategory(
        "restaurant-equipment",
        "dining-furniture",
        "Dining Furniture",
        "Tables, chairs, and booths for the dining area."
      ),
      makeSubcategory(
        "restaurant-equipment",
        "cooking-ranges",
        "Cooking Ranges",
        "Gas and electric ranges for restaurant-scale cooking."
      ),
      makeSubcategory(
        "restaurant-equipment",
        "refrigeration-units",
        "Refrigeration Units",
        "Chillers and freezers for ingredient and beverage storage."
      ),
      makeSubcategory(
        "restaurant-equipment",
        "serving-counters",
        "Serving Counters",
        "Buffet and serving counters for front-of-house service."
      ),
    ],
  },
  {
    id: "commercial-kitchen-equipment",
    slug: "commercial-kitchen-equipment",
    name: "Commercial Kitchen Equipment",
    shortDescription: "Heavy-duty equipment built for high-volume commercial kitchens.",
    coverImage: "/images/categories/commercial-kitchen-equipment/cover.jpg",
    subcategories: [
      makeSubcategory(
        "commercial-kitchen-equipment",
        "cooking-equipment",
        "Cooking Equipment",
        "Fryers, griddles, and burners for high-volume cooking."
      ),
      makeSubcategory(
        "commercial-kitchen-equipment",
        "food-preparation-equipment",
        "Food Preparation Equipment",
        "Cutters, mixers, and prep tables for kitchen workflows."
      ),
      makeSubcategory(
        "commercial-kitchen-equipment",
        "refrigeration-storage",
        "Refrigeration & Storage",
        "Walk-in coolers and storage racks for bulk ingredients."
      ),
      makeSubcategory(
        "commercial-kitchen-equipment",
        "dishwashing-equipment",
        "Dishwashing Equipment",
        "Commercial dishwashers and wash stations."
      ),
    ],
  },
  {
    id: "bakery-equipment",
    slug: "bakery-equipment",
    name: "Bakery Equipment",
    shortDescription: "Equipment for baking, finishing, and displaying bakery products.",
    coverImage: "/images/categories/bakery-equipment/cover.jpg",
    subcategories: [
      makeSubcategory(
        "bakery-equipment",
        "ovens-proofers",
        "Ovens & Proofers",
        "Deck, convection, and rotary ovens with proofing cabinets."
      ),
      makeSubcategory(
        "bakery-equipment",
        "mixers-dough-equipment",
        "Mixers & Dough Equipment",
        "Dough mixers, sheeters, and dividers."
      ),
      makeSubcategory(
        "bakery-equipment",
        "display-showcases",
        "Display & Showcases",
        "Cake and pastry display showcases."
      ),
      makeSubcategory(
        "bakery-equipment",
        "packaging-equipment",
        "Packaging Equipment",
        "Sealing and packaging equipment for bakery products."
      ),
    ],
  },
  {
    id: "medical-equipment",
    slug: "medical-equipment",
    name: "Medical Equipment",
    shortDescription: "Equipment and furniture for clinics, hospitals, and diagnostic labs.",
    coverImage: "/images/categories/medical-equipment/cover.jpg",
    subcategories: [
      makeSubcategory(
        "medical-equipment",
        "hospital-furniture",
        "Hospital Furniture",
        "Beds, trolleys, and bedside cabinets."
      ),
      makeSubcategory(
        "medical-equipment",
        "diagnostic-equipment",
        "Diagnostic Equipment",
        "Monitors and diagnostic instruments."
      ),
      makeSubcategory(
        "medical-equipment",
        "surgical-equipment",
        "Surgical Equipment",
        "Instruments and equipment for surgical use."
      ),
      makeSubcategory(
        "medical-equipment",
        "sterilization-equipment",
        "Sterilization Equipment",
        "Autoclaves and sterilization units."
      ),
    ],
  },
  {
    id: "food-shop-equipment",
    slug: "food-shop-equipment",
    name: "Food Shop Equipment",
    shortDescription: "Equipment for grocery, retail food, and general food shops.",
    coverImage: "/images/categories/food-shop-equipment/cover.jpg",
    subcategories: [
      makeSubcategory(
        "food-shop-equipment",
        "display-counters",
        "Display Counters",
        "Counters for displaying fresh and packaged food."
      ),
      makeSubcategory(
        "food-shop-equipment",
        "refrigeration-freezers",
        "Refrigeration & Freezers",
        "Display fridges and freezers for retail food shops."
      ),
      makeSubcategory(
        "food-shop-equipment",
        "weighing-billing",
        "Weighing & Billing",
        "Weighing scales and billing counters."
      ),
      makeSubcategory(
        "food-shop-equipment",
        "storage-shelving",
        "Storage & Shelving",
        "Shelving and storage units for shop inventory."
      ),
    ],
  },
];

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): Subcategory | undefined {
  return getCategoryBySlug(categorySlug)?.subcategories.find(
    (subcategory) => subcategory.slug === subcategorySlug
  );
}
