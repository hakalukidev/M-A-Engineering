import { LayoutGrid, MapPin, Package } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { getAllCategories } from "@/data/categories";

/** Three honest, data-backed value props — pale-green pill row, per the brand's "AI" reference style. */
export function ValueProps() {
  const categoryCount = getAllCategories().length;

  const items = [
    { icon: LayoutGrid, label: `${categoryCount} Equipment Categories`, detail: "Restaurant to medical, under one roof" },
    { icon: Package, label: "Bulk & Custom Orders", detail: "Fitting out a full floor or a single room" },
    { icon: MapPin, label: "Based in Dhaka", detail: siteConfig.contact.address },
  ];

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div className="grid gap-3 sm:grid-cols-3">
          {items.map(({ icon: Icon, label, detail }) => (
            <div
              key={label}
              className="flex min-w-0 items-center gap-3 rounded-md bg-brand-green/8 px-5 py-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-brand-cream">
                <Icon size={18} />
              </span>
              <div className="min-w-0 leading-tight">
                <p className="font-semibold text-brand-ink">{label}</p>
                <p className="truncate text-sm text-brand-ink/60">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
