type HeroProps = {
  headline: string;
  subtext: string;
};

export function Hero({ headline, subtext }: HeroProps) {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-900">
        {headline}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-600">{subtext}</p>
    </section>
  );
}