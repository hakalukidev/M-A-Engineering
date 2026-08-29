/**
 * Shared domain types for the equipment showcase site.
 * Mirrors the scope in the proposal: 4-5 categories, each split into
 * subcategories with 10-15 images + descriptions, plus the CTA/popup and
 * inquiry-form shapes.
 */

export interface Product {
  id: string;
  /** Slug-safe name, used for alt text, search matching, and the product's own URL segment. */
  name: string;
  description: string;
  /** Path under /public/images/categories/<category-slug>/<subcategory-slug>/... */
  image: string;
  /**
   * Optional extra photos (other angles, in-context shots) shown as a
   * thumbnail strip under the main image on the product page. Omit when
   * there's only the one photo — the product page falls back to `image`
   * alone rather than padding the strip with unrelated pictures (e.g. the
   * subcategory's cover shot, which isn't actually a photo of this product).
   */
  images?: string[];
  /** Fixed size/spec shown next to the price (e.g. "Standard / 4-seat"). */
  size: string;
  /** Fixed order price in BDT — see formatPrice in lib/utils. */
  price: number;
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

/** One of the 3-4 manual payment methods offered on the order form (no payment gateway). */
export interface PaymentMethod {
  id: string;
  name: string;
  /** e.g. "Send Money to" */
  accountLabel: string;
  accountValue: string;
  instructions: string;
}

export interface OrderFormValues {
  productId: string;
  name: string;
  phone: string;
  address: string;
  paymentMethodId: string;
  /** Transaction/reference ID the customer enters from their payment app. */
  transactionRef: string;
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
