import { getFooterSettings } from "@/lib/settings";
import { getAboutSettings } from "@/lib/aboutSettings";
import { getClientsSettings } from "@/lib/clientsSettings";
import { getBestsellersSettings } from "@/lib/bestsellersSettings";
import { getCategoriesExploreSettings } from "@/lib/categoriesExploreSettings";
import { getAllCategories, getAllProducts } from "@/data/categories";
import { FooterSettingsForm } from "@/components/admin/FooterSettingsForm";
import { AboutSettingsForm } from "@/components/admin/AboutSettingsForm";
import { ClientsSettingsForm } from "@/components/admin/ClientsSettingsForm";
import { BestsellersSettingsForm, type CatalogProductOption } from "@/components/admin/BestsellersSettingsForm";
import { CategoriesExploreSettingsForm } from "@/components/admin/CategoriesExploreSettingsForm";

export default async function AdminSettingsPage() {
  const [footerSettings, aboutSettings, clientsSettings, bestsellersSettings, categoriesExploreSettings, categories, products] = await Promise.all([
    getFooterSettings(),
    getAboutSettings(),
    getClientsSettings(),
    getBestsellersSettings(),
    getCategoriesExploreSettings(),
    getAllCategories(),
    getAllProducts(),
  ]);

  const categoryNamesBySlug = new Map(categories.map((c) => [c.slug, c.name]));
  const subcategoryNamesBySlug = new Map(
    categories.flatMap((c) => c.subcategories.map((s) => [`${c.slug}__${s.slug}`, s.name] as const))
  );
  const catalogProducts: CatalogProductOption[] = products.map((product) => ({
    categorySlug: product.categorySlug,
    categoryName: categoryNamesBySlug.get(product.categorySlug) ?? product.categorySlug,
    subcategorySlug: product.subcategorySlug,
    subcategoryName: subcategoryNamesBySlug.get(`${product.categorySlug}__${product.subcategorySlug}`) ?? product.subcategorySlug,
    productSlug: product.id,
    productName: product.name,
    image: product.image,
  }));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-brand-ink">Footer Settings</h1>
        <p className="mt-1 text-sm text-brand-muted">
          Controls the company blurb, contact details, and social links shown in the site footer
          (and the phone/WhatsApp/Messenger used by the floating contact button and Contact page).
        </p>
        <div className="mt-6">
          <FooterSettingsForm initial={footerSettings} />
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-brand-ink">About Page</h1>
        <p className="mt-1 text-sm text-brand-muted">
          Controls the photos and copy shown on the public About page.
        </p>
        <div className="mt-6">
          <AboutSettingsForm initial={aboutSettings} />
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-brand-ink">Happy Clients</h1>
        <p className="mt-1 text-sm text-brand-muted">
          Controls the row of client handover photos shown near the top of the homepage.
        </p>
        <div className="mt-6">
          <ClientsSettingsForm initial={clientsSettings} />
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-brand-ink">Bestselling Products</h1>
        <p className="mt-1 text-sm text-brand-muted">
          Controls which catalog products appear in the &quot;Bestselling Products&quot; row on the
          homepage, and in what order. Add or remove picks from the existing catalog — to change a
          product&apos;s name, image, or price, edit it under Categories instead.
        </p>
        <div className="mt-6">
          <BestsellersSettingsForm initial={bestsellersSettings} catalogProducts={catalogProducts} />
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-brand-ink">Explore Categories</h1>
        <p className="mt-1 text-sm text-brand-muted">
          Controls which categories appear in the &quot;Explore our built-to-last Categories&quot;
          carousel on the homepage, their order, and the photo shown for each. A category needs an
          uploaded photo here to show up in the carousel — to change a category&apos;s name or
          catalog page, edit it under Categories instead.
        </p>
        <div className="mt-6">
          <CategoriesExploreSettingsForm
            initial={categoriesExploreSettings}
            categoryOptions={categories.map((c) => ({ slug: c.slug, name: c.name }))}
          />
        </div>
      </div>
    </div>
  );
}
