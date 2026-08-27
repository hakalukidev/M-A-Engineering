import type { MetadataRoute } from "next";
import { getAllCategories } from "@/data/categories";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteConfig.url}/order`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/categories`, changeFrequency: "monthly", priority: 0.9 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getAllCategories().map((category) => ({
    url: `${siteConfig.url}/categories/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const subcategoryRoutes: MetadataRoute.Sitemap = getAllCategories().flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      url: `${siteConfig.url}/categories/${category.slug}/${subcategory.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  const productRoutes: MetadataRoute.Sitemap = getAllCategories().flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.products.map((product) => ({
        url: `${siteConfig.url}/categories/${category.slug}/${subcategory.slug}/${product.id}`,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }))
    )
  );

  return [...staticRoutes, ...categoryRoutes, ...subcategoryRoutes, ...productRoutes];
}
