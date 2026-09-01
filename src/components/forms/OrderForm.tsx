"use client";

import { useMemo, useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import Image from "next/image";
import {
  Check,
  ChevronDown,
  Hash,
  MapPin,
  Phone,
  ShieldCheck,
  UploadCloud,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getAllProducts } from "@/data/categories";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

/** Real logo files, dropped in /public/images/payments — keyed by siteConfig.paymentMethods id. */
const PAYMENT_LOGOS: Record<
  string,
  { src: string; alt: string; fit: "contain" | "cover"; padded?: boolean }
> = {
  bkash: { src: "/images/payments/bkash.svg", alt: "bKash", fit: "contain" },
  nagad: { src: "/images/payments/nagad.svg", alt: "Nagad", fit: "contain" },
  rocket: { src: "/images/payments/rocket.png", alt: "Rocket", fit: "contain", padded: true },
  bank: { src: "/images/payments/bank.jpg", alt: "Bank cards", fit: "cover" },
};

function PaymentMethodBadge({ id }: { id: string }) {
  const logo = PAYMENT_LOGOS[id];
  if (!logo) return null;

  return (
    <span className="relative block h-11 w-full overflow-hidden rounded-md bg-white">
      <Image
        src={logo.src}
        alt={logo.alt}
        fill
        sizes="120px"
        className={
          logo.fit === "contain" ? (logo.padded ? "object-contain p-2" : "object-contain p-1") : "object-cover"
        }
      />
    </span>
  );
}

/** Numbered step badge + heading shared by every card in the form. */
function StepHeader({ n, title }: { n: number; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white">
        {n}
      </span>
      <h3 className="text-base font-semibold text-brand-ink">{title}</h3>
    </div>
  );
}

function FieldInput({
  icon,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { icon: ReactNode }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted">
        {icon}
      </span>
      <input
        {...props}
        className="w-full rounded-md border border-zinc-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-brand-ink outline-none transition-colors placeholder:text-zinc-400 focus:border-brand-green focus:ring-2 focus:ring-brand-green/15"
      />
    </div>
  );
}

/**
 * Fixed-price order form — no payment gateway (proposal 4.5).
 * Left: product -> payment method -> payment proof -> customer details.
 * Right (sticky on desktop): a live order summary so the total stays
 * visible while the customer fills the rest in.
 */
export function OrderForm({ defaultProductId }: { defaultProductId?: string }) {
  const products = useMemo(() => getAllProducts(), []);
  const [productId, setProductId] = useState<string>(defaultProductId ?? products[0]?.id ?? "");
  const [paymentMethodId, setPaymentMethodId] = useState<string>(
    siteConfig.paymentMethods[0]?.id ?? ""
  );
  const [transactionRef, setTransactionRef] = useState("");
  const [proofName, setProofName] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const selectedProduct = products.find((product) => product.id === productId);
  const selectedPaymentMethod = siteConfig.paymentMethods.find(
    (method) => method.id === paymentMethodId
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const proof = formData.get("proof");
    if (!(proof instanceof File) || proof.size === 0) {
      setError("Please attach a screenshot or photo of your payment as proof.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/order", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      setProofName(null);
      setTransactionRef("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-md border border-brand-green/20 bg-brand-green/5 p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-white">
          <Check size={22} strokeWidth={3} />
        </span>
        <p className="text-lg font-semibold text-brand-ink">Order received</p>
        <p className="max-w-sm text-sm text-brand-muted">
          Thanks — your order and payment proof have been received. We&apos;ll confirm by phone or
          WhatsApp shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-10">
      <form onSubmit={handleSubmit} className="order-2 space-y-5 lg:order-1">
        {/* Product + fixed size/price */}
        <div className="rounded-md border border-brand-ink/10 bg-brand-card p-5 shadow-sm sm:p-6">
          <StepHeader n={1} title="Select a product" />

          <div className="relative">
            <select
              id="order-product"
              name="productId"
              required
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full appearance-none rounded-md border border-zinc-300 bg-white px-4 py-3 pr-10 text-sm font-medium text-brand-ink outline-none transition-colors focus:border-brand-green focus:ring-2 focus:ring-brand-green/15"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} — {product.size}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
            />
          </div>

          {selectedProduct && (
            <div className="mt-3 flex items-center gap-3 rounded-md border border-brand-green/15 bg-brand-cream/60 p-3">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-gradient-to-b from-brand-cream to-brand-ink/10">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-brand-ink">
                  {selectedProduct.name}
                </p>
                <p className="text-xs text-brand-muted">{selectedProduct.size}</p>
              </div>
              <p className="shrink-0 text-lg font-bold text-brand-orange">
                {formatPrice(selectedProduct.price)}
              </p>
            </div>
          )}
        </div>

        {/* Payment method */}
        <div className="rounded-md border border-brand-ink/10 bg-brand-card p-5 shadow-sm sm:p-6">
          <StepHeader n={2} title="Choose a payment method" />
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {siteConfig.paymentMethods.map((method) => {
              const selected = paymentMethodId === method.id;
              return (
                <label
                  key={method.id}
                  className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-md border-2 p-2.5 text-center transition-all ${
                    selected
                      ? "border-brand-green bg-brand-green/10 shadow-sm"
                      : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethodId"
                    value={method.id}
                    checked={selected}
                    onChange={() => setPaymentMethodId(method.id)}
                    className="sr-only"
                  />
                  {selected && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-white ring-2 ring-white">
                      <Check size={11} strokeWidth={3} />
                    </span>
                  )}
                  <PaymentMethodBadge id={method.id} />
                  <span className="text-xs font-medium text-brand-ink">{method.name}</span>
                </label>
              );
            })}
          </div>

          {selectedPaymentMethod && (
            <div className="mt-3 rounded-md border-l-4 border-brand-green bg-brand-green/5 p-3 text-sm text-brand-ink">
              <p>
                <span className="font-semibold">{selectedPaymentMethod.accountLabel}:</span>{" "}
                {selectedPaymentMethod.accountValue}
              </p>
              <p className="mt-1 text-xs text-brand-muted">{selectedPaymentMethod.instructions}</p>
            </div>
          )}

          <div className="mt-3">
            <FieldInput
              icon={<Hash size={16} />}
              name="transactionRef"
              required
              placeholder="Transaction / reference ID"
              value={transactionRef}
              onChange={(e) => setTransactionRef(e.target.value)}
            />
          </div>
        </div>

        {/* Payment proof */}
        <div className="rounded-md border border-brand-ink/10 bg-brand-card p-5 shadow-sm sm:p-6">
          <StepHeader n={3} title="Upload payment proof" />
          <label
            htmlFor="order-proof"
            className="flex cursor-pointer flex-col items-center gap-2 rounded-md border-2 border-dashed border-zinc-300 p-6 text-center transition-colors hover:border-brand-green hover:bg-brand-green/5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
              <UploadCloud size={20} />
            </span>
            <span className="text-sm font-medium text-brand-ink">
              {proofName ?? "Click to upload a screenshot or photo"}
            </span>
            <span className="text-xs text-brand-muted">PNG, JPG — proof of your payment confirmation</span>
            <input
              id="order-proof"
              name="proof"
              type="file"
              accept="image/*"
              required
              className="sr-only"
              onChange={(e) => setProofName(e.target.files?.[0]?.name ?? null)}
            />
          </label>
        </div>

        {/* Customer details */}
        <div className="rounded-md border border-brand-ink/10 bg-brand-card p-5 shadow-sm sm:p-6">
          <StepHeader n={4} title="Your details" />
          <div className="space-y-3">
            <FieldInput icon={<User size={16} />} name="name" required placeholder="Full name" />
            <FieldInput icon={<Phone size={16} />} name="phone" required placeholder="Phone number" />
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-3.5 text-brand-muted">
                <MapPin size={16} />
              </span>
              <textarea
                name="address"
                required
                rows={2}
                placeholder="Delivery address"
                className="w-full rounded-md border border-zinc-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-brand-ink outline-none transition-colors placeholder:text-zinc-400 focus:border-brand-green focus:ring-2 focus:ring-brand-green/15"
              />
            </div>
          </div>
        </div>

        <Button type="submit" disabled={status === "submitting"} className="w-full py-3.5 text-base">
          {status === "submitting" ? "Submitting..." : "Submit Order"}
        </Button>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {status === "error" && (
          <p className="text-sm text-red-600">Something went wrong — please try again.</p>
        )}
      </form>

      {/* Order summary — sticky on desktop */}
      <aside className="order-1 lg:order-2 lg:sticky lg:top-24">
        <div className="space-y-4 rounded-md border border-brand-ink/10 bg-brand-card p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
            Order Summary
          </p>

          {selectedProduct && (
            <div className="flex items-center gap-3">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-gradient-to-b from-brand-cream to-brand-ink/10">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-brand-ink">
                  {selectedProduct.name}
                </p>
                <p className="text-xs text-brand-muted">{selectedProduct.size}</p>
              </div>
            </div>
          )}

          <div className="space-y-2 border-t border-zinc-100 pt-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-brand-muted">Price</span>
              <span className="font-medium text-brand-ink">
                {selectedProduct ? formatPrice(selectedProduct.price) : "—"}
              </span>
            </div>
            {selectedPaymentMethod && (
              <div className="flex items-center justify-between">
                <span className="text-brand-muted">Payment via</span>
                <span className="font-medium text-brand-ink">{selectedPaymentMethod.name}</span>
              </div>
            )}
            {transactionRef && (
              <div className="flex items-center justify-between gap-3">
                <span className="text-brand-muted">Reference</span>
                <span className="truncate font-medium text-brand-ink">{transactionRef}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
            <span className="text-sm font-semibold text-brand-ink">Total</span>
            <span className="text-xl font-bold text-brand-orange">
              {selectedProduct ? formatPrice(selectedProduct.price) : "—"}
            </span>
          </div>

          <div className="flex items-start gap-2 rounded-md bg-brand-cream/60 p-3 text-xs text-brand-muted">
            <ShieldCheck size={16} className="mt-0.5 shrink-0 text-brand-green" />
            <span>
              Your order is manually verified — we&apos;ll confirm by phone or WhatsApp within a
              few hours.
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
