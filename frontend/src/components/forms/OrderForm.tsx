"use client";

import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
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

/**
 * Fixed-price order form — no payment gateway (proposal 4.5).
 * Product select (fixed size + price) -> price box -> payment method box
 * (3-4 manual methods) -> payment proof upload box.
 */
export function OrderForm({ defaultProductId }: { defaultProductId?: string }) {
  const products = useMemo(() => getAllProducts(), []);
  const [productId, setProductId] = useState<string>(defaultProductId ?? products[0]?.id ?? "");
  const [paymentMethodId, setPaymentMethodId] = useState<string>(
    siteConfig.paymentMethods[0]?.id ?? ""
  );
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
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
        Thanks — your order and payment proof have been received. We&apos;ll confirm by phone or
        WhatsApp shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Product + fixed size/price */}
      <div className="space-y-2 rounded-xl border border-zinc-200 p-4">
        <label className="block text-sm font-semibold text-zinc-900" htmlFor="order-product">
          1. Select a product
        </label>
        <select
          id="order-product"
          name="productId"
          required
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} — {product.size}
            </option>
          ))}
        </select>

        <div>
          <span className="block text-xs font-medium uppercase tracking-wide text-zinc-500">
            Price
          </span>
          <input
            readOnly
            value={selectedProduct ? `${formatPrice(selectedProduct.price)} (${selectedProduct.size})` : ""}
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-semibold text-zinc-900"
          />
        </div>
      </div>

      {/* Payment method */}
      <div className="space-y-2 rounded-xl border border-zinc-200 p-4">
        <p className="text-sm font-semibold text-zinc-900">2. Choose a payment method</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {siteConfig.paymentMethods.map((method) => {
            const selected = paymentMethodId === method.id;
            return (
              <label
                key={method.id}
                className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-2 text-center transition-colors ${
                  selected
                    ? "border-brand-green bg-brand-green/10"
                    : "border-zinc-300 hover:bg-zinc-50"
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
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-green text-white">
                    <Check size={10} strokeWidth={3} />
                  </span>
                )}
                <PaymentMethodBadge id={method.id} />
                <span className="text-xs font-medium text-zinc-700">{method.name}</span>
              </label>
            );
          })}
        </div>

        {selectedPaymentMethod && (
          <div className="rounded-lg bg-zinc-50 p-3 text-sm text-zinc-700">
            <p>
              <span className="font-medium">{selectedPaymentMethod.accountLabel}:</span>{" "}
              {selectedPaymentMethod.accountValue}
            </p>
            <p className="mt-1 text-xs text-zinc-500">{selectedPaymentMethod.instructions}</p>
          </div>
        )}

        <input
          name="transactionRef"
          required
          placeholder="Transaction / reference ID"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
        />
      </div>

      {/* Payment proof */}
      <div className="space-y-2 rounded-xl border border-zinc-200 p-4">
        <label className="block text-sm font-semibold text-zinc-900" htmlFor="order-proof">
          3. Upload payment proof
        </label>
        <input
          id="order-proof"
          name="proof"
          type="file"
          accept="image/*"
          required
          className="w-full text-sm text-zinc-600 file:mr-3 file:rounded-full file:border-0 file:bg-brand-green file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
        />
        <p className="text-xs text-zinc-500">A screenshot or photo of the payment confirmation.</p>
      </div>

      {/* Customer details */}
      <div className="space-y-2 rounded-xl border border-zinc-200 p-4">
        <p className="text-sm font-semibold text-zinc-900">4. Your details</p>
        <input
          name="name"
          required
          placeholder="Full name"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
        />
        <input
          name="phone"
          required
          placeholder="Phone number"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
        />
        <textarea
          name="address"
          required
          rows={2}
          placeholder="Delivery address"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
        />
      </div>

      <Button type="submit" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? "Submitting..." : "Submit Order"}
      </Button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong — please try again.</p>
      )}
    </form>
  );
}
