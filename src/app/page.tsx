import { Hero } from "@/components/marketing/hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero
        headline="Hiring, organized for small teams."
        subtext="Shortlist helps small hiring teams manage job openings, track candidates, and move through the recruitment pipeline, without the spreadsheet chaos."
      />
    </main>
  );
}
