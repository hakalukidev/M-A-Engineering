import { getBestsellersSettings } from "@/lib/bestsellersSettings";
import { getAllCategories, getAllProducts } from "@/data/categories";
import { BestsellersSettingsForm, type CatalogProductOption } from "@/components/admin/BestsellersSettingsForm";

export default async function AdminBestsellersSettingsPage() {
  const [bestsellersSettings, categories, products] = await Promise.all([
    getBestsellersSettings(),
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
    <div>
      <h2 className="text-lg font-bold text-brand-ink">Bestselling Products</h2>
      <p className="mt-1 text-sm text-brand-muted">
        Controls which catalog products appear in the &quot;Bestselling Products&quot; row on the
        homepage, and in what order. Add or remove picks from the existing catalog — to change a
        product&apos;s name, image, or price, edit it under Categories instead.
      </p>
      <div className="mt-6">
        <BestsellersSettingsForm initial={bestsellersSettings} catalogProducts={catalogProducts} />
      </div>
    </div>
  );
}
