/**
 * Shared domain types for the equipment showcase site.
 * Mirrors the scope in the proposal: 4-5 categories, each split into
 * subcategories with 10-15 images + descriptions, plus the CTA/popup and
 * inquiry-form shapes.
 */

export interface Product {
  id: string;
  /** Slug-safe name, used for alt text and search matching. */
  name: string;
  description: string;
  /** Path under /public/images/categories/<category-slug>/<subcategory-slug>/... */
  image: string;
  /** Optional extra specs shown on hover / lightbox caption. */
  specs?: Record<string, string>;
}

export interface Subcategory {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  /** Card/hero image for the subcategory itself. */
  coverImage: string;
  products: Product[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  /** Card/hero image for the category itself. */
  coverImage: string;
  subcategories: Subcategory[];
}

export type CtaAction = "call" | "whatsapp" | "quote" | "custom";

export interface CtaConfig {
  label: string;
  action: CtaAction;
  href: string;
}

export type PopupTrigger = "delay" | "exit-intent" | "scroll" | "manual";

export interface PopupConfig {
  id: string;
  title: string;
  message: string;
  trigger: PopupTrigger;
  /** Delay in ms (for "delay") or scroll % 0-100 (for "scroll"). */
  triggerValue?: number;
  cta: CtaConfig;
}

export interface InquiryFormValues {
  name: string;
  phone: string;
  email?: string;
  message: string;
  /** Pre-filled when the form is opened from a category/product page. */
  interestedIn?: string;
}

export interface SearchableItem {
  type: "category" | "subcategory" | "product";
  slug: string;
  categorySlug: string;
  /** Present for subcategories and products, which live one level under a category. */
  subcategorySlug?: string;
  title: string;
  description: string;
  image: string;
}
