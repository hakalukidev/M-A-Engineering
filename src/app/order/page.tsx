import type { Metadata } from "next";
import { OrderForm } from "@/components/forms/OrderForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Order",
  description: "Place a fixed-price order and confirm payment — no payment gateway required.",
};

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;

  return (
    <Container className="max-w-5xl py-16">
      <SectionHeading
        eyebrow="Order"
        title="Place Your Order"
        subtitle="Pick a product, pay by bKash/Nagad/Rocket/Bank, and upload your payment proof — no online payment gateway needed."
        className="mb-10 max-w-2xl"
      />
      <OrderForm defaultProductId={product} />
    </Container>
  );
}
