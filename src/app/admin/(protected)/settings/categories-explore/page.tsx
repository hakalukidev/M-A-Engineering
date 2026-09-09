import { getCategoriesExploreSettings } from "@/lib/categoriesExploreSettings";
import { getAllCategories } from "@/data/categories";
import { CategoriesExploreSettingsForm } from "@/components/admin/CategoriesExploreSettingsForm";

export default async function AdminCategoriesExploreSettingsPage() {
  const [categoriesExploreSettings, categories] = await Promise.all([
    getCategoriesExploreSettings(),
    getAllCategories(),
  ]);

  return (
    <div>
      <h2 className="text-lg font-bold text-brand-ink">Explore Categories</h2>
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
  );
}
