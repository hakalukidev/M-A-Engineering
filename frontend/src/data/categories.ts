import type { Category, Product, Subcategory } from "@/types";

/**
 * Placeholder category/subcategory/product data (proposal calls for 4-5
 * categories, each split into subcategories with 20-25 products per
 * category, each with a fixed size + price for online ordering). Names,
 * images, descriptions, sizes, and prices below are ALL PLACEHOLDERS —
 * replace with real content, real photos, and real pricing once the Client
 * supplies them.
 *
 * Once there's a real backend/CMS, swap this static array for a fetch
 * call in the same shape and the rest of the app (pages, search, order
 * form, generateStaticParams) keeps working unchanged.
 */

function makeProduct(
  categorySlug: string,
  subcategorySlug: string,
  slug: string,
  name: string,
  size: string,
  price: number
): Product {
  return {
    id: slug,
    name,
    description: `${name} — placeholder description. Replace with real specs, materials, and dimensions once supplied by the Client.`,
    image: `/images/categories/${categorySlug}/${subcategorySlug}/${slug}.jpg`,
    size,
    price,
  };
}

function makeSubcategory(
  categorySlug: string,
  slug: string,
  name: string,
  shortDescription: string,
  products: [string, string, string, number][] = []
): Subcategory {
  return {
    id: slug,
    slug,
    name,
    shortDescription,
    coverImage: `/images/categories/${categorySlug}/${slug}/cover.jpg`,
    products: products.map(([productSlug, productName, size, price]) =>
      makeProduct(categorySlug, slug, productSlug, productName, size, price)
    ),
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
        "Tables, chairs, and booths for the dining area.",
        [
          ["standard-dining-table-4-seat", "Standard Dining Table (4-Seat)", "48 x 30 in", 12500],
          ["bistro-table-2-seat", "Bistro Table (2-Seat)", "24 x 24 in", 7500],
          ["wooden-dining-chair", "Wooden Dining Chair", "Standard", 3200],
          ["cushioned-booth-straight", "Cushioned Booth Seating (Straight)", "72 in", 22000],
          ["cushioned-booth-corner", "Cushioned Booth Seating (L-Shape)", "72 x 72 in", 34000],
        ]
      ),
      makeSubcategory(
        "restaurant-equipment",
        "cooking-ranges",
        "Cooking Ranges",
        "Gas and electric ranges for restaurant-scale cooking.",
        [
          ["4-burner-gas-range", "4-Burner Gas Range", "36 x 30 in", 45000],
          ["6-burner-gas-range", "6-Burner Gas Range", "60 x 30 in", 68000],
          ["electric-griddle-range", "Electric Griddle Range", "36 x 30 in", 52000],
          ["char-broiler-range", "Char Broiler Range", "36 x 30 in", 49000],
          ["chinese-wok-range", "Chinese Wok Range (Single Burner)", "30 x 33 in", 41000],
        ]
      ),
      makeSubcategory(
        "restaurant-equipment",
        "refrigeration-units",
        "Refrigeration Units",
        "Chillers and freezers for ingredient and beverage storage.",
        [
          ["reach-in-chiller-single-door", "Single Door Reach-In Chiller", "27 x 30 x 83 in", 58000],
          ["reach-in-chiller-double-door", "Double Door Reach-In Chiller", "54 x 30 x 83 in", 92000],
          ["under-counter-freezer", "Under-Counter Freezer", "27 x 30 x 34 in", 42000],
          ["back-bar-cooler", "Back Bar Cooler", "59 x 24 x 34 in", 65000],
          ["walk-in-cold-room-small", "Walk-In Cold Room (Small)", "6 x 6 ft", 285000],
        ]
      ),
      makeSubcategory(
        "restaurant-equipment",
        "serving-counters",
        "Serving Counters",
        "Buffet and serving counters for front-of-house service.",
        [
          ["buffet-hot-counter-3-pan", "Buffet Hot Counter (3-Pan)", "48 x 28 in", 55000],
          ["buffet-cold-counter-3-pan", "Buffet Cold Counter (3-Pan)", "48 x 28 in", 62000],
          ["salad-bar-counter", "Salad Bar Counter", "60 x 28 in", 58000],
          ["soup-station-counter", "Soup Station Counter", "36 x 28 in", 39000],
          ["beverage-serving-counter", "Beverage Serving Counter", "48 x 28 in", 36000],
        ]
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
        "Fryers, griddles, and burners for high-volume cooking.",
        [
          ["deep-fryer-single-basket", "Deep Fryer (Single Basket)", "16 x 24 in", 32000],
          ["deep-fryer-double-basket", "Deep Fryer (Double Basket)", "24 x 24 in", 48000],
          ["flat-top-griddle", "Flat Top Griddle", "36 x 24 in", 39000],
          ["countertop-burner", "Countertop Burner (Single)", "18 x 24 in", 9500],
          ["induction-cooktop", "Induction Cooktop (Commercial)", "16 x 20 in", 27000],
        ]
      ),
      makeSubcategory(
        "commercial-kitchen-equipment",
        "food-preparation-equipment",
        "Food Preparation Equipment",
        "Cutters, mixers, and prep tables for kitchen workflows.",
        [
          ["vegetable-cutter", "Vegetable Cutter", "Standard", 28000],
          ["planetary-mixer-10l", "Planetary Mixer (10L)", "10 L", 45000],
          ["meat-mincer", "Meat Mincer", "Standard", 31000],
          ["prep-table-4ft", "Stainless Prep Table (4ft)", "48 x 24 in", 18000],
          ["prep-table-6ft", "Stainless Prep Table (6ft)", "72 x 24 in", 24000],
        ]
      ),
      makeSubcategory(
        "commercial-kitchen-equipment",
        "refrigeration-storage",
        "Refrigeration & Storage",
        "Walk-in coolers and storage racks for bulk ingredients.",
        [
          ["walk-in-cooler-standard", "Walk-In Cooler (Standard)", "8 x 8 ft", 320000],
          ["walk-in-freezer-standard", "Walk-In Freezer (Standard)", "8 x 8 ft", 385000],
          ["wire-storage-rack-5-tier", "Wire Storage Rack (5-Tier)", "48 x 18 x 72 in", 12500],
          ["stainless-storage-rack", "Stainless Storage Rack", "48 x 18 x 72 in", 19500],
          ["blast-chiller", "Blast Chiller", "24 x 30 x 34 in", 145000],
        ]
      ),
      makeSubcategory(
        "commercial-kitchen-equipment",
        "dishwashing-equipment",
        "Dishwashing Equipment",
        "Commercial dishwashers and wash stations.",
        [
          ["undercounter-dishwasher", "Undercounter Dishwasher", "24 x 24 in", 78000],
          ["hood-type-dishwasher", "Hood-Type Dishwasher", "30 x 30 in", 165000],
          ["pot-wash-sink-3-compartment", "Pot Wash Sink (3-Compartment)", "72 x 30 in", 42000],
          ["pre-rinse-sink-unit", "Pre-Rinse Sink Unit", "36 x 30 in", 26000],
          ["glasswasher", "Glasswasher", "18 x 20 in", 58000],
        ]
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
        "Deck, convection, and rotary ovens with proofing cabinets.",
        [
          ["deck-oven-2-deck", "Deck Oven (2-Deck)", "40 x 40 in", 175000],
          ["convection-oven", "Convection Oven", "34 x 34 in", 98000],
          ["rotary-rack-oven", "Rotary Rack Oven", "48 x 48 in", 320000],
          ["proofing-cabinet", "Proofing Cabinet", "28 x 32 x 70 in", 62000],
          ["combi-oven-proofer", "Combi Oven-Proofer", "40 x 40 in", 245000],
        ]
      ),
      makeSubcategory(
        "bakery-equipment",
        "mixers-dough-equipment",
        "Mixers & Dough Equipment",
        "Dough mixers, sheeters, and dividers.",
        [
          ["spiral-dough-mixer-25kg", "Spiral Dough Mixer (25kg)", "25 kg capacity", 135000],
          ["planetary-mixer-20l", "Planetary Mixer (20L)", "20 L", 68000],
          ["dough-sheeter", "Dough Sheeter", "20 in roller", 92000],
          ["dough-divider-rounder", "Dough Divider Rounder", "36-piece", 155000],
          ["bread-slicer", "Bread Slicer", "Standard", 48000],
        ]
      ),
      makeSubcategory(
        "bakery-equipment",
        "display-showcases",
        "Display & Showcases",
        "Cake and pastry display showcases.",
        [
          ["cake-display-showcase-curved", "Cake Display Showcase (Curved Glass)", "48 x 28 x 48 in", 78000],
          ["pastry-display-showcase-square", "Pastry Display Showcase (Square Glass)", "48 x 28 x 48 in", 72000],
          ["cold-display-showcase", "Cold Display Showcase", "60 x 30 x 50 in", 115000],
          ["bread-display-rack", "Bread Display Rack", "36 x 20 x 60 in", 22000],
          ["countertop-display-case", "Countertop Display Case", "24 x 18 x 20 in", 15500],
        ]
      ),
      makeSubcategory(
        "bakery-equipment",
        "packaging-equipment",
        "Packaging Equipment",
        "Sealing and packaging equipment for bakery products.",
        [
          ["bread-bag-sealer", "Bread Bag Sealer", "Tabletop", 8500],
          ["shrink-wrap-machine", "Shrink Wrap Machine", "Standard", 42000],
          ["vacuum-packaging-machine", "Vacuum Packaging Machine", "Standard", 55000],
          ["labeling-machine", "Labeling Machine", "Semi-Automatic", 65000],
          ["tray-sealer", "Tray Sealer", "Standard", 78000],
        ]
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
        "Beds, trolleys, and bedside cabinets.",
        [
          ["manual-hospital-bed", "Manual Hospital Bed", "Standard", 45000],
          ["electric-hospital-bed", "Electric Hospital Bed", "Standard", 125000],
          ["bedside-cabinet", "Bedside Cabinet", "18 x 18 x 30 in", 9500],
          ["patient-trolley", "Patient Trolley", "Standard", 38000],
          ["overbed-table", "Overbed Table", "Adjustable", 12500],
        ]
      ),
      makeSubcategory(
        "medical-equipment",
        "diagnostic-equipment",
        "Diagnostic Equipment",
        "Monitors and diagnostic instruments.",
        [
          ["patient-monitor", "Patient Monitor", "Standard", 85000],
          ["digital-blood-pressure-monitor", "Digital Blood Pressure Monitor", "Standard", 6500],
          ["ecg-machine", "ECG Machine (3-Channel)", "Standard", 95000],
          ["pulse-oximeter", "Pulse Oximeter", "Handheld", 3200],
          ["examination-light", "Examination Light", "LED, Mobile Stand", 15500],
        ]
      ),
      makeSubcategory(
        "medical-equipment",
        "surgical-equipment",
        "Surgical Equipment",
        "Instruments and equipment for surgical use.",
        [
          ["surgical-instrument-set", "Surgical Instrument Set", "General Set", 42000],
          ["operating-table", "Operating Table", "Manual, Standard", 165000],
          ["surgical-light-ceiling", "Surgical Light (Ceiling)", "LED, Single Dome", 145000],
          ["instrument-trolley", "Instrument Trolley", "2-Tier", 12500],
          ["surgical-suction-unit", "Surgical Suction Unit", "Standard", 38000],
        ]
      ),
      makeSubcategory(
        "medical-equipment",
        "sterilization-equipment",
        "Sterilization Equipment",
        "Autoclaves and sterilization units.",
        [
          ["autoclave-18l", "Autoclave (18L)", "18 L", 48000],
          ["autoclave-50l", "Autoclave (50L)", "50 L", 95000],
          ["uv-sterilizer-cabinet", "UV Sterilizer Cabinet", "Standard", 22000],
          ["dry-heat-sterilizer", "Dry Heat Sterilizer", "Standard", 32000],
          ["fumigation-unit", "Fumigation Unit", "Standard", 28000],
        ]
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
        "Counters for displaying fresh and packaged food.",
        [
          ["bakery-display-counter", "Bakery Display Counter", "60 x 28 x 42 in", 55000],
          ["meat-display-counter", "Meat Display Counter", "60 x 28 x 42 in", 78000],
          ["fruit-display-counter", "Fruit Display Counter", "48 x 28 x 36 in", 32000],
          ["billing-counter", "Billing Counter", "48 x 24 x 36 in", 18500],
          ["checkout-counter", "Checkout Counter", "60 x 24 x 36 in", 24500],
        ]
      ),
      makeSubcategory(
        "food-shop-equipment",
        "refrigeration-freezers",
        "Refrigeration & Freezers",
        "Display fridges and freezers for retail food shops.",
        [
          ["upright-display-fridge", "Upright Display Fridge", "27 x 30 x 83 in", 62000],
          ["chest-freezer", "Chest Freezer", "60 x 26 x 34 in", 45000],
          ["multi-deck-open-chiller", "Multi-Deck Open Chiller", "72 x 30 x 65 in", 155000],
          ["visi-cooler", "Visi Cooler", "27 x 26 x 60 in", 38000],
          ["ice-cream-freezer", "Ice Cream Freezer", "48 x 26 x 34 in", 52000],
        ]
      ),
      makeSubcategory(
        "food-shop-equipment",
        "weighing-billing",
        "Weighing & Billing",
        "Weighing scales and billing counters.",
        [
          ["digital-platform-scale", "Digital Platform Scale", "150 kg capacity", 12500],
          ["price-computing-scale", "Price Computing Scale", "30 kg capacity", 8500],
          ["pos-billing-machine", "POS Billing Machine", "Standard", 32000],
          ["barcode-scanner", "Barcode Scanner", "Handheld", 4500],
          ["receipt-printer", "Receipt Printer", "Thermal", 6800],
        ]
      ),
      makeSubcategory(
        "food-shop-equipment",
        "storage-shelving",
        "Storage & Shelving",
        "Shelving and storage units for shop inventory.",
        [
          ["wire-shelving-unit", "Wire Shelving Unit", "48 x 18 x 72 in", 11500],
          ["wall-mounted-shelving", "Wall-Mounted Shelving", "36 x 12 in", 6500],
          ["gondola-shelving", "Gondola Shelving", "48 x 18 x 60 in", 15500],
          ["storage-bin-rack", "Storage Bin Rack", "36 x 18 x 60 in", 9800],
          ["mobile-trolley-rack", "Mobile Trolley Rack", "36 x 24 x 60 in", 13500],
        ]
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

export function getProductBySlug(
  categorySlug: string,
  subcategorySlug: string,
  productSlug: string
): Product | undefined {
  return getSubcategoryBySlug(categorySlug, subcategorySlug)?.products.find(
    (product) => product.id === productSlug
  );
}

/** Flattened list of every product across every category/subcategory, used by the order form and search. */
export function getAllProducts(): Array<Product & { categorySlug: string; subcategorySlug: string }> {
  return categories.flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.products.map((product) => ({
        ...product,
        categorySlug: category.slug,
        subcategorySlug: subcategory.slug,
      }))
    )
  );
}
