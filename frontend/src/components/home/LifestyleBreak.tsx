import Image from "next/image";

/** Full-bleed photo break with an overlaid statement — visual breathing room between sections. */
export function LifestyleBreak() {
  return (
    <section className="relative h-[320px] w-full overflow-hidden sm:h-[420px]">
      <Image
        src="/images/categories/restaurant-equipment/cover.jpg"
        alt="Fitted-out restaurant floor"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/90 via-brand-green-dark/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:px-12 sm:pb-14">
        <p className="max-w-2xl text-xl font-medium leading-snug text-brand-cream sm:text-2xl">
          Every category is stocked with equipment built for daily commercial use —{" "}
          <span className="italic text-brand-orange">engineered to handle</span> the pace of a
          real kitchen, clinic, or shop floor.
        </p>
      </div>
    </section>
  );
}
