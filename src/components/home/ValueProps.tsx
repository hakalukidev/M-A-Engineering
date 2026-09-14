import { LayoutGrid, MapPin, Package } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { getAllCategories } from "@/data/categories";

/** Three honest, data-backed value props — pale-green pill row, per the brand's "AI" reference style. */
export async function ValueProps() {
  const categoryCount = (await getAllCategories()).length;

  const items = [
    { icon: LayoutGrid, label: `${categoryCount} Equipment Categories`, detail: "Restaurant to medical, under one roof" },
    { icon: Package, label: "Bulk & Custom Orders", detail: "Fitting out a full floor or a single room" },
    { icon: MapPin, label: "Based in Dhaka", detail: siteConfig.contact.address },
  ];

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="grid divide-y divide-brand-ink/10 border-y border-brand-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {items.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="flex min-w-0 items-center gap-4 py-5 sm:px-6 sm:py-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green-dark">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <div className="min-w-0 leading-tight">
                <p className="font-semibold text-brand-ink">{label}</p>
                <p className="mt-0.5 truncate text-sm text-brand-ink/60">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
